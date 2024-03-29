const firebase = require("firebase");
require("firebase/firestore");
const db = firebase.firestore();

const nonExistPic = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAFBQUFBVUFpkZFp9h3iHfbmqm5uquf/I18jXyP////////////////////////////////////////////////8BUFBQUFVQWmRkWn2HeId9uaqbm6q5/8jXyNfI///////////////////////////////////////////////////CABEIBLAEsAMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/2gAIAQEAAAAA84AAAAAACwWAADQAAAUAQBAAAAACwAgAAAAAACkWAADcAAAKBAACAAAEFAAIAAAAABQAlgAA0AAAAAAAgAAlQKABAAAAAAAAAAADQAAAAAEoECkAgBZQAIAAAAAAAAAADYgAAAAAABKBAEKRQAgAAAAAAAAAAXQAAgAAAigABAgoAAIAAAAAAAAAAF0AAEACgETRAQoJULAAAIAAAAAAAAAAGqAAAIUAEsogKSFELAAAIAAAAAAAAAAF2AkoAlAAAsAAJCpQAQAgAAAAAAAAAALqgQAJQAqAsAAJNElAAQCAAAAAAAAAAALsEACUAUQAAUjLQhUAAEgAAAAAAAAAABdVFCUgFIoIAAKSTQRRAAEgAAAAAAAAAAAulAlAAAQKCCgmNhFEAASAAAAAAAAAAABrQAAAAJUFCVKJm0SgIAEgAAAAAAAAAAANaFgBYAAllABKGaEoBAAyAAAAAAAAAAABu0QUEoAgAABEqklAQAMgAAAAAAAAAAAN6AAABAAACLjVElAQAMgAAAAAAAAAAAG7QAAAJRApAEoM0AgAyAAAAAAAAAAAANaoAALAlEFZtESygCAQAyAAAAAAAAAAAAGtgABSAAIjQhKACAQDIAAAAAAAAAAAAL0AFIoQAASLZWLRYCAQDIAAAAAAAAAAAAF6FCVAolkUpAMzQogBAIDIAAAAAAAAAAAAC9FAIoEUgSqIyaAgIAIMgAAAAAAAAAAAAGt0AlAAAiWkMbAQCJQgyAAAAAAAAAAAAAL0oCUJQACc+kakahUJYIAgyAAAAAAAAAAAAAF6UEoJQABiWaudVKEDKiBDIAAAAAAAFgABYAAF1sJQAAAOXXOdTZKQCVCBLMgAAAAAAAVACoVAAFNbAAAKIDGzE3YogCAIMAAAAAAAAqABViAAKOlAAAKEEm4k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";







export function deletePhotoId(userId) {
    const userModify = db.collection("users").doc(userId);
    const recieved_data = userModify.get().then(function(doc) {
        if (doc.exists) {
            userModify.update({"this_users_photoID":"None"});
            let photoidElement = document.getElementById("photoid");
            photoidElement.src = nonExistPic;

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
                let pose1useruploadElement = document.getElementById("pose1userupload");
                pose1useruploadElement.src = nonExistPic;
            }
            else if (poseId === "2"){
                const poseNum = doc.data()["pose2"]["pose_id"];
                userModify.update({"pose2":{"pose_id":poseNum, "user_uploaded_img":"None"}});
                let pose2useruploadElement = document.getElementById("pose2userupload");
                pose2useruploadElement.src = nonExistPic;
            } else if (poseId === "3"){
                const poseNum = doc.data()["pose3"]["pose_id"];
                userModify.update({"pose3":{"pose_id":poseNum, "user_uploaded_img":"None"}});
                let pose3useruploadElement = document.getElementById("pose3userupload");
                pose3useruploadElement.src = nonExistPic;
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
