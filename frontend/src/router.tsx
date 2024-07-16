import { createBrowserRouter } from "react-router-dom";
import StartingPage from "@/routes/LandingPage";
import LandingPage from "@/routes/Dashboard";
import { PendingGamesPage, ScoreTablePage } from "@routes/scoreboard";
import PlayersPage from "./routes/Players";

export const router = createBrowserRouter([
	{ path: "/", element: <StartingPage /> },
	{
		path: "/tournament/:id",
		element: <LandingPage />,
	},
	// {
	// 	path: "/tournament/:id/players",
	// 	element: <PlayersPage />,
	// },
	// {
	// 	path: "/tournament/:id/judges",
	// },
	// {
	// 	path: "/tournament/:id/games",
	// },
	// {
	// 	path: "/tournament/:id/scoreboard",
	// 	element: <ScoreTablePage />,
	// },
	// {
	// 	path: "/tournament/:id/scoreboard/pending",
	// 	element: <PendingGamesPage />,
	// },
]);
