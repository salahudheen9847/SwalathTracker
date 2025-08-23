// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZmKKAFERZYG8oLvPnCzFBXtSmwGIT3tM",
  authDomain: "swalathtracker.firebaseapp.com",
  projectId: "swalathtracker",
  storageBucket: "swalathtracker.firebasestorage.app",
  messagingSenderId: "325488505666",
  appId: "1:325488505666:web:4461d45fba22fcaff78edb",
  measurementId: "G-Y6SYT8X27V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);