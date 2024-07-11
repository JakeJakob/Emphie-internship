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


  import edit from '../../public/icons/edit.svg'
  import trash from '../../public/icons/trash.svg'
  import plus from '../../public/icons/plus.svg'

function Players (){
    return (
        <>
        <div className='min-h-screen p-0.5 box-border'>
           <div className="max-w-screen py-1 px-6 border box-border"> 
                <h1 className='text-project_primary text-2xl font-bold my-3 font-ptSans'> Scoreboard </h1> 
            </div> 
            <Card className='h-min border-none'>
    <CardHeader >
                    <p className='justify-between flex w-full text-xl font-semibold border-b-2 pb-4'>Gracze <button className='justify-self-center w-max border rounded-md'>
                        <img src={plus} className="w-5 m-2 " alt="."/>
                    </button></p>
                    </CardHeader>
  <CardContent className='flex flex-col gap-2 border-none'>
        <p className='border w-full p-2 font-bold rounded flex justify-between items-center'> Chlost vs Michalak 
             
           <div className='flex '> 
             
                    <Drawer>
   <DrawerTrigger asChild> 
   <button className=' border rounded-md mx-4'>
                        <img src={edit} className="w-5 m-2 " alt="."/>
                    </button>
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

    <AlertDialog><AlertDialogTrigger asChild>
    <button className='align-right border rounded-md'>
                        <img src={trash} className="w-5 m-2 " alt="."/>
                    </button>
    </AlertDialogTrigger>
    
    <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Czy na pewno chcesz usunąć gracza Marlena Chlost?</AlertDialogTitle>
          <AlertDialogDescription>
          Tej akcji nie da się odwrócić.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <Link to='/'><AlertDialogAction className='min-w-full'>Usuń</AlertDialogAction></Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    
    </AlertDialog> 
</div>  

</p>
                  
                    

                    
                
       
              </CardContent>
            </Card>
           </div>
        </>
    )
}



export default Players;