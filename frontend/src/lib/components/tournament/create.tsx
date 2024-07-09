import "@index.css";
import { Input } from "@shadcn/input";
import { Button } from "@shadcn/button";
import { useAuthStore } from "@lib/stores/auth.store";
import { TokenType } from "@types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader } from "@shadcn/card";
import { useTournamentStore } from "@/lib/stores/tournament.store";

export function CreateTournamentCard() {
	const [access_key, setAccessKey] = useState("");
	const [tournament_name, setTournamentName] = useState("");
	const navigate = useNavigate();

	const setTokenType = useAuthStore((state) => state.setTokenType);
	const setAuthAccessKey = useAuthStore((state) => state.setAccessKey);
	const setTournamentCode = useAuthStore((state) => state.setTournamentCode);
	const createTournamentStore = useTournamentStore(
		(state) => state.createTournament
	);

	const createTournament = () => {
		fetch("http://localhost:3000/tournaments", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + access_key,
			},
			body: JSON.stringify({
				name: tournament_name,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					alert(response.statusText);
					return;
				}

				return response.json();
			})
			.then((data) => {
				if (!data) {
					return;
				}

				setTokenType(TokenType.Admin);
				setAuthAccessKey(access_key);
				setTournamentCode(data.code);

				createTournamentStore(data.code, data.name);

				navigate("/tournament/" + data.code);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Card className="w-xs max-w-[400px]">
			<CardHeader>
				<CardDescription>
					{" "}
					Ta opcja pozwala na utworzenie nowego turnieju do którego
					mogą dołączyć się sędziowie.{" "}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<label htmlFor="access_key">
					<p className="mb-1  font-medium"> Kod Dostępu </p>
					<Input
						value={access_key}
						onChange={(e) => {
							setAccessKey(e.target.value);
						}}
						type="text"
						id="access_key"
						placeholder="np. YWK8HNiW374JL2YfNWD5JzW1b5rEBm"
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

				<label htmlFor="tournament_name">
					<p className="mb-1 mt-1 font-medium"> Nazwa turnieju </p>
					<Input
						value={tournament_name}
						onChange={(e) => {
							setTournamentName(e.target.value);
						}}
						type="text"
						id="tournament_name"
						placeholder="np. Wielkie przykładowe mistrzostwa"
						className="... peer invalid:[&:not(:placeholder-shown):not(:focus)]"
						required
						pattern=".{6,36}"
					/>
					<span
						id="error-msg"
						className="mt-1 mb-1 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
					>
						nazwa turnieju musi mieć od 6 do 36 znaków
					</span>
					<Button className="mt-3" onClick={createTournament}>
						{" "}
						Dołącz{" "}
					</Button>
				</label>
			</CardContent>
		</Card>
	);
}
