import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBlUAAkkxcSdb5QubUbqvxUyL4Piq-55K0",
    authDomain: "crwn-db-ba1aa.firebaseapp.com",
    databaseURL: "https://crwn-db-ba1aa.firebaseio.com",
    projectId: "crwn-db-ba1aa",
    storageBucket: "crwn-db-ba1aa.appspot.com",
    messagingSenderId: "92518849845",
    appId: "1:92518849845:web:20f76274af201befac807c",
    measurementId: "G-SLKKN0D82M"  
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
