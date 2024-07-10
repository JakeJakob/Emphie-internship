import { apiHeaders, handleError, handleResponse } from ".";
import { ChessTournament } from "@types";

export const getTournament = async (
	getAuthorization: () => string,
	storeAddTournament: (tournament: ChessTournament) => void,
	tournament_code: string
): Promise<ChessTournament | undefined> => {
	try {
		const response = await fetch(
			"http://localhost:3000/tournaments/" + tournament_code,
			{
				method: "GET",
				headers: apiHeaders(getAuthorization),
			}
		);

		const tournament: ChessTournament = await handleResponse(response);
		storeAddTournament(tournament);
		return tournament;
	} catch (error) {
		handleError(error);
	}
};

export const createTournament = async (
	getAuthorization: () => string,
	storeAddTournament: (tournament: ChessTournament) => void,
	name: string
): Promise<ChessTournament | undefined> => {
	try {
		const response = await fetch("http://localhost:3000/tournaments", {
			method: "POST",
			headers: apiHeaders(getAuthorization),
			body: JSON.stringify({ name }),
		});

		const new_tournament: ChessTournament = await handleResponse(response);
		storeAddTournament(new_tournament);
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
