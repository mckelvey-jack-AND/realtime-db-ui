import { useEffect, useState } from "react";
import { formatDate } from "../formatDate";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { update, ref as sref } from "firebase/database";
import { db } from "../firebaseConfig";

export const ListItem = ({ id, browser, ipAddress, createdAt, isActive }) => {
  const [isActiveState, setIsActiveState] = useState(isActive);

  const handleActiveStateChange = async () => {
    try {
      const itemRef = doc(db, "vm-hit", id);

      setIsActiveState(!isActiveState);
      await updateDoc(itemRef, {
        isActive: !isActiveState,
      });
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "vm-hit"));

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const foundItem = data.find((item) => {
        return item.id === id;
      });

      if (foundItem) {
        console.log();
        setIsActiveState(foundItem.isActive);
      }
    });
  });

  return (
    <div className="item-container" key={id}>
      <p>{browser}</p>
      <p>{ipAddress}</p>
      <p>{formatDate(createdAt.seconds, createdAt.nanoseconds)}</p>
      <div className="in-use-button-container">
        <button
          onClick={() => {
            handleActiveStateChange();
          }}
          className={`in-use-button ${isActiveState ? "active" : "inactive"}`}
        ></button>
      </div>
    </div>
  );
};
