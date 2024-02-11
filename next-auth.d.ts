// This file is used to extend the default session object with custom fields. I want to add user id.
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        firebaseToken?: string;
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}