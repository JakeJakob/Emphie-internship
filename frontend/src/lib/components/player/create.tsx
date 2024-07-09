import { CreateDrawer } from "../common";
import "../../../index.css";
import addPlayer from "/icons/add.svg";
import { Button } from "@/lib/components/shadcn/button";
import { Drawer, DrawerTrigger } from "@/lib/components/shadcn/drawer";

export function CreatePlayerDrawer() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button>
					{" "}
					<img src={addPlayer} className="w-5 m-2" alt="." />
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
			/>
		</Drawer>
	);
}
