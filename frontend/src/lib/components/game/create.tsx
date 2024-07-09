import { CreateDrawer } from "../common";
import "../../../index.css";
import addGame from "/icons/create.svg";
import { Button } from "@/lib/components/shadcn/button";
import { Drawer, DrawerTrigger } from "@/lib/components/shadcn/drawer";

export function CreateGameDrawer() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button>
					{" "}
					<img src={addGame} className="w-5 m-2" alt="." />
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
				onSubmit={() => {}}
			/>
		</Drawer>
	);
}
