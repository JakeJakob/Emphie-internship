import { apiFetch, BASE_URL, handleError, handleResponse } from ".";
import { ChessJudge } from "@types";
import { useTournamentStore } from "@/stores/tournament.store";

const getJudges = async (): Promise<ChessJudge[] | undefined> => {
	try {
		const { addJudge } = useTournamentStore();
		const { code: tournament_code } = useTournamentStore();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/judges`,
			"GET"
		);

		const judges: ChessJudge[] = await handleResponse(response);
		judges.forEach((judge) => {
			addJudge(judge);
		});
		return judges;
	} catch (error) {
		handleError(error);
	}
};

const addJudge = async (judge: ChessJudge): Promise<ChessJudge | undefined> => {
	try {
		const { addJudge } = useTournamentStore();
		const { code: tournament_code } = useTournamentStore();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/judges`,
			"POST",
			{
				name: judge.name,
			}
		);

		const new_judge: ChessJudge = await handleResponse(response);
		addJudge(new_judge);
		return new_judge;
	} catch (error) {
		handleError(error);
	}
};

export { getJudges, addJudge };
