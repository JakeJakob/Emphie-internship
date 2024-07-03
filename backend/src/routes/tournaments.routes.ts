import { Router, Request } from "express";
import { body } from "express-validator";
import { io } from "main";
import { chess_tournament_store } from "store";
import { ChessTournament, EVENTS, FlattenChessTournament, TypedRequest, TypedResponse } from "types";
import { tournament_middleware, validation_middleware } from "utils/middlewares";

const TournamentRouter = Router();

TournamentRouter.param("tournament_code", (req, res, next, tournament_code) => {
	tournament_middleware(req, res, next, tournament_code);
});

TournamentRouter.route("/tournaments")
	.get((_req: Request, res: TypedResponse<FlattenChessTournament[]>) => {
		return res.json([...chess_tournament_store.values()].map((e) => e.flatten()));
	})
	.post(body("name", "name cannot be empty").not().isEmpty(), validation_middleware, (req: TypedRequest<{ name: string }>, res: TypedResponse<FlattenChessTournament>) => {
		const new_tournament = new ChessTournament(req.body.name);

		chess_tournament_store.set(new_tournament.code, new_tournament);
		io.emit(EVENTS.TOURNAMENT_CREATED, JSON.stringify(new_tournament));

		return res.status(201).json(new_tournament.flatten());
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
