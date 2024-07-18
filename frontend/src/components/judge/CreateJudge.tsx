import { ReactNode, useState } from "react";
import { JudgeEditDrawer } from "./JudgeEditDrawer";
import { addJudge } from "@api";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";

export function CreateJudge({ trigger }: { trigger: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<JudgeEditDrawer
				title="Dodaj sędzię"
				desc="Dodawanie nowego sędzi"
				onSubmit={(judge) => {
					addJudge(judge);
					setIsOpen(false);
				}}
			/>
		</Drawer>
	);
}
