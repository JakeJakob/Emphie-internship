import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuthStore } from "@stores/auth.store";
import { useTournamentStore } from "@stores/tournament.store";
import { getGames, getJudges, getPlayers } from "@api";

export function App() {
	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const tournament_code = useTournamentStore((state) => state.code);

	const storeAddPlayer = useTournamentStore((state) => state.addPlayer);
	const storeAddGame = useTournamentStore((state) => state.addGame);
	const storeAddJudge = useTournamentStore((state) => state.addJudge);

	if (
		window.location.pathname.split("/")[1] == "tournament" &&
		tournament_code
	) {
		getPlayers(getAuthorization, storeAddPlayer, tournament_code);
		getGames(getAuthorization, storeAddGame, tournament_code);
		getJudges(getAuthorization, storeAddJudge, tournament_code);
	}

	return <RouterProvider router={router} />;
}
