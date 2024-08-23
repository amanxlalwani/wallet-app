'use server'

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/nextAuth/auth"
import { log } from "console"


export async function getTransactionHistory(){
    const session=await getServerSession(authOptions)

    try{
        const res=await prisma.p2PTransaction.findMany(
            {
                where:{
                    OR:[
                    {sendId:Number(session.user.id)},
                    {receiverId:Number(session.user.id)}
                ]
                },
                select:{
                    amount:true,
                    sender:{
                        select:{
                            id:true,
                            name:true,
                            number:true
                        }
                    },
                    receiver:{
                        select:{
                            id:true,
                            name:true,
                            number:true
                        }
                    }
                }
                
            }
        )

        const history=res.map((ele)=>{
           let type="credit"
           let otherPerson=ele.sender.name 
           let otherNumber=ele.sender.number
            if(ele.sender.id==session.user.id){
            type="debit"
            otherPerson=ele.receiver.name
            otherNumber=ele.receiver.number
           }
            return {
            type,
            otherPerson,
            otherNumber,
            amount:ele.amount/100,
            }
        })

        return history

    }
    catch(e){
        console.log(e);
        return []     
    }
}