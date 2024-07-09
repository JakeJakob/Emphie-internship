import "@index.css";
import { PlayerListCard } from "@components/player";
import { GameListCard } from "@components/game";
import { JudgeListCard } from "@components/judge";
import { ActionListCard, TournamentInfoCard } from "@components/tournament";
import { TokenType } from "@/lib/types";

function LandingPage() {
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
