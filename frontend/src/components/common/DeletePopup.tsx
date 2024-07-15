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

export function CommonDeletePopup(props: {
	title: string;
	confirmation_text: string;
	warning_text: string;
	submit_text: string;
	onSubmit: () => void;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">{props.title}</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{props.confirmation_text}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{props.warning_text}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Anuluj</AlertDialogCancel>
					<AlertDialogAction onClick={props.onSubmit}>
						{props.submit_text}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
