import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQ_foUXYLRPxrsFp4Ee4zpiUY4W_cjhjk",
  authDomain: "unnxt-portfolio.firebaseapp.com",
  projectId: "unnxt-portfolio",
  storageBucket: "unnxt-portfolio.appspot.com",
  messagingSenderId: "4731841221",
  appId: "1:4731841221:web:20f572523ff4622d685eac",
  measurementId: "G-7Z67G223MH",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);

export const storage = getStorage(firebaseApp);
