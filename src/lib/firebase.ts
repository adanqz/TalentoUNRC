
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

// This function safely gets the firebase app instance, initializing it if necessary.
// It's designed to work only in Next.js's client-side environment.
function getFirebaseApp(): FirebaseApp {
    if (getApps().length === 0) {
        return initializeApp(firebaseConfig);
    } else {
        return getApp();
    }
}

// This function should only be called on the client side.
function getFirebaseAuth(): Auth {
    // We only want to initialize the app on the client side
    if (typeof window === 'undefined') {
        // On the server, we can't safely initialize.
        // We return a temporary mock auth object to prevent errors during SSR,
        // though client-side logic should prevent this from being used.
        return {} as Auth;
    }

    const app = getFirebaseApp();
    return getAuth(app);
}

export { getFirebaseAuth };
