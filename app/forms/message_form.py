from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class MessageForm(FlaskForm):
    message = StringField("Message", validators=[DataRequired()])
    channelId = IntegerField("Channel ID", validators=[DataRequired()])

    # USER_ID GETS ADDED BY THE BACKEND ROUTE
