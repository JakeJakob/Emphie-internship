import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuthStore } from "@stores/auth.store";
import { getGames, getJudges, getPlayers } from "@api";

export function App() {
	const getAuthorization = useAuthStore((state) => state.getAuthorization);

	if (getAuthorization()) {
		getPlayers();
		getGames();
		getJudges();
	}

	return <RouterProvider router={router} />;
}
