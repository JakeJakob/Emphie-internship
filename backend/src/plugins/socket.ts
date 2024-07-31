import "reflect-metadata";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { Server } from "socket.io";

export enum SOCKET_EVENTS {
	TOURNAMENT_CREATED = "tournament_created",
	TOURNAMENT_UPDATED = "tournament_updated",
	TOURNAMENT_DELETED = "tournament_deleted",
	PLAYER_CREATED = "player_created",
	PLAYER_UPDATED = "player_updated",
	PLAYER_DELETED = "player_deleted",
	JUDGE_CREATED = "judge_created",
	JUDGE_UPDATED = "judge_updated",
	JUDGE_DELETED = "judge_deleted",
	GAME_CREATED = "game_created",
	GAME_UPDATED = "game_updated",
	GAME_DELETED = "game_deleted",
}

export const socketIoPlugin = fp(async (server: FastifyInstance) => {
	const io = new Server(server.server, {
		cors: { origin: "*" },
	});

	await server.decorate("socket", io);

	server.ready((err) => {
		server.socket.on("connection", async (socket) => {
			server.log.info(`SOCKET: User connected`);
		});
	});
});
