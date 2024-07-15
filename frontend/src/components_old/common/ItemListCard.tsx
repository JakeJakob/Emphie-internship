import { Button } from "@shadcn/button";
import { Card, CardContent, CardHeader } from "@shadcn/card";
import { Link } from "react-router-dom";

export function ListCard(props: {
	header: string;
	items: string[];
	show_all_path: string;
}) {
	return (
		<Card className="min-h-96">
			<CardHeader>
				<p className="text-xl font-semibold">{props.header}</p>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{props.items.slice(0, 5).map((item: string, index: number) => (
					<p
						key={index}
						className="border w-full p-2 font-bold pl-3 rounded-sm"
					>
						{item}
					</p>
				))}
				{props.items.length > 5 && (
					<Link to={props.show_all_path}>
						<Button className="w-full"> Pokaż wszystkich </Button>
					</Link>
				)}
			</CardContent>
		</Card>
	);
}
