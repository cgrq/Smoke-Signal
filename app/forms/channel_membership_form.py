from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class ChannelMembershipForm(FlaskForm):
    channelId = IntegerField('Channel ID', validators=[DataRequired()])
    userId = IntegerField('User ID', validators=[DataRequired()])
