// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-DYOU-PoQyQLuaAmWULJ8L3ls4DlDfwo",
  authDomain: "expense-tracker-e75a8.firebaseapp.com",
  projectId: "expense-tracker-e75a8",
  storageBucket: "expense-tracker-e75a8.appspot.com",
  messagingSenderId: "228639032748",
  appId: "1:228639032748:web:c4905523b27e1a50816609"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore (app);