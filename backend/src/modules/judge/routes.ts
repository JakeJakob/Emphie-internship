import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
	CreateJudgeSchema,
	GetOneJudgeSchema,
	GetManyJudgeSchema,
	UpdateJudgeSchema,
	DeleteJudgeSchema,
	CreateJudge,
} from "./schema";
import * as crypto from "crypto";
import { SOCKET_EVENTS } from "../../plugins/socket";

const judgeHandler = (
	server: FastifyInstance,
	_opts: unknown,
	done: () => void
) => {
	server.get(
		"/tournaments/:tournament_id/judges",
		{
			schema: GetManyJudgeSchema,
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id } = req.params as { tournament_id: number };

			const judges = await server.db.judge.find({
				where: {
					tournament_id,
				},
			});

			return res.status(200).send(judges);
		}
	);

	server.get(
		"/tournaments/:tournament_id/judges/:judge_id",
		{
			schema: GetOneJudgeSchema,
			preHandler: [server.checkToken, server.judgeOrAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id, judge_id } = req.params as {
				tournament_id: number;
				judge_id: number;
			};

			const judge = await server.db.judge.findOne({
				where: {
					id: judge_id,
					tournament_id,
				},
			});

			if (!judge) {
				return res.status(404).send({ msg: "Judge not found" });
			}

			return res.send(judge);
		}
	);

	server.post(
		"/tournaments/:tournament_id/judges",
		{
			schema: CreateJudgeSchema,
			preHandler: [server.checkToken, server.onlyAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id } = req.params as { tournament_id: number };
			const createJudgeBody = req.body as CreateJudge;

			const code = crypto.randomBytes(5).toString("hex");
			const newJudge = await server.db.judge.save({
				code,
				tournament_id,
				...createJudgeBody,
			});

			await server.socket.emit(SOCKET_EVENTS.JUDGE_CREATED, newJudge);
			return res.status(201).send(newJudge);
		}
	);

	server.put(
		"/tournaments/:tournament_id/judges/:judge_id",
		{
			schema: UpdateJudgeSchema,
			preHandler: [server.checkToken, server.onlyAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id, judge_id } = req.params as {
				tournament_id: number;
				judge_id: number;
			};
			const createJudgeBody = req.body as CreateJudge;

			const judge = await server.db.judge.findOne({
				where: {
					id: judge_id,
					tournament_id,
				},
			});

			if (!judge) {
				return res.status(404).send({ msg: "Judge not found" });
			}

			const updatedJudge = await server.db.judge.save({
				...judge,
				...createJudgeBody,
			});

			await server.socket.emit(SOCKET_EVENTS.JUDGE_UPDATED, updatedJudge);
			return res.send(updatedJudge);
		}
	);

	server.delete(
		"/tournaments/:tournament_id/judges/:judge_id",
		{
			schema: DeleteJudgeSchema,
			preHandler: [server.checkToken, server.onlyAdmin],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			const { tournament_id, judge_id } = req.params as {
				tournament_id: number;
				judge_id: number;
			};

			const judge = await server.db.judge.findOne({
				where: {
					id: judge_id,
					tournament_id,
				},
			});

			if (!judge) {
				return res.status(404).send({ msg: "Judge not found" });
			}

			await server.db.judge.delete({
				id: judge_id,
				tournament_id,
			});

			await server.socket.emit(SOCKET_EVENTS.JUDGE_DELETED, judge);
			return res.send(judge);
		}
	);

	done();
};

export default judgeHandler;
