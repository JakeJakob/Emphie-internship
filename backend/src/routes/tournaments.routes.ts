import { Router, Request, Response, NextFunction } from "express";
import { io } from "main";
import { chess_tournament_store } from "store";
import { ChessTournament, EVENTS } from "types";

const TournamentRouter = Router();

export function get_tournament(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const tournament = chess_tournament_store.get(req.params.tournament_code);

	if (!tournament) {
		return res.status(404).json({ msg: "Tournament does not exist" });
	}

	res.locals.tournament = tournament;
	next();
}

TournamentRouter.route("/tournaments")
	.get((req: Request, res: Response) => {
		return res.json([...chess_tournament_store.values()]);
	})
	.post((req: Request, res: Response) => {
		const new_tournament = new ChessTournament(req.body.name);

		chess_tournament_store.set(new_tournament.code, new_tournament);
		io.emit(EVENTS.TOURNAMENT_CREATED, JSON.stringify(new_tournament));

		return res.json(new_tournament);
	});

TournamentRouter.route("/tournaments/:tournament_code")
	.get(get_tournament, (req: Request, res: Response) => {
		return res.json(res.locals.tournament);
	})
	.delete(get_tournament, (req: Request, res: Response) => {
		const tournament = res.locals.tournament;

		chess_tournament_store.delete(tournament.code);
		io.emit(EVENTS.TOURNAMENT_DELETED, JSON.stringify(tournament));

		return res.json(tournament);
	});

export { TournamentRouter };
