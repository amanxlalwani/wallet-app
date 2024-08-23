import { Card } from "@repo/ui/card";

export default function BalanceCard({
    amount,
    locked
}:{amount:number,locked:number}){
    return <>
    <Card title="Balance">
      <div className="flex justify-between border-b py-2">
         <div>Unlocked Balance </div>
         <div>{amount/100} INR</div>
      </div>
      <div className="flex justify-between border-b py-2">
         <div>Locked Balance </div>
         <div>{locked/100} INR</div>
      </div>
      <div className="flex justify-between border-b py-2">
         <div>Total Balance </div>
         <div>{locked/100 + amount/100} INR</div>
      </div>
    </Card>

    </>
}