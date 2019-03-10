from flask import jsonify, request
from . import nomadher_api as api
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import db
import random

cred = credentials.Certificate("nomadherd2-firebase-adminsdk-1l2wh-a12557d542.json")
db = firestore.client()

# /api/
@api.route('/test')
def test():
    pose = db.document('pose/poseList').get().to_dict()
    posePhotoList = pose["posePhotoList"]

    image_obj = random.choice(posePhotoList)
    pose_img_uri = image_obj['pose_img_uri']
    pose_id = image_obj['pose_id']
    # print(pose_img_uri)
    # print(pose_id)
    return jsonify({'image_uri': pose_img_uri})

# /api/
@api.route('/get_pose/<string:user_id>')
def get_pose(user_id):
    used_image_id = 0

    user = db.document('users/' + user_id).get().to_dict()
    if not user:
        return jsonify({'original_pose_id': used_image_id, 'image_uri': 'User not found', 'status': 'error'})

    if user["pose1"]['user_uploaded_img'] == "None":
        used_image_id = int(user["pose1"]['pose_id'])
    elif user["pose2"]['user_uploaded_img'] == "None":
        used_image_id = int(user["pose2"]['pose_id'])
    elif user["pose3"]['user_uploaded_img'] == "None":
        used_image_id = int(user["pose3"]['pose_id'])

    if used_image_id == 0:
        return jsonify({'original_pose_id': used_image_id, 'image_uri': 'User Already Uploaded all Images', 'status': 'error'})
    
    pose = db.document('pose/poseList').get().to_dict()
    posePhotoList = pose["posePhotoList"]

    image_obj = posePhotoList[used_image_id - 1]
            
    pose_img_uri = image_obj['pose_img_uri']
    
    return jsonify({'original_pose_id': used_image_id,'image_uri': pose_img_uri, 'status': 'success'})