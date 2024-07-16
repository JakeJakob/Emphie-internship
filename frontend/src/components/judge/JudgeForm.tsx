import React, { useState } from "react";
import { Input } from "@shadcn/input";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";
import { ChessJudge } from "@types";
import { CommonEditDrawer } from "@components/common/EditDrawer";

interface JudgeFormProps {
	title: string;
	desc: string;
	trigger: React.ReactNode;
	onSubmit: (judge: ChessJudge) => void;
	initialJudge?: Partial<ChessJudge>;
}

export function JudgeForm({
	title,
	desc,
	trigger,
	onSubmit,
	initialJudge = {},
}: JudgeFormProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState(initialJudge.name || "");

	const handleSubmit = () => {
		const judge = Object.assign(initialJudge, {
			name,
		});

		onSubmit(judge as ChessJudge);
		setIsOpen(false);
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<CommonEditDrawer title={title} desc={desc} onSubmit={handleSubmit}>
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
