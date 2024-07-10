import { PlayerListCard } from "@components/player/PlayersList";
import { GameListCard } from "@components/game/ActiveGamesList";
import { JudgeListCard } from "@components/judge/JudgesList";
import { ActionListCard, TournamentInfoCard } from "@components/tournament";
import { useAuthStore } from "@stores/auth.store";
import { TokenType } from "@types";

function LandingPage() {
	const token_type = useAuthStore((state) => state.token_type);

	if (token_type == TokenType.Admin || token_type == TokenType.Judge) {
		return (
			<>
				<div className="min-h-screen p-0.5 box-border h-full">
					<div className="max-w-screen py-1 px-6 border box-border">
						<h1 className="text-project_primary text-2xl font-bold my-3 font-ptSans">
							{" "}
							Scoreboard{" "}
						</h1>
					</div>

					<div className="grid md:grid-cols-4 grid-cols-none gap-4 p-4">
						<TournamentInfoCard />
						<ActionListCard token_type={token_type} />

						<GameListCard />
						<JudgeListCard />
						<PlayerListCard />
					</div>
				</div>
			</>
		);
	} else {
		return <h1>Unauthorized</h1>;
	}
}

export default LandingPage;
