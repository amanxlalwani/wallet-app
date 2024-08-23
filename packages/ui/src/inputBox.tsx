"use client"
import { ChangeEventHandler } from "react";

export default function InputBox({title,placeholder,type,onChange,value}:{title:string,placeholder:string,type:string,onChange:ChangeEventHandler<HTMLInputElement>,value?:string|null}){

    
if(value){

return<>
<div className="mt-2">
<label htmlFor={title} className="block mb-2 text-sm font-medium text-gray-900">{title}</label>
<input type={type} id={title} value={value} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
</>
}

return<>
<div className="mt-2">
<label htmlFor={title} className="block mb-2 text-sm font-medium text-gray-900">{title}</label>
<input type={type} id={title}  onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
</>

}