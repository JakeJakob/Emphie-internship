import { ChessPlayer } from "@/types";
import { DeletePlayer } from "./DeletePlayer";
import { EditPlayer } from "./EditPlayer";

export function PlayerListItem(props: { player: ChessPlayer }) {
  return (
    <p className="flex w-full items-center justify-between rounded border p-2 font-bold">
      {props.player.first_name + " " + props.player.last_name}
      <div className="flex">
        <EditPlayer player={props.player} />
        <DeletePlayer player={props.player} />
      </div>
    </p>
  );
}
