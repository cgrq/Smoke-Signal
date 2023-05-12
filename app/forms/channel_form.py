from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL


class ChannelForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description')
    type = StringField('Type')
    imageUrl = StringField('Image URL')
    teamId = IntegerField('Team ID', validators=[DataRequired()])
