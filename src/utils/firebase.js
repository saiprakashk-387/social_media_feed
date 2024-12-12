// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHVGAguOkbHAthCFMlR5BR2ypwfLoFhrY",
  authDomain: "socialmediafeed-d29c9.firebaseapp.com",
  projectId: "socialmediafeed-d29c9",
  storageBucket: "socialmediafeed-d29c9.firebasestorage.app",
  messagingSenderId: "111993304199",
  appId: "1:111993304199:web:9b9029c96149d5d716f422",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
