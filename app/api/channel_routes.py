from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms import ChannelForm
from app.models import db, Channel, ChannelMembership

channel_routes = Blueprint('channels', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@channel_routes.route('/all')
def all_channels():
    """
    GET all channels
    """
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}


@channel_routes.route('/user')
@login_required
def user_channels():
    """
    GET user channels
    """
    # user_id = current_user.id

    # user_channel_memberships = ChannelMembership.query.where(
    #     ChannelMembership.user_id == user_id)

    # channel_ids = [
    #     membership.channel_id for membership in user_channel_memberships]

    # channels = [channel for channel in Channel.query.all()
    #             if channel.id in channel_ids]

    return {'channels': [channel.to_dict()['channels'].to_dict() for channel in current_user.channels]}


@channel_routes.route('/team/<int:team_id>')
@login_required
def team_channels(team_id):
    """
    GET team channels
    """
    channels = Channel.query.all()

    return {'channels': [channel.to_dict() for channel in channels if channel.team_id == team_id]}


@channel_routes.route('/new', methods=['POST'])
@login_required
def create_channel():
    """
    POST new channel
    """
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    data = form.data

    new_channel = Channel(
        name=data['name'],
        description=data['description'],
        type=data['type'],
        image_url=data['imageUrl'] if data["imageUrl"] else '../test_image.png',
        team_id=data['teamId'],
    )

    db.session.add(new_channel)
    db.session.commit()

    membership = ChannelMembership(
        user_id=current_user.id,
        channel_id=new_channel.id,
    )
    db.session.add(membership)
    db.session.commit()

    # if request.json['recipientId']:
    try:
        if request.json['recipientId']:
            recipient_membership = ChannelMembership(
                user_id=request.json['recipientId'],
                channel_id=new_channel.id
            )
            db.session.add(recipient_membership)
            db.session.commit()

    except (KeyError):
        pass

    return {'channel': new_channel.to_dict()}


@channel_routes.route('/<int:channel_id>')
@login_required
def get_channel(channel_id):
    """
    GET channel by ID
    """

    channel = Channel.query.get(channel_id)

    return {'channel': channel.to_dict()}


@channel_routes.route('/<int:channel_id>/edit', methods=['PUT'])
@login_required
def edit_channel(channel_id):
    """
    PUT edit a channel
    """
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return validation_errors_to_error_messages(form.errors)

    channel = Channel.query.get(channel_id)

    if form.validate_on_submit():
        data = form.data

        channel.name = data['name']
        channel.description = data['description']
        channel.type = data['type']
        channel.image_url = data['imageUrl'] if data["imageUrl"] else '../test_image.png'
        channel.team_id = data['teamId']

        db.session.commit()

    return {'channel': channel.to_dict()}


@channel_routes.route('/<int:channel_id>/delete', methods=['DELETE'])
@login_required
def delete_route(channel_id):
    """
    DELETE channel
    """
    channel = Channel.query.get(channel_id)

    if not channel:
        return {'error': 'channel not found'}

    db.session.delete(channel)
    db.session.commit()
    return {'message': 'channel successfully deleted.'}
