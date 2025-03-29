import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//Initialise Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBRabnYQHvdXrUvPN9Cz_ZCA2g2lTjGQ2I",
    authDomain: "wordle-final-project.firebaseapp.com",
    projectId: "wordle-final-project",
    storageBucket: "wordle-final-project.firebasestorage.app",
    messagingSenderId: "556987990724",
    appId: "1:556987990724:web:6b5263d48db8d87b8e3f91"
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);