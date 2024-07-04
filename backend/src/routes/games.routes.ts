import { Router, Request } from "express";
import { body } from "express-validator";
import { io } from "app";
import { ChessGame, ChessTournament, EVENTS, TypedRequest, TypedResponse } from "types";
import { judgeOrAdmin } from "utils/auth";
import { game_middleware, tournament_middleware, validation_middleware } from "utils/middlewares";

const GameRouter = Router();

GameRouter.param("tournament_code", (req, res, next, tournament_code) => {
	tournament_middleware(req, res, next, tournament_code);
});

GameRouter.param("game_code", (req, res, next, game_code) => {
	game_middleware(req, res, next, game_code);
});

export const game_create_validator = [body("white_code").not().isEmpty(), body("black_code").not().isEmpty(), body("round").isNumeric(), body("winner_code")];

GameRouter.route("/tournaments/:tournament_code/games")
	.get((_req: Request, res: TypedResponse<ChessGame[], { tournament?: ChessTournament }>) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		return res.json([...tournament.games.values()]);
	})
	.post(
		judgeOrAdmin,
		game_create_validator,
		validation_middleware,
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

			return res.status(201).json(new_game);
		}
	);

GameRouter.route("/tournaments/:tournament_code/games/:game_code")
	.get((_req: Request, res: TypedResponse<ChessGame, { game?: ChessGame }>) => {
		const game = res.locals.game;

		return res.json(game);
	})
	.put(
		judgeOrAdmin,
		game_create_validator,
		validation_middleware,
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
	.delete(judgeOrAdmin, (_req: Request, res: TypedResponse<ChessGame, { tournament?: ChessTournament; game?: ChessGame }>) => {
		const tournament = res.locals.tournament;
		const game = res.locals.game;

		tournament?.games.delete(game?.code || "");
		io.emit(EVENTS.GAME_DELETED, JSON.stringify(game));

		return res.json(game);
	});

export { GameRouter };
