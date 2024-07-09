import { CreateDrawer } from "../common";
import "../../../index.css";
import addJudge from "/icons/ref.svg";
import { Button } from "@/lib/components/shadcn/button";
import { Drawer, DrawerTrigger } from "@/lib/components/shadcn/drawer";

export function CreateJudgeDrawer() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button>
					{" "}
					<img src={addJudge} className="w-5 m-2" alt="." />
					Dodaj sędzię
				</Button>
			</DrawerTrigger>
			<CreateDrawer
				header="Dodaj sędzię"
				description="Dodawanie nowego sędzi."
				// TODO: Dropdown menu
				fields={[
					{
						name: "Nazwa",
						id: "name",
						placeholder: "Mateusz Nowak",
					},
				]}
			/>
		</Drawer>
	);
}
