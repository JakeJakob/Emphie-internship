import { Card, CardContent, CardHeader } from "@shadcn/card";

export function TournamentInfoCard(props: { name: string; code: string }) {
	return (
		<Card className="min-h-96">
			<CardHeader>
				<p className="text-4xl font-semibold">{props.name}</p>
			</CardHeader>
			<CardContent className="mt-5">
				<p className="text-lg">Kod turnieju:</p>
				<h1 className="text-2xl font-bold">{props.code}</h1>
			</CardContent>
		</Card>
	);
}
