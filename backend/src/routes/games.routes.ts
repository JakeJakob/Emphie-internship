import { Router, Request, NextFunction } from "express";
import { io } from "main";
import { tournament_middleware } from "./tournaments.routes";
import { ChessGame, ChessTournament, EVENTS, TypedRequest, TypedResponse } from "types";

const GameRouter = Router();

GameRouter.param("tournament_code", (req, res, next, tournament_code) => {
	tournament_middleware(req, res, next, tournament_code);
});

export function game_middleware(_req: Request, res: TypedResponse<unknown, { tournament?: ChessTournament; game?: ChessGame }>, next: NextFunction, game_code: string) {
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
	.get((_req: Request, res: TypedResponse<ChessGame[], { tournament?: ChessTournament }>) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		return res.json([...tournament.games.values()]);
	})
	.post(
		(
			req: TypedRequest<{
				white_code: string;
				black_code: string;
				round: number;
				winner_code: string | undefined;
			}>,
			res: TypedResponse<ChessGame, { tournament?: ChessTournament }>
		) => {
			const tournament = res.locals.tournament;
			const new_game = new ChessGame(req.body.white_code, req.body.black_code, req.body.round, req.body.winner_code);

			tournament?.games.set(new_game.code, new_game);
			io.emit(EVENTS.GAME_CREATED, JSON.stringify(new_game));

			return res.json(new_game);
		}
	);

GameRouter.route("/tournaments/:tournament_code/games/:game_code")
	.get((_req: Request, res: TypedResponse<ChessGame, { game?: ChessGame }>) => {
		const game = res.locals.game;

		return res.json(game);
	})
	.put(
		(
			req: TypedRequest<{
				white_code: string;
				black_code: string;
				round: number;
				winner_code: string | undefined;
			}>,
			res: TypedResponse<ChessGame, { tournament?: ChessTournament; game?: ChessGame }>
		) => {
			const tournament = res.locals.tournament;
			const game = res.locals.game;

			const new_game = new ChessGame(req.body.white_code, req.body.black_code, req.body.round, req.body.winner_code);
			new_game.code = game?.code || "";

			tournament?.games.set(new_game.code, new_game);
			io.emit(EVENTS.GAME_UPDATED, JSON.stringify(new_game));

			return res.json(new_game);
		}
	)
	.delete((_req: Request, res: TypedResponse<ChessGame, { tournament?: ChessTournament; game?: ChessGame }>) => {
		const tournament = res.locals.tournament;
		const game = res.locals.game;

		tournament?.games.delete(game?.code || "");
		io.emit(EVENTS.GAME_DELETED, JSON.stringify(game));

		return res.json(game);
	});

export { GameRouter };
