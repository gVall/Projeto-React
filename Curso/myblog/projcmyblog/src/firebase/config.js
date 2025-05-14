import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBKX3UEWDBLWtECMEacjBSxygNYC2_iQuY",
  authDomain: "myblog-83aa5.firebaseapp.com",
  projectId: "myblog-83aa5",
  storageBucket: "myblog-83aa5.firebasestorage.app",
  messagingSenderId: "402361054147",
  appId: "1:402361054147:web:753b6f6da1e3c52899c376"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, app};

