import { useState } from "react";
import { Input } from "@shadcn/input";
import { ChessJudge } from "@types";
import { CommonEditDrawer } from "@components/common/EditDrawer";

interface JudgeEditDrawerProps {
	title: string;
	desc: string;
	onSubmit: (judge: ChessJudge) => void;
	initialJudge?: Partial<ChessJudge>;
}

export function JudgeEditDrawer({
	title,
	desc,
	onSubmit,
	initialJudge = {},
}: JudgeEditDrawerProps) {
	const [name, setName] = useState(initialJudge.name || "");

	const handleSubmit = () => {
		const judge: ChessJudge = Object.assign(initialJudge, {
			name,
		});

		onSubmit(judge);
	};

	return (
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
	);
}
