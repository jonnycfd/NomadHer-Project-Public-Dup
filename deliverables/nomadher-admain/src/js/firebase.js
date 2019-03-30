const firebase = require("firebase");
require("firebase/firestore");
const app = firebase.initializeApp({
    apiKey: "AIzaSyD5lrnpxS_2Kg__rx081B-uaXYLj_lgRG4",
    authDomain: "nomadherd2.firebaseapp.com",
    databaseURL: "https://nomadherd2.firebaseio.com",
    projectId: "nomadherd2",
    storageBucket: "nomadherd2.appspot.com",
    messagingSenderId: "537831679054"
  })
export const db = firebase.firestore();

// to include the firebase config in other files, use the following line:
// import { db } from '@/js/firebase.js';


// Example retrieving data

const docRef = db.collection("users").doc("user99");
const recieved_data = docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log("Document id:", doc.id);
        console.log("Verification Status:", doc.data()["verified"]);
        console.log("Pose2 img:", doc.data()["pose2"]["user_uploaded_img"]);

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


// Example changing data

const newUser4Test = db.collection("users").doc("newUser4Test");   // can be a new user who does not exist before
newUser4Test.set({
  pose1:{
    pose_id: 3,
    user_uploaded_img: "image1"
  },
  pose2:{
    pose_id: 2,
    user_uploaded_img: "image2"
  },
  pose3:{
    pose_id: 6,
    user_uploaded_img: "nidaqiuxiangcaixukun"
  },
  this_users_photoID: "henhuanghenbaoli",
  user_id:"newUser4Test",
  verified: "True"
});