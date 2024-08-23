'use server'
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/lib/nextAuth/auth";

export async function sendMoney(phone:string,money:number){
    const session=await getServerSession(authOptions)
    const receiver=await prisma.user.findFirst(
        {
            where:{
                number:phone
            }
        }
    )
    if(receiver){
    
        const sender=await prisma.user.findFirst(
            {where:{
              id:Number(session.user.id)  
            },
        select:{
            id:true,
            balance:{
            select:{
                amount:true
            }
        }}}
        )

        
        const bal= sender?.balance[0]?.amount || 0;
        
        if((bal/100)>=money) {
        
        try{  
            if(sender?.id && receiver.id){
            await prisma.$transaction([
                prisma.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(sender.id)} FOR UPDATE` ,
                 prisma.balance.update({
                    where:{
                        userId:receiver?.id
                    },
                    data:{
                     amount:{increment:(money*100)}
                    }
                 }),
                 prisma.balance.update({
                    where:{
                        userId:sender?.id
                    },data:{
                        amount:{decrement:(money*100)}
                    }
                 }),
                 prisma.p2PTransaction.create({
                    data:{
                        sendId:sender?.id,
                        receiverId:receiver?.id,
                        amount:(money*100)
                    }
                 })
            ])
            return{
                status:200,
                message:"Transaction Successful"
            }}
            else{
                console.log("Insufficient Funds");
                
                throw new Error("Something went wrong!!")
            }
        }
        catch(err){
          return {
            status:500,
            message:"Something went wrong!!!"
          }
        } 


        }
        else{
        return{
            status:401,
            message:"Insufficient Balance"
        }
        }
    } 
    else{
        return {
            status:404,
            message:"This phone number does not exist"
        }
    }

}