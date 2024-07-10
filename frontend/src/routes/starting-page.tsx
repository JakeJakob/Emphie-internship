import "@index.css";
import chessGrowLogo from "/chessgrow.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
import {
	JoinAsAdminCard,
	JoinAsJudgeCard,
	JoinAsGuestCard,
} from "@/lib/components/tournament";

function StartPage() {
	return (
		<>
			<div className="box-border flex flex-col items-center justify-center min-h-screen p-3 font-inter">
				<div className="max-w-xs flex flex-col items-center">
					<img
						src={chessGrowLogo}
						className="w-36"
						alt="ChessGrow-logo"
					/>
					<h1 className="text-project_primary text-5xl font-bold my-3 font-ptSans">
						{" "}
						Scoreboard{" "}
					</h1>
				</div>

				<Tabs defaultValue="create" className="w-xs text-sm">
					<TabsList>
						<TabsTrigger value="create">
							{" "}
							Utwórz turniej{" "}
						</TabsTrigger>
						<TabsTrigger value="judge"> Zostań sędzią </TabsTrigger>
						<TabsTrigger value="guest">
							{" "}
							Wyświetl turniej{" "}
						</TabsTrigger>
					</TabsList>

					<TabsContent value="guest">
						<JoinAsGuestCard />
					</TabsContent>

					<TabsContent value="judge">
						<JoinAsJudgeCard />
					</TabsContent>

					<TabsContent value="create">
						<JoinAsAdminCard />
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
}

export default StartPage;
