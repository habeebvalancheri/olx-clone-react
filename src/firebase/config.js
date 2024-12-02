import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVqurddZ7w0P2rsJcxkK5CnSBxPSCky3Y",
  authDomain: "fir-5570b.firebaseapp.com",
  projectId: "fir-5570b",
  storageBucket: "fir-5570b.firebasestorage.app",
  messagingSenderId: "934206618140",
  appId: "1:934206618140:web:41bd9aceb7e8310a8e3dd9",
  measurementId: "G-GFX47SJ3Y0"
};

export const firebase = firebase.initializeApp(firebaseConfig);