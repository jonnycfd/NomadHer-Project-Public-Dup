from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

from api import nomadher_api
app.register_blueprint(nomadher_api, url_prefix='/api')

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=os.environ.get('PORT', 80))

