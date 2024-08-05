import { PlayerBadge } from "@/components/player/PlayerBadge";
import scoreLogo from "/chessgrowWhite.svg";
import { useTournamentStore } from "@stores/tournament.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ScoreTablePage() {
  function numbersToN(N: number) {
    return Array.from({ length: N }, (_, index) => index);
  }

  const players = useTournamentStore((state) => state.players);
  const games = useTournamentStore((state) => state.games);
  const tournament_name = useTournamentStore((state) => state.name);

  const all_games = [...games.values()];
  const n_rounds = Math.max(...all_games.map((game) => game.round));

  const navigate = useNavigate();

  const tournament_id = useTournamentStore((state) => state.code);

  useEffect(() => {
    setTimeout(() => {
      navigate(`/tournament/${tournament_id}/scoreboard/pending`);
    }, 10000);
  });

  // code for autoscroll

  setInterval(scroll, 10);
  const element = document.querySelector("#table") as HTMLElement;
  let x = 5;

  function scroll() {
    element?.scrollBy({
      top: x,
      left: 0,
      behavior: "smooth",
    });
    if (element?.scrollTop + element?.offsetHeight === element?.scrollHeight) {
      setTimeout(() => {
        x = -5;
      }, 3000);
    } else if (element?.scrollTop === 0) {
      setTimeout(() => {
        x = 5;
      }, 3000);
    }
  }
  return (
    <div className="relative h-screen overflow-hidden bg-custom bg-[url('/chessgrowLogo.svg')] bg-right bg-no-repeat px-4 pt-4">
      <div className="h-frame48-height w-screen">
        <div className="flex h-frame32-height w-screen items-center">
          <p className="font-sans text-6xl font-bold text-white">Tabela</p>
          <div className="h-82.82 mr-4 border-l border-white"></div>
          <p className="font-sans text-6xl font-normal text-white">
            {" | " + tournament_name}
          </p>
        </div>
        <hr className="mt-3 w-hr2-width border-2 text-white" />
      </div>

      <div
        id="table"
        className="no-scrollbar mt-11 box-border grid h-[80vh] min-h-[660px] grid-cols-[repeat(auto-fit,_minmax(min(100%/3,_max(64px,_18%)),_1fr))] gap-4 overflow-y-auto text-white"
      >
        {numbersToN(n_rounds).map((n) => (
          <div key={n} className="flex flex-col">
            <div className="header-item bg-black bg-opacity-20 py-2 text-center text-3xl font-bold">
              Runda {n + 1}
            </div>
            {all_games
              .filter((game) => game.round === n + 1)
              .map((game) => (
                <div className="content-item flex flex-col bg-black bg-opacity-10 p-2 text-center text-white">
                  <PlayerBadge
                    player={players.get(game.white_code)}
                    isWhite
                    starred={game.white_code === game.winner_code}
                    variant="table"
                  />
                  <PlayerBadge
                    player={players.get(game.black_code)}
                    starred={game.black_code === game.winner_code}
                    variant="table"
                  />
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 right-2 h-[86]">
        <img src={scoreLogo} />
      </div>
    </div>
  );
}
