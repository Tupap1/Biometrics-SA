from flask import Blueprint

biometria = Blueprint('biometrias',__name__)

  
@biometria.route('/asdas')
def holamundo():
    return("Aca podras registar tu biometria")

@biometria.route("/APIasd")
def API():
    return{"prueba api": ["prueba API1","Prueba Api2","Prueba API3"]}   


@biometria.route('/Loginasda')
def method_name():
    return(
        "Bienvenido a Biometrics SA"
    ) 