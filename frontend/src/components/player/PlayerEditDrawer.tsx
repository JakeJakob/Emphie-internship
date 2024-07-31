import { useState } from "react";
import { Input } from "@shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/select";
import { ChessTitle, ChessPlayer } from "@types";
import { CommonEditDrawer } from "@components/common/EditDrawer";

interface PlayerEditDrawerProps {
  title: string;
  desc: string;
  onSubmit: (player: ChessPlayer) => void;
  initialPlayer?: Partial<ChessPlayer>;
}

export function PlayerEditDrawer({
  title,
  desc,
  onSubmit,
  initialPlayer = {},
}: PlayerEditDrawerProps) {
  const [first_name, setFirstName] = useState(initialPlayer.first_name || "");
  const [last_name, setLastName] = useState(initialPlayer.last_name || "");
  const [rank, setRank] = useState(initialPlayer.rank || 0);
  const [chess_title, setTitle] = useState(
    initialPlayer.title || ("None" as ChessTitle),
  );

  const handleSubmit = () => {
    const player: ChessPlayer = Object.assign(initialPlayer, {
      first_name,
      last_name,
      rank,
      chess_title,
    });

    onSubmit(player);
  };

  return (
    <CommonEditDrawer title={title} desc={desc} onSubmit={handleSubmit}>
      <div className="flex">
        <label className="min-w-[100px]"> Imię </label>
        <Input
          id="name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="flex">
        <label className="min-w-[100px]"> Nazwisko </label>
        <Input
          id="last_name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex">
        <label className="min-w-[100px]"> Ranga </label>
        <Input
          id="rank"
          type="number"
          value={rank}
          onChange={(e) => setRank(parseInt(e.target.value))}
        />
      </div>
      <div className="flex">
        <label className="min-w-[100px]"> Tytuł </label>
        <Select
          value={chess_title}
          onValueChange={(e) => setTitle(e as ChessTitle)}
        >
          <SelectTrigger id="title">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-[200px]">
            {Object.values(ChessTitle).map((title) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </CommonEditDrawer>
  );
}
