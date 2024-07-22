import { Card, CardContent, CardHeader } from "@shadcn/card";
import plusIcon from "/icons/plus.svg";
import { JudgeListItem } from "@components/judge/ListItem";
import { useTournamentStore } from "@stores/tournament.store";
import { CreateJudge } from "@/components/judge/CreateJudge";
import { Link } from "react-router-dom";

export default function PlayersPage() {
	const judges = useTournamentStore((state) => [...state.judges.values()]);

	return (
		<div className="min-h-screen p-0.5 box-border">
			<div className="max-w-screen py-1 px-6 border box-border">
				<h1 className="text-project_primary text-2xl font-bold my-3 font-ptSans">
					<Link to="./../">
						Scoreboard
					</Link>
				</h1>
			</div>
			<Card className="border-none flex-col w-full lg:w-4/5 mx-auto">
				<CardHeader>
					<p className="justify-between flex w-full text-xl font-semibold border-b-2 pb-4">
						Sędziowie
						<CreateJudge
							trigger={
								<button className="justify-self-center w-max border rounded-md">
									<img
										src={plusIcon}
										className="w-5 m-2 "
										alt="."
									/>
								</button>
							}
						/>
					</p>
				</CardHeader>
				<CardContent className="flex flex-col gap-2 border-none">
					{judges.map((judge) => (
						<JudgeListItem judge={judge} />
					))}
				</CardContent>
			</Card>
		</div>
	);
}
