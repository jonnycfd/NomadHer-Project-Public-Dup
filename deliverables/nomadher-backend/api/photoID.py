from flask import jsonify, request
from . import nomadher_api as api
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import db

cred = credentials.Certificate("nomadherd2-firebase-adminsdk-1l2wh-a12557d542.json")
db = firestore.client()

@api.route('/post_photo_id', methods=['POST'])
def addPhotoID():
    # Get a json data like {"user_id":String,"photo_id_uri":String}
    data = request.json

    #Check if the user_id is valid
    all_users_ref = db.collection(u'users')
    all_users_docs = all_users_ref.get()
    check_user = 0
    for doc in all_users_docs:
        if doc.id == data["user_id"]:
            check_user = 1

    if (check_user == 0):
        print("Wrong user_id, please register first.")
        return jsonify({})

    # Update the "this_users_photoID" for the user
    users_ref = db.collection('users').document(data["user_id"])
    users_ref.update({"this_users_photoID":data["photo_id_uri"]})

    return jsonify({"user_id":data["user_id"], "photo_id_uri":data["photo_id_uri"]})
