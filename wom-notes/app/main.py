import os
from flask import Flask, jsonify
from dotenv import load_dotenv

from flask_sqlalchemy import SQLAlchemy


# Load variables from .env
load_dotenv()
print(os.environ.get('FOO')) 

# Funktioner definieras med def
def get_notes():
    return [ { "text": "åäö" },   { "text": "bar" } ]

# Create Flask instance
app = Flask(__name__)
# Tillåt utf-8 i JSON:
app.config['JSON_AS_ASCII'] = False

# Konfiguration för SQLAlchemy 
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User-model skapar en tabell med kolumner i PostgreSQL
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(), nullable=False)
    updated_at = db.Column(db.DateTime(), default=db.func.now(), onupdate=db.func.now())

    def __refr__(self):
        return '<User {}>'.format(self.email)


# Default route to /
@app.route("/")
def index():
    ret = []
    # Loopa varje rad i User-tabellen och lägg till i ret
    # Svaret from query returnar "ret" i json format
    for u in User.query.all():
        ret.append({'id': u.id, 'email': u.email, 'updated_at': u.updated_at})

    return jsonify(ret)


# Route: /notes
@app.route("/notes")
def notes():
    print("GET notes")
    return jsonify(get_notes())











# Run app if called directly
if __name__ == "__main__":
        app.run()   