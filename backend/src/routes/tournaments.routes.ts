import { Router, Request, NextFunction } from "express";
import { io } from "main";
import { chess_tournament_store } from "store";
import { ChessTournament, EVENTS, FlattenChessTournament, TypedRequest, TypedResponse } from "types";

const TournamentRouter = Router();

export function tournament_middleware(_req: Request, res: TypedResponse<unknown, { tournament?: ChessTournament }>, next: NextFunction, tournament_code: string) {
	const tournament = chess_tournament_store.get(tournament_code);

	if (!tournament) {
		return res.status(404).json({ msg: "Tournament does not exist" });
	}

	res.locals.tournament = tournament;
	next();
}

TournamentRouter.param("tournament_code", (req, res, next, tournament_code) => {
	tournament_middleware(req, res, next, tournament_code);
});

TournamentRouter.route("/tournaments")
	.get((_req: Request, res: TypedResponse<FlattenChessTournament[]>) => {
		return res.json([...chess_tournament_store.values()].map((e) => e.flatten()));
	})
	.post((req: TypedRequest<{ name: string }>, res: TypedResponse<FlattenChessTournament>) => {
		const new_tournament = new ChessTournament(req.body.name);

		chess_tournament_store.set(new_tournament.code, new_tournament);
		io.emit(EVENTS.TOURNAMENT_CREATED, JSON.stringify(new_tournament));

		return res.json(new_tournament.flatten());
	});

TournamentRouter.route("/tournaments/:tournament_code")
	.get((_req: Request, res: TypedResponse<FlattenChessTournament, { tournament?: ChessTournament }>) => {
		return res.json(res.locals.tournament?.flatten());
	})
	.delete((_req: Request, res: TypedResponse<FlattenChessTournament, { tournament?: ChessTournament }>) => {
		const tournament = res.locals.tournament;

		chess_tournament_store.delete(tournament?.code || "");
		io.emit(EVENTS.TOURNAMENT_DELETED, JSON.stringify(tournament));

		return res.json(tournament?.flatten());
	});

export { TournamentRouter };
