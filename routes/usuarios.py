from flask import Blueprint

usuarios = Blueprint('usuarios',__name__)

  
@usuarios.route('/', methods =['POST'] )
def verusuarios():
    return("Aca veras los usuarios")

@usuarios.route("/borrar/<iduser>" , methods =['GET'])
def borrarusuarios():
    return("Aca podras borrar los usuarios")   

@usuarios.route('/agregar/<iduser>' , methods =['POST'])
def agregarusuarios():
    return("Aca podras agregar usuarios")

@usuarios.route("/modificar/<iduser>" , methods =['GET'])
def modificarusuarios():
    return("Aca podras modificar los usuarios") 
    
    