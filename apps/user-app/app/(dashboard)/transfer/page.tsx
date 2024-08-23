import { Card } from "@repo/ui/card"
import Center from "@repo/ui/center"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/nextAuth/auth"
import prisma from "@repo/db/client"
import { log } from "console"
import AddMoneyCard from "../../../components/AddMoneyCard"
import BalanceCard from "../../../components/BalanceCard"
import OnRampTransactions from "../../../components/OnRampTransactions"
enum OnRampStatus{
    Success,
    Failure,
    Processing
}

async function getBalance(){
  const session= await getServerSession(authOptions)
  const balance = await prisma.balance.findFirst({where:{
    userId: Number(session.user?.id)
  }})
  return {amount:balance?.amount|| 0,locked:balance?.locked||0};
}


async function getOnRampTransactions(){
    const session= await getServerSession(authOptions)
    console.log(session);
    
    const txns = await prisma.onRampTransaction.findMany({where:{
      userId: Number(session.user?.id)
    }})
    return txns.map((ele:{
        id: number;
        status: any;
        token: string;
        provider: string;
        amount: number;
        startTime: Date;
        userId: number;
    })=>{
        return {
            amount:ele.amount,
            status:ele.status as string,
            time:ele.startTime,
            provider:ele.provider
        }
    })
  }

export default async function Transfer(){
    const balance=await getBalance()
    const transactions=await getOnRampTransactions()
    return <>
    <div className="text-5xl text-violet-500 p-4 py-8 font-semibold">Transfer</div>
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2" >
        <div>
            <AddMoneyCard/>
        </div>
        <div className="mx-2">
            <div>
                <BalanceCard locked={balance.locked} amount={balance.amount}></BalanceCard>
            </div>
            <div>
            <OnRampTransactions transactions={transactions}></OnRampTransactions>
            </div>
        </div>
    </div>
    </>
}