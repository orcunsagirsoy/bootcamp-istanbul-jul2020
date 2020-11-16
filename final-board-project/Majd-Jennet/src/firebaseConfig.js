import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPm7N98x0F_B9Bt9W5p3W2wn45USgbqmw",
  authDomain: "board-project-527e2.firebaseapp.com",
  databaseURL: "https://board-project-527e2.firebaseio.com",
  projectId: "board-project-527e2",
  storageBucket: "board-project-527e2.appspot.com",
  messagingSenderId: "746894809838",
  appId: "1:746894809838:web:49082c8d855197e54831ff",
  measurementId: "G-WGQV7ZTX6R",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
