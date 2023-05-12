import json
from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_teams():

    # ADD THE FIELDS WE ADDED TO THE USER MODEL HERE!!!!!!!!!!!!!!!
    f = open('seed_data/teams.json')
    teams = json.load(f)

    for u in teams:
        team = Team(
            name=u['name'],
            image_url=u['image_url'],
        )
        db.session.add(team)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the teams table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_teams():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))

    db.session.commit()
