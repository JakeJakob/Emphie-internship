import { CommonDeletePopup } from "@components/common/DeletePopup";
import { deletePlayer } from "@/api";
import { ChessPlayer } from "@/types";
import trashIcon from "/icons/trash.svg";

export function DeletePlayer(props: { player: ChessPlayer }) {
	return (
		<CommonDeletePopup
			trigger={
				<button className="align-right border rounded-md">
					<img src={trashIcon} className="w-5 m-2 " alt="." />
				</button>
			}
			confirmation_text={`Czy na pewno chcesz usunąć gracza ${props.player.name} ${props.player.last_name}?`}
			warning_text="Tej akcji nie da się odwrócić. "
			submit_text="Usuń"
			onSubmit={() => {
				deletePlayer(props.player.code || "");
			}}
		/>
	);
}
