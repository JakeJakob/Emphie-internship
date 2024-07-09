import "@index.css";
import { Button } from "@shadcn/button";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@shadcn/alert-dialog";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { useTournamentStore } from "@/lib/stores/tournament.store";
import { endTournament } from "@/lib/api";

export function EndTournament() {
	const navigate = useNavigate();

	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const tournament_code = useTournamentStore((state) => state.code);
	const storeRemoveAuthorization = useAuthStore(
		(state) => state.removeAuthorization
	);
	const storeEndTournament = useTournamentStore(
		(state) => state.endTournament
	);

	const onEndTournament = async () => {
		const tournament = await endTournament(
			getAuthorization,
			storeEndTournament,
			storeRemoveAuthorization,
			tournament_code || ""
		);
		if (!tournament) return;

		navigate("/");
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">Zakończ turniej</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Czy na pewno chcesz zakończyć ten turniej?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Tej akcji nie da się odwrócić. Zakończony turniej nie
						zostaje nigdzie zapisany.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Anuluj</AlertDialogCancel>
					<AlertDialogAction onClick={onEndTournament}>
						Zakończ
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
