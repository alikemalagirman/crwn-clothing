import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBj16XV6OzL6cqLxByNGHe7dSJz3HYoCEo",
    authDomain: "crwn-db-26da9.firebaseapp.com",
    projectId: "crwn-db-26da9",
    storageBucket: "crwn-db-26da9.appspot.com",
    messagingSenderId: "397285575486",
    appId: "1:397285575486:web:2530c2c9e89bc8fc463a6f",
    measurementId: "G-DFQNLXBBP8"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date(); 

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log ("error creating user", error.message)
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
    
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
