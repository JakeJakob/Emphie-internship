import { PlayerBadge } from "@/components/player/PlayerBadge";
import scoreLogo from "/chessgrowWhite.svg";
import { useTournamentStore } from "@stores/tournament.store";

export function ScoreTablePage() {
	function numbersToN(N: number) {
		return Array.from({ length: N }, (_, index) => index);
	}

	const players = useTournamentStore((state) => state.players);
	const games = useTournamentStore((state) => state.games);
	const tournament_name = useTournamentStore((state) => state.name);

	const all_games = [...games.values()];
	const n_rounds = Math.max(...all_games.map((game) => game.round));

	return (
		<div className="h-screen bg-custom relative overflow-hidden px-4 pt-4 bg-[url('/chessgrowLogo.svg')] bg-no-repeat bg-right">
			<div className="h-frame48-height w-screen">
				<div className="flex items-center h-frame32-height w-screen ">
					<p className="font-sans text-white font-bold text-6xl">
						Tabela
					</p>
					<div className="mr-4 border-l border-white h-82.82"></div>
					<p className="font-sans text-white font-normal text-6xl">
						{" | " + tournament_name}
					</p>
				</div>
				<hr className="text-white w-hr2-width border-2 mt-3" />
			</div>

			<div className="h-[660px] mt-11 overflow-y-auto grid grid-cols-3 text-white">
				{numbersToN(n_rounds).map((n) => (
					<div className="header-itepy-2 text-center bg-black bg-opacity-20 font-bold text-3xl">
						Runda {n + 1}
					</div>
				))}

				{numbersToN(n_rounds).map((n) => (
					<div className="content-item flex flex-col text-white p-2 text-center bg-black bg-opacity-10">
						{all_games
							.filter((game) => game.round == n + 1)
							.map((game) => (
								<div className="p-4">
									<PlayerBadge
										player={players.get(game.white_code)}
										isWhite
										starred={
											game.white_code == game.winner_code
										}
										variant="table"
									/>

									<PlayerBadge
										player={players.get(game.black_code)}
										starred={
											game.black_code == game.winner_code
										}
										variant="table"
									/>
								</div>
							))}
					</div>
				))}
			</div>

			<div className="h-[86] absolute bottom-2 right-2">
				<img src={scoreLogo} />
			</div>
		</div>
	);
}