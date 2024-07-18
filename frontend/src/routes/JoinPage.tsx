import { getTournament } from "@/api";
import { useAuthStore } from "@/stores/auth.store";
import { TokenType } from "@/types";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function JoinAsJudgePage() {
	const navigate = useNavigate();
	const location = useLocation();

	const setAuth = useAuthStore((state) => state.setAuth);

	useEffect(() => {
		const token = location.pathname.split("/")[3];
		const [tournament_code, judge_code] = token.split("+");

		localStorage.clear();
		setAuth({
			token_type: TokenType.Judge,
			tournament_code,
			judge_code,
		});

		const fetchTournamentAndNavigate = async () => {
			const tournament = await getTournament(tournament_code);
			if (tournament) navigate(`/tournament/${tournament.code}`);
		};

		fetchTournamentAndNavigate();
	}, [location, navigate, setAuth]);

	return <h1>Redirecting...</h1>;
}
