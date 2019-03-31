const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();


export function deletePhotoId(userId) {
    const userModify = db.collection("users").doc(userId);
    const recieved_data = userModify.get().then(function(doc) {
        if (doc.exists) {
            userModify.update({"this_users_photoID":"None"});

        } else {
            // doc.data() will be undefined in this case
            console.log("No such userID!");
        }
    }).catch(function(error) {
        console.log("Error getting user document:", error);
    });
}

export function deletePose(userId, poseId) {
    const userModify = db.collection("users").doc(userId);
    const recieved_data = userModify.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            if (poseId === "1"){
                const poseNum = doc.data()["pose1"]["pose_id"];
                userModify.update({"pose1":{"pose_id":poseNum, "user_uploaded_img":"None"}});
            }
            else if (poseId === "2"){
                const poseNum = doc.data()["pose2"]["pose_id"];
                userModify.update({"pose2":{"pose_id":poseNum, "user_uploaded_img":"None"}});
            } else if (poseId === "3"){
                const poseNum = doc.data()["pose3"]["pose_id"];
                userModify.update({"pose3":{"pose_id":poseNum, "user_uploaded_img":"None"}});
            } else {
                console.log("No such pose number!");
            }

        } else {
            // doc.data() will be undefined in this case
            console.log("No such userID!");
        }
    }).catch(function(error) {
        console.log("Error getting user document:", error);
    });


}

export function modifyUserState(userId, status) { // state can be 'True', 'False', 'Pending'
    const userModify = db.collection("users").doc(userId);
    const recieved_data = userModify.get().then(function(doc) {
        if (doc.exists) {
            userModify.update({"verified":status})

        } else {
            // doc.data() will be undefined in this case
            console.log("No such userID!");
        }
    }).catch(function(error) {
        console.log("Error getting user document:", error);
    });

}
