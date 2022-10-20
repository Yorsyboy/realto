// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAucey18Ys6gJuuKfqGMjak6lfewtTzkO4",
  authDomain: "realtor-clone-910a8.firebaseapp.com",
  projectId: "realtor-clone-910a8",
  storageBucket: "realtor-clone-910a8.appspot.com",
  messagingSenderId: "289377162626",
  appId: "1:289377162626:web:2edd0d16877e7a15686b9b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();