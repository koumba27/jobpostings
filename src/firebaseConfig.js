import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAYc_FnzqJc1edhR35ocTW8vjMfanG42ac",
  authDomain: "tasktrackerapp-d2ffc.firebaseapp.com",
  projectId: "tasktrackerapp-d2ffc",
  storageBucket: "tasktrackerapp-d2ffc.firebasestorage.app",
  messagingSenderId: "423136916040",
  appId: "1:423136916040:web:f1580066b767c5940dde7d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);