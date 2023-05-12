from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Email
from .signup_form import valid_email


class EditUserForm(FlaskForm):
    firstName = StringField('firstName', validators=[
                            DataRequired()])  # added this
    lastName = StringField('lastName', validators=[
                           DataRequired()])  # added this
    username = StringField(
        'username', validators=[DataRequired(), Length(3, 20)])
    email = StringField('email', validators=[DataRequired(), valid_email])
    status = StringField('status', validators=[DataRequired()])
    profileImageUrl = StringField('profileImageUrl')  # added this
    password = StringField('password', validators=[DataRequired()])
