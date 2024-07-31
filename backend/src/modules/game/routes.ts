import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
	CreateGameSchema,
	GetOneGameSchema,
	GetManyGameSchema,
	UpdateGameSchema,
	DeleteGameSchema,
	CreateGame,
} from "./schema";
import { SOCKET_EVENTS } from "../../plugins/socket";

const gameHandler = (
	server: FastifyInstance,
	_opts: unknown,
	done: () => void
) => {
	server.get(
		"/tournaments/:tournament_id/games",
		{
			schema: GetManyGameSchema,
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id } = req.params as { tournament_id: number };

			const games = await server.db.game.find({
				where: {
					tournament_id,
				},
			});

			return res.status(200).send(games);
		}
	);

	server.get(
		"/tournaments/:tournament_id/games/:game_id",
		{
			schema: GetOneGameSchema,
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id, game_id } = req.params as {
				tournament_id: number;
				game_id: number;
			};

			const game = await server.db.game.findOne({
				where: {
					id: game_id,
					tournament_id,
				},
			});

			if (!game) {
				return res.status(404).send({ msg: "Game not found" });
			}

			return res.send(game);
		}
	);

	server.post(
		"/tournaments/:tournament_id/games",
		{
			schema: CreateGameSchema,
			preHandler: [server.checkToken, server.judgeOrAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id } = req.params as { tournament_id: number };
			const createGameBody = req.body as CreateGame;

			const newGame = await server.db.game.save({
				tournament_id,
				...createGameBody,
			});

			await server.socket.emit(SOCKET_EVENTS.GAME_CREATED, newGame);
			return res.status(201).send(newGame);
		}
	);

	server.put(
		"/tournaments/:tournament_id/games/:game_id",
		{
			schema: UpdateGameSchema,
			preHandler: [server.checkToken, server.judgeOrAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id, game_id } = req.params as {
				tournament_id: number;
				game_id: number;
			};
			const createGameBody = req.body as CreateGame;

			const game = await server.db.game.findOne({
				where: {
					id: game_id,
					tournament_id,
				},
			});

			if (!game) {
				return res.status(404).send({ msg: "Game not found" });
			}

			const updatedGame = await server.db.game.save({
				...game,
				...createGameBody,
			});

			await server.socket.emit(SOCKET_EVENTS.GAME_UPDATED, updatedGame);
			return res.send(updatedGame);
		}
	);

	server.delete(
		"/tournaments/:tournament_id/games/:game_id",
		{
			schema: DeleteGameSchema,
			preHandler: [server.checkToken, server.judgeOrAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id, game_id } = req.params as {
				tournament_id: number;
				game_id: number;
			};

			const game = await server.db.game.findOne({
				where: {
					id: game_id,
					tournament_id,
				},
			});

			if (!game) {
				return res.status(404).send({ msg: "Game not found" });
			}

			await server.db.game.delete({
				id: game_id,
				tournament_id,
			});

			await server.socket.emit(SOCKET_EVENTS.GAME_DELETED, game);
			return res.send(game);
		}
	);

	done();
};

export default gameHandler;
