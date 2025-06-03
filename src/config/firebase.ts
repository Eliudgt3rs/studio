import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0l-eOctteCegW8KizxZSpIiP2R3yvzUc",
  authDomain: "lohatgoi.firebaseapp.com",
  projectId: "lohatgoi",
  storageBucket: "lohatgoi.firebasestorage.app",
  messagingSenderId: "528252684667",
  appId: "1:528252684667:web:d13de65d316d88c33e55de",
  measurementId: "G-Y1YJSHNE27"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);


if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
