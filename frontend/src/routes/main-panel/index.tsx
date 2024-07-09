import "@index.css";
import ref from "/icons/ref.svg";
import results from "/icons/results.svg";
import list from "/icons/list.svg";

import { Button } from "@shadcn/button";
import { Card, CardContent, CardHeader } from "@shadcn/card";

import { CreatePlayerDrawer } from "@components/player";
import { CreateGameDrawer } from "@components/game";
import { CreateJudgeDrawer } from "@components/judge";
import { EndTournament } from "@components/tournament";

function LandingPage() {
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
					<Card className="h-min">
						<CardHeader>
							<p className="text-xl font-semibold">
								{" "}
								Wielkie przykładowe mistrzostwa{" "}
							</p>
						</CardHeader>
						<CardContent>
							<p className="text-lg">Kod turnieju:</p>
							<h1 className="text-4xl font-bold">AX46BF</h1>
						</CardContent>
					</Card>

					<Card className="h-min">
						<CardHeader>
							<p className="text-xl font-semibold">Akcje</p>
						</CardHeader>
						<CardContent className="flex flex-col gap-2">
							<CreatePlayerDrawer />
							<CreateGameDrawer />
							<CreateJudgeDrawer />
							<Button>
								<img
									src={results}
									className="w-5 m-2"
									alt="."
								/>
								Wyniki Gier
							</Button>
							<Button>
								<img src={list} className="w-5 m-2" alt="." />
								Lista Graczy
							</Button>
							<Button>
								<img src={ref} className="w-5 m-2" alt="." />
								Lista Sędziów
							</Button>
							<EndTournament />
						</CardContent>
					</Card>

					<Card className="h-min">
						<CardHeader>
							<p className="text-xl font-semibold ">
								Aktywne gry
							</p>
						</CardHeader>
						<CardContent className="flex flex-col gap-2">
							<p className="border w-full p-2 font-bold">
								{" "}
								Chlost vs Michalak
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Piętka vs Zdrzałek
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Piętka vs Zdrzałek
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Piętka vs Zdrzałek
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Piętka vs Zdrzałek
							</p>
							<Button> Pokaż wszystkie </Button>
						</CardContent>
					</Card>

					<Card className="h-min">
						<CardHeader>
							<p className="text-xl font-semibold">Sędziowie</p>
						</CardHeader>
						<CardContent className="flex flex-col gap-2">
							<p className="border w-full p-2 font-bold">
								{" "}
								Jan Kowalski
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Adam Nowak{" "}
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Mateusz Zdrzałek
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Cezary Michalak
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Adrian Piętka
							</p>
							<Button> Pokaż wszystkich </Button>
						</CardContent>
					</Card>
					<Card className="h-min">
						<CardHeader>
							<p className="text-xl font-semibold">Gracze</p>
						</CardHeader>
						<CardContent className="flex flex-col gap-2">
							<p className="border w-full p-2 font-bold">
								{" "}
								Jan Kowalski
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Adam Nowak{" "}
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Mateusz Zdrzałek
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Cezary Michalak
							</p>
							<p className="border w-full p-2 font-bold">
								{" "}
								Adrian Piętka
							</p>
							<Button> Pokaż wszystkich </Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}

export default LandingPage;
