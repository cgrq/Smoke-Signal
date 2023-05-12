from flask import Blueprint, request
from app.models import User, TeamMembership, db
from app.forms import LoginForm, SignUpForm, EditUserForm
from flask_login import current_user, login_user, logout_user

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('')
def authenticate():
    """
    Authenticates a user.
    """

    if current_user.is_authenticated:
        return {"user": current_user.to_dict()}
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)

        return {"user": user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['firstName'],
            last_name=form.data['lastName'],
            status=form.data['status'],
            profile_image_url=form.data['profileImageUrl'] if form.data['profileImageUrl'] else '../test_image.png'
        )
        db.session.add(user)
        db.session.commit()

        team_membership = TeamMembership(
            status='member',
            team_id=4,
            user_id=user.id
        )

        db.session.add(team_membership)
        db.session.commit()

        login_user(user)
        return {"user": user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/edit', methods=['PUT'])
def edit():
    """
    Edits an existing user's information
    """
    print("HITTING EDIT ROUTE ~~~~~~")
    form = EditUserForm()
    print("FORM", form)
    form['csrf_token'].data = request.cookies['csrf_token']
    print("FORM TOKEN", form['csrf_token'].data)
    if form.validate_on_submit():
        print("VALIDATE")
        user = User.query.get(current_user.id)
        print("USER ~!!!!!!~")
        print(user.to_dict())

        user.username = form.data['username']
        user.email = form.data['email']
        user.password = form.data['password']
        user.firstName = form.data['firstName']
        user.lastName = form.data['lastName']
        user.profile_image_url = form.data['profileImageUrl']

        db.session.commit()

        return {"user": user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/delete', methods=['DELETE'])
def delete_team():
    """
    Route to delete a user
    """
    user = User.query.get(current_user.id)
    db.session.delete(user)
    db.session.commit()

    return {"message":"Delete successful"}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
