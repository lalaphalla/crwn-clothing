import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//Code Snipet from create Firebase SDK project Setting
const config = {
    apiKey: "AIzaSyAy5zP2Q8MtJpIP7wCHTp8bjYHbB81mhzI",
    authDomain: "crwn-db-d31c8.firebaseapp.com",
    projectId: "crwn-db-d31c8",
    storageBucket: "crwn-db-d31c8.appspot.com",
    messagingSenderId: "854093599382",
    appId: "1:854093599382:web:daa4ebec1ea83c78b328b7",
    measurementId: "G-XP80W9EH0N"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //trigger google popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
