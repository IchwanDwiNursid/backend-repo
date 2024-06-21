import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from "dotenv";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
dotenv.config();

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGE_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASURE_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
