import dotenv from "dotenv";
import express, { Express } from "express";
import bodyParser from "body-parser";
import http from "http";
import { authMiddleware, socketAuthMiddleware } from "authentication";
import { Server } from "socket.io";
import { TournamentRouter } from "routes/tournaments.routes";
import { PlayerRouter } from "routes/players.routes";
import { JudgeRouter } from "routes/judges.routes";
import { GameRouter } from "routes/games.routes";

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();
const server = http.createServer(app);

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

server.listen(port, () => {
	console.log(`Express is running at http://localhost:${port}`);
});

export { io };
