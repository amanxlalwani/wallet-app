import { Card } from "@repo/ui/card"
import Center from "@repo/ui/center"

enum Status{
    Success,
    Failure,
    Processing
}

export default function OnRampTransactions({transactions}:{
    transactions:{
        time:Date,
        status:string,
        provider:string,
        amount:number
    }[]
}){
    if(!transactions.length)
    return <>
    <div className="mt-4">
    <Card title="Recent Transfers">
        <div className="h-40">
       <Center>No recent transactions</Center> 
       </div>
    </Card>
    </div>
    </>


  return <>
  <div className="mt-4">
  <Card title="Recent Transfers">
     


     <div className="grid grid-cols-4 gap-2 place-content-evenly mt-2">

    
       <div>Amount</div>
       <div>Date</div>
       <div>Status</div>
       <div>From</div>
       
     
     {transactions.map((t)=>{
      return <>
      
      <div>+{t.amount/100}</div>
      <div>{t.time.toDateString()}</div>
      <div>{t.status}</div>
      <div>{t.provider}</div>
      
      </>
     })}
     </div>
  </Card>  
  </div>
  </>
}