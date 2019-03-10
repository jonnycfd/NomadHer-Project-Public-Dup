from flask import Blueprint

nomadher_api = Blueprint('nomadher_api', __name__)

from . import sample, route_post_login, post_poses
