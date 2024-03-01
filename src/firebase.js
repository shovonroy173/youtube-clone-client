// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARLoODDfuz-C-40XvlU2G7V-D0yPYaS7k",
  authDomain: "toob-d2109.firebaseapp.com",
  projectId: "toob-d2109",
  storageBucket: "toob-d2109.appspot.com",
  messagingSenderId: "234524462372",
  appId: "1:234524462372:web:b2392067d85411a892f7b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;