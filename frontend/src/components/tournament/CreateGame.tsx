import { useState } from "react";
import createIcon from "/icons/create.svg";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shadcn/select";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { ChessPlayer } from "@types";
import { useTournamentStore } from "@/stores/tournament.store";
import { CommonEditDrawer } from "@components/common/EditDrawer";
import { addGame } from "@/api";

export function CreateGame() {
	const [isOpen, setIsOpen] = useState(false);

	const [white_code, setWhiteCode] = useState("");
	const [black_code, setBlackCode] = useState("");
	const [round, setRound] = useState(0);
	const [winner_code, setWinnerCode] = useState("NONE");

	const players = [...useTournamentStore((state) => state.players).values()];

	const onSubmit = () => {
		const game = addGame({
			white_code,
			black_code,
			round,
			...(winner_code != "NONE" && { winner_code }),
		});

		if (!game) return;
		setIsOpen(false);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<Button className="w-full">
					{" "}
					<img src={createIcon} className="w-5 m-2" alt="." />
					Utwórz grę
				</Button>
			</DrawerTrigger>
			<CommonEditDrawer
				title="Utwórz grę"
				desc="Tworzenie gry."
				onSubmit={onSubmit}
			>
				<div className="flex">
					<label className="min-w-[100px]"> Białe </label>
					<Select
						value={white_code}
						onValueChange={(e) => setWhiteCode(e)}
					>
						<SelectTrigger id="white_code">
							<SelectValue />
						</SelectTrigger>
						<SelectContent
							position="popper"
							className="max-h-[200px]"
						>
							{players.map((player: ChessPlayer) => (
								<SelectItem value={player.code || ""}>
									{player.name + " " + player.last_name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex">
					<label className="min-w-[100px]"> Czarne </label>
					<Select
						value={black_code}
						onValueChange={(e) => setBlackCode(e)}
					>
						<SelectTrigger id="black_code">
							<SelectValue />
						</SelectTrigger>
						<SelectContent
							position="popper"
							className="max-h-[200px]"
						>
							{players.map((player: ChessPlayer) => (
								<SelectItem value={player.code || ""}>
									{player.name + " " + player.last_name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex">
					<label className="min-w-[100px]"> Runda </label>
					<Input
						id="round"
						value={round}
						onChange={(e) =>
							setRound(parseInt(e.target.value) || 0)
						}
					/>
				</div>
				<div className="flex">
					<label className="min-w-[100px]"> Wygrany(a) </label>
					<Select
						value={winner_code}
						onValueChange={(e) => setWinnerCode(e)}
					>
						<SelectTrigger id="black_code">
							<SelectValue />
						</SelectTrigger>
						<SelectContent
							position="popper"
							className="max-h-[200px]"
						>
							<SelectItem value={"NONE"}>{"None"}</SelectItem>
							{players.map((player: ChessPlayer) => (
								<SelectItem value={player.code || ""}>
									{player.name + " " + player.last_name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CommonEditDrawer>
		</Drawer>
	);
}
