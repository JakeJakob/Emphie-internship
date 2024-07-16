import { ReactNode, useState } from "react";
import { Input } from "@shadcn/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shadcn/select";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { ChessTitle } from "@types";
import { CommonEditDrawer } from "@components/common/EditDrawer";
import { addPlayer } from "@/api";

export function CreatePlayer(props: { trigger: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	const [name, setName] = useState("");
	const [last_name, setLastName] = useState("");
	const [rank, setRank] = useState(0);
	const [title, setTitle] = useState("NONE" as ChessTitle);

	const onSubmit = () => {
		const player = addPlayer({
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
			<DrawerTrigger asChild>{props.trigger}</DrawerTrigger>
			<CommonEditDrawer
				title="Dodaj Gracza"
				desc="Dodawanie danych użytkownika."
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
