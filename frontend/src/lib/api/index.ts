import { ChessPlayer, ChessTournament } from "../types";

const handleResponse = async (response: Response) => {
	if (!response.ok) {
		alert(response.statusText);
		throw new Error(response.statusText);
	}
	return response.json();
};

const handleError = (error: unknown) => {
	console.error("API Error:", error);
	throw error;
};

export const apiHeaders = (getAuthorization: () => string) => ({
	Accept: "application/json",
	"Content-Type": "application/json",
	Authorization: getAuthorization(),
});

export const createTournament = async (
	getAuthorization: () => string,
	storeCreateTournament: (code: string, name: string) => void,
	name: string
): Promise<ChessTournament | undefined> => {
	try {
		const response = await fetch("http://localhost:3000/tournaments", {
			method: "POST",
			headers: apiHeaders(getAuthorization),
			body: JSON.stringify({ name }),
		});

		const new_tournament: ChessTournament = await handleResponse(response);
		storeCreateTournament(new_tournament.code, new_tournament.name);
		return new_tournament;
	} catch (error) {
		handleError(error);
	}
};

export const endTournament = async (
	getAuthorization: () => string,
	storeEndTournament: () => void,
	storeRemoveAuthorization: () => void,
	tournament_code: string
): Promise<ChessTournament | undefined> => {
	try {
		const response = await fetch(
			"http://localhost:3000/tournaments/" + tournament_code,
			{
				method: "DELETE",
				headers: apiHeaders(getAuthorization),
			}
		);

		const new_tournament: ChessTournament = await handleResponse(response);

		storeEndTournament();
		storeRemoveAuthorization();

		return new_tournament;
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
