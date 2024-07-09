import { useTournamentStore } from "@/lib/stores/tournament.store";
import { ListCard } from "../common";

export function JudgeListCard() {
	const judge_names = [
		...useTournamentStore((state) => state.judges).values(),
	].map((judge) => judge.name);

	return (
		<ListCard
			header="Sędziowie"
			items={judge_names}
			show_all_path="./players"
		/>
	);
}
