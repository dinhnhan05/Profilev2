import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDs1XdgsxuFvMs88Zdps_6DvHVuUNIc0Lc",
  authDomain: "portfolio-44e1e.firebaseapp.com",
  projectId: "portfolio-44e1e",
  storageBucket: "portfolio-44e1e.firebasestorage.app",
  messagingSenderId: "275470524562",
  appId: "1:275470524562:web:a6f6c8bc18bd434491864b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };