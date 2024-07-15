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

			<div className="p-4 ml-12 mr-12">{props.children}</div>

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
