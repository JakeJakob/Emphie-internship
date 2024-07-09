import { create } from "zustand";
import { TokenType } from "@types";

export interface AuthState {
	token_type: TokenType;
	tournament_code?: string;
	access_key?: string;
	judge_code?: string;
}

export const useAuthStore = create<
	AuthState & {
		getAuthorization: () => string;
		removeAuthorization: () => void;
		setAuth: (auth: AuthState) => void;
	}
>()((set) => ({
	token_type: TokenType.Admin,
	tournament_code: undefined,
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
	removeAuthorization: () =>
		set({
			token_type: TokenType.Admin,
			tournament_code: "",
			access_key: undefined,
			judge_code: undefined,
		}),
	setAuth: (auth: AuthState) => set(auth),
}));
