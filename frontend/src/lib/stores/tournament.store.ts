import { create } from "zustand";
import { ChessGame, ChessJudge, ChessPlayer, ChessTournament } from "@types";

interface TournamentState extends ChessTournament {
	addTournament: (tournament: ChessTournament) => void;
	endTournament: () => void;

	addPlayer: (player: ChessPlayer) => void;
	removePlayer: (code: string) => void;

	addJudge: (judge: ChessJudge) => void;
	removeJudge: (code: string) => void;

	addGame: (game: ChessGame) => void;
	removeGame: (code: string) => void;
}

export const useTournamentStore = create<TournamentState>()((set) => ({
	code: localStorage.getItem("tournament_code") || "",
	name: localStorage.getItem("tournament_name") || "",
	players: new Map(),
	judges: new Map(),
	games: new Map(),

	addTournament: (tournament: ChessTournament) => {
		localStorage.setItem("tournament_code", tournament.code);
		localStorage.setItem("tournament_name", tournament.name);

		return set(tournament);
	},
	endTournament: () => {
		localStorage.removeItem("tournament_code");
		localStorage.removeItem("tournament_name");

		return set({
			code: "",
			name: "",
			players: new Map(),
			judges: new Map(),
			games: new Map(),
		});
	},

	addPlayer: (player: ChessPlayer) =>
		set((state) => {
			const newPlayers = new Map(state.players);
			newPlayers.set(player.code, player);
			return { players: newPlayers };
		}),
	removePlayer: (code: string) =>
		set((state) => {
			const newPlayers = new Map(state.players);
			newPlayers.delete(code);
			return { players: newPlayers };
		}),

	addJudge: (judge: ChessJudge) => {
		set((state) => {
			const newJudges = new Map(state.judges);
			newJudges.set(judge.code, judge);
			return { judges: newJudges };
		});
	},
	removeJudge: (code: string) =>
		set((state) => {
			const newJudges = new Map(state.judges);
			newJudges.delete(code);
			return { judges: newJudges };
		}),

	addGame: (game: ChessGame) =>
		set((state) => {
			const newGames = new Map(state.games);
			newGames.set(game.code, game);
			return { games: newGames };
		}),
	removeGame: (code: string) =>
		set((state) => {
			const newGames = new Map(state.games);
			newGames.delete(code);
			return { games: newGames };
		}),
}));
