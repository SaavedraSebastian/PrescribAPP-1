// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBj-tJNC9cUax22jGRAJZapMfNqSTSjj4",
  authDomain: "prescriapp-2dbb7.firebaseapp.com",
  projectId: "prescriapp-2dbb7",
  storageBucket: "prescriapp-2dbb7.appspot.com",
  messagingSenderId: "806054114202",
  appId: "1:806054114202:web:6942c54db256ad1202c023",
  measurementId: "G-0JYJZKWZ2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
