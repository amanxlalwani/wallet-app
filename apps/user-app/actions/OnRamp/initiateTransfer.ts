'use server'

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/lib/nextAuth/auth";
import jwt from "jsonwebtoken"
export async function initiateOnRamp(money:number,bankName:string){
const session =await getServerSession(authOptions);
const token= Math.random().toString()
 await prisma.onRampTransaction.create({
    data:{
        provider:bankName,
        status:"Processing",
        token:token,
        amount:money,
        startTime:new Date(),
        userId:Number(session?.user?.id)
        }
})

}