import { apiFetch, BASE_URL, handleError, handleResponse } from ".";
import { ChessGame } from "@types";
import { useTournamentStore } from "@/stores/tournament.store";
import { toast } from "react-toastify";

const getGames = async (): Promise<ChessGame[] | undefined> => {
  try {
    const { addGame } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/games`,
      "GET",
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
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/games`,
      "POST",
      game,
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
  game_id: number,
  game: ChessGame,
): Promise<ChessGame | undefined> => {
  try {
    const { addGame } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/games/${game_id}`,
      "PUT",
      game,
    );

    const new_game: ChessGame = await handleResponse(response);
    addGame(new_game);
    toast.success("Zmodyfikowano grę");
    return new_game;
  } catch (error) {
    handleError(error);
  }
};

const deleteGame = async (game_id: number): Promise<ChessGame | undefined> => {
  try {
    const { removeGame } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/games/${game_id}`,
      "DELETE",
    );

    const deleted_game: ChessGame = await handleResponse(response);
    removeGame(deleted_game.id || 0);
    toast.success("Usunięto grę");
    return deleted_game;
  } catch (error) {
    handleError(error);
  }
};

export { getGames, addGame, editGame, deleteGame };
