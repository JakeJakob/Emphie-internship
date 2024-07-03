import { Router, Request } from "express";
import { body } from "express-validator";
import { io } from "../main";
import { ChessJudge, ChessTournament, EVENTS, TypedRequest, TypedResponse } from "../types";
import { judge_middleware, tournament_middleware, validation_middleware } from "../utils/middlewares";

const JudgeRouter = Router();

JudgeRouter.param("tournament_code", (req, res, next, tournament_code) => {
	tournament_middleware(req, res, next, tournament_code);
});

JudgeRouter.param("judge_code", (req, res, next, judge_code) => {
	judge_middleware(req, res, next, judge_code);
});

JudgeRouter.route("/tournaments/:tournament_code/judges")
	.get((_req: Request, res: TypedResponse<ChessJudge[], { tournament?: ChessTournament }>) => {
		const tournament = res.locals.tournament;
		if (!tournament) return;

		return res.json([...tournament.judges.values()]);
	})
	.post(
		body("name", "name cannot be empty").not().isEmpty(),
		(
			req: TypedRequest<{
				name: string;
			}>,
			res: TypedResponse<ChessJudge, { tournament?: ChessTournament }>
		) => {
			const tournament = res.locals.tournament;
			const new_judge = new ChessJudge(req.body.name);

			tournament?.judges.set(new_judge.code, new_judge);
			io.emit(EVENTS.JUDGE_CREATED, JSON.stringify(new_judge));

			return res.json(new_judge);
		}
	);

JudgeRouter.route("/tournaments/:tournament_code/judges/:judge_code")
	.get((_req: Request, res: TypedResponse<ChessJudge, { judge?: ChessJudge }>) => {
		const judge = res.locals.judge;

		return res.json(judge);
	})
	.put(
		body("name", "name cannot be empty").not().isEmpty(),
		validation_middleware,
		(
			req: TypedRequest<{
				name: string;
			}>,
			res: TypedResponse<ChessJudge, { tournament?: ChessTournament; judge?: ChessJudge }>
		) => {
			const tournament = res.locals.tournament;
			const judge = res.locals.judge;

			const new_judge = new ChessJudge(req.body.name);
			new_judge.code = judge?.code || "";

			tournament?.judges.set(new_judge.code, new_judge);
			io.emit(EVENTS.JUDGE_UPDATED, JSON.stringify(new_judge));

			return res.json(new_judge);
		}
	)
	.delete((_req: Request, res: TypedResponse<ChessJudge, { tournament?: ChessTournament; judge?: ChessJudge }>) => {
		const tournament = res.locals.tournament;
		const judge = res.locals.judge;

		tournament?.judges.delete(judge?.code || "");
		io.emit(EVENTS.JUDGE_DELETED, JSON.stringify(judge));

		return res.json(judge);
	});

export { JudgeRouter };
