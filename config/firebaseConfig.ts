import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from "dotenv";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
dotenv.config();

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJ1tNl5-o0ZkRrnDTsg6VagWmWVC4fxrI",
  authDomain: "backend-repo-33082.firebaseapp.com",
  projectId: "backend-repo-33082",
  storageBucket: "backend-repo-33082.appspot.com",
  messagingSenderId: "478319758734",
  appId: "1:478319758734:web:5814fd5606df027d6728df",
  measurementId: "G-X08WKP7F67",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
