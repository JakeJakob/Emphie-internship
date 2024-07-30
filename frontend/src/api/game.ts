import { apiFetch, BASE_URL, handleError, handleResponse } from ".";
import { ChessGame } from "@types";
import { useTournamentStore } from "@/stores/tournament.store";
import { toast } from "react-toastify";

const getGames = async (): Promise<ChessGame[] | undefined> => {
	try {
		const { addGame } = useTournamentStore.getState();
		const { code: tournament_code } = useTournamentStore.getState();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/games`,
			"GET"
		);

		const games: ChessGame[] = await handleResponse(response);
		games.forEach((game) => {
			addGame(game);
		});
		return games;
	} catch (error) {
		handleError(error);
	}
};

const addGame = async (game: ChessGame): Promise<ChessGame | undefined> => {
	try {
		const { addGame } = useTournamentStore.getState();
		const { code: tournament_code } = useTournamentStore.getState();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/games`,
			"POST",
			{
				white_code: game.white_code,
				black_code: game.black_code,
				round: game.round,
				winner_code: game.winner_code,
			}
		);

		const new_game: ChessGame = await handleResponse(response);
		addGame(new_game);
		toast.success("Utworzono grę");
		return new_game;
	} catch (error) {
		handleError(error);
	}
};

const editGame = async (
	game_code: string,
	game: ChessGame
): Promise<ChessGame | undefined> => {
	try {
		const { addGame } = useTournamentStore.getState();
		const { code: tournament_code } = useTournamentStore.getState();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/games/${game_code}`,
			"PUT",
			{
				white_code: game.white_code,
				black_code: game.black_code,
				round: game.round,
				winner_code: game.winner_code,
			}
		);

		const new_game: ChessGame = await handleResponse(response);
		addGame(new_game);
		toast.success("Zmodyfikowano grę");
		return new_game;
	} catch (error) {
		handleError(error);
	}
};

const deleteGame = async (
	game_code: string
): Promise<ChessGame | undefined> => {
	try {
		const { removeGame } = useTournamentStore.getState();
		const { code: tournament_code } = useTournamentStore.getState();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/games/${game_code}`,
			"DELETE"
		);

		const deleted_game: ChessGame = await handleResponse(response);
		removeGame(deleted_game.code || "");
		toast.success("Usunięto grę");
		return deleted_game;
	} catch (error) {
		handleError(error);
	}
};

export { getGames, addGame, editGame, deleteGame };
