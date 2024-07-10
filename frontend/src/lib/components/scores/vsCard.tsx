import { ChessPlayer } from "@/lib/types";
import { PlayerCard } from "../player";

export function VsCard({
	white,
	black,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	winner = undefined,
}: {
	white: ChessPlayer;
	black: ChessPlayer;
	winner?: ChessPlayer;
}) {
	return (
		<div className="w-full mb-6 h-44 flex justify-between items-center">
			<PlayerCard is_white={true} player={white} align_left={false} />

			<div className="w-32 h-18 ml-auto">
				<p className="font-normal text-5xl text-white text-center">
					vs.
				</p>
			</div>

			<PlayerCard is_white={false} player={black} align_left={true} />
		</div>
	);
}
