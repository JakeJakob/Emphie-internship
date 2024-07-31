export enum TokenType {
  Admin = "admin",
  Judge = "judge",
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

export class ChessPlayer {
  id?: number;
  tournament_id?: number;
  first_name!: string;
  last_name!: string;
  rank!: number;
  title?: ChessTitle;
}

export class ChessGame {
  id?: number;
  tournament_id?: number;
  white_id!: number;
  black_id!: number;
  round!: number;
  winner_id?: number;
}

export class ChessJudge {
  id?: number;
  tournament_id?: number;
  code?: string;
  name!: string;
}

// This is needed for certain express endpoints
export class ChessTournament {
  id?: number;
  name!: string;
  code?: string;
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
