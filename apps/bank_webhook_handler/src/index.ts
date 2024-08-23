import express from "express";
import prisma from "@repo/db/client"
const app = express();
app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?

    //check where this req is legit from bank using some secret
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try{
        await prisma.$transaction([
            prisma.balance.update({where:{userId:paymentInformation.userId},
            data:{
                amount:{increment:paymentInformation.amount}
            }}),
            prisma.onRampTransaction.update({
                where:{token:paymentInformation.token},
                data:{
                    status:"Success"
                }
            })
        ])
        return res.json({
            message:"captured"
        })
    }
    catch(e){
        await prisma.onRampTransaction.update({
            where:{token:paymentInformation.token},
            data:{status:"Failure"}
        })
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }

    // Update balance in db, add txn
})

app.listen(4000)