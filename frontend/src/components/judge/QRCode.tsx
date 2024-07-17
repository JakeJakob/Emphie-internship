import { useState } from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTitle,
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
				<DrawerTitle></DrawerTitle>
				<div className="flex flex-wrap justify-evenly">
					<div className="content-center">
						<div>
							<p className="text-4xl font-semibold mt-2">
								{judge.name}
							</p>
						</div>
						<div className='text-muted-foreground text-lg'>
							<p className="text-lg text-muted-foreground mt-4">
								Kod sędzi:
							</p>
							<h1 className="font-bold">{judge.code}</h1>
							<p className="text-lg text-muted-foreground mt-2">
								Kod turnieju:
							</p>
							<h1 className="font-bold">{tournament_code}</h1>
						</div>
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
