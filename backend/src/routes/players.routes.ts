import { Router, Request, Response, NextFunction } from "express";
import { get_tournament } from "./tournaments.routes";
import { io } from "main";
import { ChessPlayer, EVENTS } from "types";

const PlayerRouter = Router();

PlayerRouter.use(get_tournament);

export function get_player(req: Request, res: Response, next: NextFunction) {
	const tournament = res.locals.tournament;
	const player = tournament.players.get(req.params.player_code);

	if (!player) {
		return res.status(404).json({ msg: "Player does not exist" });
	}

	res.locals.player = player;
	next();
}

PlayerRouter.route("/tournaments/:tournament_code/players")
	.get((req: Request, res: Response) => {
		const tournament = res.locals.tournament;

		return res.json([...tournament.players.values()]);
	})
	.post((req: Request, res: Response) => {
		const tournament = res.locals.tournament;
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
	.get(get_player, (req: Request, res: Response) => {
		const player = res.locals.player;

		return res.json(player);
	})
	.put(get_player, (req: Request, res: Response) => {
		const tournament = res.locals.tournament;
		const player = res.locals.player;

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
	.delete(get_player, (req: Request, res: Response) => {
		const tournament = res.locals.tournament;
		const player = res.locals.player;

		tournament.players.delete(player.code);
		io.emit(EVENTS.PLAYER_DELETED, JSON.stringify(player));

		return res.json(player);
	});

export { PlayerRouter };
