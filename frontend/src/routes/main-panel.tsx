import "@index.css";
import { PlayerListCard } from "@components/player";
import { GameListCard } from "@components/game";
import { JudgeListCard } from "@components/judge";
import { ActionListCard, TournamentInfoCard } from "@components/tournament";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useTournamentStore } from "@/lib/stores/tournament.store";
import { getPlayers, getGames, getJudges } from "@/lib/api";

function LandingPage() {
  const getAuthorization = useAuthStore((state) => state.getAuthorization);
  const tournament_code = useTournamentStore((state) => state.code);
  const token_type = useAuthStore((state) => state.token_type);

  const storeAddPlayer = useTournamentStore((state) => state.addPlayer);
  const storeAddGame = useTournamentStore((state) => state.addGame);
  const storeAddJudge = useTournamentStore((state) => state.addJudge);

  if (tournament_code) {
    getPlayers(getAuthorization, storeAddPlayer, tournament_code);
    getGames(getAuthorization, storeAddGame, tournament_code);
    getJudges(getAuthorization, storeAddJudge, tournament_code);
  }

  return (
    <>
      <div className="min-h-screen p-0.5 box-border">
        <div className="max-w-screen py-1 px-6 border box-border">
          <h1 className="text-project_primary text-2xl font-bold my-3 font-ptSans">
            {" "}
            Scoreboard{" "}
          </h1>
        </div>

        <div className="grid  md:grid-cols-4 grid-cols-none gap-4 p-4 ">
          <TournamentInfoCard />
          <ActionListCard token_type={token_type} />

          <GameListCard />
          <JudgeListCard />
          <PlayerListCard />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
