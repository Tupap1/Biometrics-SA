from flask import Blueprint

biometria = Blueprint('biometrias',__name__)

  
@biometria.route('/')
def holamundo():
    return("Aca podras registar tu biometria")

@biometria.route("/API")
def API():
    return{"prueba api": ["prueba API1","Prueba Api2","Prueba API3"]}   


@biometria.route('/Login')
def method_name():
    return(
        "Bienvenido a Biometrics SA"
    ) 