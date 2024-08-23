import { ReactNode } from "react";

export default function Center({children}:{children:ReactNode}){
return <>
<div className="flex justify-center items-center w-full h-full">
    {children}
</div>
</>

} 