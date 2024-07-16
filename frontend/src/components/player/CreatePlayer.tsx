import { ReactNode } from "react";
import { PlayerForm } from "./PlayerForm";
import { addPlayer } from "@api";

export function CreatePlayer({ trigger }: { trigger: ReactNode }) {
	return (
		<PlayerForm
			title="Dodaj Gracza"
			desc="Dodawanie danych użytkownika."
			trigger={trigger}
			onSubmit={(player) => addPlayer(player)}
		/>
	);
}
