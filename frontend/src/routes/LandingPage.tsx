import chessGrowLogo from "/chessgrow.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
import { JoinFormCard, JoinFormCard2Buttons } from "@/components/joinFormCard";
import { createTournament, getTournament } from "@/api";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TokenType } from "@/types";
import { LabeledInput } from "@/components/common/LabeledInput";
import { showErrorToast } from "@/utils";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-3 font-inter overflow-hidden">
      <div className="flex max-w-xs flex-col items-center">
        <img src={chessGrowLogo} className="w-36" alt="ChessGrow-logo" />
        <h1 className="my-3 font-ptSans text-5xl font-bold text-project_primary">
          Scoreboard
        </h1>
      </div>

      <Tabs
        defaultValue="create"
        className="flex flex-col items-center justify-center my-3"
      >
        <TabsList className="w-sm">
          <TabsTrigger value="create">Utwórz turniej</TabsTrigger>
          <TabsTrigger value="judge">Zarządzaj turniejem</TabsTrigger>
          <TabsTrigger value="guest">Wyświetl turniej</TabsTrigger>
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
  );
}

function JoinAsGuestCard() {
  const [tournamentCode, setTournamentCode] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [tournamentDoesntExistError, setTournamentDoesntExistError] =
    useState(false);

  const onSubmit = async () => {
    localStorage.clear();
    setAuth({
      token_type: TokenType.Guest,
      tournament_code: tournamentCode,
    });

    try {
      const tournament = await getTournament(tournamentCode, false);
      if (tournament)
        navigate(`/tournament/${tournament.code}/scoreboard/table`);
    } catch (error) {
      setTournamentDoesntExistError(true);
    }
  };

  return (
    <JoinFormCard
      desc="Ta opcja pozwala na wyświetlenie istniejącego turnieju."
      submit_text="Wyświetl"
      onSubmit={onSubmit}
    >
      <LabeledInput
        label="Kod turnieju"
        id="tournament_code"
        placeholder="np. AX46BF"
        value={tournamentCode}
        onChange={(e) => setTournamentCode(e.target.value)}
        errorMessage="Błędny kod turnieju"
        isError={tournamentDoesntExistError}
      />
    </JoinFormCard>
  );
}

function JoinAsJudgeCard() {
  const [tournamentCode, setTournamentCode] = useState("");
  const [judgeCode, setJudgeCode] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async () => {
    localStorage.clear();
    setAuth({
      token_type: TokenType.Judge,
      tournament_code: tournamentCode,
      judge_code: judgeCode,
    });

    try {
      const tournament = await getTournament(tournamentCode, false);
      if (tournament) navigate(`/tournament/${tournament.code}`);
    } catch (error) {
      //const message: string = getErrorMessage(error);
      //alert(message); //TODO
      //showErrorToast(message);
    }
  };

  const onSubmitAdmin = async () => {
    localStorage.clear();
    setAuth({
      token_type: TokenType.Admin,
      access_key: judgeCode,
    });

    try {
      const tournament = await getTournament(tournamentCode);
      if (tournament) navigate(`/tournament/${tournament.code}`);
    } catch (error) {
      showErrorToast(
        "Wygląda na to, że turniej nie istnieje lub kod administratora jest nieprawidłowy.",
      );
    }
  };

  return (
    <JoinFormCard2Buttons
      desc="Ta opcja pozwala na dołączenie do istniejącego turnieju i wprowadzanie zmian w jego wynikach."
      submit_text="Dołącz jako sędzia"
      onSubmit={onSubmit}
      submit_text2="Dołącz jako administrator"
      onSubmit2={onSubmitAdmin}
    >
      <LabeledInput
        label="Kod turnieju"
        id="tournament_code"
        placeholder="np. AX46BF"
        value={tournamentCode}
        onChange={(e) => setTournamentCode(e.target.value)}
        errorMessage="Błędny kod dostępu"
      />
      <LabeledInput
        label="Kod sędzi/administratora"
        id="judge_code"
        placeholder="np. 5GAAA67"
        value={judgeCode}
        onChange={(e) => setJudgeCode(e.target.value)}
        errorMessage="Błędny kod sędzi/administratora"
      />
    </JoinFormCard2Buttons>
  );
}

function JoinAsAdminCard() {
  const [accessKey, setAccessKey] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [accessKeyError, setAccessKeyError] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async () => {
    localStorage.clear();
    setAuth({
      token_type: TokenType.Admin,
      access_key: accessKey,
    });

    try {
      const tournament = await createTournament(tournamentName, false);
      if (tournament) navigate(`/tournament/${tournament.code}`);
    } catch (error) {
      setAccessKeyError(true);
    }
  };

  return (
    <JoinFormCard
      desc="Ta opcja pozwala na utworzenie nowego turnieju do którego mogą dołączyć się sędziowie."
      submit_text="Utwórz"
      onSubmit={onSubmit}
    >
      <LabeledInput
        label="Kod Dostępu"
        id="access_key"
        placeholder="np. YWK8HNiW374JL2YfNWD5JzW1b5rEBm"
        value={accessKey}
        onChange={(e) => setAccessKey(e.target.value)}
        errorMessage="Błędny kod dostępu"
        isError={accessKeyError}
      />
      <LabeledInput
        label="Nazwa turnieju"
        id="tournament_name"
        placeholder="np. Wielkie przykładowe mistrzostwa"
        value={tournamentName}
        onChange={(e) => setTournamentName(e.target.value)}
        errorMessage="Nazwa turnieju musi mieć od 6 do 36 znaków"
        pattern=".{6,36}"
      />
    </JoinFormCard>
  );
}
