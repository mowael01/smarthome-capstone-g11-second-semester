// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHku9uPpvizJnBZNZCGZWXhEGWmFZtfDs",
  authDomain: "smart-home-bbcc3.firebaseapp.com",
  projectId: "smart-home-bbcc3",
  storageBucket: "smart-home-bbcc3.appspot.com",
  messagingSenderId: "280217500857",
  appId: "1:280217500857:web:70e5df9abca5c31660ef68",
  measurementId: "G-G97B311M2H",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FireStoreDB = getFirestore(FirebaseApp);
export const FirebaseAUTH = getAuth(FirebaseApp);
export const FireStorage = getStorage(FirebaseApp);
