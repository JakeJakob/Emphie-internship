import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import { TournamentRouter } from "routes/tournaments.routes";
import { PlayerRouter } from "routes/players.routes";
import { JudgeRouter } from "routes/judges.routes";
import { GameRouter } from "routes/games.routes";
import { authMiddleware, socketAuthMiddleware } from "utils/auth";

const app: Express = express();
const server = http.createServer(app);

const corsOptions = {
	origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.use(socketAuthMiddleware);

app.use(authMiddleware);
app.use(bodyParser.json());

app.use(TournamentRouter);
app.use(PlayerRouter);
app.use(JudgeRouter);
app.use(GameRouter);

export { app, io, server };
