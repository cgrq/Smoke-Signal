import json
from app.models import db, ChannelMembership, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channel_memberships():

    # ADD THE FIELDS WE ADDED TO THE USER MODEL HERE!!!!!!!!!!!!!!!
    f = open('seed_data/channel_memberships.json')
    channel_memberships = json.load(f)

    for u in channel_memberships:
        channel_membership = ChannelMembership(
            channel_id=u['channel_id'],
            user_id=u['user_id'],
        )
        db.session.add(channel_membership)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the channel_memberships table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channel_memberships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_memberships"))

    db.session.commit()
