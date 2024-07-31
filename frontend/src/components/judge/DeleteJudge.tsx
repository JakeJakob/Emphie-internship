import { CommonDeletePopup } from "@components/common/DeletePopup";
import { deleteJudge } from "@/api";
import { ChessJudge } from "@/types";
import trashIcon from "/icons/trash.svg";

export function DeleteJudge(props: { judge: ChessJudge }) {
  return (
    <CommonDeletePopup
      trigger={
        <button className="align-right rounded-md border">
          <img src={trashIcon} className="m-2 w-5" alt="." />
        </button>
      }
      confirmation_text={`Czy na pewno chcesz usunąć sędzię ${props.judge.name}?`}
      warning_text="Tej akcji nie da się odwrócić."
      submit_text="Usuń"
      onSubmit={() => {
        deleteJudge(props.judge.id || 0);
      }}
    />
  );
}
