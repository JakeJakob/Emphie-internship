import "../index.css"
import Board_Table from "./Board_Table"
import Board_DuringGame from "./Board_DuringGame"
import Board_LastBatches from "./Board_LastBatches"

function Board() {
  return (
    <div className="h-screen bg-custom relative overflow-hidden px-4 pt-4 min-h-screen w-screen bg-[url('../../public/board.svg')] bg-no-repeat bg-right">
      <Board_LastBatches/>
    </div>
  )
}

export default Board
