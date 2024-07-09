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

export function EndTournament() {
	const navigate = useNavigate();

	const removeAuthorization = useAuthStore(
		(state) => state.removeAuthorization
	);
	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const tournament_code = useAuthStore((state) => state.tournament_code);

	const endTournamentStore = useTournamentStore(
		(state) => state.endTournament
	);

	const endTournament = () => {
		fetch("http://localhost:3000/tournaments/" + tournament_code, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: getAuthorization(),
			},
		})
			.then((response) => {
				if (!response.ok) {
					alert(response.statusText);
					return;
				}

				return response.json();
			})
			.then((data) => {
				if (!data) {
					return;
				}

				endTournamentStore();
				removeAuthorization();

				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
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
					<AlertDialogAction onClick={endTournament}>
						Zakończ
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
