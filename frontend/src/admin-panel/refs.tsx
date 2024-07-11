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

function refs (){
    return (
        <>
        <div className='min-h-screen p-0.5 box-border'>
           <div className="max-w-screen py-1 px-6 border box-border"> 
                <h1 className='text-project_primary text-2xl font-bold my-3 font-ptSans'> Scoreboard </h1> 
            </div> 
            <Card className='h-min border-none'>
    <CardHeader ><p className='text-xl font-semibold border-b-2 pb-4'>Gracze</p></CardHeader>
  <CardContent className='flex flex-col gap-2 border-none'>
    

        <p className='border w-full p-2 font-bold rounded flex justify-between items-center'> Chlost vs Michalak
            <div className='flex '>
                    <div className=' border rounded-md mx-4'>
                        <img src={edit} className="w-5 m-2 " alt="."/>
                        </div> 

                        
                    <div className=' border rounded-md'>
                        <img src={trash} className="w-5 m-2 " alt="."/>
                    </div>

                    
                </div>   
        </p> 

        <p className='border w-full p-2 font-bold rounded flex justify-between items-center'> Chlost vs Michalak
            <div className='flex '>
                    <div className=' border rounded-md mx-4'>
                        <img src={edit} className="w-5 m-2 " alt="."/>
                        </div> 

                        
                    <div className=' border rounded-md'>
                        <img src={trash} className="w-5 m-2 " alt="."/>
                    </div>

                    
                </div>   
        </p> 
  </CardContent>
</Card>
           </div>
        </>
    )
}



export default refs;