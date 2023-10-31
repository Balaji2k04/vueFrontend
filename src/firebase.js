import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2AaJ4XCGo-o41op4DCQOXBNKF8LPRCdg",
  authDomain: "vue-ecommerce-5a481.firebaseapp.com",
  projectId: "vue-ecommerce-5a481",
  storageBucket: "vue-ecommerce-5a481.appspot.com",
  messagingSenderId: "939644225653",
  appId: "1:939644225653:web:cb3e2d9d17a5d1f887903c",
  measurementId: "G-72C2F0BN78",
};

// Initialize Firebase
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}
export const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// export { auth,  db, storage, app };
