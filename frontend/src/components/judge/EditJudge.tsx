import { editJudge } from "@api";
import { ChessJudge } from "@types";
import editIcon from "/icons/edit.svg";
import { useState } from "react";
import { JudgeEditDrawer } from "./JudgeEditDrawer";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";

export function EditJudge({ judge }: { judge: ChessJudge }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<button className="border rounded-md mx-4">
					<img src={editIcon} className="w-5 m-2" alt="Edit" />
				</button>
			</DrawerTrigger>
			<JudgeEditDrawer
				title={judge.name}
				desc="Edycja danych sędzi"
				onSubmit={(judge) => {
					editJudge(judge.code || "", judge);
					setIsOpen(false);
				}}
				initialJudge={judge}
			/>
		</Drawer>
	);
}
