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
import { JoinAsJudgePage } from "./routes/JoinPage";
import NotFound from "./routes/NotFound";

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
		path: "/join/judge/:token",
		element: <JoinAsJudgePage />,
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
	{
		path: "*",
		element: <NotFound />,
	}
]);
