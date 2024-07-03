import { Router, Request, NextFunction } from "express";
import { io } from "main";
import { tournament_middleware } from "./tournaments.routes";
import { ChessGame, EVENTS, ScoreboardResponse } from "types";

const GameRouter = Router();

GameRouter.param("tournament_code", (req, res, next, tournament_code) => {
	tournament_middleware(req, res, next, tournament_code);
});

export function game_middleware(
	req: Request,
	res: ScoreboardResponse,
	next: NextFunction,
	game_code: string
) {
	const tournament = res.locals.tournament;
	const game = tournament?.games.get(game_code);

	if (!game) {
		return res.status(404).json({ msg: "Game does not exist" });
	}

	res.locals.game = game;
	next();
}

GameRouter.param("game_code", (req, res, next, game_code) => {
	game_middleware(req, res, next, game_code);
});

GameRouter.route("/tournaments/:tournament_code/games")
	.get((req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		return res.json([...tournament.games.values()]);
	})
	.post((req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		const new_game = new ChessGame(
			req.body.white_code,
			req.body.black_code,
			req.body.round,
			req.body.winner_code
		);

		tournament?.games.set(new_game.code, new_game);
		io.emit(EVENTS.GAME_CREATED, JSON.stringify(new_game));

		return res.json(new_game);
	});

GameRouter.route("/tournaments/:tournament_code/games/:game_code")
	.get((req: Request, res: ScoreboardResponse) => {
		const game = res.locals.game;

		return res.json(game);
	})
	.put((req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		const game = res.locals.game;

		const new_game = new ChessGame(
			req.body.white_code,
			req.body.black_code,
			req.body.round,
			req.body.winner_code
		);
		new_game.code = game?.code || "";

		tournament?.games.set(new_game.code, new_game);
		io.emit(EVENTS.GAME_UPDATED, JSON.stringify(new_game));

		return res.json(new_game);
	})
	.delete((req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		const game = res.locals.game;

		tournament?.games.delete(game?.code || "");
		io.emit(EVENTS.GAME_DELETED, JSON.stringify(game));

		return res.json(game);
	});

export { GameRouter };
