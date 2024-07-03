import './index.css'
import chessGrowLogo from '../public/chessgrow.svg'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function App() {

  return (
    <>
    <div className='box-border flex flex-col items-center justify-center min-h-screen space-y-2 font-fontA'>
      <div className='max-w-xs my-2 flex flex-col items-center'>
        <img src={chessGrowLogo} className="w-36" alt="ChessGrow logo" />
        <h1 className='text-primaryA text-5xl font-bold my-3 font-anton'>Scoreboard</h1>
      </div>
      <Tabs defaultValue="watch" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="create">Utwórz turniej</TabsTrigger>
          <TabsTrigger value="referee">Zostań sędzią</TabsTrigger>
          <TabsTrigger value="view">Wyświetl turniej</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="w-[400px] text-sm ">
        <CardHeader>
          <CardDescription>Ta opcja pozwala na wyświetlenie istniejącego turnieju.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Kod turnieju</p>
          <Input type="text" placeholder="Kod turnieju" className="outline-none"/>
        </CardContent>
        <CardFooter>
          <Button> Wyświetl </Button>
        </CardFooter>
    </Card>
  </div>
    </>
  )
}

export default App
