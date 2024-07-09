import { ListCard } from "../common";

export function PlayerListCard() {
	return (
		<ListCard
			header="Gracze"
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
