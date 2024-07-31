import fastify, { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import cors from "@fastify/cors";
import swagger_ui from "@fastify/swagger-ui";

import { dbPlugin, envPlugin, swaggerPlugin } from "./plugins";
import tournamentHandler from "./modules/tournament/routes";
import playerHandler from "./modules/player/routes";
import gameHandler from "./modules/game/routes";
import { socketIoPlugin } from "./plugins/socket";
import judgeHandler from "./modules/judge/routes";
import { authPlugin } from "./plugins/auth";
import dotenv from "dotenv";
import adminHandler from "./modules/admin/routes";
dotenv.config();

const createServer = async (): Promise<FastifyInstance> => {
	const server: FastifyInstance = fastify({
		logger: {
			level: process.env.LOG_LEVEL || "info",
			enabled: process.env.NODE_ENV != "test",
			transport: {
				target: "pino-pretty",
				options: {
					ignore: "pid,hostname",
				},
			},
		},
	}).withTypeProvider<TypeBoxTypeProvider>();

	// Register Plugins
	server.register(cors, {
		origin: [
			"http://127.0.0.1:3000",
			"http://localhost:3000",
			"http://localhost:5173",
		],
		methods: "*",
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	});
	await server.register(envPlugin);
	await server.register(swaggerPlugin);
	server.register(swagger_ui, {
		routePrefix: "/docs",
	});

	await server.register(dbPlugin);
	await server.register(socketIoPlugin);
	await server.register(authPlugin);

	// Register Routes
	server.register(tournamentHandler);
	server.register(playerHandler);
	server.register(gameHandler);
	server.register(judgeHandler);
	server.register(adminHandler);

	if (server.config.DEFAULT_ADMIN) {
		await server.db.admin.upsert(
			{
				id: 0,
				api_key: server.config.DEFAULT_ADMIN_KEY,
			},
			["id"]
		);
	}

	return server;
};

export default createServer;
