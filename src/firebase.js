import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8ibjE9qaAWVDpYxd0IU-ryIU5KfSEAUk",
  authDomain: "hospital-crm-625bb.firebaseapp.com",
  projectId: "hospital-crm-625bb",
  storageBucket: "hospital-crm-625bb.appspot.com", // 🔥 FIXED
  messagingSenderId: "215200248608",
  appId: "1:215200248608:web:ca6c5db67a439682379d45"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);   // ✅ only once
export const auth = getAuth(app);      // ✅ correct