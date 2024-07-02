import { Router, Request, NextFunction } from "express";
import { io } from "main";
import { get_tournament } from "./tournaments.routes";
import { ChessPlayer, EVENTS, ScoreboardResponse } from "types";

const PlayerRouter = Router();

PlayerRouter.use(get_tournament);

export function get_player(
	req: Request,
	res: ScoreboardResponse,
	next: NextFunction
) {
	const tournament = res.locals.tournament;
	if (!tournament) return;

	const player = tournament.players.get(req.params.player_code);

	if (!player) {
		return res.status(404).json({ msg: "Player does not exist" });
	}

	res.locals.player = player;
	next();
}

PlayerRouter.route("/tournaments/:tournament_code/players")
	.get((req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		return res.json([...tournament.players.values()]);
	})
	.post((req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		const new_player = new ChessPlayer(
			req.body.name,
			req.body.last_name,
			req.body.rank,
			req.body.title
		);

		tournament.players.set(new_player.code, new_player);
		io.emit(EVENTS.PLAYER_CREATED, JSON.stringify(new_player));

		return res.json(new_player);
	});

PlayerRouter.route("/tournaments/:tournament_code/players/:player_code")
	.get(get_player, (req: Request, res: ScoreboardResponse) => {
		const player = res.locals.player;

		return res.json(player);
	})
	.put(get_player, (req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		const player = res.locals.player;
		if (!player) return;

		const new_player = new ChessPlayer(
			req.body.name,
			req.body.last_name,
			req.body.rank,
			req.body.title
		);
		new_player.code = player.code;

		tournament.players.set(new_player.code, new_player);
		io.emit(EVENTS.PLAYER_UPDATED, JSON.stringify(new_player));

		return res.json(new_player);
	})
	.delete(get_player, (req: Request, res: ScoreboardResponse) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		const player = res.locals.player;
		if (!player) return;

		tournament.players.delete(player.code);
		io.emit(EVENTS.PLAYER_DELETED, JSON.stringify(player));

		return res.json(player);
	});

export { PlayerRouter };
