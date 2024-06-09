// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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
export const storage = getStorage(app);
export const firestore = getFirestore(app);
