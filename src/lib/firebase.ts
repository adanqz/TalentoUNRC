
'use client';

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

// This function ensures we only initialize Firebase on the client-side
// and only once.
function getFirebaseApp(): FirebaseApp {
  if (typeof window === 'undefined') {
    // On the server, return a mock object or handle as needed.
    // Here we will just throw an error if accessed, but it shouldn't be.
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
    return getAuth(app);
}

export { getFirebaseAuth };
