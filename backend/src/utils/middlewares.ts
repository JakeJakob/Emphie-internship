import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { chess_tournament_store } from "store";
import { ChessGame, ChessJudge, ChessPlayer, ChessTournament, TypedResponse } from "types";

export function tournament_middleware(_req: Request, res: TypedResponse<unknown, { tournament?: ChessTournament }>, next: NextFunction, tournament_code: string) {
	const tournament = chess_tournament_store.get(tournament_code);

	if (!tournament) {
		return res.status(404).json({ msg: "Tournament does not exist" });
	}

	res.locals.tournament = tournament;
	next();
}

export function player_middleware(_req: Request, res: TypedResponse<unknown, { tournament?: ChessTournament; player?: ChessPlayer }>, next: NextFunction, player_code: string) {
	const tournament = res.locals.tournament;
	const player = tournament?.players.get(player_code);

	if (!player) {
		return res.status(404).json({ msg: "Player does not exist" });
	}

	res.locals.player = player;
	next();
}

export function judge_middleware(_req: Request, res: TypedResponse<unknown, { tournament?: ChessTournament; judge?: ChessJudge }>, next: NextFunction, judge_code: string) {
	const tournament = res.locals.tournament;
	const judge = tournament?.judges.get(judge_code);

	if (!judge) {
		return res.status(404).json({ msg: "Judge does not exist" });
	}

	res.locals.judge = judge;
	next();
}

export function game_middleware(_req: Request, res: TypedResponse<unknown, { tournament?: ChessTournament; game?: ChessGame }>, next: NextFunction, game_code: string) {
	const tournament = res.locals.tournament;
	const game = tournament?.games.get(game_code);

	if (!game) {
		return res.status(404).json({ msg: "Game does not exist" });
	}

	res.locals.game = game;
	next();
}

export function validation_middleware(req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	next();
}
