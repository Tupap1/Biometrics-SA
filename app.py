from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from routes.biometria import biometria
from routes.usuarios import usuarios 


def createdb():
    db = SQLAlchemy()
    
    return db


def create_app():
    app = Flask(__name__, template_folder='templates')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/biometricssa'
    from regroutes import register_routes
    app.register_blueprint(biometria)
    app.register_blueprint(usuarios)
    
    
    db = createdb()
    
    db.init_app(app)
    
    register_routes(app, db)
    
    migrate =  Migrate(app, db)
    
    
    return app



                
