import { useState } from "react";
import { PlayerEditDrawer } from "./PlayerEditDrawer";
import { editPlayer } from "@api";
import { ChessPlayer } from "@types";
import editIcon from "/icons/edit.svg";
import { Drawer, DrawerTrigger } from "@shadcn/drawer";

export function EditPlayer({ player }: { player: ChessPlayer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="mx-4 rounded-md border">
          <img src={editIcon} className="m-2 w-5" alt="Edit" />
        </button>
      </DrawerTrigger>
      <PlayerEditDrawer
        title={`${player.first_name} ${player.last_name}`}
        desc="Edycja danych użytkownika."
        onSubmit={(player) => {
          editPlayer(player.id || 0, player);
          setIsOpen(false);
        }}
        initialPlayer={player}
      />
    </Drawer>
  );
}
