import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuthStore } from "@stores/auth.store";
import { getGames, getJudges, getPlayers } from "@api";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function App() {
	const getAuthorization = useAuthStore((state) => state.getAuthorization);

	if (
		window.location.pathname.split("/")[1] == "tournament" &&
		getAuthorization()
	) {
		getPlayers();
		getGames();
		getJudges();
	}

	return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
}
