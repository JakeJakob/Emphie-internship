import { useState } from "react";
import refIcon from "/icons/ref.svg";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { CommonEditDrawer } from "@components/common/EditDrawer";
import { addJudge } from "@/api";

export function CreateJudge() {
	const [isOpen, setIsOpen] = useState(false);

	const [name, setName] = useState("");

	const onSubmit = () => {
		const judge = addJudge({
			name,
		});

		if (!judge) return;
		setIsOpen(false);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<Button className="w-full">
					{" "}
					<img src={refIcon} className="w-5 m-2" alt="." />
					Dodaj sędzię
				</Button>
			</DrawerTrigger>
			<CommonEditDrawer
				title="Dodaj sędzie"
				desc="Dodawanie nowego sędzi"
				onSubmit={onSubmit}
			>
				<div className="flex">
					<label className="min-w-[100px]"> Nazwa </label>
					<Input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
			</CommonEditDrawer>
		</Drawer>
	);
}
