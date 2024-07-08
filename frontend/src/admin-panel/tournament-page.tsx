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
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"





function LandingPage (){
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


  <Drawer>
   <DrawerTrigger asChild> 
            <Button> <img src={addPlayer} className="w-5 m-2" alt="."/>Dodaj gracza</Button>
    </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Dodaj Gracza</DrawerTitle>
      <DrawerDescription>Dodawanie danych użytkownika</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button className='w-full'>Zapisz</Button>
      <DrawerClose className='min-w-xl'>
        <Button variant="outline" className='w-full'>Anuluj</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>






    <Button><img src={create} className="w-5 m-2" alt="."/>Utwórz grę</Button>
    <Button><img src={ref} className="w-5 m-2" alt="."/>Dodaj sędzię</Button>
    <Button><img src={results} className="w-5 m-2" alt="."/>Wyniki Gier</Button>
    <Button><img src={list} className="w-5 m-2" alt="."/>Lista Graczy</Button>
    <Button><img src={ref} className="w-5 m-2" alt="."/>Lista Sędziów</Button>
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
          <Link to='/'><AlertDialogAction>Zakończ</AlertDialogAction></Link>
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



export default LandingPage;