import { useState } from "react";
import { GameEditDrawer } from "./GameEditDrawer";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { editGame } from "@api";
import { ChessGame } from "@types";
import editIcon from "/icons/edit.svg";
import { useTournamentStore } from "@/stores/tournament.store";

export function EditGame({ game }: { game: ChessGame }) {
	const [isOpen, setIsOpen] = useState(false);
	const players = useTournamentStore((state) => state.players);

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<button className="border rounded-md mx-4">
					<img src={editIcon} className="w-5 m-2" alt="Edit" />
				</button>
			</DrawerTrigger>
			<GameEditDrawer
				title={
					players.get(game.white_code)?.last_name +
					" vs " +
					players.get(game.black_code)?.last_name
				}
				desc="Edycja gry."
				onSubmit={(game) => {
					editGame(game.code || "", game);
					setIsOpen(false);
				}}
				initialGame={game}
			/>
		</Drawer>
	);
}
