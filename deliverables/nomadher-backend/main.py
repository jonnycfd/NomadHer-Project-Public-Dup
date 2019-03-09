from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import db

cred = credentials.Certificate("nomadherd2-firebase-adminsdk-1l2wh-a12557d542.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Try to create a set in database
doc_ref = db.collection(u'users').document(u'user1')
doc_ref.set({
    u'fullName': u'Tom Kim'
})

# Try to get data from database
users_ref = db.collection(u'users')
docs = users_ref.get()
for doc in docs:
    print(u'{} => {}'.format(doc.id, doc.to_dict()))


# Start the app and setup the static directory for the html, css, and js files.
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Theatre Blocking root route'

@app.route('/example_get/<int:id>')
def example_get(id):
    result = {
        'status': 'success',
        'id': id
    }
    return jsonify(result)

@app.route('/example_post', methods=['POST'])
def addBlocking():
    data = request.json
    return jsonify({'status': 'success', 'message': data['id']})

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='127.0.0.1', debug=True, port=os.environ.get('PORT', 8080))
