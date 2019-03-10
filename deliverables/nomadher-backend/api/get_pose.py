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
    user = db.document('user/' + user_id).get().to_dict()
    used_image_ids = []

    if 'pose1' in user:
        used_image_id = user["pose1"]['pose_id']
        used_image_ids.append(used_image_id)
    if 'pose2' in user:
        used_image_id = user["pose2"]['pose_id']
        used_image_ids.append(used_image_id)
    if 'pose3' in user:
        used_image_id = user["pose3"]['pose_id']
        used_image_ids.append(used_image_id)


    pose = db.document('pose/poseList').get().to_dict()
    posePhotoList = pose["posePhotoList"]

    while (1):
        image_obj = random.choice(posePhotoList)
        if (image_obj['pose_id'] not in used_image_ids):
            break
            
    pose_img_uri = image_obj['pose_img_uri']
    
    return jsonify({'image_uri': pose_img_uri})