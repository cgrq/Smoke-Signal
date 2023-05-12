from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms import MessageForm
from app.models import db, Message, User

message_routes = Blueprint('messages', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@message_routes.route('/current')
@login_required
def user_messages():
    """
    GET user messages
    """
    user_id = current_user.id
    messages = Message.query.where(Message.user_id == user_id)

    return {'messages': [message.to_dict() for message in messages]}


@message_routes.route('/channel/<int:channel_id>')
@login_required
def channel_messages(channel_id):
    """
    GET channel messages
    """
    messages = Message.query.where(Message.channel_id == channel_id).all()
    # variable shadowing
    messages = [{**message.to_dict(), "username": User.query.get(
        message.to_dict()['user_id']).to_dict()['username']} for message in messages]

    return {'messages': messages}


@message_routes.route('/new', methods=['POST'])
@login_required
def create_message():
    """
    POST create new message
    """
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    data = form.data

    new_message = Message(
        message=data['message'],
        user_id=current_user.id,
        channel_id=data['channelId'],
    )

    db.session.add(new_message)
    db.session.commit()

    return {'message': new_message.to_dict()}


@message_routes.route('/<int:message_id>', methods=['PUT'])
@login_required
def edit_message(message_id):
    """
    PUT edit message
    """
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    message = Message.query.get(message_id)

    data = form.data

    message.message = data['message']

    db.session.commit()

    return {'message': message.to_dict()}


@message_routes.route('/<int:message_id>/delete', methods=['DELETE'])
@login_required
def delete_message(message_id):
    """
    DELETE message
    """
    message = Message.query.get(message_id)

    if not message:
        return {'error': 'message not found'}

    db.session.delete(message)
    db.session.commit()
    return {'message': 'message successfully deleted.'}
