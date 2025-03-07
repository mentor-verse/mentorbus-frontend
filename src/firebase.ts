// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Qi0dYQ04uO6ud-bWS1YKvas8mGMp0Vw",
  authDomain: "mentorbus-c4f93.firebaseapp.com",
  projectId: "mentorbus-c4f93",
  storageBucket: "mentorbus-c4f93.firebasestorage.app",
  messagingSenderId: "808041628472",
  appId: "1:808041628472:web:60920da41a0ece840977cd",
  measurementId: "G-TGGM2L40L7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
