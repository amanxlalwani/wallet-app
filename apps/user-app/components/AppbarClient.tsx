'use client'

import Appbar from "@repo/ui/appbar"
import { log } from "console"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AppbarClient(){
const session=useSession()
const router=useRouter()
console.log(session);

return <>
<Appbar onSignOut={ async ()=>{  await signOut({callbackUrl:'/signin'})  }} onSignIn={signIn} user={session.data?.user} ></Appbar>
</>

}