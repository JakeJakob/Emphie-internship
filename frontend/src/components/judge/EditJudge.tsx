import { JudgeForm } from "./JudgeForm";
import { editJudge } from "@api";
import { ChessJudge } from "@types";
import editIcon from "/icons/edit.svg";

export function EditJudge({ judge }: { judge: ChessJudge }) {
	return (
		<JudgeForm
			title={judge.name}
			desc="Edycja danych sędzi"
			trigger={
				<button className="border rounded-md mx-4">
					<img src={editIcon} className="w-5 m-2" alt="Edit" />
				</button>
			}
			onSubmit={(judge) => editJudge(judge.code || "", judge)}
			initialJudge={judge}
		/>
	);
}
