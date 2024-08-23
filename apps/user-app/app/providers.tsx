"use client"
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import {ToastContainer} from "react-toastify"
import "../app/globals.css"
import "react-toastify/ReactToastify.css"
export default function Providers({children}:{children:React.ReactNode}){
    return <>
  
    <RecoilRoot>
    <SessionProvider>
        <ToastContainer/>
        {children}
        </SessionProvider>
    </RecoilRoot>
    
    </>
}