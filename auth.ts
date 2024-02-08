import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,  // firebase google client id
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!  // firebase google client secret
        }),
    ],
} satisfies NextAuthOptions;