/** @format */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDz2BAbe8jvOTPyPpxO8flcoZl-v1Aenx8",
  authDomain: "raining-dates.firebaseapp.com",
  databaseURL:
    "https://raining-dates-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "raining-dates",
  storageBucket: "raining-dates.appspot.com",
  messagingSenderId: "602029930170",
  appId: "1:602029930170:web:414c1d888a422dc63ef483",
  measurementId: "G-XHKJS0PXFJ",
});

const auth = app.auth();
const storage = firebase.storage();
export { auth, storage, firebase as default };
