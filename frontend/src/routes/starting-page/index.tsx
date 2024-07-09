import "@index.css";
import chessGrowLogo from "/chessgrow.svg";
import { Link } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
import { Input } from "@shadcn/input";
import { Button } from "@shadcn/button";

import { Card, CardContent, CardDescription, CardHeader } from "@shadcn/card";

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

				<Tabs defaultValue="view" className="w-xs text-sm">
					<TabsList>
						<TabsTrigger value="create">
							{" "}
							Utwórz turniej{" "}
						</TabsTrigger>
						<TabsTrigger value="referee">
							{" "}
							Zostań sędzią{" "}
						</TabsTrigger>
						<TabsTrigger value="view">
							{" "}
							Wyświetl turniej{" "}
						</TabsTrigger>
					</TabsList>

					<TabsContent value="view">
						<Card className="w-xs text-sm">
							<CardHeader>
								<CardDescription>
									{" "}
									Ta opcja pozwala na wyświetlenie
									istniejącego turnieju.{" "}
								</CardDescription>
							</CardHeader>

							<CardContent>
								<label htmlFor="tournament-code">
									<p className="mb-1 font-medium">
										{" "}
										Kod turnieju{" "}
									</p>
									<Input
										type="text"
										id="tournament-code"
										placeholder="np. AX46BF"
										className="... peer invalid:[&:not(:placeholder-shown):not(:focus)]"
										required
										pattern=".{6,7}"
									/>
									<span
										id="error-msg"
										className="mt-2 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
									>
										Błędny kod dostępu
									</span>
								</label>
								<Link to="/tournament/AX46BF">
									{" "}
									<Button
										type="submit"
										className="... mt-3 group-invalid:pointer-events-none group-invalid"
									>
										{" "}
										Wyświetl{" "}
									</Button>
								</Link>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="referee">
						<Card className="w-xs max-w-[400px]">
							<CardHeader>
								<CardDescription>
									{" "}
									Ta opcja pozwala na dołączenie do
									istniejącego turnieju i wprowadzanie zmian w
									jego wynikach.{" "}
								</CardDescription>
							</CardHeader>

							<CardContent>
								<label htmlFor="tournament-code">
									<p className="mb-1  font-medium">
										{" "}
										Kod turnieju{" "}
									</p>
									<Input
										type="text"
										id="tournament-code"
										placeholder="np. AX46BF"
										className="... peer invalid:[&:not(:placeholder-shown):not(:focus)]"
										required
										pattern=".{6,7}"
									/>
									<span
										id="error-msg"
										className="mt-1 mb-1 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
									>
										Błędny kod dostępu
									</span>
								</label>

								<label htmlFor="referee-code">
									<p className="mb-1 mt-1 font-medium">
										{" "}
										Kod sędzi{" "}
									</p>
									<Input
										type="text"
										id="tournament-code"
										placeholder="np. 5GAAA67"
										className="... peer invalid:[&:not(:placeholder-shown):not(:focus)]"
										required
										pattern=".{6,7}"
									/>
									<span
										id="error-msg"
										className="mt-1 mb-1 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
									>
										Błędny kod sędzi
									</span>
									<Link to={"/tournament/AX46BF"}>
										<Button className="mt-3">
											{" "}
											Dołącz{" "}
										</Button>
									</Link>
								</label>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="create">
						<Card className="w-xs max-w-[400px]">
							<CardHeader>
								<CardDescription>
									{" "}
									Ta opcja pozwala na utworzenie nowego
									turnieju do którego mogą dołączyć się
									sędziowie.{" "}
								</CardDescription>
							</CardHeader>

							<CardContent>
								<label htmlFor="tournament-code">
									<p className="mb-1  font-medium">
										{" "}
										Kod Dostępu{" "}
									</p>
									<Input
										type="text"
										id="tournament-code"
										placeholder="np. AAAAAAAAAAAAAAAA"
										className="... peer invalid:[&:not(:placeholder-shown):not(:focus)]"
										required
										pattern=".{6,7}"
									/>
									<span
										id="error-msg"
										className="mt-1 mb-1 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
									>
										Błędny kod dostępu
									</span>
								</label>

								<label htmlFor="referee-code">
									<p className="mb-1 mt-1 font-medium">
										{" "}
										Nazwa turnieju{" "}
									</p>
									<Input
										type="text"
										id="tournament-code"
										placeholder="np. Wielkie przykładowe mistrzostwa"
										className="... peer invalid:[&:not(:placeholder-shown):not(:focus)]"
										required
										pattern=".{6,36}"
									/>
									<span
										id="error-msg"
										className="mt-1 mb-1 hidden font-normal text-project_error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
									>
										nazwa turnieju musi mieć od 6 do 36
										znaków
									</span>
									<Button className="mt-3"> Dołącz </Button>
								</label>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
}

export default StartPage;
