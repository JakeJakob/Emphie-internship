import { create } from "zustand";
import { TokenType } from "@types";

export interface AuthState {
  token_type?: TokenType;
  tournament_id?: number;
  tournament_code?: string;
  token?: string;
}

export const useAuthStore = create<
  AuthState & {
    getAuthorization: () => string | undefined;
    removeAuthorization: () => void;
    setAuth: (auth: AuthState) => void;
  }
>()((set) => ({
  token_type: localStorage.getItem("auth_token_type") as TokenType,
  tournament_id:
    parseInt(localStorage.getItem("auth_tournament_id") || "") || undefined,
  tournament_code: localStorage.getItem("auth_tournament_code") || undefined,
  token: localStorage.getItem("auth_token") || undefined,

  getAuthorization: () => {
    const state: AuthState = useAuthStore.getState();

    if (state.token) {
      return "Bearer " + state.token;
    }

    return undefined;
  },
  removeAuthorization: () => {
    localStorage.clear();

    return set({
      token_type: undefined,
      tournament_id: undefined,
      tournament_code: undefined,
      token: undefined,
    });
  },
  setAuth: (auth: AuthState) => {
    localStorage.setItem("auth_token_type", auth.token_type || "");
    localStorage.setItem("auth_tournament_id", "" + auth.tournament_id || "");
    localStorage.setItem("auth_tournament_code", auth.tournament_code || "");
    localStorage.setItem("auth_token", auth.token || "");

    return set(auth);
  },
}));
