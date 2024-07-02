import { Router, Request, Response } from "express";

const PlayerRouter = Router();

PlayerRouter.route("/tournaments/:tournament_code/players")
	.get((req: Request, res: Response) => {
		res.json({});
	})
	.post((req: Request, res: Response) => {
		res.json({});
	});

PlayerRouter.route("/tournaments/:tournament_code/players/:player_code")
	.get((req: Request, res: Response) => {
		res.json({});
	})
	.put((req: Request, res: Response) => {
		res.json({});
	})
	.delete((req: Request, res: Response) => {
		res.json({});
	});

export { PlayerRouter };
