import { CreateDrawer } from "../common";
import "@index.css";
import judgeIcon from "/icons/judge.svg";
import { Button } from "@shadcn/button";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useTournamentStore } from "@/lib/stores/tournament.store";
import { useState } from "react";
import { addJudge } from "@lib/api";

export function CreateJudgeDrawer() {
	const [isOpen, setIsOpen] = useState(false);

	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const tournament_code = useTournamentStore((state) => state.code);
	const storeAddJudge = useTournamentStore((state) => state.addJudge);

	const onAddJudge = (formData: Record<string, string>) => {
		const judge = addJudge(
			getAuthorization,
			storeAddJudge,
			tournament_code || "",
			{
				name: formData.name || "",
			}
		);

		if (!judge) return;
		setIsOpen(false);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<Button>
					{" "}
					<img src={judgeIcon} className="w-5 m-2" alt="." />
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
				onSubmit={onAddJudge}
			/>
		</Drawer>
	);
}
