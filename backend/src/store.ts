import {
	ChessGame,
	ChessJudge,
	ChessPlayer,
	ChessTitle,
	ChessTournament,
} from "types";
import dotenv from "dotenv";

dotenv.config();

// code -> ChessTournament
export const chess_tournament_store: Map<string, ChessTournament> = new Map();

if (process.env.ACCESS_KEY == undefined){
	console.warn("no ACCESS_KEY supplied, please add it into .env");
	process.exit(1); // 1 - cause failure
}

if (process.env.MOCK_DATA == "true") {
	const tourenament = new ChessTournament("Mock tournament");
	const player1 = new ChessPlayer("Name1", "LastName", 2137, ChessTitle.GM);
	const player2 = new ChessPlayer("Name2", "LastName", 2137, ChessTitle.CM);
	const judge = new ChessJudge("Mock judge");

	// Set static codes for testing
	tourenament.code = "9999999999";
	player1.code = "9999999998";
	player2.code = "9999999999";
	judge.code = "9999999999";

	const game = new ChessGame(player1.code, player2.code, 1, player1.code);
	game.code = "9999999999";

	tourenament.players.set(player1.code, player1);
	tourenament.players.set(player2.code, player2);
	tourenament.judges.set(judge.code, judge);
	tourenament.games.set(game.code, game);

	chess_tournament_store.set(tourenament.code, tourenament);
}
