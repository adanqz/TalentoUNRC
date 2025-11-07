
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

function getFirebaseAuth(): Auth {
    if (typeof window === 'undefined') {
        // This is a safeguard, but getFirebaseAuth should only be called on the client.
        // A proper fix would involve a more complex provider pattern.
        // For now, let's ensure this is not the source of the error.
        let app;
        if (!app) {
             app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        }
        return getAuth(app);
    } else {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        return getAuth(app);
    }
}

export { getFirebaseAuth };
