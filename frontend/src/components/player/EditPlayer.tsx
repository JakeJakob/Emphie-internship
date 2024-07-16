import { useState } from "react";
import { PlayerEditDrawer } from "./PlayerEditDrawer";
import { editPlayer } from "@api";
import { ChessPlayer } from "@types";
import editIcon from "/icons/edit.svg";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";

export function EditPlayer({ player }: { player: ChessPlayer }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<button className="border rounded-md mx-4">
					<img src={editIcon} className="w-5 m-2" alt="Edit" />
				</button>
			</DrawerTrigger>
			<PlayerEditDrawer
				title={`${player.name} ${player.last_name}`}
				desc="Edycja danych użytkownika."
				onSubmit={(player) => {
					editPlayer(player.code || "", player);
					setIsOpen(false);
				}}
				initialPlayer={player}
			/>
		</Drawer>
	);
}
