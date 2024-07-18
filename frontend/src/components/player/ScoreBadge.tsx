import whitePawn from "/icons/whitePawn.svg";
import blackPawn from "/icons/blackPawn.svg";
import starIcon from "/icons/star.svg";
import { ChessPlayer, ChessTitle } from "@types";
import { TitleToColor } from "@utils";

export function PlayerScoreBadge({
	player,
	isWhite,
	mirrored,
	starred,
}: {
	player: ChessPlayer | undefined;
	isWhite?: boolean;
	mirrored?: boolean;
	starred?: boolean;
}) {
	const playerPiece = (
		<img
			src={isWhite ? whitePawn : blackPawn}
			className="h-24"
			alt="Chess piece"
		/>
	);
	const playerName = `${player?.name} ${player?.last_name[0]}.`;
	const titleColor = TitleToColor(player?.title || ChessTitle.NONE);

	return (
		<div className="flex flex-col text-white text-nowrap gap-2 h-[186px]">
			<div
				className={`flex flex-row gap-4 ${starred && "text-[#FFC700]"}`}
			>
				{mirrored && playerPiece}
				<h1 className={`text-8xl ${starred && "font-bold"}`}>
					{playerName}
				</h1>
				{starred && <img src={starIcon} className="h-24" />}
				{!mirrored && playerPiece}
			</div>
			<div
				className={`flex flex-row gap-2 ${!mirrored && "justify-end"}`}
			>
				{player?.title && (
					<div
						className="flex items-center rounded-md px-3"
						style={{ backgroundColor: titleColor }}
					>
						<p className="text-3xl font-bold text-center mx-auto">
							{player?.title}
						</p>
					</div>
				)}
				<p className="text-white text-[32px] font-normal">
					Ranga: <b>{player?.rank}</b>
				</p>
			</div>
		</div>
	);
}
