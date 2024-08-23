import { Card } from "@repo/ui/card"
import { getTransactionHistory } from "../../actions/P2P/getTransactionHistory"
import { log } from "console"


export default async function Transactions(){
    const history=await getTransactionHistory()
    console.log(history);
    
    if(!history.length){
        return <>
        <div className="flex justify-center h-full w-full">
            <div className="w-1/3 mt-12">
            <Card title="Transactions">
              <div className="flex justify-center items-center h-20">
               No transactions 
              </div>
            </Card>
            
            </div>

        </div>
        </>
    }
    return <>
    <div className=" flex  justify-center h-full w-full">

        <div className="w-1/3 mt-12">
    <Card title="Transactions">
        <div className="flex flex-col ">
            
            {history.map(ele=>{
                return <>
                 <div className="flex justify-between items-center">
                 <div className="flex flex-col items-center justify-between border-b border-slate-100  p-4">
            <div className="font-medium text-lg">{ele?.otherPerson}</div>
            <div className="text-slate-800" >{ele?.otherNumber}</div> 
            </div>
            <div className={ele?.type==="credit"?"text-green-400":"text-red-400"+""}>
          {ele?.type==="credit" ? 
           <>+</>   : <>-</> }
           {ele?.amount} 
        </div>
        </div>
                </>
            })}
            
           
           
        </div>
        
    </Card>
    </div>
    </div>
    </>
}