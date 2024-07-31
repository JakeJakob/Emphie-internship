import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
	CreatePlayerSchema,
	GetOnePlayerSchema,
	GetManyPlayerSchema,
	UpdatePlayerSchema,
	DeletePlayerSchema,
	CreatePlayer,
} from "./schema";
import { SOCKET_EVENTS } from "../../plugins/socket";

const playerHandler = (
	server: FastifyInstance,
	_opts: unknown,
	done: () => void
) => {
	server.get(
		"/tournaments/:tournament_id/players",
		{
			schema: GetManyPlayerSchema,
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id } = req.params as { tournament_id: number };

			const players = await server.db.player.find({
				where: {
					tournament_id,
				},
			});

			return res.status(200).send(players);
		}
	);

	server.get(
		"/tournaments/:tournament_id/players/:player_id",
		{
			schema: GetOnePlayerSchema,
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id, player_id } = req.params as {
				tournament_id: number;
				player_id: number;
			};

			const player = await server.db.player.findOne({
				where: {
					id: player_id,
					tournament_id,
				},
			});

			if (!player) {
				return res.status(404).send({ msg: "Player not found" });
			}

			return res.send(player);
		}
	);

	server.post(
		"/tournaments/:tournament_id/players",
		{
			schema: CreatePlayerSchema,
			preHandler: [server.checkToken, server.judgeOrAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id } = req.params as { tournament_id: number };
			const createPlayerBody = req.body as CreatePlayer;

			const newPlayer = await server.db.player.save({
				tournament_id,
				...createPlayerBody,
			});

			await server.socket.emit(SOCKET_EVENTS.PLAYER_CREATED, newPlayer);
			return res.status(201).send(newPlayer);
		}
	);

	server.put(
		"/tournaments/:tournament_id/players/:player_id",
		{
			schema: UpdatePlayerSchema,
			preHandler: [server.checkToken, server.judgeOrAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id, player_id } = req.params as {
				tournament_id: number;
				player_id: number;
			};
			const createPlayerBody = req.body as CreatePlayer;

			const player = await server.db.player.findOne({
				where: {
					id: player_id,
					tournament_id,
				},
			});

			if (!player) {
				return res.status(404).send({ msg: "Player not found" });
			}

			const updatedPlayer = await server.db.player.save({
				...player,
				...createPlayerBody,
			});

			await server.socket.emit(
				SOCKET_EVENTS.PLAYER_UPDATED,
				updatedPlayer
			);
			return res.send(updatedPlayer);
		}
	);

	server.delete(
		"/tournaments/:tournament_id/players/:player_id",
		{
			schema: DeletePlayerSchema,
			preHandler: [server.checkToken, server.judgeOrAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id, player_id } = req.params as {
				tournament_id: number;
				player_id: number;
			};

			const player = await server.db.player.findOne({
				where: {
					id: player_id,
					tournament_id,
				},
			});

			if (!player) {
				return res.status(404).send({ msg: "Player not found" });
			}

			await server.db.player.delete({
				id: player_id,
				tournament_id,
			});

			await server.socket.emit(SOCKET_EVENTS.PLAYER_DELETED, player);
			return res.send(player);
		}
	);

	done();
};

export default playerHandler;
