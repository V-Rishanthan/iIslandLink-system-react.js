import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMqJGGi9y9g6p5jVyNBUZ-kvk4ywMrZ-k",
  authDomain: "iislandlink.firebaseapp.com",
  projectId: "iislandlink",
  storageBucket: "iislandlink.firebasestorage.app",
  messagingSenderId: "947639529351",
  appId: "1:947639529351:web:c9069fe28dbc21d687ed22",
  measurementId: "G-0TG7E39GJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// keep user logged in even after browser restart
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Persistence error:", error);
  });