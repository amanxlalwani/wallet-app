'use server'

import prisma from "@repo/db/client"
import { create } from "domain"
import bcrypt from "bcrypt";

export async function signup({user:{name,phone,password}}:{user:{name:string, phone:string,password:string}}){

    try{
         const hashedPassword=await bcrypt.hash(password,10)
          await prisma.user.create({data:{
            number:phone,
            password:hashedPassword,
            name:name,
            balance:{
                create:{
                    amount:0,
                    locked:0
                }
            }
        }})
        
         return {
            status:200,
            message:"success"
         }
     }
     catch(e){
        console.log(e);
        
         return {
            message:"failure"
         }
     }
}