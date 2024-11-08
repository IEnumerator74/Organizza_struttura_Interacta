import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAeWg2efb2B5l0GkO92wI33laAavUyo2Qg",
    authDomain: "settoreservice.firebaseapp.com",
    projectId: "settoreservice",
    storageBucket: "settoreservice.firebasestorage.app",
    messagingSenderId: "817764402920",
    appId: "1:817764402920:web:d78701d0baad64678ceb5d"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Funzione per verificare il dominio @apkappa.it
export const isValidDomain = (email: string) => {
  return email.endsWith('@apkappa.it');
};