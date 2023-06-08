import os

from flask_login import login_required
from flask_socketio import SocketIO, join_room

# Set cors policy
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://smoke-signal-new.onrender.com",
        "https://smoke-signal-new.onrender.com",
        "https://smokesignal.chat",
    ]
else:
    origins = "*"

# Socket IO instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('connect')
@login_required
def on_connect():
    socketio.emit("message", "THIS IS DATA", room="General")


@socketio.on('join')
@login_required
def on_join(channel_id):
    join_room(f"Channel {channel_id}")

    socketio.emit("message", channel_id,
                  room=f"{channel_id}")


@socketio.on('message sent')
@login_required
def message_sent(data):
    socketio.emit("message received", data, room=f"Channel {data['room']}")
