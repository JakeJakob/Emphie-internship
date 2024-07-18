import { ReactNode } from "react";
import { Button } from "@shadcn/button";
import { Card, CardContent, CardDescription, CardHeader } from "@shadcn/card";

export function JoinFormCard(props: {
	desc: string;
	children: ReactNode;
	submit_text: string;
	onSubmit: () => void;
}) {
	return (
		<Card className="w-xs max-w-[400px]">
			<CardHeader>
				<CardDescription>{props.desc}</CardDescription>
			</CardHeader>

			<CardContent>
				{props.children}

				<Button className="mt-3" onClick={props.onSubmit}>
					{props.submit_text}
				</Button>
			</CardContent>
		</Card>
	);
}
