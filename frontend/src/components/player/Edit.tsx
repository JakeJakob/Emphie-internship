import { useState } from "react";
import editIcon from "/icons/edit.svg";
import { Input } from "@shadcn/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shadcn/select";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { ChessPlayer, ChessTitle } from "@types";
import { CommonEditDrawer } from "@components/common/EditDrawer";
import { editPlayer } from "@/api";

export function EditPlayer(props: { player: ChessPlayer }) {
	const [isOpen, setIsOpen] = useState(false);

	const [name, setName] = useState(props.player.name);
	const [last_name, setLastName] = useState(props.player.last_name);
	const [rank, setRank] = useState(props.player.rank);
	const [title, setTitle] = useState(props.player.title);

	const onSubmit = () => {
		const player = editPlayer(props.player.code || "", {
			name,
			last_name,
			rank,
			title,
		});

		if (!player) return;
		setIsOpen(false);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<button className=" border rounded-md mx-4">
					<img src={editIcon} className="w-5 m-2 " alt="." />
				</button>
			</DrawerTrigger>
			<CommonEditDrawer
				title={props.player.name + " " + props.player.last_name}
				desc="Edycja danych użytkownika."
				onSubmit={onSubmit}
			>
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
						id="Rank"
						type="number"
						value={rank}
						onChange={(e) => setRank(parseInt(e.target.value))}
					/>
				</div>
				<div className="flex">
					<label className="min-w-[100px]"> Tytuł </label>
					<Select
						value={title}
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
