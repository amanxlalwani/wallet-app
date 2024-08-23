"use client"

export default function Select(
    {title,options,onSelect}:{title:string,options:{key:string,value:string}[],onSelect:(value:string)=>void})
{
return <>
  <label htmlFor={title} className="block mb-2 text-sm font-medium text-gray-900 ">{title}</label>
  <select onChange={(e)=>{onSelect(e.target.value)}} id={title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
    {options.map( (ele:{key:string,value:string}) =>{
        return <option value={ele.value}>{ele.key}</option>
    })}
  </select>

</>
}