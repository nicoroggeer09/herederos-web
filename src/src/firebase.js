// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAuY3lxwaGts42Sfk-aR5bIZ7WHmKKZdo",
  authDomain: "herederos-bar.firebaseapp.com",
  projectId: "herederos-bar",
  storageBucket: "herederos-bar.firebasestorage.app",
  messagingSenderId: "667955160555",
  appId: "1:667955160555:web:f2ac32c6f4af0b9b49e5ae",
  measurementId: "G-G2F1H037LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
