import { Router, Request, Response } from "express";
import { io } from "main";
import { chess_tournament_store } from "store";
import { ChessTournament, EVENTS } from "types";

const TournamentRouter = Router();

TournamentRouter.route("/tournaments").get((req: Request, res: Response) => {
	return res.json([...chess_tournament_store.values()]);
});

TournamentRouter.route("/tournaments/:tournament_name")
	.get((req: Request, res: Response) => {
		let tournament_name = req.params.tournament_name;
		let tournament = chess_tournament_store.get(tournament_name);

		if (!tournament) {
			return res.status(404).json({ msg: "Tournament does not exist" });
		}

		return res.json(tournament);
	})
	.post((req: Request, res: Response) => {
		let tournament_name = req.params.tournament_name;
		let tournament = chess_tournament_store.get(tournament_name);

		if (tournament) {
			return res.status(409).json({ msg: "Tournament already exists" });
		}

		let new_tournament = new ChessTournament(tournament_name);
		chess_tournament_store.set(tournament_name, new_tournament);
		io.emit(EVENTS.TOURNAMENT_CREATE, JSON.stringify(new_tournament));

		return res.json(new_tournament);
	})
	.delete((req: Request, res: Response) => {
		let tournament_name = req.params.tournament_name;
		let tournament = chess_tournament_store.get(tournament_name);

		if (!tournament) {
			return res.status(404).json({ msg: "Tournament does not exist" });
		}

		chess_tournament_store.delete(tournament_name);
		io.emit(EVENTS.TOURNAMENT_DELETED, JSON.stringify(tournament));

		return res.json(tournament);
	});

export { TournamentRouter };
