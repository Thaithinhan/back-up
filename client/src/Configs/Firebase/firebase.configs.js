// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ50jrxE29C-YIN59MgJlDPwHJXYNks20",
  authDomain: "my-twitter-392716.firebaseapp.com",
  projectId: "my-twitter-392716",
  storageBucket: "my-twitter-392716.appspot.com",
  messagingSenderId: "1046187466004",
  appId: "1:1046187466004:web:892c89e8bbd1a7e19db601",
  measurementId: "G-3TTBE2S88M",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
