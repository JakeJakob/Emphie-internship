export enum TokenType {
	Unauthorized,
	Guest,
	Judge,
	Admin,
}

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
