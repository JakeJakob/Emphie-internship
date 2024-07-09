import { ListCard } from "../common";

export function JudgeListCard() {
	return (
		<ListCard
			header="Sędziowie"
			items={[
				"Mateusz Nowak",
				"Franciszek Łopuszański",
				"Jacek Soplica",
				"Cezary Michalak",
				"Adrian Piętka",
			]}
			show_all_path="./players"
		/>
	);
}
