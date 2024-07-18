import { ReactNode, useState } from "react";
import { GameEditDrawer } from "./GameEditDrawer";
import { addGame } from "@api";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";

export function CreateGame({ trigger }: { trigger: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<GameEditDrawer
				title="Utwórz grę"
				desc="Tworzenie gry."
				onSubmit={(game) => {
					addGame(game);
					setIsOpen(false);
				}}
			/>
		</Drawer>
	);
}
