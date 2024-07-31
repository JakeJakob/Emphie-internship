import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GetTokenTypeSchema } from "./schema";

const adminHandler = (
	server: FastifyInstance,
	_opts: unknown,
	done: () => void
) => {
	server.get(
		"/misc/token_type",
		{
			schema: GetTokenTypeSchema,
			preHandler: [server.checkToken],
		},
		async (req: FastifyRequest, res: FastifyReply) => {
			return res.status(200).send(req.token_type);
		}
	);

	done();
};

export default adminHandler;
