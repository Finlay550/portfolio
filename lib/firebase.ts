
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyBy8tuut6tY4XJPc6Ei8tzTuE00P0wRA2g",
  authDomain: "finlayxyz.firebaseapp.com",
  databaseURL: "https://finlayxyz-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "finlayxyz",
  storageBucket: "finlayxyz.firebasestorage.app",
  messagingSenderId: "218315422383",
  appId: "1:218315422383:web:e61c85bb3759460b1df25a",
  measurementId: "G-ZYHRQYEHBB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
