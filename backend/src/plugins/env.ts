import fp from "fastify-plugin";
import fenv from "@fastify/env";
import { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";

const envSchema = Type.Object(
	{
		PORT: Type.Number({ default: 3000 }),
		HOST: Type.String({ default: "127.0.0.1" }),
		DB_TYPE: Type.Union(
			[Type.Literal("sqlite"), Type.Literal("postgres")],
			{ default: "sqlite" }
		),
		DB_URL: Type.Optional(Type.String()),
		DB_DATABASE: Type.Optional(Type.String()),
		DB_LOGGING: Type.Boolean({ default: false }),
		DB_SYNCHRONIZE: Type.Boolean({ default: true }),
		NODE_ENV: Type.Union(
			[Type.Literal("prod"), Type.Literal("dev"), Type.Literal("test")],
			{ default: "dev" }
		),
		DEFAULT_ADMIN: Type.Boolean(),
		DEFAULT_ADMIN_KEY: Type.String(),
		LOG_LEVEL: Type.String({ default: "info" }),
	},
	{
		additionalProperties: false,
		required: ["PORT", "HOST", "NODE_ENV", "DEFAULT_ADMIN"],
	}
);

export const envPlugin = fp(async (server: FastifyInstance) => {
	await server.register(fenv, {
		schema: envSchema,
		dotenv: true,
	});
});
