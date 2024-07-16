import { ChessJudge } from "@/types";
import { DeleteJudge } from "./DeleteJudge";
import { EditJudge } from "./EditJudge";

export function JudgeListItem(props: { judge: ChessJudge }) {
	return (
		<p className="border w-full p-2 font-bold rounded flex justify-between items-center">
			{props.judge.name}
			<div className="flex ">
				<EditJudge judge={props.judge} />
				<DeleteJudge judge={props.judge} />
			</div>
		</p>
	);
}
