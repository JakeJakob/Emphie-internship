import { apiFetch, BASE_URL, handleError, handleResponse } from ".";
import { ChessPlayer } from "@types";
import { useTournamentStore } from "@/stores/tournament.store";
import { toast } from "react-toastify";

const getPlayers = async (): Promise<ChessPlayer[] | undefined> => {
  try {
    const { addPlayer } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/players`,
      "GET",
    );
    const players: ChessPlayer[] = await handleResponse(response);

    players.forEach((player) => {
      addPlayer(player);
    });

    return players;
  } catch (error) {
    handleError(error);
  }
};

const addPlayer = async (
  player: ChessPlayer,
): Promise<ChessPlayer | undefined> => {
  try {
    const { addPlayer } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/players`,
      "POST",
      player,
    );

    const new_palyer: ChessPlayer = await handleResponse(response);
    addPlayer(new_palyer);
    toast.success("Gracz został dodany!");
    return new_palyer;
  } catch (error) {
    handleError(error);
  }
};

const editPlayer = async (
  player_id: number,
  player: ChessPlayer,
): Promise<ChessPlayer | undefined> => {
  try {
    const { addPlayer } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/players/${player_id}`,
      "PUT",
      player,
    );

    const new_palyer: ChessPlayer = await handleResponse(response);
    addPlayer(new_palyer);
    toast.success("Gracz został zmodyfikowany!");
    return new_palyer;
  } catch (error) {
    handleError(error);
  }
};

const deletePlayer = async (
  player_id: number,
): Promise<ChessPlayer | undefined> => {
  try {
    const { removePlayer } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/players/${player_id}`,
      "DELETE",
    );

    const deleted_player: ChessPlayer = await handleResponse(response);
    removePlayer(deleted_player.id || 0);
    toast.success("Gracz został usunięty!");
    return deleted_player;
  } catch (error) {
    handleError(error);
  }
};

export { getPlayers, addPlayer, editPlayer, deletePlayer };
