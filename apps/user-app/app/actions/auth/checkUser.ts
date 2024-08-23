'use server'

import prisma from "@repo/db/client"
import { create } from "domain"
import bcrypt from "bcrypt";

export async function checkUser({user:{name,phone,password}}:{user:{name:string, phone:string,password:string}}){

    try{
         
        const res1=  await prisma.user.findFirst({where:{number:phone}})
      
        if(res1){
            return {status:400, message:"User with this mobile number already exists"}
        }
       

         return {status:200,
            message:"success"
         }
     }
     catch(e){
         return { status:400,
            message:"failure"
         }
     }
}