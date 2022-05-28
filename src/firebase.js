import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC-kKPYCrTmCuxpVDFjkjX3kxf-SjPT4uM",
  authDomain: "missileblog.firebaseapp.com",
  databaseURL: "https://missileblog-default-rtdb.firebaseio.com",
  projectId: "missileblog",
  storageBucket: "missileblog.appspot.com",
  messagingSenderId: "884369494592",
  appId: "1:884369494592:web:812659590acd9372d785a5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);