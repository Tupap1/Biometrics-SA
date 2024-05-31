from flask import Blueprint

biometria = Blueprint('biometrias',__name__)

  
@biometria.route('/')
def holamundo():
    return("Aca podras registar tu biometria")


@biometria.route('/Login')
def method_name():
    return(
        "Bienvenido a Biometrics SA"
    ) 