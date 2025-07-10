
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC_RFY98xrBfLpYz3c_zw-fJc6pieGcA88",
  authDomain: "webappfinal112.firebaseapp.com",
  projectId: "webappfinal112",
  storageBucket: "webappfinal112.firebasestorage.app",
  messagingSenderId: "82896269063",
  appId: "1:82896269063:web:37ecddbe1ab34407675fa2",
  measurementId: "G-XV090SK0VK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
