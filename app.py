from flask import Flask, request, jsonify
from routes.biometria import biometria
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "mssql://root:@localhost:3306/biometricssa"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

SQLAlchemy(app)

db = SQLAlchemy(app)


app.register_blueprint(biometria)
                
