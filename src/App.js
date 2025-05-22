import "./App.css";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ListItem } from "./components/ListItem";
import { db } from "./firebaseConfig";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "vm-hit"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <div className="title-container">
        <h1>Data</h1>
      </div>
      <div className="item-container">
        <p className="header">Browser</p>
        <p className="header">IP Address</p>
        <p className="header">TimeStamp</p>
        <p className="header">In Use</p>
      </div>
      {data.map((item) => {
        return (
          <ListItem
            key={item.id}
            id={item.id}
            ipAddress={item.ipAddress}
            browser={item.browser}
            createdAt={item.createdAt}
            isActive={item.isActive}
          />
        );
      })}
    </div>
  );
}

export default App;
