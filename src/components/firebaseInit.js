// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTXoQixIIa9qiKA8k0N_1TeLz1LQIZ4SI",
  authDomain: "photofolio-app-e0f82.firebaseapp.com",
  projectId: "photofolio-app-e0f82",
  storageBucket: "photofolio-app-e0f82.appspot.com",
  messagingSenderId: "1042527071494",
  appId: "1:1042527071494:web:8afc288e2b020506f88287"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);