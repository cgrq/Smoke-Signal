import json
from app.models import db, TeamMembership, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_team_memberships():

    # ADD THE FIELDS WE ADDED TO THE USER MODEL HERE!!!!!!!!!!!!!!!
    f = open('seed_data/team_memberships.json')
    team_memberships = json.load(f)

    for u in team_memberships:
        team_membership = TeamMembership(
            status=u['status'],
            team_id=u['team_id'],
            user_id=u['user_id'],
        )
        db.session.add(team_membership)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the team_memberships table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_team_memberships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.team_memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM team_memberships"))

    db.session.commit()
