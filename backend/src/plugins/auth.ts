import "reflect-metadata";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

export enum TokenType {
	Admin = "admin",
	Judge = "judge",
}

const extractToken = (req: any): string | null => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return null;

	const token = authHeader.split(" ")[1];
	return token || null;
};

export const authPlugin = fp(async (server: FastifyInstance) => {
	await server.decorateRequest("token", undefined);
	await server.decorateRequest("token_type", undefined);

	const matchToken = async (
		token: string
	): Promise<TokenType | undefined> => {
		const [accessCode = "", tournamentCode = ""] = token.split("+");

		if (!accessCode) return undefined;

		const adminExists = await server.db.admin.exists({
			where: { api_key: accessCode },
		});

		if (adminExists) return TokenType.Admin;

		const judgeExists = await server.db.judge
			.createQueryBuilder("judge")
			.innerJoin("judge.tournament", "tournament")
			.where("judge.code = :accessCode", { accessCode })
			.andWhere("tournament.code = :tournamentCode", { tournamentCode })
			.getExists();

		if (judgeExists) return TokenType.Judge;

		return undefined;
	};

	await server.decorate(
		"checkToken",
		(req: any, reply: any, done: () => void) => {
			const token = extractToken(req);
			if (!token) return reply.status(401).send();
			req.token = token;

			matchToken(req.token).then((token_type) => {
				if (!token_type) return reply.status(401).send();
				req.token_type = token_type;

				return done();
			});
		}
	);
	await server.decorate(
		"judgeOrAdmin",
		(req: any, reply: any, done: () => void) => {
			if (
				req.token_type == TokenType.Admin ||
				req.token_type == TokenType.Judge
			)
				return done();

			return reply.status(401).send();
		}
	);

	await server.decorate(
		"onlyAdmin",
		(req: any, reply: any, done: () => void) => {
			if (req.token_type == TokenType.Admin) return done();

			return reply.status(401).send();
		}
	);
});
