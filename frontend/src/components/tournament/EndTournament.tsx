import { useNavigate } from "react-router-dom";
import { CommonDeletePopup } from "@components/common/DeletePopup";
import { endTournament } from "@/api";
import { Button } from "@shadcn/button";

export function EndTournament() {
	const navigate = useNavigate();

	return (
		<CommonDeletePopup
			trigger={<Button variant="destructive">Zakończ turniej</Button>}
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
