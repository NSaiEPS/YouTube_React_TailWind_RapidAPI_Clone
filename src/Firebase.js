import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBKUGGsg2casC30S8gpC7aDrorzlq4AKNw",
  authDomain: "react-tailwind-rapidap.firebaseapp.com",
  projectId: "react-tailwind-rapidap",
  storageBucket: "react-tailwind-rapidap.appspot.com",
  messagingSenderId: "554458673627",
  appId: "1:554458673627:web:8d5c27a8dffbeba58bb7fe",
  measurementId: "G-6DVPQYK05L"
};

const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebase.auth()
const provider= new firebase.auth.GoogleAuthProvider();

export  {db,auth,provider};