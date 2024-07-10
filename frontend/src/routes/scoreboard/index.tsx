import "@index.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ScoreTable from "./ScoreTable";
import DuringGame from "./DuringGame";

export function ScoreBoardPage() {
	return (
		<div className="h-screen bg-custom relative overflow-hidden px-4 pt-4 min-h-screen w-screen bg-[url('/icons/chessgrowLogo.svg')] bg-no-repeat bg-right">
			<DuringGame />
		</div>
	);
}

export default ScoreBoardPage;
