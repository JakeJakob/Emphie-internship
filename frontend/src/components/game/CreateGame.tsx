import { ReactNode } from "react";
import { JudgeForm } from "./GameForm";
import { addGame } from "@api";

export function CreateGame({ trigger }: { trigger: ReactNode }) {
	return (
		<JudgeForm
			title="Utwórz grę"
			desc="Tworzenie gry."
			trigger={trigger}
			onSubmit={(game) => addGame(game)}
		/>
	);
}
