import {
  apiFetch,
  BASE_URL,
  handleError,
  handleResponse,
  handleResponseWithoutAlert,
} from ".";
import { ChessTournament } from "@types";
import { useAuthStore } from "@stores/auth.store";
import { useTournamentStore } from "@/stores/tournament.store";
import { toast } from "react-toastify";

const getTournament = async (
  code: string,
  shouldAlert: boolean = true,
): Promise<ChessTournament | undefined> => {
  try {
    const { addTournament } = useTournamentStore.getState();

    const response = await apiFetch(`${BASE_URL}/tournaments/${code}`, "GET");
    const tournament: ChessTournament = shouldAlert
      ? await handleResponse(response)
      : await handleResponseWithoutAlert(response);
    addTournament(tournament);
    return tournament;
  } catch (error) {
    if (shouldAlert) handleError(error);
  }
};

const createTournament = async (
  name: string,
  shouldAlert: boolean = true,
): Promise<ChessTournament | undefined> => {
  try {
    const { addTournament } = useTournamentStore.getState();

    const response = await apiFetch(`${BASE_URL}/tournaments`, "POST", {
      name,
    });
    const newTournament: ChessTournament = shouldAlert
      ? await handleResponse(response)
      : await handleResponseWithoutAlert(response);
    addTournament(newTournament);
    toast.success("Utworzono turniej " + name);
    return newTournament;
  } catch (error) {
    handleError(error);
  }
};

const endTournament = async (): Promise<ChessTournament | undefined> => {
  try {
    const { endTournament, code } = useTournamentStore.getState();
    const { removeAuthorization } = useAuthStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${code}`,
      "DELETE",
    );
    const endedTournament: ChessTournament = await handleResponse(response);

    endTournament();
    removeAuthorization();

    toast.success("Zakończono turniej " + endedTournament.name);
    return endedTournament;
  } catch (error) {
    handleError(error);
  }
};

export { getTournament, createTournament, endTournament };
