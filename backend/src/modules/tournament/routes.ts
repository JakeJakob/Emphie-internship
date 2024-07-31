import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
	CreateTournament,
	CreateTournamentSchema,
	DeleteTournamentSchema,
	GetOneTournamentByCodeSchema,
	GetOneTournamentSchema,
	UpdateTournamentSchema,
} from "./schema";
import * as crypto from "crypto";
import { SOCKET_EVENTS } from "../../plugins/socket";

const tournamentHandler = (
	server: FastifyInstance,
	_opts: unknown,
	done: () => void
) => {
	server.get(
		"/tournaments/:tournament_id",
		{
			schema: GetOneTournamentSchema,
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id } = req.params as { tournament_id: number };

			const tournament = await server.db.tournament.findOne({
				where: { id: tournament_id },
			});

			if (!tournament) {
				return res.status(404).send({ msg: "Tournament not found" });
			}

			return res.send(tournament);
		}
	);
	server.get(
		"/tournaments/with_code/:tournament_code",
		{
			schema: GetOneTournamentByCodeSchema,
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_code } = req.params as {
				tournament_code: string;
			};

			const tournament = await server.db.tournament.findOne({
				where: { code: tournament_code },
			});

			if (!tournament) {
				return res.status(404).send({ msg: "Tournament not found" });
			}

			return res.send(tournament);
		}
	);
	server.post(
		"/tournaments",
		{
			schema: CreateTournamentSchema,
			preHandler: [server.checkToken, server.onlyAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const createTournamentBody = req.body as CreateTournament;

			const code = crypto.randomBytes(5).toString("hex");
			const newTournament = await server.db.tournament.save({
				code,
				...createTournamentBody,
			});

			await server.socket.emit(
				SOCKET_EVENTS.TOURNAMENT_CREATED,
				newTournament
			);
			return res.status(201).send(newTournament);
		}
	);
	server.put(
		"/tournaments/:tournament_id",
		{
			schema: UpdateTournamentSchema,
			preHandler: [server.checkToken, server.onlyAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id } = req.params as { tournament_id: number };
			const createTournamentBody = req.body as CreateTournament;

			const tournament = await server.db.tournament.findOne({
				where: { id: tournament_id },
			});

			if (!tournament) {
				return res.status(404).send({ msg: "Tournament not found" });
			}

			const updatedTournament = await server.db.tournament.save({
				...tournament,
				...createTournamentBody,
			});

			await server.socket.emit(
				SOCKET_EVENTS.TOURNAMENT_UPDATED,
				updatedTournament
			);
			return res.send(updatedTournament);
		}
	);
	server.delete(
		"/tournaments/:tournament_id",
		{
			schema: DeleteTournamentSchema,
			preHandler: [server.checkToken, server.onlyAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id } = req.params as { tournament_id: number };

			const tournament = await server.db.tournament.findOne({
				where: { id: tournament_id },
			});

			if (!tournament) {
				return res.status(404).send({ msg: "Tournament not found" });
			}

			await server.db.tournament.delete({
				id: tournament_id,
			});

			await server.socket.emit(
				SOCKET_EVENTS.TOURNAMENT_DELETED,
				tournament
			);
			return res.send(tournament);
		}
	);

	done();
};

export default tournamentHandler;
