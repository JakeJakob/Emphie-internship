import { create } from "zustand";
import { ChessGame, ChessJudge, ChessPlayer, ChessTournament } from "@types";

interface TournamentState extends ChessTournament {
  addTournament: (tournament: ChessTournament) => void;
  endTournament: () => void;

  addPlayer: (player: ChessPlayer) => void;
  removePlayer: (id: number) => void;

  addJudge: (judge: ChessJudge) => void;
  removeJudge: (id: number) => void;

  addGame: (game: ChessGame) => void;
  removeGame: (id: number) => void;

  players: Map<number, ChessPlayer>;
  judges: Map<number, ChessJudge>;
  games: Map<number, ChessGame>;
}

export const useTournamentStore = create<TournamentState>()((set) => ({
  id: parseInt(localStorage.getItem("tournament_id") || "0"),
  code: localStorage.getItem("tournament_code") || "",
  name: localStorage.getItem("tournament_name") || "",
  players: new Map(),
  judges: new Map(),
  games: new Map(),

  addTournament: (tournament: ChessTournament) => {
    localStorage.setItem("tournament_id", "" + tournament.id || "0");
    localStorage.setItem("tournament_code", tournament.code || "");
    localStorage.setItem("tournament_name", tournament.name);

    return set(tournament);
  },
  endTournament: () => {
    localStorage.removeItem("tournament_id");
    localStorage.removeItem("tournament_code");
    localStorage.removeItem("tournament_name");

    return set({
      name: "",
      players: new Map(),
      judges: new Map(),
      games: new Map(),
    });
  },

  addPlayer: (player: ChessPlayer) =>
    set((state) => {
      if (!player.id) return {};

      const newPlayers = new Map(state.players);
      newPlayers.set(player.id, player);
      return { players: newPlayers };
    }),
  removePlayer: (id: number) =>
    set((state) => {
      const newPlayers = new Map(state.players);
      newPlayers.delete(id);
      return { players: newPlayers };
    }),

  addJudge: (judge: ChessJudge) => {
    set((state) => {
      if (!judge.id) return {};

      const newJudges = new Map(state.judges);
      newJudges.set(judge.id, judge);
      return { judges: newJudges };
    });
  },
  removeJudge: (id: number) =>
    set((state) => {
      const newJudges = new Map(state.judges);
      newJudges.delete(id);
      return { judges: newJudges };
    }),

  addGame: (game: ChessGame) =>
    set((state) => {
      if (!game.id) return {};

      const newGames = new Map(state.games);
      newGames.set(game.id, game);
      return { games: newGames };
    }),
  removeGame: (id: number) =>
    set((state) => {
      const newGames = new Map(state.games);
      newGames.delete(id);
      return { games: newGames };
    }),
}));
