import '../index.css'
import addPlayer from '../../public/icons/add.svg'
import create from '../../public/icons/create.svg'
import ref from '../../public/icons/ref.svg'
import results from '../../public/icons/results.svg'
import list from '../../public/icons/list.svg'

import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

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
  } from "@/components/ui/alert-dialog"
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function tournament_page (){
    return (
        <>
        <div className='min-h-screen p-0.5 box-border'>
           <div className="max-w-screen py-1 px-6 border box-border"> 
                <h1 className='text-project_primary text-2xl font-bold my-3 font-ptSans'> Scoreboard </h1> 
            </div> 

            <div className="grid  md:grid-cols-4 grid-cols-none gap-4 p-4 ">
            <Card className='h-min'>
                <CardHeader>
                    <p className='text-xl font-semibold'> Wielkie przykładowe mistrzostwa </p>
                </CardHeader>
                <CardContent>
                    <p className='text-lg'>Kod turnieju:</p>
                    <h1 className='text-4xl font-bold'>AX46BF</h1>
                </CardContent>
            </Card>

<Card className='h-min'>
    
    <CardHeader><p className='text-xl font-semibold'>Akcje</p></CardHeader>
  <CardContent className='flex flex-col gap-2'>

{/* add_player */}

  <Drawer>
   <DrawerTrigger asChild> 
            <Button> <img src={addPlayer} className="w-5 m-2" alt="."/>Dodaj gracza</Button>
    </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Dodaj Gracza</DrawerTitle>
      <DrawerDescription>Dodawanie danych użytkownika</DrawerDescription>
    </DrawerHeader>
      <form className='flex flex-col min-w-full my-4 px-4 gap-2'>
      <div className='flex'>
        <label className='min-w-[100px]'> Imię </label>
        <Input></Input>
      </div>
      <div className='flex'>
        <label className='min-w-[100px]'> Nazwisko </label>
        <Input></Input>
      </div>
      <div className='flex'>
        <label className='min-w-[100px]'> Ranga </label>
        <Input  type='number'></Input>
      </div>
      <div className='flex'>
        <label className='min-w-[100px]'> Tytuł </label>
        <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className='max-h-[200px]'>
                  <SelectItem value="GM">GM</SelectItem>
                  <SelectItem value="WGM">WGM</SelectItem>
                  <SelectItem value="IM">IM</SelectItem>
                  <SelectItem value="WIM">WIM</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="K">K</SelectItem>
                  <SelectItem value="I">I</SelectItem>
                  <SelectItem value="II">II</SelectItem>
                  <SelectItem value="III">III</SelectItem>
                  <SelectItem value="IV">IV</SelectItem>
                  <SelectItem value="V">V</SelectItem>
                </SelectContent>
              </Select>
    </div>  
        </form>


    <DrawerFooter>
      <Button>Zapisz</Button>
      <DrawerClose>
        <Button variant="outline" className='min-w-full'>Anuluj</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>


{/*  Create game */}


<Drawer>
   <DrawerTrigger asChild> 
            <Button><img src={create} className="w-5 m-2" alt="."/>Utwórz grę</Button>
    </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Utwórz grę</DrawerTitle>
      <DrawerDescription>Tworzenie gry.</DrawerDescription>
    </DrawerHeader>
      <form className='flex flex-col min-w-full my-4 px-4 gap-2'>
      <div className='flex'>
        <label className='min-w-[100px]'> Białe </label>
        <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className='max-h-[200px]'>
                  <SelectItem value="GM">Marlena Chlost</SelectItem>
                  <SelectItem value="WGM">Cezary Michalak</SelectItem>
                </SelectContent>
              </Select>
      </div>
      <div className='flex'>
        <label className='min-w-[100px]'> Czarne </label>
        <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className='max-h-[200px]'>
                  <SelectItem value="GM">Marlena Chlost</SelectItem>
                  <SelectItem value="WGM">Cezary Michalak</SelectItem>
                </SelectContent>
              </Select>
      </div>

      <div className='flex'>
        <label className='min-w-[100px]'> Runda </label>
        <Input  type='number'></Input>
      </div>
      <div className='flex'>
        <label className='min-w-[100px]'> Wygrany(a) </label>
        <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className='max-h-[200px]'>
                <SelectItem value="player_id_a">Marlena Chlost</SelectItem>
                <SelectItem value="player_id_b">Cezary Michalak</SelectItem>
  
                </SelectContent>
              </Select>
      </div>
      </form>
<DrawerFooter>
      <Button>Zapisz</Button>
      <DrawerClose>
        <Button variant="outline" className='min-w-full'>Anuluj</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>


      {/* add_reffere */}


      <Drawer>
   <DrawerTrigger asChild> 
          <Button><img src={ref} className="w-5 m-2" alt="."/>Dodaj sędzię</Button>
    </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Dodaj sędzie</DrawerTitle>
      <DrawerDescription>Dodawanie nowego sędzi</DrawerDescription>
    </DrawerHeader>
      <form className='flex flex-col min-w-full my-4 px-4 gap-2'>
      <div className='flex'>
        <label className='min-w-[100px]'> Nazwa </label>
        <Input></Input>
      </div>
        
        </form>
        <DrawerFooter>
      <Button>Dodaj</Button>
      <DrawerClose>
        <Button variant="outline" className='min-w-full'>Anuluj</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

{/* Results*/}
    <Button><img src={results} className="w-5 m-2" alt="."/>Wyniki Gier</Button>
    
{/* player_list */}



      <Link to='Players' ><Button className='w-full'><img src={list} className="w-5 m-2"  alt="."/>Lista Graczy</Button></Link>
    

    {/* Ref_list */}

    
    <Link to='refs'><Button className='w-full'><img src={ref} className="w-5 m-2" alt="."/>Lista Sędziów</Button></Link>


    {/* end_tournament */}


   <AlertDialog><AlertDialogTrigger asChild>
        <Button variant='destructive'>Zakończ turniej</Button>
    </AlertDialogTrigger>
    
    <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Czy na pewno chcesz zakończyć ten turniej?</AlertDialogTitle>
          <AlertDialogDescription>
          Tej akcji nie da się odwrócić. Zakończony turniej nie zostaje nigdzie zapisany.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <Link to='/'><AlertDialogAction className='min-w-full'>Zakończ</AlertDialogAction></Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    
    </AlertDialog> 
  </CardContent>

</Card>

<Card className='h-min'>
    <CardHeader><p className='text-xl font-semibold '>Aktywne gry</p></CardHeader>
  <CardContent className='flex flex-col gap-2'>
        <p className='border w-full p-2 font-bold'> Chlost vs Michalak</p>
        <p className='border w-full p-2 font-bold'> Piętka vs Zdrzałek</p>
        <p className='border w-full p-2 font-bold'> Piętka vs Zdrzałek</p>
        <p className='border w-full p-2 font-bold'> Piętka vs Zdrzałek</p>
        <p className='border w-full p-2 font-bold'> Piętka vs Zdrzałek</p>
    <Button> Pokaż wszystkie </Button>
  </CardContent>
</Card>

<Card className='h-min'>
    <CardHeader><p className='text-xl font-semibold'>Sędziowie</p></CardHeader>
  <CardContent className='flex flex-col gap-2'>
        <p className='border w-full p-2 font-bold'> Jan Kowalski</p>
        <p className='border w-full p-2 font-bold'> Adam Nowak </p>
        <p className='border w-full p-2 font-bold'> Mateusz Zdrzałek</p>
        <p className='border w-full p-2 font-bold'> Cezary Michalak</p>
        <p className='border w-full p-2 font-bold'> Adrian Piętka</p>
    <Button> Pokaż wszystkich </Button>
  </CardContent>
</Card>
<Card className='h-min'>
    <CardHeader><p className='text-xl font-semibold'>Gracze</p></CardHeader>
  <CardContent className='flex flex-col gap-2'>
        <p className='border w-full p-2 font-bold'> Jan Kowalski</p>
        <p className='border w-full p-2 font-bold'> Adam Nowak </p>
        <p className='border w-full p-2 font-bold'> Mateusz Zdrzałek</p>
        <p className='border w-full p-2 font-bold'> Cezary Michalak</p>
        <p className='border w-full p-2 font-bold'> Adrian Piętka</p>
    <Button> Pokaż wszystkich </Button>
  </CardContent>
</Card>
            </div>
        </div>
        </>
    )
}



export default tournament_page;