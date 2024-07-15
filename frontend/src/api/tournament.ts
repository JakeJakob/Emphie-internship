import { apiFetch, BASE_URL, handleError, handleResponse } from ".";
import { ChessTournament } from "@types";
import { useAuthStore } from "@stores/auth.store";
import { useTournamentStore } from "@/stores/tournament.store";

const getTournament = async (
	code: string
): Promise<ChessTournament | undefined> => {
	try {
		const { addTournament } = useTournamentStore.getState();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${code}`,
			"GET"
		);
		const tournament: ChessTournament = await handleResponse(response);
		addTournament(tournament);
		return tournament;
	} catch (error) {
		handleError(error);
	}
};

const createTournament = async (
	name: string
): Promise<ChessTournament | undefined> => {
	try {
		const { addTournament } = useTournamentStore.getState();

		const response = await apiFetch(`${BASE_URL}/tournaments/`, "POST", {
			name,
		});
		const newTournament: ChessTournament = await handleResponse(response);
		addTournament(newTournament);
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
			"DELETE"
		);
		const endedTournament: ChessTournament = await handleResponse(response);

		endTournament();
		removeAuthorization();

		return endedTournament;
	} catch (error) {
		handleError(error);
	}
};

export { getTournament, createTournament, endTournament };
