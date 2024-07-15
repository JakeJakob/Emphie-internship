import { apiFetch, BASE_URL, handleError, handleResponse } from ".";
import { ChessPlayer } from "@types";
import { useTournamentStore } from "@/stores/tournament.store";

const getPlayers = async (): Promise<ChessPlayer[] | undefined> => {
	try {
		const { addPlayer } = useTournamentStore();
		const { code: tournament_code } = useTournamentStore();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/players`,
			"GET"
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
	player: ChessPlayer
): Promise<ChessPlayer | undefined> => {
	try {
		const { addPlayer } = useTournamentStore();
		const { code: tournament_code } = useTournamentStore();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/players`,
			"POST",
			{
				name: player.name,
				last_name: player.last_name,
				rank: player.rank,
				title: player.title,
			}
		);

		const new_palyer: ChessPlayer = await handleResponse(response);
		addPlayer(new_palyer);
		return new_palyer;
	} catch (error) {
		handleError(error);
	}
};

export { getPlayers, addPlayer };
