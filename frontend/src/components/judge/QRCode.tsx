import { useState } from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from "@shadcn/drawer";
import linkIcon from "/icons/link.svg";
import { Button } from "../shadcn/button";
import { ChessJudge } from "@/types";
import { useTournamentStore } from "@/stores/tournament.store";
import QRCode from "react-qr-code";

export function QRCodeJoin({ judge }: { judge: ChessJudge }) {
	const [isOpen, setIsOpen] = useState(false);

	const tournament_code = useTournamentStore((state) => state.code);

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<button className="align-right border rounded-md">
					<img src={linkIcon} className="w-5 m-2 " alt="." />
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 content-center mx-auto">
						<p className="text-4xl font-semibold">{judge.name}</p>
						<p className="text-sm text-muted-foreground mt-2">
							Kod sędzi:
						</p>
						<h1>{judge.code}</h1>
						<p className="text-sm text-muted-foreground mt-2">
							Kod turnieju:
						</p>
						<h1>{tournament_code}</h1>
					</div>
					<div className="p-4 content-center">
						<QRCode
							className="h-2/3"
							value={`http://localhost:5173/tournament/${tournament_code}/joinAsJudge/${judge.code}`}
						/>
					</div>
				</div>
				<DrawerFooter>
					<DrawerClose>
						<Button variant="outline" className="w-full">
							Zamknij
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
