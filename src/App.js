/* eslint-disable react-hooks/exhaustive-deps */
//

import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { formatDate } from "./formatDate";

const firebaseConfig = {
  apiKey: "AIzaSyD8lm4xytPeYC41UNfKNG7jQNkikRxibMI",
  authDomain: "glasto-db.firebaseapp.com",
  projectId: "glasto-db",
  storageBucket: "glasto-db.appspot.com",
  messagingSenderId: "1027193618598",
  appId: "1:1027193618598:web:ee3e60f6ea704f7c41f467",
  measurementId: "G-SM1YY5E32P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "vm-hit"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(data); // Update the state with ordered data
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe on unmount
  }, []);

  return (
    <div className="App">
      <h1>Data</h1>
      <div className="item-container">
        <p className="header">Browser</p>
        <p className="header">Vm-id</p>
        <p className="header">TimeStamp</p>
      </div>
      {data.map((item) => {
        return (
          <div className="item-container" key={item.id}>
            <p>{item.browser}</p>
            <p>{item["vm-id"]}</p>
            <p>
              {formatDate(item.createdAt.seconds, item.createdAt.nanoseconds)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
