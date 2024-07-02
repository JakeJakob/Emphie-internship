import { Router, Request, NextFunction } from "express";
import { io } from "main";
import { get_tournament } from "./tournaments.routes";
import { ChessGame, EVENTS, ScoreboardResponse } from "types";

const GameRouter = Router();

GameRouter.use(get_tournament);

export function get_game(
	req: Request,
	res: ScoreboardResponse,
	next: NextFunction
) {
	const tournament = res.locals.tournament;
	if (!tournament) return;

	const game = tournament.games.get(req.params.game_code);

	if (!game) {
		return res.status(404).json({ msg: "Game does not exist" });
	}

	res.locals.game = game;
	next();
}

GameRouter.route("/tournaments/:tournament_code/games")
	.get((req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		return res.json([...tournament.games.values()]);
	})
	.post((req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		const new_game = new ChessGame(
			req.body.white,
			req.body.black,
			req.body.round,
			req.body.winner
		);

		tournament.games.set(new_game.code, new_game);
		io.emit(EVENTS.GAME_CREATED, JSON.stringify(new_game));

		return res.json(new_game);
	});

GameRouter.route("/tournaments/:tournament_code/games/:game_code")
	.get(get_game, (req: Request, res: ScoreboardResponse) => {
		const game = res.locals.game;

		return res.json(game);
	})
	.put(get_game, (req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		const game = res.locals.game;
		if (!game) return;

		const new_game = new ChessGame(
			req.body.white_code,
			req.body.black_code,
			req.body.round,
			req.body.winner_code
		);
		new_game.code = game.code;

		tournament.games.set(new_game.code, new_game);
		io.emit(EVENTS.GAME_UPDATED, JSON.stringify(new_game));

		return res.json(new_game);
	})
	.delete(get_game, (req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		const game = res.locals.game;
		if (!game) return;

		tournament.games.delete(game.code);
		io.emit(EVENTS.GAME_DELETED, JSON.stringify(game));

		return res.json(game);
	});

export { GameRouter };
