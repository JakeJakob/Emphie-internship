import { ReactNode, useState } from "react";
import { PlayerEditDrawer } from "./PlayerEditDrawer";
import { addPlayer } from "@api";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";

export function CreatePlayer({ trigger }: { trigger: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<PlayerEditDrawer
				title="Dodaj Gracza"
				desc="Dodawanie danych użytkownika."
				onSubmit={(player) => {
					addPlayer(player);
					setIsOpen(false);
				}}
			/>
		</Drawer>
	);
}
