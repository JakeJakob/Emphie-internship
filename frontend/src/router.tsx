import { createBrowserRouter } from "react-router-dom";
import StartingPage from "@/routes/LandingPage";
import LandingPage from "@/routes/Dashboard";
import {
	PendingGamesPage,
	ScoreTablePage,
	FinishedGamesPage,
} from "@routes/scoreboard";
import PlayersPage from "./routes/PlayersPage";
import JudgesPage from "./routes/JudgesPage";
import GamesPage from "./routes/GamesPage";

export const router = createBrowserRouter([
	{ path: "/", element: <StartingPage /> },
	{
		path: "/tournament/:id",
		element: <LandingPage />,
	},
	{
		path: "/tournament/:id/players",
		element: <PlayersPage />,
	},
	{
		path: "/tournament/:id/judges",
		element: <JudgesPage />,
	},
	{
		path: "/tournament/:id/games",
		element: <GamesPage />,
	},
	{
		path: "/tournament/:id/scoreboard/table",
		element: <ScoreTablePage />,
	},
	{
		path: "/tournament/:id/scoreboard/pending",
		element: <PendingGamesPage />,
	},
	{
		path: "/tournament/:id/scoreboard/finished",
		element: <FinishedGamesPage />,
	},
]);
