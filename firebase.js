import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
dotenv.config()

const firebaseConfig = {
    apiKey: "AIzaSyC2xGx3Z-EI7WK0BoxvdOGAazqWSRQgExM",
    authDomain: "ecommerce-fenix.firebaseapp.com",
    projectId: "ecommerce-fenix",
    storageBucket: "ecommerce-fenix.appspot.com",
    messagingSenderId: "881808507740",
    appId: "1:881808507740:web:2ad92d22d9af766a3ab799"
  };

const firebaseApp = initializeApp(firebaseConfig)

export const storage = getStorage(firebaseApp)