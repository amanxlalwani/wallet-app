import { ReactNode } from "react";
import SidebarItem from "../../components/SidebarItem";
import Home from "../page";
import AppbarClient from "../../components/AppbarClient";

export default function DashboardLayout({children}:{children:ReactNode}){
return <>
<AppbarClient></AppbarClient>
<div className="grid grid-cols-6 gap-4 bg-stone-200">
    <div className="col-span-1 border-r border-slate-400  pt-28 pl-10 items-center min-h-screen">
    
      <SidebarItem title="Transfer" icon={<TransferIcon></TransferIcon>} href="/transfer" ></SidebarItem>
      <SidebarItem title="Transactions" icon={<TransactionIcon></TransactionIcon>} href="/transactions" ></SidebarItem>
      <SidebarItem title="P2P Transfer" icon={<P2PTransfer></P2PTransfer>} href="/p2ptransfer" ></SidebarItem>
    </div>
    <div className="col-span-5">{children} </div>
</div>

</>
}




function TransactionIcon(){
    return <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
    </>
}
function TransferIcon(){
    return <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
</svg>
    </>
}

function P2PTransfer() {
  return (<>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>
  
  </>)
}
