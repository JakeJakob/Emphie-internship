import { Request, Response, NextFunction } from "express";
import { Socket } from "socket.io";
import { chess_tournament_store } from "store";

export enum TokenType {
	Unauthorized,
	Guest,
	Judge,
	Admin,
}

function match_token(token: string): TokenType {
	if (!token) {
		return TokenType.Unauthorized;
	}

	if (token === process.env.ACCESS_KEY) {
		return TokenType.Admin;
	}

	const [tournament_code, judge_code] = token.split("+");
	const tournament = chess_tournament_store.get(tournament_code);

	if (!tournament) {
		return TokenType.Unauthorized;
	}

	const judge = tournament.judges.get(judge_code);

	if (!judge) {
		return TokenType.Guest;
	}

	return TokenType.Judge;
}

export const onlyAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (res.locals.token_type != TokenType.Admin) {
		return res
			.status(401)
			.json({
				message: "You need to be an admin to perform this operation",
			});
	}

	next();
};

export const judgeOrAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (
		res.locals.token_type != TokenType.Admin &&
		res.locals.token_type != TokenType.Judge
	) {
		return res
			.status(401)
			.json({
				message:
					"You need to be a judge or an admin to perform this operation",
			});
	}

	next();
};

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "No authorization header" });
	}
	//the header looks like this "Authentication: Bearer <token>"
	const token = authHeader.split(" ")[1];
	res.locals.token_type = match_token(token);

	if (res.locals.token_type == TokenType.Unauthorized) {
		return res.status(403).json({ message: "Wrong ACCESS_KEY" });
	}

	next();
};

export const socketAuthMiddleware = (
	socket: Socket,
	next: (err?: Error) => void
) => {
	const token = socket.handshake.auth.token;

	if (match_token(token) == TokenType.Unauthorized) {
		const err = new Error("Authentication error");
		return next(err);
	}

	next();
};
