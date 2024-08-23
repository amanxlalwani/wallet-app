'use client'

import { Button } from "./button"


interface appbarProps{
    user?:{
        name?:string | null
    },
    onSignIn:any,
    onSignOut:any
}

export default function Appbar({user,onSignIn,onSignOut}:appbarProps){
    
    return <>
    <div className="flex justify-between items-center border-b border-slate-400 px-4 bg-stone-200">
    <div className="text-lg">
        PayTM
    </div>
    <div className="pt-4">
    <Button onClick={user? onSignOut:onSignIn}  > {user?<div>LogOut</div>:<div>login</div>} </Button>
    </div>
    </div>
    </>
}