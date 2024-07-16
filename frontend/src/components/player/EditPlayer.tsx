import { PlayerForm } from "./PlayerForm";
import { editPlayer } from "@api";
import { ChessPlayer } from "@types";
import editIcon from "/icons/edit.svg";

export function EditPlayer({ player }: { player: ChessPlayer }) {
	return (
		<PlayerForm
			title={`${player.name} ${player.last_name}`}
			desc="Edycja danych użytkownika."
			trigger={
				<button className="border rounded-md mx-4">
					<img src={editIcon} className="w-5 m-2" alt="Edit" />
				</button>
			}
			onSubmit={(player) => editPlayer(player.code || "", player)}
			initialPlayer={player}
		/>
	);
}
