import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import { FastifyInstance } from "fastify";

export const swaggerPlugin = fp(async (server: FastifyInstance) => {
	await server.register(swagger, {
		openapi: {
			openapi: "3.0.0",
			info: {
				title: "Emphie Scoreboard Api",
				description: "docs",
				version: "0.0.1",
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
					},
				},
			},
			servers: [{ url: "http://localhost:3000", description: "dev" }],
		},
	});
});
