from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    # Table Keys
    message = db.Column(db.String(800))
    sent_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("channels.id"), ondelete="CASCADE"), nullable=False)

    user = db.relationship('User', back_populates='messages')
    channel = db.relationship(
        'Channel', back_populates='messages')

    # Methods
    def __repr__(self):
        return f'<Message id: {self.id}, user_id: {self.user_id}, channel_id: {self.channel_id} sent: {self.sent_at}>'

    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'message': self.message,
            # 'created_at': self.created_at,
            # 'updated_at': self.updated_at,
            'sent_at': str(self.sent_at),
        }
