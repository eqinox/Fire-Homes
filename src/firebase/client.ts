// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth} from 'firebase/auth';
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPwz_S8tgeO9fmdJe0a5tmVOyXGE1WVl8",
  authDomain: "next2-app-5a30b.firebaseapp.com",
  projectId: "next2-app-5a30b",
  storageBucket: "next2-app-5a30b.firebasestorage.app",
  messagingSenderId: "39567492705",
  appId: "1:39567492705:web:20e230f6c4925795a14c20"
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
} else {
    const app = currentApps[0];
    auth = getAuth(app);
    storage = getStorage(app);
}

export { auth, storage };


