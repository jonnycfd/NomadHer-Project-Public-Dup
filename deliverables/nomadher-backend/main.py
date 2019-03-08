from flask import Flask, jsonify, request
from flask_cors import CORS
import os

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
    app.run(host='0.0.0.0', debug=True, port=os.environ.get('PORT', 80))

