import { apiHeaders, handleError, handleResponse } from ".";
import { ChessPlayer } from "@types";

export const getPlayers = async (
	getAuthorization: () => string,
	storeAddPlayer: (player: ChessPlayer) => void,
	tournament_code: string
): Promise<ChessPlayer[] | undefined> => {
	try {
		const response = await fetch(
			"http://localhost:3000/tournaments/" + tournament_code + "/players",
			{
				method: "GET",
				headers: apiHeaders(getAuthorization),
			}
		);

		const players: ChessPlayer[] = await handleResponse(response);
		players.forEach((player) => {
			storeAddPlayer(player);
		});
		return players;
	} catch (error) {
		handleError(error);
	}
};

export const addPlayer = async (
	getAuthorization: () => string,
	storeAddPlayer: (player: ChessPlayer) => void,
	tournament_code: string,
	player: ChessPlayer
): Promise<ChessPlayer | undefined> => {
	try {
		const response = await fetch(
			"http://localhost:3000/tournaments/" + tournament_code + "/players",
			{
				method: "POST",
				headers: apiHeaders(getAuthorization),
				body: JSON.stringify({
					name: player.name,
					last_name: player.last_name,
					rank: player.rank,
					title: player.title,
				}),
			}
		);

		const new_palyer: ChessPlayer = await handleResponse(response);
		storeAddPlayer(new_palyer);
		return new_palyer;
	} catch (error) {
		handleError(error);
	}
};
