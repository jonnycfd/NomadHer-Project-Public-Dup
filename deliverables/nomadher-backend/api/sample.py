from flask import jsonify, request
from . import nomadher_api as api

# /api/
@api.route('/')
def hello_world():
    return 'Theatre Blocking root route'

# /api/example_get/<int:id>
@api.route('/example_get/<int:id>')
def example_get(id):
    result = {
        'status': 'success',
        'id': id
    }
    return jsonify(result)

# /api/example_post
@api.route('/example_post', methods=['POST'])
def addBlocking():
    data = request.json
    return jsonify({'status': 'success', 'message': data['id']})