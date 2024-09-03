from flask import Blueprint, render_template, request, jsonify




usuarios = Blueprint('usuarios',__name__)

@usuarios.route('/crearusuario')
def crearusuarios():
    return render_template("index.html")
    
@usuarios.route('/123')
def verusuarios():
    return("sadasasddas ")

