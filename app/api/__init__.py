from flask import Blueprint
from .auth_routes import auth_routes
from .channel_routes import channel_routes
from .message_routes import message_routes
from .team_routes import team_routes
from .user_routes import user_routes

api = Blueprint("api", __name__)

api.register_blueprint(auth_routes, url_prefix='/auth')
api.register_blueprint(channel_routes, url_prefix='/channels')
api.register_blueprint(message_routes, url_prefix='/messages')
api.register_blueprint(team_routes, url_prefix='/teams')
api.register_blueprint(user_routes, url_prefix='/users')
