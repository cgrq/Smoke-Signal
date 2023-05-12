from flask.cli import AppGroup
from .users import seed_users, undo_users
from .teams import seed_teams, undo_teams
from .channel import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
from .team_memberships import seed_team_memberships, undo_team_memberships
from .channel_memberships import seed_channel_memberships, undo_channel_memberships

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_channel_memberships()
        undo_team_memberships()
        undo_messages()
        undo_channels()
        undo_teams()
        undo_users()
    seed_users()
    seed_teams()
    seed_channels()
    seed_messages()
    seed_team_memberships()
    seed_channel_memberships()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_channel_memberships()
    undo_team_memberships()
    undo_messages()
    undo_channels()
    undo_teams()
    undo_users()
    # Add other undo functions here
