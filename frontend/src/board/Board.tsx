import "../index.css";
import Title from "./title/Title.tsx";
import Board_Main from "./board-main/Board_Main.tsx";
import BoardFooter from "./board-footer/BoardFooter.tsx";

import Table from "./title/Table.tsx";
import During from "./title/During.tsx";
import LastBatches from "./title/Last_Batches.tsx";

function Board() {
  return (
    <div className="h-screen bg-custom relative overflow-hidden px-4 pt-4 min-h-screen w-screen bg-[url('../../public/board.svg')] bg-no-repeat bg-right">
      <Title content={<Table />} />
      <Board_Main />
      <BoardFooter />
    </div>
  );
}

export default Board;
