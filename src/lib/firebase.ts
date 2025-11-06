
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase lazily and only on the client-side
function getFirebaseApp(): FirebaseApp {
    if (typeof window !== 'undefined') {
        if (getApps().length === 0) {
            return initializeApp(firebaseConfig);
        } else {
            return getApp();
        }
    }
    // On the server, return a dummy app object to avoid errors during SSR
    return {} as FirebaseApp;
}

function getFirebaseAuth(): Auth {
    const app = getFirebaseApp();
    // Ensure getAuth is also only called client-side
    if (typeof window !== 'undefined') {
        return getAuth(app);
    }
    // Return a dummy auth object for the server
    return {} as Auth;
}

export { getFirebaseAuth };
