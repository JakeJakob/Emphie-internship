import { apiFetch, BASE_URL, handleError, handleResponse } from ".";
import { ChessJudge } from "@types";
import { useTournamentStore } from "@/stores/tournament.store";
import { toast } from "react-toastify";

const getJudges = async (): Promise<ChessJudge[] | undefined> => {
	try {
		const { addJudge } = useTournamentStore.getState();
		const { code: tournament_code } = useTournamentStore.getState();

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
		const { addJudge } = useTournamentStore.getState();
		const { code: tournament_code } = useTournamentStore.getState();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/judges`,
			"POST",
			{
				name: judge.name,
			}
		);

		const new_judge: ChessJudge = await handleResponse(response);
		addJudge(new_judge);
		toast.success("Sędzia został dodany!");
		return new_judge;
	} catch (error) {
		handleError(error);
	}
};

const editJudge = async (
	judge_code: string,
	judge: ChessJudge
): Promise<ChessJudge | undefined> => {
	try {
		const { addJudge } = useTournamentStore.getState();
		const { code: tournament_code } = useTournamentStore.getState();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/judges/${judge_code}`,
			"PUT",
			{
				name: judge.name,
			}
		);

		const new_judge: ChessJudge = await handleResponse(response);
		addJudge(new_judge);
		toast.success("Sędzia został zmodyfikowany!");
		return new_judge;
	} catch (error) {
		handleError(error);
	}
};

const deleteJudge = async (
	judge_code: string
): Promise<ChessJudge | undefined> => {
	try {
		const { removeJudge } = useTournamentStore.getState();
		const { code: tournament_code } = useTournamentStore.getState();

		const response = await apiFetch(
			`${BASE_URL}/tournaments/${tournament_code}/judges/${judge_code}`,
			"DELETE"
		);

		const deleted_judge: ChessJudge = await handleResponse(response);
		removeJudge(deleted_judge.code || "");
		toast.success("Sędzia został usunięty!");
		return deleted_judge;
	} catch (error) {
		handleError(error);
	}
};

export { getJudges, addJudge, editJudge, deleteJudge };
