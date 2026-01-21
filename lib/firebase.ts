
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Helper to safely access environment variables in different contexts
const getEnvVar = (key: string): string => {
  // 1. Check Vite native env
  const viteEnv = (import.meta as any).env;
  if (viteEnv && viteEnv[key]) return viteEnv[key];

  // 2. Check shimmed process.env (from vite.config.ts)
  try {
    const procEnv = (process as any).env;
    if (procEnv && procEnv[key]) return procEnv[key];
  } catch (e) {
    // process might not be defined yet
  }

  return "";
};

const firebaseConfig = {
  apiKey: getEnvVar("VITE_FIREBASE_API_KEY"),
  authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN"),
  databaseURL: getEnvVar("VITE_FIREBASE_DATABASE_URL"),
  projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getEnvVar("VITE_FIREBASE_APP_ID"),
  measurementId: getEnvVar("VITE_FIREBASE_MEASUREMENT_ID")
};

// Initialize Firebase only once and ensure config is valid
let app;
try {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "") {
    console.warn("Firebase API Key is missing. Deployment may lack database connectivity.");
    // Initialize with a placeholder to prevent export errors, though auth will fail
    app = getApps().length === 0 ? initializeApp({ ...firebaseConfig, apiKey: "REQUIRED_KEY_MISSING" }) : getApp();
  } else {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
  app = getApp();
}

export const auth = getAuth(app);
export const db = getDatabase(app);
