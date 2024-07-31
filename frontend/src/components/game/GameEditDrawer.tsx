import { useState } from "react";
import { Input } from "@shadcn/input";
import { ChessGame, ChessPlayer } from "@types";
import { CommonEditDrawer } from "@components/common/EditDrawer";
import { useTournamentStore } from "@stores/tournament.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/select";

interface GameEditDrawerProps {
  title: string;
  desc: string;
  onSubmit: (game: ChessGame) => void;
  initialGame?: Partial<ChessGame>;
}

export function GameEditDrawer({
  title,
  desc,
  onSubmit,
  initialGame = {},
}: GameEditDrawerProps) {
  const [white_id, setWhiteCode] = useState(initialGame.white_id || 0);
  const [black_id, setBlackCode] = useState(initialGame.black_id || 0);
  const [round, setRound] = useState(initialGame.round || 0);
  const [winner_id, setWinnerCode] = useState(initialGame.winner_id);

  const players = [...useTournamentStore((state) => state.players).values()];
  const playerSelectOptions = players.map((player: ChessPlayer) => (
    <SelectItem value={"" + player.id}>
      {player.first_name + " " + player.last_name}
    </SelectItem>
  ));

  const handleSubmit = () => {
    const game: ChessGame = Object.assign(initialGame, {
      white_id,
      black_id,
      round,
      ...(winner_id && { winner_id }),
    });

    onSubmit(game);
  };

  return (
    <CommonEditDrawer title={title} desc={desc} onSubmit={handleSubmit}>
      <div className="flex">
        <label className="min-w-[100px]"> Białe </label>
        <Select
          value={"" + white_id}
          onValueChange={(e) => setWhiteCode(parseInt(e))}
        >
          <SelectTrigger id="white_id">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-[200px]">
            {playerSelectOptions}
          </SelectContent>
        </Select>
      </div>
      <div className="flex">
        <label className="min-w-[100px]"> Czarne </label>
        <Select
          value={"" + black_id}
          onValueChange={(e) => setBlackCode(parseInt(e))}
        >
          <SelectTrigger id="black_id">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-[200px]">
            {playerSelectOptions}
          </SelectContent>
        </Select>
      </div>
      <div className="flex">
        <label className="min-w-[100px]"> Runda </label>
        <Input
          id="round"
          value={round}
          onChange={(e) => setRound(parseInt(e.target.value) || 0)}
        />
      </div>
      <div className="flex">
        <label className="min-w-[100px]"> Wygrany(a) </label>
        <Select
          value={"" + winner_id}
          onValueChange={(e) => setWinnerCode(parseInt(e))}
        >
          <SelectTrigger id="black_id">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-[200px]">
            {playerSelectOptions}
          </SelectContent>
        </Select>
      </div>
    </CommonEditDrawer>
  );
}
