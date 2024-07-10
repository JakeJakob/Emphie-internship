import { Input } from "@shadcn/input";
import { Button } from "@shadcn/button";
import { Card, CardContent, CardDescription, CardHeader } from "@shadcn/card";
import { useAuthStore } from "@stores/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TokenType } from "@types";
import { getTournament } from "@api";
import { useTournamentStore } from "@stores/tournament.store";

export function JoinAsJudgeCard() {
	const [tournament_code, setTournamentCode] = useState("");
	const [judge_code, setJudgeCode] = useState("");
	const navigate = useNavigate();

	const setAuth = useAuthStore((state) => state.setAuth);
	const getAuthorization = useAuthStore((state) => state.getAuthorization);
	const storeAddTournament = useTournamentStore(
		(state) => state.addTournament
	);

	const onJoinAsJudge = async () => {
		localStorage.clear();
		setAuth({
			token_type: TokenType.Judge,
			tournament_code: tournament_code,
			judge_code: judge_code,
		});

		const tournament = await getTournament(
			getAuthorization,
			storeAddTournament,
			tournament_code
		);

		if (!tournament) return;
		navigate("/tournament/" + tournament.code);
	};

	return (
		<Card className="w-xs max-w-[400px]">
			<CardHeader>
				<CardDescription>
					{" "}
					Ta opcja pozwala na dołączenie do istniejącego turnieju i
					wprowadzanie zmian w jego wynikach.{" "}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<label htmlFor="tournament_code">
					<p className="mb-1  font-medium"> Kod turnieju </p>
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
						className="mt-1 mb-1 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
					>
						Błędny kod dostępu
					</span>
				</label>

				<label htmlFor="judge_code">
					<p className="mb-1 mt-1 font-medium"> Kod sędzi </p>
					<Input
						value={judge_code}
						onChange={(e) => {
							setJudgeCode(e.target.value);
						}}
						type="text"
						id="judge_code"
						placeholder="np. 5GAAA67"
						className="... peer invalid:[&:not(:placeholder-shown):not(:focus)]"
						required
					/>
					<span
						id="error-msg"
						className="mt-1 mb-1 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
					>
						Błędny kod sędzi
					</span>

					<Button className="mt-3" onClick={onJoinAsJudge}>
						{" "}
						Dołącz{" "}
					</Button>
				</label>
			</CardContent>
		</Card>
	);
}
