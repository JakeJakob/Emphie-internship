import scoreLogo from "/icons/scoreLogo.svg";
import { ChessTitle } from "@/lib/types";
import { VsCard } from "@/lib/components/scores/vsCard";

function Board_DuringGame() {
	return (
		<div>
			<div className="h-frame48-height w-screen">
				<div className="flex items-center h-frame32-height w-screen ">
					<p className="font-sans text-white font-bold text-6xl">
						W trakcie gry
					</p>
					<div className="mr-4 border-l border-white h-82.82"></div>
					<p className="font-sans text-white font-normal text-6xl">
						{" "}
						| Międzynarodowy Testowy Turniej Szachowy
					</p>
				</div>
				<hr className="text-white w-hr2-width border-2 mt-3" />
			</div>

			<div className="w-full h-[660px] mt-11 overflow-y-auto">
				{[1, 1, 1, 1].map(() => (
					<VsCard
						white={{
							name: "Chlost",
							last_name: "Marek",
							rank: 26685,
							title: ChessTitle.CM,
						}}
						black={{
							name: "Chlost",
							last_name: "Marek",
							rank: 12,
							title: ChessTitle.GM,
						}}
					/>
				))}
			</div>

			<div className="h-[86] absolute bottom-2 right-2">
				<img src={scoreLogo} />
			</div>
		</div>
	);
}

export default Board_DuringGame;
