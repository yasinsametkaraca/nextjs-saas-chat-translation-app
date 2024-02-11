// firebase-admin.ts is a file that initializes the firebase admin app and exports the auth and firestore services. This file is used to initialize the firebase admin app and export the services to be used in the app.
import admin from 'firebase-admin'
import {initFirestore} from '@auth/firebase-adapter'

let app;

if (!admin.apps.length) {
    app = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
    });
}

const adminDb = initFirestore({
    credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
})

const adminAuth = admin.auth(app);

export {adminDb, adminAuth};