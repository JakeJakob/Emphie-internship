import { CommonListCard } from "@/components/common/ListCard";
import { TournamentInfoCard } from "@/components/tournament/InfoCard";
import { useTournamentStore } from "@/stores/tournament.store";
import { TournamentActionList } from "@components/tournament/ActionList";
import { useAuthStore } from "@stores/auth.store";
import { ChessGame, ChessJudge, ChessPlayer, TokenType } from "@types";

export default function DashboardPage() {
	const [tournament_code, tournament_name] = useTournamentStore((state) => [
		state.code,
		state.name,
	]);
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

					<div className="grid md:grid-cols-4 grid-cols-none gap-2 p-4">
						<TournamentInfoCard
							name={tournament_name}
							code={tournament_code || ""}
						/>
						<TournamentActionList token_type={token_type} />

						<GameListCard />
						<JudgeListCard />
						<PlayerListCard />
					</div>
				</div>
			</>
		);
	} else {
		return (
			<h1 className="text-project_primary text-2xl font-bold my-3 font-ptSans">
				Unauthorized
			</h1>
		);
	}
}



function PlayerListCard() {
	const player_names = [
		...useTournamentStore((state) => state.players).values(),
	].map((player: ChessPlayer) => player.name + " " + player.last_name);

	return (
		<CommonListCard
			title="Gracze"
			items={player_names}
			overflow_href="./players"
		/>
	);
}

function JudgeListCard() {
	const judge_names = [
		...useTournamentStore((state) => state.judges).values(),
	].map((judge: ChessJudge) => judge.name);

	return (
		<CommonListCard
			title="Sędziowie"
			items={judge_names}
			overflow_href="./judges"
		/>
	);
}
function GameListCard() {
	const players = useTournamentStore((state) => state.players);
	const versus_names = [
		...useTournamentStore((state) => state.games).values(),
	]
		.filter((game) => !game.winner_code)
		.map(
			(game: ChessGame) =>
				players.get(game.white_code)?.last_name +
				" vs " +
				players.get(game.black_code)?.last_name
		);

	return (
		<CommonListCard
			title="Aktywne gry"
			items={versus_names}
			overflow_href="./players"
		/>
	);
}
