import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import firebase from 'firebase';
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6dbB879FzZNVwVTOw9XovPdwUcbA80G0",
  authDomain: "comp4537login.firebaseapp.com",
  projectId: "comp4537login",
  storageBucket: "comp4537login.appspot.com",
  messagingSenderId: "489317766747",
  appId: "1:489317766747:web:83505f81c75705eb70917e"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
