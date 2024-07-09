import { apiHeaders, handleError, handleResponse } from ".";
import { ChessGame } from "../types";

export const getGames = async (
	getAuthorization: () => string,
	storeAddGame: (game: ChessGame) => void,
	tournament_code: string
): Promise<ChessGame[] | undefined> => {
	try {
		const response = await fetch(
			"http://localhost:3000/tournaments/" + tournament_code + "/games",
			{
				method: "GET",
				headers: apiHeaders(getAuthorization),
			}
		);

		const new_game: ChessGame[] = await handleResponse(response);
		new_game.forEach((player) => {
			storeAddGame(player);
		});
		return new_game;
	} catch (error) {
		handleError(error);
	}
};

export const addGame = async (
	getAuthorization: () => string,
	storeAddGame: (game: ChessGame) => void,
	tournament_code: string,
	game: ChessGame
): Promise<ChessGame | undefined> => {
	try {
		const response = await fetch(
			"http://localhost:3000/tournaments/" + tournament_code + "/games",
			{
				method: "POST",
				headers: apiHeaders(getAuthorization),
				body: JSON.stringify({
					white_code: game.white_code,
					black_code: game.black_code,
					round: game.round,
					winner_code: game.winner_code,
				}),
			}
		);

		const new_game: ChessGame = await handleResponse(response);
		storeAddGame(new_game);
		return new_game;
	} catch (error) {
		handleError(error);
	}
};
