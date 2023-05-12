from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class TeamMembership(db.Model):
    __tablename__ = 'team_memberships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # STATUS = ['owner', 'moderator', 'member']

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)

    # Table Keys
    status = db.Column(db.String(255))
    user_joined = db.Column(db.DateTime, nullable=False,
                            default=datetime.now())

    # Foreign Keys
    team_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('teams.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))

    teams = db.relationship("Team", back_populates="users")
    users = db.relationship("User", back_populates="teams")
