from flask import jsonify, request
from . import nomadher_api as api
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import db
import random

cred = credentials.Certificate({
  "type": "service_account",
  "project_id": "nomadherd2",
  "private_key_id": "a12557d5420b7ec396468488ff0b668441317e1b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMzEx30x9miXD/\nX8yeFWpX783PTsXUmQYgapTjwJbEiYBK573MT97ZCXodPsDt3a3NDqc90cMMPxX0\nv+5AkCu5bhm37wCjSxpuzwdzL3BwZJC3fpg/paeWuZSfggBFCkZU0zg/KoaT11MC\n2ZQt+NLyyUMKCsgS4upbfeH02W/2RkeZxNu9t7hgXO/MVd3QEkrbNUg/KUy/X8T/\nMBox1vSmRWW5DPxcSiQqVhxI0lNTwTJyzC7TBPWdo3OVQPlgv3c1zhV3WwvqB77R\no2iEopDUVTfIqlyFojFkV8/LDmA7yHBZiAj1YPynlh2w0YylRuJdzTP7gsjotbv8\nrCSsm9SFAgMBAAECggEAU1pFNzG44oFG+dFSVPbvYNoLoHf1oakkarYmYink0xoJ\nmrMGNy08zIYEavm7CTUDw2VW4RzKL2ZPt90UCbgD68Upd4ixcESlffsKE7H3p+7u\nTZibO7Be7MQcfu0o0fC0HlsXVfIncu2c7hiDLFDM/p62h9RKiRFNBC7Qc9i5rnhC\np62T23ckiRXGO68kVAy2j+vOLNsvLi8e+RlAyF2jIrRSueh0xIvL6yXXQ7H+pARw\n5bVCkjVzPyiS65jmXn1k9pfnivIOFVQTKy3dFpLkc/Vub1ksU+KpbnoAIFUvkJ+h\nOPCMqGbptTKMsYbb3VpJWoPPuWjHN/buHH+swtWTMwKBgQDu2pk98R/i8z+nwoeo\n9jPQjMfQmtgg6iTp8Od7sZ30FzPvPRjfWuUTo8YzetAITucup/uYr+BAO4ytvHO2\nQtG20NoirRYeu1tOCj2jr3/zfsqFeU0EbACxeRh32P7YCJwRomub+nPvRJLacqI9\nwKMfNuOrLvq6L/uFeMu+3i7pTwKBgQDbf9ujxy4aNalfp0h72hC+afz7tkoxholq\nM3Ujcxz6M7bkOZ0V/pKOpvmwhQRlf5p3LCWQsh4k7LthJxOGrgr4wYqquATBzq6p\nkx/M3ItxhxDyrFlvrkNlxh64c07JHVxtJP7XISNOXuNcipI1AuY379Dj8JvNn7qr\nCOaIZo2H6wKBgCLF1ktrQC4lJZ5BtshFV5PD+w8Gi/J2w/r+5GRgnlM70YbByU4z\nCGiMjj1OYtzix8tGD13SNP6E7N0aM2pUXf2UeD1WH4NH2WoKGaEr2p/TVJ6L40eC\nhbNQotxHzgobbsUudSYXFyu9OvfsemwtEFJqBkkUpNHYTHDI/jiCVigHAoGAe+l5\nD8MQpqEmhaZFCA35p9TjiSHGTqEZkAeOmD2S3Tg2hi50HIeDKt7eVCUzby0TATW9\n2yqCU+wEd/r8TeqQrQ9tfaS2osZP2dEBgb/7RFKwYZ6kOqTQzXKDwzLtBiH6HG9n\nIgFGEicFCSf9E8oYNvm+Hf+lpPYIBifXJKdoPJMCgYEA2KkShXeMjRY0BM7215Fq\n4d0hT3ZEuZISLwQOQYWFw/NmPseo0IbKI1rHRXRac2OZ3ipz0KZQDigiZSTEu2FC\nxnwplPpCkttoCMhhbAu18tNqJUcvxEEEnw6oKtB4nZH0P5oP0aG8pF+A2BfNS6mv\nEPRDdrOVmQH1pWOxbjl4wwg=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-1l2wh@nomadherd2.iam.gserviceaccount.com",
  "client_id": "115548116568254481331",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1l2wh%40nomadherd2.iam.gserviceaccount.com"
})
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