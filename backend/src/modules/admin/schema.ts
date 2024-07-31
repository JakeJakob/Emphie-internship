import { FastifySchema } from "fastify";
import { Type } from "@sinclair/typebox";

// Security
const BearerSecurity = [
	{
		bearerAuth: [],
	},
];

// Routes
const tags = ["misc"];

export const GetTokenTypeSchema: FastifySchema = {
	tags,
	response: {
		200: Type.Optional(Type.String()),
	},
	security: BearerSecurity,
};
