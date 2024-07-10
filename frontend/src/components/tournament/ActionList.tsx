import judgeIcon from "/icons/judge.svg";
import resultsIcon from "/icons/results.svg";
import peopleIcon from "/icons/people.svg";
import { Link } from "react-router-dom";

import { Button } from "@shadcn/button";
import { Card, CardContent, CardHeader } from "@shadcn/card";

import { CreatePlayerDrawer } from "@components/player/CreatePlayer";
import { CreateGameDrawer } from "@components/game/CreateGame";
import { CreateJudgeDrawer } from "@components/judge/CreateJudge";
import { EndTournament } from "@components/tournament";
import { TokenType } from "@types";

export function ActionListCard({ token_type }: { token_type: TokenType }) {
	return (
		<Card className="h-min">
			<CardHeader>
				<p className="text-xl font-semibold">Akcje</p>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{(token_type === TokenType.Admin ||
					token_type === TokenType.Judge) && (
					<>
						<CreatePlayerDrawer />
						<CreateGameDrawer />
					</>
				)}
				{token_type === TokenType.Admin && <CreateJudgeDrawer />}

				<Link to="./games" className="w-full">
					<Button className="w-full">
						<img src={resultsIcon} className="w-5 m-2" alt="." />
						Wyniki Gier
					</Button>
				</Link>
				<Link to="./players">
					<Button className="w-full">
						<img src={peopleIcon} className="w-5 m-2" alt="." />
						Lista Graczy
					</Button>
				</Link>
				<Link to="./judges">
					<Button className="w-full">
						<img src={judgeIcon} className="w-5 m-2" alt="." />
						Lista Sędziów
					</Button>
				</Link>

				{token_type === TokenType.Admin && <EndTournament />}
			</CardContent>
		</Card>
	);
}
