
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDHiaSP6cdK7Lv3WtUDneMzKHoLU6SJf58",
    authDomain: "blognext-e5ce1.firebaseapp.com",
    projectId: "blognext-e5ce1",
    storageBucket: "blognext-e5ce1.firebasestorage.app",
    messagingSenderId: "13992945365",
    appId: "1:13992945365:web:12dab1f00a254ccb78245c",
    measurementId: "G-BZQW9D0QF6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();