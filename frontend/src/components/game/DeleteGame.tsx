import { CommonDeletePopup } from "@components/common/DeletePopup";
import { deleteGame } from "@/api";
import { ChessGame } from "@/types";
import trashIcon from "/icons/trash.svg";
import { useTournamentStore } from "@/stores/tournament.store";

export function DeleteGame({ game }: { game: ChessGame }) {
  const players = useTournamentStore((state) => state.players);

  return (
    <CommonDeletePopup
      trigger={
        <button className="align-right rounded-md border">
          <img src={trashIcon} className="m-2 w-5" alt="." />
        </button>
      }
      confirmation_text={
        `Czy na pewno chcesz usunąć grę ` +
        players.get(game.white_id)?.last_name +
        " vs " +
        players.get(game.black_id)?.last_name +
        "?"
      }
      warning_text="Tej akcji nie da się odwrócić."
      submit_text="Usuń"
      onSubmit={() => {
        deleteGame(game.id || 0);
      }}
    />
  );
}
