import { CreateDrawer } from "../common";
import "@index.css";
import addIcon from "/icons/add.svg";
import { Button } from "@shadcn/button";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { useTournamentStore } from "@/lib/stores/tournament.store";
import { useAuthStore } from "@/lib/stores/auth.store";
import { ChessPlayer } from "@/lib/types";
import { useState } from "react";

export function CreatePlayerDrawer() {
	const [isOpen, setIsOpen] = useState(false);

	const getAuthorization = useAuthStore(
		(state: any) => state.getAuthorization
	);
	const tournament_code = useAuthStore((state: any) => state.tournament_code);
	const addPlayer = useTournamentStore((state) => state.addPlayer);

	const createPlayer = (formData: Record<string, any>) => {
		fetch(
			"http://localhost:3000/tournaments/" +
				tournament_code +
				"/players/",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: getAuthorization(),
				},
				body: JSON.stringify({
					name: formData.first_name,
					last_name: formData.last_name,
					rank: formData.rank,
					title: formData.title,
				}),
			}
		)
			.then((response) => {
				if (!response.ok) {
					alert(response.statusText);
					return;
				}

				return response.json();
			})
			.then((data) => {
				if (!data) {
					return;
				}

				addPlayer(
					new ChessPlayer(
						data.code,
						data.name,
						data.last_name,
						data.rank,
						data.title
					)
				);

				setIsOpen(false);
			})
			.catch((error) => {
				console.log(error);
			});
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
				onSubmit={createPlayer}
			/>
		</Drawer>
	);
}
