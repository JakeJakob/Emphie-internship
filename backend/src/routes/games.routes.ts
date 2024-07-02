import { Router, Request, Response } from "express";

const GameRouter = Router();

GameRouter.route("/tournaments/:tournament_code/games")
	.get((req: Request, res: Response) => {
		res.json({});
	})
	.post((req: Request, res: Response) => {
		res.json({});
	});

GameRouter.route("/tournaments/:tournament_code/games/:game_code")
	.get((req: Request, res: Response) => {
		res.json({});
	})
	.put((req: Request, res: Response) => {
		res.json({});
	})
	.delete((req: Request, res: Response) => {
		res.json({});
	});

export { GameRouter };
