import { ReactNode } from "react";
import { JudgeForm } from "./JudgeForm";
import { addJudge } from "@api";

export function CreateJudge({ trigger }: { trigger: ReactNode }) {
	return (
		<JudgeForm
			title="Dodaj sędzię"
			desc="Dodawanie nowego sędzi"
			trigger={trigger}
			onSubmit={(judge) => addJudge(judge)}
		/>
	);
}
