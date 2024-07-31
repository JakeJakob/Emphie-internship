import scoreLogo from "/chessgrowWhite.svg";
import { useTournamentStore } from "@stores/tournament.store";
import { PlayerBadge } from "@/components/player/PlayerBadge";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PendingGamesPage() {
  const players = useTournamentStore((state) => state.players);
  const games = useTournamentStore((state) => state.games);
  const tournament_name = useTournamentStore((state) => state.name);

  const pending_games = [...games.values()].filter(
    (game) => game.winner_id == undefined,
  );

  const navigate = useNavigate();

  const tournament_id = useTournamentStore((state) => state.code);

  useEffect(() => {
    setTimeout(() => {
      navigate(`/tournament/${tournament_id}/scoreboard/finished`);
    }, 10000);
  });

  return (
    <div className="relative h-screen overflow-hidden bg-custom bg-[url('/chessgrowLogo.svg')] bg-right bg-no-repeat px-4 pt-4">
      <div className="h-frame48-height w-screen">
        <div className="flex h-frame32-height w-screen items-center">
          <p className="font-sans text-6xl font-bold text-white">
            W trakcie gry
          </p>
          <div className="h-82.82 mr-4 border-l border-white"></div>
          <p className="font-sans text-6xl font-normal text-white">
            {" | " + tournament_name}
          </p>
        </div>
        <hr className="mt-3 w-hr2-width border-2 text-white" />
      </div>

      <div className="mt-11 flex h-[660px] flex-col items-center gap-6 overflow-y-auto">
        {pending_games.map((game) => (
          <div className="flex flex-row gap-16">
            <PlayerBadge player={players.get(game.white_id)} isWhite />

            <div className="flex w-32 items-center justify-center">
              <p className="text-center text-5xl font-normal text-white">vs.</p>
            </div>

            <PlayerBadge player={players.get(game.black_id)} mirrored />
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 right-2 h-[86]">
        <img src={scoreLogo} />
      </div>
    </div>
  );
}
