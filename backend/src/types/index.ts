export enum ChessTitle {
	GM = "GM",
}

export class ChessPlayer {
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
		this.name = name;
		this.last_name = last_name;
		this.rank = rank;
		this.title = title;
	}
}

// TODO: Create folder with types exported for frontend
export class ChessTournament {
	name: string;
	players: ChessPlayer[] = [];

	constructor(name: string) {
		this.name = name;
	}
}

export enum EVENTS {
	TOURNAMENT_CREATE = "tournament_created",
	TOURNAMENT_DELETED = "tournament_deleted",
}
