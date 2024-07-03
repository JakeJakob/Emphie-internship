import { Router, Request } from "express";
import { body } from "express-validator";
import { io } from "main";
import { ChessPlayer, ChessTitle, ChessTournament, EVENTS, TypedRequest, TypedResponse } from "types";
import { player_middleware, tournament_middleware, validation_middleware } from "utils/middlewares";

const PlayerRouter = Router();

PlayerRouter.param("tournament_code", (req, res, next, tournament_code) => {
	tournament_middleware(req, res, next, tournament_code);
});

PlayerRouter.param("player_code", (req, res, next, player_code) => {
	player_middleware(req, res, next, player_code);
});

export const player_create_validator = [body("name").not().isEmpty(), body("last_name").not().isEmpty(), body("rank").isNumeric(), body("title").isIn(Object.values(ChessTitle))];

PlayerRouter.route("/tournaments/:tournament_code/players")
	.get((_req: Request, res: TypedResponse<ChessPlayer[], { tournament?: ChessTournament }>) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		return res.json([...tournament.players.values()]);
	})
	.post(
		player_create_validator,
		validation_middleware,
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
		player_create_validator,
		validation_middleware,
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
