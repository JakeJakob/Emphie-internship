import "@index.css";
import { Card, CardContent, CardHeader } from "@shadcn/card";

import { PlayerListCard } from "@components/player";
import { GameListCard } from "@components/game";
import { JudgeListCard } from "@components/judge";
import { ActionListCard } from "@components/tournament";

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
					<Card className="h-min">
						<CardHeader>
							<p className="text-xl font-semibold">
								{" "}
								Wielkie przykładowe mistrzostwa{" "}
							</p>
						</CardHeader>
						<CardContent>
							<p className="text-lg">Kod turnieju:</p>
							<h1 className="text-4xl font-bold">AX46BF</h1>
						</CardContent>
					</Card>

					<ActionListCard />

					<GameListCard />
					<JudgeListCard />
					<PlayerListCard />
				</div>
			</div>
		</>
	);
}

export default LandingPage;
