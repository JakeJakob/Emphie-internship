import React, { useState } from "react";
import { Input } from "@shadcn/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shadcn/select";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { ChessTitle, ChessPlayer } from "@types";
import { CommonEditDrawer } from "@components/common/EditDrawer";

interface PlayerFormProps {
	title: string;
	desc: string;
	trigger: React.ReactNode;
	onSubmit: (player: ChessPlayer) => void;
	initialPlayer?: Partial<ChessPlayer>;
}

export function PlayerForm({
	title,
	desc,
	trigger,
	onSubmit,
	initialPlayer = {},
}: PlayerFormProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState(initialPlayer.name || "");
	const [last_name, setLastName] = useState(initialPlayer.last_name || "");
	const [rank, setRank] = useState(initialPlayer.rank || 0);
	const [chess_title, setTitle] = useState(
		initialPlayer.title || ("NONE" as ChessTitle)
	);

	const handleSubmit = () => {
		const player = Object.assign(initialPlayer, {
			name,
			last_name,
			rank,
			title: chess_title,
		});

		onSubmit(player as ChessPlayer);
		setIsOpen(false);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<CommonEditDrawer title={title} desc={desc} onSubmit={handleSubmit}>
				<div className="flex">
					<label className="min-w-[100px]"> Imię </label>
					<Input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex">
					<label className="min-w-[100px]"> Nazwisko </label>
					<Input
						id="last_name"
						value={last_name}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="flex">
					<label className="min-w-[100px]"> Ranga </label>
					<Input
						id="rank"
						type="number"
						value={rank}
						onChange={(e) => setRank(parseInt(e.target.value))}
					/>
				</div>
				<div className="flex">
					<label className="min-w-[100px]"> Tytuł </label>
					<Select
						value={chess_title}
						onValueChange={(e) => setTitle(e as ChessTitle)}
					>
						<SelectTrigger id="title">
							<SelectValue />
						</SelectTrigger>
						<SelectContent
							position="popper"
							className="max-h-[200px]"
						>
							{Object.values(ChessTitle).map((title) => (
								<SelectItem key={title} value={title}>
									{title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CommonEditDrawer>
		</Drawer>
	);
}
