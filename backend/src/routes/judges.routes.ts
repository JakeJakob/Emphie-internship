import { Router, Request, Response, NextFunction } from "express";
import { get_tournament } from "./tournaments.routes";
import { ChessJudge, EVENTS } from "types";
import { io } from "main";

const JudgeRouter = Router();

JudgeRouter.use(get_tournament);

export function get_judge(req: Request, res: Response, next: NextFunction) {
	const tournament = res.locals.tournament;
	const judge = tournament.judges.get(req.params.judge_code);

	if (!judge) {
		return res.status(404).json({ msg: "Judge does not exist" });
	}

	res.locals.judge = judge;
	next();
}

JudgeRouter.route("/tournaments/:tournament_code/judges")
	.get((req: Request, res: Response) => {
		const tournament = res.locals.tournament;

		return res.json([...tournament.judges.values()]);
	})
	.post((req: Request, res: Response) => {
		const tournament = res.locals.tournament;
		const new_judge = new ChessJudge(req.body.name);

		tournament.judges.set(new_judge.code, new_judge);
		io.emit(EVENTS.JUDGE_CREATED, JSON.stringify(new_judge));

		return res.json(new_judge);
	});

JudgeRouter.route("/tournaments/:tournament_code/judges/:judge_code")
	.get(get_judge, (req: Request, res: Response) => {
		const judge = res.locals.judge;

		return res.json(judge);
	})
	.put(get_judge, (req: Request, res: Response) => {
		const tournament = res.locals.tournament;
		const judge = res.locals.judge;

		const new_judge = new ChessJudge(req.body.name);
		new_judge.code = judge.code;

		tournament.judges.set(new_judge.code, new_judge);
		io.emit(EVENTS.JUDGE_UPDATED, JSON.stringify(new_judge));

		return res.json(new_judge);
	})
	.delete(get_judge, (req: Request, res: Response) => {
		const tournament = res.locals.tournament;
		const judge = res.locals.judge;

		tournament.judges.delete(judge.code);
		io.emit(EVENTS.JUDGE_DELETED, JSON.stringify(judge));

		return res.json(judge);
	});

export { JudgeRouter };
