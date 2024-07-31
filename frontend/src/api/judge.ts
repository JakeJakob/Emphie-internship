import { apiFetch, BASE_URL, handleError, handleResponse } from ".";
import { ChessJudge } from "@types";
import { useTournamentStore } from "@/stores/tournament.store";
import { toast } from "react-toastify";

const getJudges = async (): Promise<ChessJudge[] | undefined> => {
  try {
    const { addJudge } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/judges`,
      "GET",
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
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/judges`,
      "POST",
      judge,
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
  judge_id: number,
  judge: ChessJudge,
): Promise<ChessJudge | undefined> => {
  try {
    const { addJudge } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/judges/${judge_id}`,
      "PUT",
      judge,
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
  judge_id: number,
): Promise<ChessJudge | undefined> => {
  try {
    const { removeJudge } = useTournamentStore.getState();
    const { id: tournament_id } = useTournamentStore.getState();

    const response = await apiFetch(
      `${BASE_URL}/tournaments/${tournament_id}/judges/${judge_id}`,
      "DELETE",
    );

    const deleted_judge: ChessJudge = await handleResponse(response);
    removeJudge(deleted_judge.id || 0);
    toast.success("Sędzia został usunięty!");
    return deleted_judge;
  } catch (error) {
    handleError(error);
  }
};

export { getJudges, addJudge, editJudge, deleteJudge };
