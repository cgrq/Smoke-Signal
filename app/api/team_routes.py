from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms import TeamForm
from app.models import Team, TeamMembership, db


team_routes = Blueprint('teams', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@team_routes.route('/')
# @login_required
def all_teams():
    """
    Route to get all teams
    """

    teams = Team.query.all()
    return {"teams": [team.to_dict() for team in teams]}


@team_routes.route('/new', methods=['POST'])
@login_required
def new_team():
    """
    Route to display form to create a team
    """
    form = TeamForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():  # only runs for a 'POST' route
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401

    p = request.json
    team = Team(
        name=p["name"],
        image_url=p["imageUrl"] if p["imageUrl"] else '../test_image.png'
    )

    db.session.add(team)
    db.session.commit()

    team_membership = TeamMembership(
        status='owner',
        team_id=team.id,
        user_id=current_user.get_id()
    )

    db.session.add(team_membership)
    db.session.commit()

    return {"team": team.to_dict()}


@team_routes.route('/<int:id>')
def team_id(id):
    """
    Route to get a single team by team id
    """
    team = Team.query.get(id)
    if not team:
        return {"errors": "Team does not exist"}
    return {"team": team.to_dict()}


@team_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_team(id):
    """
    Route to update a single team by team id
    """
    form = TeamForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():  # only runs for a 'POST' route
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401

    p = request.json
    team = Team.query.get(id)

    team.name = p['name']
    team.image_url = p['imageUrl'] if p['imageUrl'] else '../test_image.png'

    db.session.commit()
    return {"team": team.to_dict()}


@team_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_team(id):
    """
    Route to delete a single team by team id
    """
    team = Team.query.get(id)
    db.session.delete(team)
    db.session.commit()

    defaultTeam = Team.query.get(4)

    return {"team": defaultTeam.to_dict()}
