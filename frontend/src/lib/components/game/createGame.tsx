import { CreateDrawer } from "../common";
import "@index.css";
import createIcon from "/icons/create.svg";
import { Button } from "@/lib/components/shadcn/button";
import { Drawer, DrawerTrigger } from "@/lib/components/shadcn/drawer";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useTournamentStore } from "@/lib/stores/tournament.store";
import { addGame } from "@/lib/api";
import { useState } from "react";

export function CreateGameDrawer() {
	const [isOpen, setIsOpen] = useState(false);

	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const tournament_code = useTournamentStore((state) => state.code);
	const storeAddGame = useTournamentStore((state) => state.addGame);

	const onAddGame = (formData: Record<string, string>) => {
		const game = addGame(
			getAuthorization,
			storeAddGame,
			tournament_code || "",
			{
				code: "",
				white_code: formData.white_player || "",
				black_code: formData.black_player || "",
				round: parseInt(formData.round) || 0,
				winner_code: formData.winner,
			}
		);

		if (!game) return;
		setIsOpen(false);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<Button>
					{" "}
					<img src={createIcon} className="w-5 m-2" alt="." />
					Utwórz grę
				</Button>
			</DrawerTrigger>
			<CreateDrawer
				header="Utwórz grę"
				description="Tworzenie gry."
				// TODO: Dropdown menu
				fields={[
					{
						name: "Białe",
						id: "white_player",
						placeholder: "Mateusz Nowak",
					},
					{
						name: "Czarne",
						id: "black_player",
						placeholder: "Mateusz Nowak",
					},
					{
						name: "Runda",
						id: "round",
						type: "number",
						placeholder: "1",
					},
					{
						name: "Wygrana",
						id: "winner",
						placeholder: "",
						required: false,
					},
				]}
				onSubmit={onAddGame}
			/>
		</Drawer>
	);
}
