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
	title: ChessTitle;

	constructor(
		name: string,
		last_name: string,
		rank: number,
		title: ChessTitle
	) {
		super();
		this.name = name;
		this.last_name = last_name;
		this.rank = rank;
		this.title = title;
	}
}

export class ChessGame extends StoreUID {
	white: ChessPlayer;
	black: ChessPlayer;
	round: number;
	winner: ChessPlayer | undefined;

	constructor(
		white: ChessPlayer,
		black: ChessPlayer,
		round: number,
		winner: ChessPlayer | undefined = undefined
	) {
		super();
		this.white = white;
		this.black = black;
		this.round = round;
		this.winner = winner;
	}
}

export class ChessJudge extends StoreUID {
	name: string;

	constructor(name: string) {
		super();
		this.name = name;
	}
}

// TODO: Create folder with types exported for frontend
export class ChessTournament extends StoreUID {
	name: string;
	players: Map<string, ChessPlayer> = new Map();
	judges: Map<string, ChessJudge> = new Map();
	games: Map<string, ChessGame> = new Map();

	constructor(name: string) {
		super();
		this.name = name;
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
