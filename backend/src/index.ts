import createServer from "./server";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = process.env.HOST || "127.0.0.1";

const startServer = async () => {
	const server = await createServer();
	await server.listen({ port: server.config.PORT, host: server.config.HOST });
};

startServer();
