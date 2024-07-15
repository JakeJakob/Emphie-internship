import { CreateDrawer } from "../common/CreateDrawerContent";
import createFlagIcon from "/icons/create.svg";
import { Button } from "@shadcn/button";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { useAuthStore } from "@stores/auth.store";
import { useTournamentStore } from "@stores/tournament.store";
import { addGame } from "@api";
import { useState } from "react";

export function CreateGameDrawer() {
	const [isOpen, setIsOpen] = useState(false);

	const players = useTournamentStore((state) => state.players);

	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const tournament_code = useTournamentStore((state) => state.code);
	const storeAddGame = useTournamentStore((state) => state.addGame);

	const onAddGame = (formData: Record<string, string>) => {
		const game = addGame(
			getAuthorization,
			storeAddGame,
			tournament_code || "",
			{
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
					<img src={createFlagIcon} className="w-5 m-2" alt="." />
					Utwórz grę
				</Button>
			</DrawerTrigger>
			<CreateDrawer
				header="Utwórz grę"
				description="Tworzenie gry."
				fields={[
					{
						name: "Białe",
						id: "white_player",
						type: "select",
						options: [...players.values()].map((t) => ({
							id: t.code || "",
							text: t.name + " " + t.last_name,
						})),
					},
					{
						name: "Czarne",
						id: "black_player",
						type: "select",
						options: [...players.values()].map((t) => ({
							id: t.code || "",
							text: t.name + " " + t.last_name,
						})),
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
						type: "select",
						options: [...players.values()].map((t) => ({
							id: t.code || "",
							text: t.name + " " + t.last_name,
						})),
						required: false,
					},
				]}
				onSubmit={onAddGame}
			/>
		</Drawer>
	);
}
