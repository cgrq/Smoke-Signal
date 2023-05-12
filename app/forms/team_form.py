from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def short_team_name(form, field):
    name = field.data
    if len(name) < 5:
        raise ValidationError('Please provide a team name over 5 characters.')

class TeamForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), short_team_name])
    imageUrl = StringField('imageUrl')
