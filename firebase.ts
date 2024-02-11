//firabase.ts is a file that initializes the firebase app and exports the auth, firestore, and functions services. This file is used to initialize the firebase app and export the services to be used in the app.
import {getApp, getApps, initializeApp} from "@firebase/app";
import {getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";
import {getFunctions} from "@firebase/functions";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);  // if firebase app is already initialized, use the existing app. Otherwise, initialize the app with the config.
const auth = getAuth(app);  // get the auth service
const db = getFirestore(app);  // get the firestore service
const functions = getFunctions(app);  // get the functions service

export {auth, db, functions};
