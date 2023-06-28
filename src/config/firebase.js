import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4KvFgaY9sI43M6K3vT_e7GgB_XcKKtDs",
  authDomain: "hubbie-chat.firebaseapp.com",
  projectId: "hubbie-chat",
  storageBucket: "hubbie-chat.appspot.com",
  messagingSenderId: "343763230991",
  appId: "1:343763230991:web:d129cd0e9f6eb6787f1e7a",
  measurementId: "G-C9Q7MGC1K1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/*
  Steps to deploy using github
  - when changes are made run: 
    npm run build
  - commit your changes and push your code:
    git add .
    git commit -m ""
    git push origin main
*/

/* After 'firebase init' while configuring 
  - say no to add script to run before every deploy
  - say yes to rewrite all routes to index.html (when refreshed the page 404 not found will not be shown)
*/
