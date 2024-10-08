
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "./lib/nextAuth/auth"

export default async function Home() {
  const session=await getServerSession(authOptions)

  if(session?.user)
  {
    redirect("/transfer")
  }
  else
  {
    redirect("/signin")
  }
}