// route.ts file is a Next.js API route file that is configured to perform authentication and authorization using NextAuth.js.
import NextAuth from "next-auth";
import {authOptions} from "@/auth";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }