import React, { useState } from "react";
import { Input } from "@shadcn/input";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { ChessGame, ChessPlayer } from "@types";
import { CommonEditDrawer } from "@components/common/EditDrawer";
import { useTournamentStore } from "@stores/tournament.store";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shadcn/select";

interface JudgeFormProps {
	title: string;
	desc: string;
	trigger: React.ReactNode;
	onSubmit: (game: ChessGame) => void;
	initialGame?: Partial<ChessGame>;
}

export function JudgeForm({
	title,
	desc,
	trigger,
	onSubmit,
	initialGame = {},
}: JudgeFormProps) {
	const [isOpen, setIsOpen] = useState(false);

	const [white_code, setWhiteCode] = useState(initialGame.white_code || "");
	const [black_code, setBlackCode] = useState(initialGame.black_code || "");
	const [round, setRound] = useState(initialGame.round || 0);
	const [winner_code, setWinnerCode] = useState(
		initialGame.winner_code || "NONE"
	);

	const players = [...useTournamentStore((state) => state.players).values()];
	const playerSelectOptions = players.map((player: ChessPlayer) => (
		<SelectItem value={player.code || ""}>
			{player.name + " " + player.last_name}
		</SelectItem>
	));

	const handleSubmit = () => {
		const game = Object.assign(initialGame, {
			white_code,
			black_code,
			round,
			...(winner_code != "NONE" && { winner_code }),
		});

		onSubmit(game as ChessGame);
		setIsOpen(false);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<CommonEditDrawer title={title} desc={desc} onSubmit={handleSubmit}>
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
							{playerSelectOptions}
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
							{playerSelectOptions}
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
							{playerSelectOptions}
						</SelectContent>
					</Select>
				</div>
			</CommonEditDrawer>
		</Drawer>
	);
}
