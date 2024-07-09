import { create } from "zustand";
import { TokenType } from "@types";

interface AuthState {
	token_type: TokenType;
	tournament_code: string;
	access_key?: string;
	judge_code?: string;
}

export const useAuthStore = create<
	AuthState & {
		getAuthorization: () => string;
		setTokenType: (tokenType: TokenType) => void;
		setTournamentCode: (tournamentCode: string) => void;
		setAccessKey: (accessKey?: string) => void;
		setJudgeCode: (judgeCode?: string) => void;
	}
>()((set) => ({
	token_type: TokenType.Admin,
	tournament_code: "",
	access_key: undefined,
	judge_code: undefined,

	getAuthorization: () => {
		const state: AuthState = useAuthStore.getState();

		if (state.token_type == TokenType.Admin) {
			return "Bearer " + state.access_key;
		}

		if (state.token_type == TokenType.Judge) {
			return "Bearer " + state.tournament_code + "+" + state.judge_code;
		}

		return "Bearer " + state.tournament_code;
	},
	setTokenType: (token_type: TokenType) => set({ token_type: token_type }),
	setTournamentCode: (tournament_code: string) =>
		set({ tournament_code: tournament_code }),
	setAccessKey: (access_key?: string) => set({ access_key: access_key }),
	setJudgeCode: (judge_code?: string) => set({ judge_code: judge_code }),
}));
