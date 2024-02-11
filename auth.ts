// This file contains the configuration for next-auth. It is used to configure the authentication providers and session management.
import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {FirestoreAdapter} from "@auth/firebase-adapter";
import {adminAuth, adminDb} from "./firebase-admin";

export const authOptions: NextAuthOptions = {
    providers: [  // configure the authentication providers. In this case, only google provider is used.
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,  // firebase google client id
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!  // firebase google client secret
        }),
    ],
    callbacks: {  // callbacks are used to modify the session and token objects.
        session: async ({session, token}) => {
            if (session?.user) {
                if (token.sub) {
                    session.user.id = token.sub; // if token sub property exists (user is logged in with jwt token instead of session), set the user id as the sub property of the token.

                    const firebaseToken = await adminAuth.createCustomToken(token.sub);
                    session.firebaseToken = firebaseToken;  // create a custom token for the user and set it to the session object.
                }
            }
            return session;
        },
        jwt: async ({token, user}) => {
            if (user) {
                token.sub = user.id;  // set the user id as the sub property of the token. Token sub property is used to identify the user.
            }
            return token;
        }
    },
    session: {
        strategy: "jwt",  // use jwt token for session management. It is more secure than default session management.
    },
    adapter: FirestoreAdapter(adminDb),  // use firestore adapter for session management. users and sessions will be stored in firestore. Users and sessions collection will be created in firestore.
} satisfies NextAuthOptions;

// JWT'nin payload kısmı şu şekilde olabilir.
// {
//     "sub": "user_id",
//     "name": "John Doe",
//     "email": "john.doe@example.com"
// }