import { Input } from "@shadcn/input";
import { Button } from "@shadcn/button";
import { Card, CardContent, CardDescription, CardHeader } from "@shadcn/card";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TokenType } from "@/lib/types";
import { getTournament } from "@/lib/api";
import { useTournamentStore } from "@/lib/stores/tournament.store";

export function JoinAsGuestCard() {
	const [tournament_code, setTournamentCode] = useState("");
	const navigate = useNavigate();

	const setAuth = useAuthStore((state) => state.setAuth);
	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const storeAddTournament = useTournamentStore(
		(state) => state.addTournament
	);

	const onJoinAsGuest = async () => {
		localStorage.clear();
		setAuth({
			token_type: TokenType.Guest,
			tournament_code: tournament_code,
		});

		const tournament = await getTournament(
			getAuthorization,
			storeAddTournament,
			tournament_code
		);

		if (!tournament) return;
		navigate("/tournament/" + tournament.code + "/scoreboard");
	};

	return (
		<Card className="w-xs text-sm">
			<CardHeader>
				<CardDescription>
					{" "}
					Ta opcja pozwala na wyświetlenie istniejącego turnieju.{" "}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<label htmlFor="tournament_code">
					<p className="mb-1 font-medium"> Kod turnieju </p>
					<Input
						value={tournament_code}
						onChange={(e) => {
							setTournamentCode(e.target.value);
						}}
						type="text"
						id="tournament_code"
						placeholder="np. AX46BF"
						className="... peer invalid:[&:not(:placeholder-shown):not(:focus)]"
						required
					/>
					<span
						id="error-msg"
						className="mt-2 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
					>
						Błędny kod dostępu
					</span>
				</label>
				<Button
					onClick={onJoinAsGuest}
					type="submit"
					className="... mt-3 group-invalid:pointer-events-none group-invalid"
				>
					{" Wyświetl "}
				</Button>
			</CardContent>
		</Card>
	);
}
