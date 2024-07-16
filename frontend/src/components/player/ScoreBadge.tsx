import whitePawn from "/icons/whitePawn.svg";
import blackPawn from "/icons/blackPawn.svg";
import { ChessPlayer } from "@types";
import { TitleToColor } from "@utils";

export function ScoreBadge({
	player,
	is_white,
	align_left,
}: {
	player: ChessPlayer | undefined;
	is_white?: boolean;
	align_left?: boolean;
}) {
	const playerPiece = (
		<img src={is_white ? whitePawn : blackPawn} alt="Chess piece" />
	);
	const playerName = `${player?.name} ${player?.last_name[0]}.`;
	const titleColor = player?.title ? TitleToColor(player.title) : null;

	return (
		<div className={`w-2/5 h-full ${align_left ? "ml-auto" : ""}`}>
			<div
				className={`w-3/5 h-full ${align_left ? "mr-auto" : "ml-auto"}`}
			>
				<div className="flex items-center justify-between h-2/3 w-full px-3">
					{align_left && playerPiece}
					<p
						className={`text-white text-[65px] font-normal ${align_left ? "mr-auto" : "ml-auto"}`}
					>
						{playerName}
					</p>
					{!align_left && playerPiece}
				</div>
				<div
					className={`flex items-center justify-between h-1/3 w-2/3 ${align_left ? "mr-auto" : "ml-auto"}`}
				>
					{player?.title && (
						<div
							className="flex items-center justify-center w-[78px] h-[57px] rounded-sm"
							style={{ backgroundColor: titleColor || "#FFFFFF" }}
						>
							<p className="text-white text-3xl font-bold text-center mx-auto">
								{player.title}
							</p>
						</div>
					)}
					<p className="text-white text-[32px] font-normal">Ranga:</p>
					<p className="text-white text-[32px] font-normal">
						{player?.rank}
					</p>
				</div>
			</div>
		</div>
	);
}
