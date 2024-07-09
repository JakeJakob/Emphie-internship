import "@index.css";
import ref from "/icons/ref.svg";
import results from "/icons/results.svg";
import list from "/icons/list.svg";
import { Link } from "react-router-dom";

import { Button } from "@shadcn/button";
import { Card, CardContent, CardHeader } from "@shadcn/card";

import { CreatePlayerDrawer } from "@components/player";
import { CreateGameDrawer } from "@components/game";
import { CreateJudgeDrawer } from "@components/judge";
import { EndTournament } from "@components/tournament";

export function ActionListCard() {
	return (
		<Card className="h-min">
			<CardHeader>
				<p className="text-xl font-semibold">Akcje</p>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<CreatePlayerDrawer />
				<CreateGameDrawer />
				<CreateJudgeDrawer />
				<Link to="./games">
					<Button className="w-full">
						<img src={results} className="w-5 m-2" alt="." />
						Wyniki Gier
					</Button>
				</Link>
				<Link to="./players">
					<Button className="w-full">
						<img src={list} className="w-5 m-2" alt="." />
						Lista Graczy
					</Button>
				</Link>
				<Link to="./judges">
					<Button className="w-full">
						<img src={ref} className="w-5 m-2" alt="." />
						Lista Sędziów
					</Button>
				</Link>
				<EndTournament />
			</CardContent>
		</Card>
	);
}
