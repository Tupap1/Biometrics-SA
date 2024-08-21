from flask import render_template, request
from models.usuarios import Usuario
from app import createdb

db = createdb()

def register_routes(app, db):
    
    @app.route('/a')
    def index():
        people = Usuario.query.all()
        return str(Usuario) 