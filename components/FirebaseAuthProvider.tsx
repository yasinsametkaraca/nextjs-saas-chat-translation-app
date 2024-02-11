"use client";
// FirebaseAuthProvider.tsx is a component that uses the useSession hook to get the session object and then uses the signInWithCustomToken function from the Firebase Auth SDK to sign in the user with the Firebase token from the session object. If the session object is not available, it signs out the user from Firebase.
import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";
import {Session} from "next-auth";
import {signInWithCustomToken} from "@firebase/auth";
import {auth} from "@/firebase";

async function syncFirebaseAuth(session: Session) {
    if(session && session.firebaseToken) {
        try {
            await signInWithCustomToken(auth, session.firebaseToken);
        } catch (e) {
            console.error(e)
        }
    } else {
        auth.signOut()
    }
}

function FirebaseAuthProvider({children,}: { children: React.ReactNode; }) {
    const {data: session} = useSession();


    useEffect(() => {
        if (!session) return;

        syncFirebaseAuth(session);
    }, [session]);
    return (
        <>{children}</>
    );
}

export default FirebaseAuthProvider;