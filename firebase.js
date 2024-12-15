import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAAwEBQWWzp4jzPh_zzkxcc3_E2yhP2v_4",
    authDomain: "inst-66216.firebaseapp.com",
    projectId: "inst-66216",
    storageBucket: "inst-66216.appspot.com",
    messagingSenderId: "869316040393",
    appId: "1:869316040393:web:7202bc32e4559a1720df18",
    measurementId: "G-CCV1ZSZGXW"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

