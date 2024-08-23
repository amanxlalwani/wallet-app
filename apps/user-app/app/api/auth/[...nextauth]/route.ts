import nextAuth from "next-auth";
import { authOptions } from "../../../lib/nextAuth/auth";

const handler=nextAuth(authOptions)

export {handler as POST,handler as GET}
