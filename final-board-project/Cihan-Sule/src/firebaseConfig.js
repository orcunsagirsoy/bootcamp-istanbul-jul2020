import * as firebase from 'firebase';
import 'firebase/database';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAH9t3htqzEsAJSALdzOtfOv5TPkhorl3w",
    authDomain: "tr-bucket.firebaseapp.com",
    databaseURL: "https://tr-bucket.firebaseio.com",
    projectId: "tr-bucket",
    storageBucket: "tr-bucket.appspot.com",
    messagingSenderId: "963780324144",
    appId: "1:963780324144:web:d68239b3b860447939b6f5",
    measurementId: "G-R59YTPV607"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase.firestore();

