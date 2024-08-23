'use server'

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { use } from "react"
import { authOptions } from "../../lib/nextAuth/auth"
import { log } from "console"

export async function searchUser(searchNumber:string){
    const session=await getServerSession(authOptions)

    
    if(!searchNumber.length) return []
    try{
    const users=await prisma.user.findMany({
        where:{
            number:{
                contains:searchNumber
            }
        }
    })
    console.log(users);
    const finalUsers= users.filter(user=>{
        return user.id!=session.user.id
    })
    return finalUsers.map(user=>{    
        return {phone:user.number,name:user.name}
    })
  

}
    catch(err){
    console.log(err);
    return []
    }
}