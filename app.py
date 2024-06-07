from flask import Flask, request, jsonify
from routes.biometria import biometria
from routes.usuarios import usuarios
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost/biometricssa"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.register_blueprint(biometria, usuarios)

                
