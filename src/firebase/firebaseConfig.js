import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyDTUTst_R4c20yYENZOeGubW2s-zdWTfVk",
  authDomain: "s3818169-clouddev-project.firebaseapp.com",
  projectId: "s3818169-clouddev-project",
  storageBucket: "s3818169-clouddev-project.appspot.com",
  messagingSenderId: "1010662599451",
  appId: "1:1010662599451:web:686c90240ad7a2da3641be",
  databaseURL: "https://s3818169-clouddev-project-default-rtdb.asia-southeast1.firebasedatabase.app"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default firebase