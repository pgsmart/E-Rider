//import firebase from "firebase"
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALCw2MxuQRG8LiAkwlufI8Cxr5KneUEiM",
    authDomain: "e-rider-6b747.firebaseapp.com",
    projectId: "e-rider-6b747",
    storageBucket: "e-rider-6b747.appspot.com",
    messagingSenderId: "194228687652",
    appId: "1:194228687652:web:8ff83fb68fd398b83959b1"
  };

const app = initializeApp(firebaseConfig) 

const database = getFirestore(app)

export default database