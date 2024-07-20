// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpxeM8y4d6i1AbDq6Gufzi4g3WCTii8IM",
  authDomain: "blog-upload-image.firebaseapp.com",
  projectId: "blog-upload-image",
  storageBucket: "blog-upload-image.appspot.com",
  messagingSenderId: "115182234241",
  appId: "1:115182234241:web:a9585bb273fd8a2d2bbb80",
  measurementId: "G-F2GB6LMWHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const storage = getStorage();