import { Router, Request, Response, NextFunction } from "express";
import { chess_tournament_store } from "store";
import { get_tournament } from "./tournaments.routes";
import { io } from "main";
import { ChessGame, EVENTS } from "types";

const GameRouter = Router();

GameRouter.use(get_tournament);

export function get_game(req: Request, res: Response, next: NextFunction) {
	const tournament = res.locals.tournament;
	const game = tournament.games.get(req.params.game_code);

	if (!game) {
		return res.status(404).json({ msg: "Game does not exist" });
	}

	res.locals.game = game;
	next();
}

GameRouter.route("/tournaments/:tournament_code/games")
	.get((req: Request, res: Response) => {
		const tournament = res.locals.tournament;

		return res.json([...tournament.games.values()]);
	})
	.post((req: Request, res: Response) => {
		const tournament = res.locals.tournament;
		const new_game = new ChessGame(
			req.body.white,
			req.body.black,
			req.body.round,
			req.body.winner
		);

		tournament.games.set(new_game.code, new_game);
		io.emit(EVENTS.JUDGE_CREATED, JSON.stringify(new_game));

		return res.json(new_game);
	});

GameRouter.route("/tournaments/:tournament_code/games/:game_code")
	.get(get_game, (req: Request, res: Response) => {
		const game = res.locals.game;

		return res.json(game);
	})
	.put(get_game, (req: Request, res: Response) => {
		const tournament = res.locals.tournament;
		const game = res.locals.game;

		// TODO: Should be player code, not whole object
		const new_game = new ChessGame(
			req.body.white,
			req.body.black,
			req.body.round,
			req.body.winner
		);
		new_game.code = game.code;

		tournament.games.set(new_game.code, new_game);
		io.emit(EVENTS.GAME_UPDATED, JSON.stringify(new_game));

		return res.json(new_game);
	})
	.delete(get_game, (req: Request, res: Response) => {
		const tournament = res.locals.tournament;
		const game = res.locals.game;

		tournament.games.delete(game.code);
		io.emit(EVENTS.GAME_DELETED, JSON.stringify(game));

		return res.json(game);
	});

export { GameRouter };
