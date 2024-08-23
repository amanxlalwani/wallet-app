'use client'

import { Button } from "@repo/ui/button"
import { log } from "console"
import React, { ChangeEvent, useRef, useState } from "react"
export function OtpInput({onSubmit}:{onSubmit:()=>void}){
   const [otp,setOtp]=useState("")
   console.log("Hello from otp");
   
    return<>
   <div className="flex justify-center items-center h-screen">
   <div className=" w-1/4 border flex justify-center items-center gap-4 flex-col p-4 rounded-lg">
   <input autoFocus onChange={(e)=>{setOtp(e.target.value)}} placeholder="123456" type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
    <Button onClick={ ()=>{  onSubmit()}}>Verify</Button>
    </div>
    </div>
    </>
}