from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .channel_memberships import ChannelMembership


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # Table Keys
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    type = db.Column(db.String(50))
    image_url = db.Column(db.String(500))

    # Foreign Keys
    team_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("teams.id"), ondelete="CASCADE"), nullable=False, )

    team = db.relationship('Team', back_populates="channels")

    users = db.relationship(
        ChannelMembership, back_populates="channels", cascade="all, delete-orphan")

    messages = db.relationship(
        'Message', back_populates='channel', cascade="all, delete-orphan")

    # Methods
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'type': self.type,
            'imageUrl': self.image_url,
            'teamId': self.team_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }

    def __repr__(self):
        return f'<Channel id:{self.id}, name:{self.name} :: {self.created_at}>'
