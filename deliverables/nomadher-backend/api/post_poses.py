from flask import jsonify, request
from . import nomadher_api as api
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import db

cred = credentials.Certificate("nomadherd2-firebase-adminsdk-1l2wh-a12557d542.json")

db = firestore.client()

def upload_img_pair(user_id, pose_id, users_uploaded_img):
    users_ref = db.collection('users')
    users_ref.document(user_id).set({"This is john testing"})
    
    #document(pose_id).set(users_uploaded_img)

@api.route('/post_poses', methods=['POST'])
def post_poses():
    data = request.json
    user_id = data['user_id']
    users_uploaded_img = data['user_uploaded_img']
    original_pose_id = data['original_pose_id']

    upload_img_pair(user_id, original_pose_id, users_uploaded_img)

    dict_object = {
        'user_id' : user_id,
        'users_uploaded_img': users_uploaded_img,
        'original_pose_id': original_pose_id
    }

    return jsonify(data)