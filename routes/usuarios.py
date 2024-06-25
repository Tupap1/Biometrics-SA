from flask import Blueprint, render_template, request
from models.usuarios import Usuario
#from utils.db import db 

usuarios = Blueprint('usuarios',__name__)

@usuarios.route('/crearusuario')
def crearusuarios():
    return render_template("index.html")
   
@usuarios.route('/123')
def verusuarios():
    return("")

@usuarios.route("/borrar/<iduser>" , methods =['GET'])
def borrarusuarios():
    return("Aca podras borrar los usuarios")   

@usuarios.route('/new', methods=['POST'])
def agregarusuarios():
    
    nombres = request.form["nombre"]
    apellidos = request.form["apellido"]
    email = request.form["email"]
    nuip = request.form["nuip"]
    rol = request.form["rol"]
    

    nuevoUsuario = Usuario(nombres, apellidos, email, rol, nuip) 


    print(nuevoUsuario)
    
    return "Usuario creado"

@usuarios.route("/modificar/<iduser>" , methods =['GET'])
def modificarusuarios():
    return("Aca podras modificar los usuarios") 
    
