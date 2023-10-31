// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5ae81.firebaseapp.com",
  projectId: "mern-estate-5ae81",
  storageBucket: "mern-estate-5ae81.appspot.com",
  messagingSenderId: "465333504102",
  appId: "1:465333504102:web:9e7ed305d3bf8ae90e05a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);