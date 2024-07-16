import { ChessJudge } from "@/types";
import { DeleteJudge } from "./DeleteJudge";
import { EditJudge } from "./EditJudge";
import { QRCodeJoin } from "./QRCode";

export function JudgeListItem({ judge }: { judge: ChessJudge }) {
	return (
		<p className="border w-full p-2 font-bold rounded flex justify-between items-center">
			{judge.name}
			<div className="flex ">
				<EditJudge judge={judge} />
				<QRCodeJoin judge={judge} />
				<DeleteJudge judge={judge} />
			</div>
		</p>
	);
}
