import scoreLogo from "/chessgrowWhite.svg";
import { VsCard } from "@components/scores/VsCard";
import { useTournamentStore } from "@stores/tournament.store";

export function PendingGamesPage() {
	const players = useTournamentStore((state) => state.players);
	const games = useTournamentStore((state) => state.games);
	const tournament_name = useTournamentStore((state) => state.name);

	const pending_games = [...games.values()].filter(
		(game) => game.winner_code == undefined
	);

	return (
		<div className="h-screen bg-custom relative overflow-hidden px-4 pt-4 bg-[url('/chessgrowLogo.svg')] bg-no-repeat bg-right">
			<div className="h-frame48-height w-screen">
				<div className="flex items-center h-frame32-height w-screen ">
					<p className="font-sans text-white font-bold text-6xl">
						W trakcie gry
					</p>
					<div className="mr-4 border-l border-white h-82.82"></div>
					<p className="font-sans text-white font-normal text-6xl">
						{" | " + tournament_name}
					</p>
				</div>
				<hr className="text-white w-hr2-width border-2 mt-3" />
			</div>

			<div className="w-full h-[660px] mt-11 overflow-y-auto">
				{pending_games.map((game) => (
					<VsCard
						white={
							players.get(game.white_code) || {
								name: "",
								last_name: "",
								rank: 0,
							}
						}
						black={
							players.get(game.black_code) || {
								name: "",
								last_name: "",
								rank: 0,
							}
						}
					/>
				))}
			</div>

			<div className="h-[86] absolute bottom-2 right-2">
				<img src={scoreLogo} />
			</div>
		</div>
	);
}
