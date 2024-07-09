import "../../index.css";
import ref from "/icons/ref.svg";
import results from "/icons/results.svg";
import list from "/icons/list.svg";

import { Link } from "react-router-dom";
import { Button } from "@/lib/components/shadcn/button";
import { Card, CardContent, CardHeader } from "@/lib/components/shadcn/card";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/lib/components/shadcn/alert-dialog";
import { CreatePlayerDrawer } from "@/lib/components/player";
import { CreateGameDrawer } from "@/lib/components/game";
import { CreateJudgeDrawer } from "@/lib/components/judge";

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
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="destructive">
										Zakończ turniej
									</Button>
								</AlertDialogTrigger>

								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Czy na pewno chcesz zakończyć ten
											turniej?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Tej akcji nie da się odwrócić.
											Zakończony turniej nie zostaje
											nigdzie zapisany.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Anuluj
										</AlertDialogCancel>
										<Link to="/">
											<AlertDialogAction>
												Zakończ
											</AlertDialogAction>
										</Link>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
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
