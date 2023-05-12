from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class ChannelMembership(db.Model):
    __tablename__ = 'channel_memberships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)

    # Table Keys
    user_joined = db.Column(db.DateTime, nullable=False,
                            default=datetime.now())

    # Foreign Keys
    channel_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('channels.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))

    channels = db.relationship("Channel", back_populates="users")
    users = db.relationship("User", back_populates="channels")
