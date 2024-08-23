"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import InputBox from "@repo/ui/inputBox";
import Select from "@repo/ui/select"
import { useState } from "react";
import { initiateOnRamp } from "../app/actions/OnRamp/initiateTransfer";

import { getSession, useSession } from "next-auth/react";
import { log } from "console";


export default  function AddMoneyCard(){

    const BANK_OPTIONS=[{
        name:"HDFC Bank",
        redirectUrl:"https://netbanking.hdfcbank.com"
    },
    {
        name:"Axis Bank",
        redirectUrl:"https://www.axisbank.com/"
    }]

    const[redirectUrl,setRedirectUrl]=useState(BANK_OPTIONS[0]?.redirectUrl)
    const[bankName,setBankName]=useState(BANK_OPTIONS[0]?.name||"")
    const [money,setMoney]=useState(0)
    return <>
    <Card title="Add Money">
        <div className="mt-4">
        <InputBox onChange={(e)=>{
            setMoney(Number(e.target.value))
        }} title="Amount" placeholder="Amount" type="number"></InputBox>
        </div>
        <div className="mt-4">
        <Select title={"Bank"} options={BANK_OPTIONS.map((ele: {
    name: string;
    redirectUrl: string;
})=>{
        return {key:ele.name,value:ele.name}
        })}
        onSelect={(value)=>{
            const BANK_OPTION=BANK_OPTIONS.find((ele: {
                name: string;
                redirectUrl: string;
            })=>{return ele.name === value})
            setRedirectUrl(BANK_OPTION?.redirectUrl || "")
            setBankName(BANK_OPTION?.name || "")
        }} ></Select>
        </div>
        <div className="flex justify-center mt-8 ">
        <Button onClick={async ()=>{
      
            await initiateOnRamp(money*100,bankName);
            window.location.href = redirectUrl || ""
        }}>Add Money</Button>
        </div>
    </Card>
    </>
}