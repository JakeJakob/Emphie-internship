import { Button } from "@shadcn/button";
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@shadcn/drawer";
import { ReactNode } from "react";

export function CommonEditDrawer(props: {
	title: string;
	desc: string;
	children: ReactNode;
	onSubmit: () => void;
}) {
	return (
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>{props.title}</DrawerTitle>
				<DrawerDescription>{props.desc}</DrawerDescription>
			</DrawerHeader>

			<form className="flex flex-col min-w-full my-4 px-4 gap-2">
				{props.children}
			</form>

			<DrawerFooter>
				<Button className="w-full" onClick={props.onSubmit}>
					Zapisz
				</Button>
				<DrawerClose>
					<Button variant="outline" className="w-full">
						Anuluj
					</Button>
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	);
}
