import whitePawn from "/icons/whitePawn.svg";
import blackPawn from "/icons/blackPawn.svg";
import starIcon from "/icons/star.svg";
import { ChessPlayer, ChessTitle } from "@types";
import { TitleToColor } from "@utils";

export function PlayerTableBadge({
	player,
	isWhite,
	starred,
}: {
	player: ChessPlayer | undefined;
	isWhite?: boolean;
	starred?: boolean;
}) {
	const playerName = `${player?.name} ${player?.last_name[0]}.`;
	const titleColor = TitleToColor(player?.title || ChessTitle.NONE);

	return (
		<div className="flex flex-col text-white text-nowrap gap-2 h-[78px]">
			<div
				className={`flex flex-row gap-4 ${starred && "text-[#FFC700]"}`}
			>
				<img
					src={isWhite ? whitePawn : blackPawn}
					className="h-9"
					alt="Chess piece"
				/>
				<h1 className={`text-3xl ${starred && "font-bold"}`}>
					{playerName}
				</h1>
				{starred && <img src={starIcon} className="h-9" />}
			</div>
			<div className={`flex flex-row gap-2`}>
				{player?.title && (
					<div
						className="flex items-center rounded-md px-2"
						style={{ backgroundColor: titleColor }}
					>
						<p className="text-base font-bold text-center mx-auto">
							{player?.title}
						</p>
					</div>
				)}
				<p className="text-white text-base font-normal">
					Ranga: <b>{player?.rank}</b>
				</p>
			</div>
		</div>
	);
}
