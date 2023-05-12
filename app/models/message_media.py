from .db import db, environment, SCHEMA, add_prefix_for_prod


class MessageMedia(db.Model):
    __tablename__ = "message_media"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)

    # # Foreign Keys
    message_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("messages.id")), nullable=False)

    # Methods
    def __repr__(self):
        return f'<MessageMedia id: {self.id}, message_id: {self.message_id} >'

    def to_dict(self):
        return {
            'id': self.id,
            'message_id': self.channel_id,
            'url': self.url,
        }
