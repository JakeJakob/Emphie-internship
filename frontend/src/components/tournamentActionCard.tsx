import judgeIcon from "/icons/ref.svg";
import resultsIcon from "/icons/results.svg";
import peopleIcon from "/icons/list.svg";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@shadcn/button";
import { Card, CardContent, CardHeader } from "@shadcn/card";

import { TokenType } from "@types";
import { CommonDeletePopup } from "./common/DeletePopup";
import { endTournament } from "@/api";

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
						<CreatePlayer />
						<CreateGame />
					</>
				)}
				{props.token_type === TokenType.Admin && <CreateJudge />}

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

				{props.token_type === TokenType.Admin && <EndTournament />}
			</CardContent>
		</Card>
	);
}

function EndTournament() {
	const navigate = useNavigate();

	return (
		<CommonDeletePopup
			title="Zakończ turniej"
			confirmation_text="Czy na pewno chcesz zakończyć ten turniej?"
			warning_text="Tej akcji nie da się odwrócić. Zakończony turniej nie zostaje nigdzie zapisany."
			submit_text="Zakończ"
			onSubmit={async () => {
				const tournament = await endTournament();

				if (!tournament) return;

				navigate("/");
			}}
		/>
	);
}

function CreatePlayer() {
	return <></>;
}

function CreateJudge() {
	return <></>;
}

function CreateGame() {
	return <></>;
}
