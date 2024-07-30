import { PlayerBadge } from "@/components/player/PlayerBadge";
import scoreLogo from "/chessgrowWhite.svg";
import { useTournamentStore } from "@stores/tournament.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function FinishedGamesPage() {
  const players = useTournamentStore((state) => state.players);
  const games = useTournamentStore((state) => state.games);
  const tournament_name = useTournamentStore((state) => state.name);

  const finished_games = [...games.values()].filter(
    (game) => game.winner_code != undefined,
  );

  const navigate = useNavigate();

  const tournament_id = useTournamentStore((state) => state.code);

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate(`/tournament/${tournament_id}/scoreboard/table`);
  //   }, 10000);
  // });

  return (
    <div className="relative h-screen overflow-hidden bg-custom bg-[url('/chessgrowLogo.svg')] bg-right bg-no-repeat px-4 pt-4">
      <div className="h-frame48-height w-screen">
        <div className="flex h-frame32-height w-screen items-center">
          <p className="font-sans text-6xl font-bold text-white">
            Ostatnie parite
          </p>
          <div className="h-82.82 mr-4 border-l border-white"></div>
          <p className="font-sans text-6xl font-normal text-white">
            {" | " + tournament_name}
          </p>
        </div>
        <hr className="mt-3 w-hr2-width border-2 text-white" />
      </div>

      <div className="no-scrollbar mt-11 box-border h-[80vh] max-h-[660px] items-center gap-6 overflow-y-auto">
        {finished_games.map((game) => (
          <div className="grid grid-cols-[3fr_1fr_3fr] ">
            <div className="justify-self-end">
              <PlayerBadge
                player={players.get(game.white_code)}
                isWhite
                starred={game.white_code == game.winner_code}
              />
            </div>
            <div className="align-around flex justify-center">
              <p className="text-center text-5xl font-normal text-white">vs.</p>
            </div>
            <div className="justify-self-start">
              <PlayerBadge
                player={players.get(game.black_code)}
                mirrored
                starred={game.black_code == game.winner_code}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 right-2 h-[86]">
        <img src={scoreLogo} />
      </div>
    </div>
  );
}
