const firebaseConfig = {
  apiKey: "AIzaSyCY0sCQ06y33Yq2GSo7tF4GKrJfuymA7x0",
  authDomain: "keuangan-pribadi-3fb50.firebaseapp.com",
  projectId: "keuangan-pribadi-3fb50",
  storageBucket: "keuangan-pribadi-3fb50.firebasestorage.app",
  messagingSenderId: "374466458856",
  appId: "1:374466458856:web:736f9e169ad1a4e9e9c55d",
  measurementId: "G-0SH4PXXRCH"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
