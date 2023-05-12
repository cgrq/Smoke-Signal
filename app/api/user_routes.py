from flask import Blueprint
from flask_login import login_required
from app.models import User, Team, TeamMembership

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/team/<int:id>')
@login_required
def team_users(id):
    """
    Query for all users in a team and return them in a dictionary
    """
    memberships = TeamMembership.query.where(TeamMembership.team_id == id)
    user_ids = [member.user_id for member in memberships]
    users = [User.query.get(id) for id in user_ids]

    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    return user.to_dict()


@user_routes.route('/<int:id>/teams')
@login_required
def user_teams(id):
    """
    Query for a user by id and returns a dictionary of the teams the user is in
    """
    teams = Team.query.join(TeamMembership).filter_by(user_id=id).all()
    user_teams = []
    for team in teams:
        user_teams.append({"id": team.id, "name": team.name,
                          "image_url": team.image_url})

    return {"userTeams": user_teams}
