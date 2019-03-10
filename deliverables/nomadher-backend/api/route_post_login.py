from flask import jsonify, request
from . import nomadher_api as api
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import db
import random

cred = credentials.Certificate("nomadherd2-firebase-adminsdk-1l2wh-a12557d542.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def check_user_exist(user_id):
    '''
    Check if a certain user exist or not in the database


    :param user_id: The user_id of the user we are looking for
    :return: True if the user exists, false if the user does not exists
    '''
    users_ref = db.collection('users')
    docs = users_ref.get()
    for doc in docs:
        if "user_id" not in doc.to_dict().keys():
            continue
        if doc.to_dict()["user_id"] == user_id:
            return True
    return False

def get_user_dict(user_id):
    '''
    Get a certain user's information from the database

    :param user_id: The user_id of the user we are looking for
    :return: The user's info in the format of a python dictionary object
    '''
    users_ref = db.collection(u'users')
    docs = users_ref.get()
    for doc in docs:
        if doc.id == user_id:
            return doc.to_dict()
    return False

def initialize_user(user_id):
    '''
    create a new user in the database

    :param user_id: The user_id of the newly created user
    :return: None
    '''
    doc_ref = db.collection('users').document(user_id)
    random_int_list = random.sample(range(1, 10), 3)
    doc_ref.set({
        'user_id': user_id,
        'verified': 'False',
        'pose1':{
            'pose_id': random_int_list[0],
            'user_uploaded_img': 'None'
        },
        'pose2':{
            'pose_id': random_int_list[1],
            'user_uploaded_img': 'None'
        },
        'pose3':{
            'pose_id': random_int_list[2],
            'user_uploaded_img': 'None'
        },
        'this_users_photoID': 'None'
    })

def check_user_verified(user_id):
    '''
    Check the verification status of the given user

    :param user_id: The user_id of the user we are looking for
    :return: The verification status of the given user if the user exist,
             String "User does not exist" otherwise.
    '''
    users_ref = db.collection('users')
    docs = users_ref.get()
    for doc in docs:
        if "user_id" not in doc.to_dict().keys():
            continue
        if doc.to_dict()["user_id"] == user_id:
            return doc.to_dict()["verified"]
    return "User does not exist"


# /api/login
@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user_id = data['user_id']
    dict_object = {
                'user_id' : user_id,
                'verified': {
                    'status' : 'False',
                    'is_paired': {
                        'pair1': False,
                        'pair2': False,
                        'pair3': False
                    },
                    'Have_photo_id': False
                }
    }
    if check_user_exist(user_id) == False:
        initialize_user(user_id)
        return jsonify(dict_object)
    if check_user_verified(user_id) == "Pending":
        dict_object['verified']['status'] = 'Pending'
        return jsonify(dict_object)
    if check_user_verified(user_id) == "False":
        user_dict = get_user_dict(user_id)
        dict_object['verified']['status'] = 'False'
        if user_dict['pose1']['user_uploaded_img'] == 'None':
            dict_object['verified']['is_paired']['pair1'] = False
        else:
            dict_object['verified']['is_paired']['pair1'] = True
        if user_dict['pose2']['user_uploaded_img'] == 'None':
            dict_object['verified']['is_paired']['pair2'] = False
        else:
            dict_object['verified']['is_paired']['pair2'] = True
        if user_dict['pose3']['user_uploaded_img'] == 'None':
            dict_object['verified']['is_paired']['pair3'] = False
        else:
            dict_object['verified']['is_paired']['pair3'] = True
        if user_dict['this_users_photoID'] == 'None':
            dict_object['verified']['Have_photo_id'] = False
        else:
            dict_object['verified']['Have_photo_id'] = True
        return jsonify(dict_object)
    if check_user_verified(user_id) == "True":
        dict_object['verified']['status'] = 'True'
        dict_object['verified']['is_paired']['pair1'] = True
        dict_object['verified']['is_paired']['pair2'] = True
        dict_object['verified']['is_paired']['pair3'] = True
        dict_object['verified']['Have_photo_id'] = True
        return jsonify(dict_object)