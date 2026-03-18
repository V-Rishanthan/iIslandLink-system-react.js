
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);