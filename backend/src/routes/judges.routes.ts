import { Router, Request, NextFunction } from "express";
import { io } from "main";
import { tournament_middleware } from "./tournaments.routes";
import { ChessJudge, ChessTournament, EVENTS, TypedRequest, TypedResponse } from "types";

const JudgeRouter = Router();

JudgeRouter.param("tournament_code", (req, res, next, tournament_code) => {
	tournament_middleware(req, res, next, tournament_code);
});

export function judge_middleware(_req: Request, res: TypedResponse<unknown, { tournament?: ChessTournament; judge?: ChessJudge }>, next: NextFunction, judge_code: string) {
	const tournament = res.locals.tournament;
	const judge = tournament?.judges.get(judge_code);

	if (!judge) {
		return res.status(404).json({ msg: "Judge does not exist" });
	}

	res.locals.judge = judge;
	next();
}

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
