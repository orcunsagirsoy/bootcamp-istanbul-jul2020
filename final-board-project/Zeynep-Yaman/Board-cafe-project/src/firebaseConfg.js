import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBIwUyXXRqgZ_JEv7Zbr777eCxWTyM4vqk",
    authDomain: "cafe-reviews.firebaseapp.com",
    databaseURL: "https://cafe-reviews.firebaseio.com",
    projectId: "cafe-reviews",
    storageBucket: "cafe-reviews.appspot.com",
    messagingSenderId: "89638572308",
    appId: "1:89638572308:web:0feed1c77af6a77d193201",
    measurementId: "G-EW1YX5Z9CL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  export default firebase.firestore();
  