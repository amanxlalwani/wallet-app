"use client"

import { Button } from "@repo/ui/button";
import InputBox from "@repo/ui/inputBox";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { checkUser } from "../../../actions/auth/checkUser";
import { ConfirmationResult, getAuth , RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";


import { signup } from "../../../actions/auth/signup";

import { app } from "../../lib/firebase/auth";
import { log } from "console";
import { toast } from "react-toastify";


export default function SignUp(){
  const router = useRouter()

    const[otp,setOtp]=useState("")
    const [recaptchaVerifier,setRecaptchaVerifier]=useState<RecaptchaVerifier|null>(null)
    const [resendCountdown,setResendCountdown]=useState(0)
    const [confirmationResult,setConfirmationResult]=useState<ConfirmationResult|null>(null)
    const [user,setUser]=useState<{name:string, phone:string,password:string}>({name:"",phone:"",password:""})
    const[isPending,startTransition]=useTransition()
    const auth=getAuth(app)
     console.log(process.env.NEXT_PUBLIC_SECRET);
     console.log("   aaaaaaaaaaaa");
          
    const loadingIndicator=(<div>
      <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
    </div>
    </div>)

    useEffect(()=>{
      if(resendCountdown>0){
        var timer=setTimeout(()=>setResendCountdown(resendCountdown-1),1000)
      }

      return ()=>clearTimeout(timer)
    },[resendCountdown])


   useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'captcha-container',
      {
        size: "invisible"
      }
    );

    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);
   
  const requestOtp=async ()=>{

    startTransition(async ()=>{
      const res= await checkUser({user})
      console.log(res);
      
      if(res.message === "success"){
       
        if(!recaptchaVerifier){
          toast.error("Captcha is not initialized")
          return
        }
  
        try{
          console.log(user.phone);
          const res= await signInWithPhoneNumber(auth,user.phone,recaptchaVerifier)
          setConfirmationResult(res) 
          toast.success("Otp Sent To Your Phone Number Successfully")
          setResendCountdown(60)
        }
        catch(err:any){
          console.log(err);
          setResendCountdown(0)
          if (err.code === "auth/invalid-phone-number") {
            toast.error("Invalid phone number. Please check the number.");
          } else if (err.code === "auth/too-many-requests") {
             toast.error("Too many requests. Please try again later.");
          } else {
            toast.error("Failed to send OTP. Please try again.");
          }
      }
    }
    else{
      setResendCountdown(0)
      toast.error(res.message)
    }
    })
   
}


const verifyOtp= async ()=>{
  startTransition(async ()=>{
    try{
      await confirmationResult?.confirm(otp)
      const res=await signup({user})
      if(res.status==200){
       toast.success("User Created")
       router.push("/signin")
      }
      else{
       toast.error("User could not be created")
      }
    }
    catch(error){
    console.log(error);
    toast.error("Failed to verify otp.Please Check the otp")
    
    }
  })

}

 

    return <> <div className="flex justify-center items-center h-screen">
    <div className=" w-1/4 border flex justify-center flex-col p-4 rounded-lg">
    { confirmationResult && <div>   
      <input type={"text"} id={"otp-input"} autoFocus onChange={(e)=>{setOtp(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={"654321"} required />
      <div className="flex justify-center mt-6"> {isPending ? <div>{loadingIndicator}</div>: (<> <Button onClick={verifyOtp }> Verify</Button>
      <Button disabled={resendCountdown>0||isPending} onClick={requestOtp} > Resend OTP</Button>
      {resendCountdown>0?<p>Resend OTP in {resendCountdown} seconds</p>:<></>} </>
      )
      }
      </div></div> }
      
        {!confirmationResult && 
        <div> 
         <div className="text-lg font-semibold flex items-center justify-center">Already have an Account? <span onClick={()=>{ router.push("/signin") }}   className="underline cursor-pointer"> Login </span></div>
    <InputBox onChange={(e)=>{setUser({...user,name:e.target.value})}}  type="text" placeholder="Aman Lalwani" title="Name"></InputBox>
     <InputBox onChange={(e)=>{setUser({...user,phone:e.target.value})}}  type="tel" placeholder="+919876543211" title="Phone Number"></InputBox>
     <p className="text-slate-500 text-sm ml-2">Enter Phone Number with Country Code eg. +91</p>
     <InputBox onChange={(e)=>{setUser({...user,password:e.target.value})}} type="password" placeholder="•••••••••••" title="Password"></InputBox>
     <div className="flex justify-center mt-6">
     
     <div id="signup-btn">

      {isPending?<div>{loadingIndicator}</div> :<Button onClick={requestOtp} > Sign Up</Button>}</div>
    </div>
      

        </div> }
    

    <div id="captcha-container"></div>
    </div>
    
    </div>
    </>
    
}