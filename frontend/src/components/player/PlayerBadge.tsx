import whitePawn from "/icons/whitePawn.svg";
import blackPawn from "/icons/blackPawn.svg";
import starIcon from "/icons/star.svg";
import { ChessPlayer, ChessTitle } from "@types";
import { TitleToColor } from "@utils";

export function PlayerBadge({
	player,
	isWhite,
	mirrored,
	starred,
	variant = "default",
}: {
	player: ChessPlayer | undefined;
	isWhite?: boolean;
	mirrored?: boolean;
	starred?: boolean;
	variant?: "default" | "table";
}) {
	const playerName = `${player?.name} ${player?.last_name[0]}.`;
	const titleColor = TitleToColor(player?.title || ChessTitle.NONE);

	// Determine which piece image and classes to use based on the variant
	let pieceImage, pieceClass;
	if (variant === "default") {
		pieceImage = isWhite ? whitePawn : blackPawn;
		pieceClass = "h-24";
	} else if (variant === "table") {
		pieceImage = isWhite ? whitePawn : blackPawn;
		pieceClass = "h-9";
	}

	return (
		<div
			className={`flex flex-col text-white text-nowrap gap-2 ${variant === "default" ? "h-[186px]" : "h-[78px]"}`}
		>
			<div
				className={`flex flex-row gap-4 ${starred && "text-[#FFC700]"}`}
			>
				{(variant === "table" || mirrored) && (
					<img
						src={pieceImage}
						className={pieceClass}
						alt="Chess piece"
					/>
				)}
				<h1
					className={`${variant === "default" ? "text-8xl" : "text-3xl"} ${starred && "font-bold"}`}
				>
					{playerName}
				</h1>
				{starred && (
					<img
						src={starIcon}
						className={variant === "default" ? "h-24" : "h-9"}
						alt="Star icon"
					/>
				)}
				{variant === "default" && !mirrored && (
					<img
						src={pieceImage}
						className={pieceClass}
						alt="Chess piece"
					/>
				)}
			</div>
			<div
				className={`flex flex-row gap-2 ${variant === "default" && !mirrored && "justify-end"}`}
			>
				{player?.title && (
					<div
						className={`flex items-center rounded-md ${variant === "table" ? "px-2" : "px-3"}`}
						style={{ backgroundColor: titleColor }}
					>
						<p
							className={`${variant === "default" ? "text-3xl font-bold" : "text-base font-bold"} text-center mx-auto`}
						>
							{player?.title}
						</p>
					</div>
				)}
				<p
					className={`text-white ${variant === "default" ? "text-[32px]" : "text-base"} font-normal`}
				>
					Ranga: <b>{player?.rank}</b>
				</p>
			</div>
		</div>
	);
}
