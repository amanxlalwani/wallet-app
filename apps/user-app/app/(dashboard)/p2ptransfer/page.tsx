'use client'
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import InputBox from "@repo/ui/inputBox"
import { useEffect, useState } from "react"
import { searchUser } from "../../actions/P2P/searchUser"
import { clearInterval } from "timers"
import { log } from "console"
import { sendMoney } from "../../actions/P2P/sendMoney"
import { toast } from "react-toastify"



export default function P2PTransfer(){
    const [users,setUsers]=useState<{phone:string,name:string|null}[]>([])
    const [number,setNumber]=useState("")
    const [money,setMoney]=useState(0)
    const [autoComplete,setAutoComplete]=useState(false)
    useEffect(()=>{
    var timer=setTimeout( ()=>{
     searchUser(number).then(res=>{
        setUsers(res)
        console.log(res);
     })
     
    },1000)
    
    return ()=>{clearTimeout(timer)} 
    },[number])

    return <>
     <div className="h-4/5 w-full flex justify-center items-center">
        <div className="w-1/3 ">
     <Card title="Send">
        <InputBox value={number} type="tel" title="Phone Number" onChange={(e)=>{
         setAutoComplete(false)
         setNumber(e.target.value)
        }
        } placeholder="+919876543211"></InputBox>
        <div className={` max-h-40 overflow-y-auto bg-slate-200 rounded-lg ${autoComplete?"hidden":""}`}>
        {users.length?<div>
            {users.map(user=>{
                return <div onClick={()=>{setNumber(user.phone); setAutoComplete(true)}} className="flex items-center justify-between cursor-pointer border-b border-slate-100  p-4">
                    <div className="font-medium text-lg">{user.name}</div>
                    <div className="text-slate-800" >{user.phone}</div> 
                    </div>
            })}
            
        </div>: null }
        </div>
        <InputBox type="number" title="Money" onChange={(e)=>{
         setMoney(Number(e.target.value))
        }} placeholder=""></InputBox>        
        <div className="flex justify-center mt-6">
           <Button disabled={ !(money!=0 && (number.length ==13))} onClick={async ()=>{
            const res=await sendMoney(number,money)
            if(res.status!=200){
            toast.error(res.message) 
            }else{
            toast.success(res.message)
            }
           }}>Send</Button>
        </div>
     </Card>
     </div>
     </div>
    </>
}