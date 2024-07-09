import { useTournamentStore } from "@/lib/stores/tournament.store";
import "@index.css";
import { Card, CardContent, CardHeader } from "@shadcn/card";

export function TournamentInfoCard() {
	const code = useTournamentStore((state) => state.code);
	const name = useTournamentStore((state) => state.name);

	return (
		<Card className="h-min">
			<CardHeader>
				<p className="text-4xl font-semibold">{" " + name + " "}</p>
			</CardHeader>
			<CardContent className="mt-5">
				<p className="text-lg">Kod turnieju:</p>
				<h1 className="text-2xl font-bold">{code}</h1>
			</CardContent>
		</Card>
	);
}
