'use client'

import { useRouter ,usePathname } from "next/navigation";
import { ReactNode, use } from "react";

export default function SidebarItem({title,icon,href}:{title:string,icon:ReactNode,href:string}){
const router=useRouter()
const pathName=usePathname()
const selected=pathName===href

return <>
<div className={`${selected?"text-violet-500":"text-gray-400"} flex pt-4 font-semibold cursor-pointer hover:text-violet-500`} onClick={()=>{router.push(href)}}>
<div className="mr-2">
{icon}
</div>
<div>
    {title}
</div>
</div>


</>


}