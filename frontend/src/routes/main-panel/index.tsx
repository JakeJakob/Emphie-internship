import "@index.css";
import { PlayerListCard } from "@components/player";
import { GameListCard } from "@components/game";
import { JudgeListCard } from "@components/judge";
import { ActionListCard, TournamentInfoCard } from "@components/tournament";
import { TokenType } from "@/lib/types";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useTournamentStore } from "@/lib/stores/tournament.store";
import { getPlayers, getGames } from "@/lib/api";

function LandingPage() {
	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const tournament_code = useTournamentStore((state) => state.code);
	const storeAddPlayer = useTournamentStore((state) => state.addPlayer);
	const storeAddGame = useTournamentStore((state) => state.addGame);

	if (tournament_code) {
		getPlayers(getAuthorization, storeAddPlayer, tournament_code);
		getGames(getAuthorization, storeAddGame, tournament_code);
	}

	return (
		<>
			<div className="min-h-screen p-0.5 box-border">
				<div className="max-w-screen py-1 px-6 border box-border">
					<h1 className="text-project_primary text-2xl font-bold my-3 font-ptSans">
						{" "}
						Scoreboard{" "}
					</h1>
				</div>

				<div className="grid  md:grid-cols-4 grid-cols-none gap-4 p-4 ">
					<TournamentInfoCard />
					<ActionListCard token_type={TokenType.Admin} />

					<GameListCard />
					<JudgeListCard />
					<PlayerListCard />
				</div>
			</div>
		</>
	);
}

export default LandingPage;
