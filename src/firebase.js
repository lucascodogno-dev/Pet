

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPpXq4p861pkrVE1NkPNf2HMSo-T_q0P4",
    authDomain: "petshop-badd6.firebaseapp.com",
    projectId: "petshop-badd6",
    storageBucket: "petshop-badd6.firebasestorage.app",
    messagingSenderId: "342214717844",
    appId: "1:342214717844:web:acf04688c766f6c2821f81",
    measurementId: "G-3YT4L55XJM"
  };
// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exporte todas as funções necessárias
export { db, collection, addDoc, getDocs, doc, updateDoc, arrayUnion };