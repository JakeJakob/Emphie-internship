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
	token_type:
		(localStorage.getItem("auth_token_type") as TokenType) ||
		TokenType.Admin,
	tournament_code: localStorage.getItem("auth_tournament_code") || undefined,
	access_key: localStorage.getItem("auth_access_key") || undefined,
	judge_code: localStorage.getItem("auth_judge_code") || undefined,

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
	removeAuthorization: () => {
		localStorage.clear();

		return set({
			token_type: TokenType.Admin,
			tournament_code: undefined,
			access_key: undefined,
			judge_code: undefined,
		});
	},
	setAuth: (auth: AuthState) => {
		localStorage.setItem("auth_token_type", auth.token_type);
		localStorage.setItem(
			"auth_tournament_code",
			auth.tournament_code || ""
		);
		localStorage.setItem("auth_access_key", auth.access_key || "");
		localStorage.setItem("auth_judge_code", auth.judge_code || "");

		return set(auth);
	},
}));
