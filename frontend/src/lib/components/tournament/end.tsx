import "@index.css";
import { Link } from "react-router-dom";
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

export function EndTournament() {
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
					<Link to="/">
						<AlertDialogAction>Zakończ</AlertDialogAction>
					</Link>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
