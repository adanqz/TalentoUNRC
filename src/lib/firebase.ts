
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
// It's designed to work in Next.js's client-side environment.
function getFirebaseApp(): FirebaseApp {
    // We only want to initialize the app on the client side
    if (typeof window === 'undefined') {
        // On the server, we can't safely initialize.
        // We return a temporary mock app object to prevent errors during SSR.
        // The actual Firebase logic will only run on the client.
        return {} as FirebaseApp;
    }

    if (getApps().length === 0) {
        return initializeApp(firebaseConfig);
    } else {
        return getApp();
    }
}

function getFirebaseAuth(): Auth {
    const app = getFirebaseApp();
    // In the case of SSR, app will be a mock object, but getAuth will not be called
    // in a way that causes issues. The real `auth` logic is client-side.
    return getAuth(app);
}

export { getFirebaseAuth };
