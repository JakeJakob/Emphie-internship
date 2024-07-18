import { Link } from "react-router-dom";

import addIcon from "/icons/add.svg";
import refIcon from "/icons/ref.svg";
import resultsIcon from "/icons/results.svg";
import listIcon from "/icons/list.svg";
import createIcon from "/icons/create.svg";

import { Button } from "@shadcn/button";
import { Card, CardContent, CardHeader } from "@shadcn/card";
import { TokenType } from "@/types";

import { CreatePlayer } from "../player/CreatePlayer";
import { CreateGame } from "../game/CreateGame";
import { CreateJudge } from "../judge/CreateJudge";
import { EndTournament } from "./EndTournament";

export function TournamentActionList(props: { token_type: TokenType }) {
	return (
		<Card className="min-h-96">
			<CardHeader>
				<p className="text-xl font-semibold">Akcje</p>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{(props.token_type === TokenType.Admin ||
					props.token_type === TokenType.Judge) && (
					<>
						<CreatePlayer
							trigger={
								<Button className="w-full">
									<img
										src={addIcon}
										className="w-5 m-2"
										alt="."
									/>
									Dodaj gracza
								</Button>
							}
						/>
						<CreateGame
							trigger={
								<Button className="w-full">
									<img
										src={createIcon}
										className="w-5 m-2"
										alt="."
									/>
									Utwórz grę
								</Button>
							}
						/>
					</>
				)}
				{props.token_type === TokenType.Admin && (
					<CreateJudge
						trigger={
							<Button className="w-full">
								<img
									src={refIcon}
									className="w-5 m-2"
									alt="."
								/>
								Dodaj sędzię
							</Button>
						}
					/>
				)}

				<Link to="./games" className="w-full">
					<Button className="w-full">
						<img src={resultsIcon} className="w-5 m-2" alt="." />
						Wyniki Gier
					</Button>
				</Link>
				<Link to="./players">
					<Button className="w-full">
						<img src={listIcon} className="w-5 m-2" alt="." />
						Lista Graczy
					</Button>
				</Link>
				<Link to="./judges">
					<Button className="w-full">
						<img src={refIcon} className="w-5 m-2" alt="." />
						Lista Sędziów
					</Button>
				</Link>

				{props.token_type === TokenType.Admin && <EndTournament />}
			</CardContent>
		</Card>
	);
}
