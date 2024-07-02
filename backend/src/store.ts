import {
	ChessGame,
	ChessJudge,
	ChessPlayer,
	ChessTitle,
	ChessTournament,
} from "types";

// tournament_code -> ChessTournament
export const chess_tournament_store: Map<string, ChessTournament> = new Map();

if (process.env.MOCK_DATA == "true") {
	const tourenament = new ChessTournament("Mock tournament");
	const player1 = new ChessPlayer("Name1", "LastName", 2137, ChessTitle.GM);
	const player2 = new ChessPlayer("Name2", "LastName", 2137, ChessTitle.CM);
	const judge = new ChessJudge("Mock judge");
	const game = new ChessGame(player1, player2, 1, player1);

	tourenament.players.set(player1.code, player1);
	tourenament.players.set(player2.code, player2);
	tourenament.judges.set(judge.code, judge);
	tourenament.games.set(game.code, game);

	chess_tournament_store.set(tourenament.code, tourenament);
}
