import * as firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyCHku9uPpvizJnBZNZCGZWXhEGWmFZtfDs",
  authDomain: "smart-home-bbcc3.firebaseapp.com",
  projectId: "smart-home-bbcc3",
  storageBucket: "smart-home-bbcc3.appspot.com",
  messagingSenderId: "280217500857",
  appId: "1:280217500857:web:70e5df9abca5c31660ef68",
  measurementId: "G-G97B311M2H",
  databaseURL: "https://smart-home-bbcc3-default-rtdb.firebaseio.com/"
};

// // Initialize Firebase

export const FirebaseApp =
  firebase.default.apps.length === 0
    ? firebase.default.initializeApp(firebaseConfig)
    : firebase.default.app();
export const FirebaseAUTH = firebase.default.auth();
export const Database = firebase.default.database();
