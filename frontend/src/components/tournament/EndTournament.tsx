import { useNavigate } from "react-router-dom";
import { CommonDeletePopup } from "@components/common/DeletePopup";
import { endTournament } from "@/api";

export function EndTournament() {
	const navigate = useNavigate();

	return (
		<CommonDeletePopup
			title="Zakończ turniej"
			confirmation_text="Czy na pewno chcesz zakończyć ten turniej?"
			warning_text="Tej akcji nie da się odwrócić. Zakończony turniej nie zostaje nigdzie zapisany."
			submit_text="Zakończ"
			onSubmit={async () => {
				const tournament = await endTournament();

				if (!tournament) return;

				navigate("/");
			}}
		/>
	);
}
