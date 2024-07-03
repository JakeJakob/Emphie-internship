import { Router, Request, NextFunction } from "express";
import { io } from "main";
import { tournament_middleware } from "./tournaments.routes";
import { ChessPlayer, ChessTitle, ChessTournament, EVENTS, TypedRequest, TypedResponse } from "types";

const PlayerRouter = Router();

PlayerRouter.param("tournament_code", (req, res, next, tournament_code) => {
	tournament_middleware(req, res, next, tournament_code);
});

export function player_middleware(_req: Request, res: TypedResponse<unknown, { tournament?: ChessTournament; player?: ChessPlayer }>, next: NextFunction, player_code: string) {
	const tournament = res.locals.tournament;
	const player = tournament?.players.get(player_code);

	if (!player) {
		return res.status(404).json({ msg: "Player does not exist" });
	}

	res.locals.player = player;
	next();
}

PlayerRouter.param("player_code", (req, res, next, player_code) => {
	player_middleware(req, res, next, player_code);
});

PlayerRouter.route("/tournaments/:tournament_code/players")
	.get((_req: Request, res: TypedResponse<ChessPlayer[], { tournament?: ChessTournament }>) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		return res.json([...tournament.players.values()]);
	})
	.post(
		(
			req: TypedRequest<{
				name: string;
				last_name: string;
				rank: number;
				title: ChessTitle;
			}>,
			res: TypedResponse<ChessPlayer, { tournament?: ChessTournament }>
		) => {
			const tournament = res.locals.tournament;
			const new_player = new ChessPlayer(req.body.name, req.body.last_name, req.body.rank, req.body.title);

			tournament?.players.set(new_player.code, new_player);
			io.emit(EVENTS.PLAYER_CREATED, JSON.stringify(new_player));

			return res.json(new_player);
		}
	);

PlayerRouter.route("/tournaments/:tournament_code/players/:player_code")
	.get((_req: Request, res: TypedResponse<ChessPlayer, { player?: ChessPlayer }>) => {
		const player = res.locals.player;

		return res.json(player);
	})
	.put(
		(
			req: TypedRequest<{
				name: string;
				last_name: string;
				rank: number;
				title: ChessTitle;
			}>,
			res: TypedResponse<ChessPlayer, { tournament?: ChessTournament; player?: ChessPlayer }>
		) => {
			const tournament = res.locals.tournament;
			const player = res.locals.player;
			const new_player = new ChessPlayer(req.body.name, req.body.last_name, req.body.rank, req.body.title);
			new_player.code = player?.code || "";

			tournament?.players.set(new_player.code, new_player);
			io.emit(EVENTS.PLAYER_UPDATED, JSON.stringify(new_player));

			return res.json(new_player);
		}
	)
	.delete((_req: Request, res: TypedResponse<ChessPlayer, { tournament?: ChessTournament; player?: ChessPlayer }>) => {
		const tournament = res.locals.tournament;
		const player = res.locals.player;

		tournament?.players.delete(player?.code || "");
		io.emit(EVENTS.PLAYER_DELETED, JSON.stringify(player));

		return res.json(player);
	});

export { PlayerRouter };
