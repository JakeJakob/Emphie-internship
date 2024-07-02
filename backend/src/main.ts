import dotenv from "dotenv";
import express, { Express } from "express";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import { TournamentRouter } from "routes/tournaments.routes";

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

app.use(bodyParser.json());
app.use(TournamentRouter);

server.listen(port, () => {
	console.log(`Express is running at http://localhost:${port}`);
});

export { io };
