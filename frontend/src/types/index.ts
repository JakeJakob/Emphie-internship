export enum TokenType {
	Unauthorized = "unauthorized",
	Guest = "guest",
	Judge = "judge",
	Admin = "admin",
}

export enum ChessTitle {
	NONE = "None",
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
	code?: string;

	constructor(code: string) {
		this.code = code;
	}
}

export class ChessPlayer extends StoreUID {
	name: string;
	last_name: string;
	rank: number;
	title?: ChessTitle;

	constructor(
		code: string,
		name: string,
		last_name: string,
		rank: number,
		title: ChessTitle | undefined = undefined
	) {
		super(code);
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
	winner_code?: string;

	constructor(
		code: string,
		white_code: string,
		black_code: string,
		round: number,
		winner_code: string | undefined = undefined
	) {
		super(code);
		this.white_code = white_code;
		this.black_code = black_code;
		this.round = round;
		this.winner_code = winner_code;
	}
}

export class ChessJudge extends StoreUID {
	name: string;

	constructor(code: string, name: string) {
		super(code);
		this.name = name;
	}
}

// This is needed for certain express endpoints
export class ChessTournament extends StoreUID {
	name: string;
	players: Map<string, ChessPlayer> = new Map();
	judges: Map<string, ChessJudge> = new Map();
	games: Map<string, ChessGame> = new Map();

	constructor(code: string, name: string) {
		super(code);
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
