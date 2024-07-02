import { Response } from "express";
import { ChessGame, ChessJudge, ChessPlayer, ChessTournament } from "types";

export interface ScoreboardResponse extends Response {
	locals: {
		tournament?: ChessTournament;
		player?: ChessPlayer;
		judge?: ChessJudge;
		game?: ChessGame;
	};
}
