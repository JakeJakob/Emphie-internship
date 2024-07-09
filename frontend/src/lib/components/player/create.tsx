import { CreateDrawer } from "../common";
import "@index.css";
import addIcon from "/icons/add.svg";
import { Button } from "@shadcn/button";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { useTournamentStore } from "@/lib/stores/tournament.store";
import { useAuthStore } from "@/lib/stores/auth.store";
import { ChessTitle } from "@/lib/types";
import { useState } from "react";

import { addPlayer } from "@lib/api";

export function CreatePlayerDrawer() {
	const [isOpen, setIsOpen] = useState(false);

	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const tournament_code = useTournamentStore((state) => state.code);
	const storeAddPlayer = useTournamentStore((state) => state.addPlayer);

	const onAddPlayer = (formData: Record<string, string>) => {
		const player = addPlayer(
			getAuthorization,
			storeAddPlayer,
			tournament_code || "",
			{
				code: "",
				name: formData.first_name || "",
				last_name: formData.last_name || "",
				rank: parseInt(formData.rank) || 0,
				title: (formData.title as ChessTitle) || ChessTitle.GM,
			}
		);

		if (!player) return;
		setIsOpen(false);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<Button>
					{" "}
					<img src={addIcon} className="w-5 m-2" alt="." />
					Dodaj gracza
				</Button>
			</DrawerTrigger>
			<CreateDrawer
				header="Dodaj Gracza"
				description="Dodawanie danych użytkownika."
				fields={[
					{
						name: "Imię",
						id: "first_name",
						placeholder: "Mateusz",
					},
					{
						name: "Nazwisko",
						id: "last_name",
						placeholder: "Nowak",
					},
					{
						name: "Ranga",
						id: "rank",
						type: "number",
						placeholder: "2000",
					},
					{
						name: "Tytuł",
						id: "title",
						placeholder: "GM",
					},
				]}
				onSubmit={onAddPlayer}
			/>
		</Drawer>
	);
}
