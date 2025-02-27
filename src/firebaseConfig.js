import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8lm4xytPeYC41UNfKNG7jQNkikRxibMI",
  authDomain: "glasto-db.firebaseapp.com",
  projectId: "glasto-db",
  storageBucket: "glasto-db.appspot.com",
  messagingSenderId: "1027193618598",
  appId: "1:1027193618598:web:ee3e60f6ea704f7c41f467",
  measurementId: "G-SM1YY5E32P",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
