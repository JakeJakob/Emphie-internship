import * as crypto from "node:crypto";

export enum ChessTitle {
	GM = "GM",
	IM = "IM",
	FM = "FM",
	CM = "CM",
	WGM = "WGM",
	WIM = "WIM",
	WFM = "WFM",
	WCM = "WCM",
}

export class StoreUID {
	code: string;

	constructor() {
		this.code = crypto.randomBytes(5).toString("hex");
	}
}

export class ChessPlayer extends StoreUID {
	name: string;
	last_name: string;
	rank: number;
	title?: ChessTitle;

	constructor(
		name: string,
		last_name: string,
		rank: number,
		title?: ChessTitle
	) {
		super();
		this.name = name;
		this.last_name = last_name;
		this.rank = rank;
		this.title = title;
	}
}

export class ChessGame extends StoreUID {
	white_code: string;
	black_code: string;
	round: number;
	winner_code: string | undefined;

	constructor(
		white_code: string,
		black_code: string,
		round: number,
		winner_code: string | undefined = undefined
	) {
		super();
		this.white_code = white_code;
		this.black_code = black_code;
		this.round = round;
		this.winner_code = winner_code;
	}
}

export class ChessJudge extends StoreUID {
	name: string;

	constructor(name: string) {
		super();
		this.name = name;
	}
}

// This is needed for certain express endpoints
export class ChessTournament extends StoreUID {
	name: string;
	players: Map<string, ChessPlayer> = new Map();
	judges: Map<string, ChessJudge> = new Map();
	games: Map<string, ChessGame> = new Map();

	flatten() {
		return new FlattenChessTournament(this);
	}

	constructor(name: string) {
		super();
		this.name = name;
	}
}

export class FlattenChessTournament {
	code: string;
	name: string;
	players: ChessPlayer[];
	judges: ChessJudge[];
	games: ChessGame[];

	constructor(chess_tournament: ChessTournament) {
		this.code = chess_tournament.code;
		this.name = chess_tournament.name;
		this.players = [...chess_tournament.players.values()];
		this.judges = [...chess_tournament.judges.values()];
		this.games = [...chess_tournament.games.values()];
	}
}

export enum EVENTS {
	TOURNAMENT_CREATED = "tournament_created",
	TOURNAMENT_DELETED = "tournament_deleted",
	PLAYER_CREATED = "player_created",
	PLAYER_UPDATED = "player_updated",
	PLAYER_DELETED = "player_deleted",
	JUDGE_CREATED = "judge_created",
	JUDGE_UPDATED = "judge_updated",
	JUDGE_DELETED = "judge_deleted",
	GAME_CREATED = "game_created",
	GAME_UPDATED = "game_updated",
	GAME_DELETED = "game_deleted",
}

export * from "./express";
