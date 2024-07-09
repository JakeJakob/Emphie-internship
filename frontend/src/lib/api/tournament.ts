import { apiHeaders, handleError, handleResponse } from ".";
import { ChessTournament } from "../types";

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

		await storeEndTournament();
		await storeRemoveAuthorization();

		return new_tournament;
	} catch (error) {
		handleError(error);
	}
};
