import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { log } from "console";
import nextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { pages } from "next/dist/build/templates/app-page";


export const authOptions=
    {
        providers:[
            Credentials({
            name:"credentials",
            credentials:{
              phone:{label:"Phone Number", type:"text", placeholder:"123456789",required:true},
              password:{label:"Password",type:"password",required:true}  
            },
            async authorize(credentials:Record<"phone" | "password", string> | undefined, req) {
                
                const existingUser=await prisma.user.findFirst({
                    where:{
                        number:credentials?.phone
                    }
                })

                if(existingUser){
                    const passwordValidation=await bcrypt.compare(credentials?.password || "",existingUser.password)
                    console.log(passwordValidation);
                    
                    if(passwordValidation){
                        return{
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            number:credentials?.phone.toString()
                        }
                    }
                    return null;
                }
                else{

                }
                return null
            }
            }),
        ],
        secret:process.env.NEXT_PUBLIC_SECRET || "secret" ,
        callbacks:{
            async session({token,session}:any){
               session.user.id=token.sub
               return session 
            }
        },
        pages:{
          signIn:"/signin"
        }
    }



 