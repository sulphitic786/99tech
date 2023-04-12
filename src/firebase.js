import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  orderBy,
  limit,
  onSnapshot,
  query,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBHw4H9R4J4__qZKasV_LHQhM6h2DJVL-s",
  authDomain: "sulphiticco.firebaseapp.com",
  databaseURL: "https://sulphiticco.firebaseio.com",
  projectId: "sulphiticco",
  storageBucket: "sulphiticco.appspot.com",
  messagingSenderId: "342611553964",
  appId: "1:342611553964:web:851595d6d107124c203909",
  measurementId: "G-FK3PJN1EC6"
}


// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

export {
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  auth,
  orderBy,
  limit,
  onSnapshot,
  query,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
