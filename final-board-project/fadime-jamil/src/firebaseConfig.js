import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2KSAEEMSU656axPkpDvH4XtkknRWCDiE",
    authDomain: "my-memories-8ff66.firebaseapp.com",
    databaseURL: "https://my-memories-8ff66.firebaseio.com",
    projectId: "my-memories-8ff66",
    storageBucket: "my-memories-8ff66.appspot.com",
    messagingSenderId: "589160303203",
    appId: "1:589160303203:web:b49a66af2f303550634656"
  };
  // Initialize Firebase
  // export const fire =firebase.initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  
  export default firebase.firestore();

  export const storage = firebase.storage();

  export const auth = firebase.auth;
  