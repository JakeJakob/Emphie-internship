import { ChessPlayer } from "@/types";
import { DeletePlayer } from "./Delete";
import { EditPlayer } from "./Edit";

export function PlayerListItem(props: { player: ChessPlayer }) {
	return (
		<p className="border w-full p-2 font-bold rounded flex justify-between items-center">
			{props.player.name + " " + props.player.last_name}
			<div className="flex ">
				<EditPlayer player={props.player} />
				<DeletePlayer player={props.player} />
			</div>
		</p>
	);
}
