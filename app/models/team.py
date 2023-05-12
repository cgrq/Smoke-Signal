from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .team_memberships import TeamMembership


class Team(db.Model):
    __tablename__ = "teams"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # Table Keys
    name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(500))

    # Foreign Keys
    users = db.relationship(
        TeamMembership, back_populates="teams", cascade="all, delete-orphan")

    channels = db.relationship(
        "Channel", back_populates="team", cascade="all, delete-orphan")

    # Methods
    def __repr__(self):
        return f'<Team id: {self.id}, name: {self.name} :: {self.created_at}>'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
