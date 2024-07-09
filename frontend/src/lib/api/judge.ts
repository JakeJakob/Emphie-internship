import { apiHeaders, handleError, handleResponse } from ".";
import { ChessJudge } from "../types";

export const getJudges = async (
	getAuthorization: () => string,
	storeAddJudge: (judge: ChessJudge) => void,
	tournament_code: string
): Promise<ChessJudge[] | undefined> => {
	try {
		const response = await fetch(
			"http://localhost:3000/tournaments/" + tournament_code + "/judges",
			{
				method: "GET",
				headers: apiHeaders(getAuthorization),
			}
		);

		const judges: ChessJudge[] = await handleResponse(response);
		judges.forEach((judge) => {
			storeAddJudge(judge);
		});
		return judges;
	} catch (error) {
		handleError(error);
	}
};

export const addJudge = async (
	getAuthorization: () => string,
	storeAddJudge: (judge: ChessJudge) => void,
	tournament_code: string,
	judge: ChessJudge
): Promise<ChessJudge | undefined> => {
	try {
		const response = await fetch(
			"http://localhost:3000/tournaments/" + tournament_code + "/judges",
			{
				method: "POST",
				headers: apiHeaders(getAuthorization),
				body: JSON.stringify({
					name: judge.name,
				}),
			}
		);

		const new_judge: ChessJudge = await handleResponse(response);
		storeAddJudge(new_judge);
		return new_judge;
	} catch (error) {
		handleError(error);
	}
};
