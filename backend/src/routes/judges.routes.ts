import { Router, Request, Response } from "express";

const JudgeRouter = Router();

JudgeRouter.route("/tournaments/:tournament_code/judges")
	.get((req: Request, res: Response) => {
		res.json({});
	})
	.post((req: Request, res: Response) => {
		res.json({});
	});

JudgeRouter.route("/tournaments/:tournament_code/judges/:judge_code")
	.get((req: Request, res: Response) => {
		res.json({});
	})
	.put((req: Request, res: Response) => {
		res.json({});
	})
	.delete((req: Request, res: Response) => {
		res.json({});
	});

export { JudgeRouter };
