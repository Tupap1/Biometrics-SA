from flask import Blueprint, request, jsonify
#from models.usuarios import Usuario
#from app import create_app



biometria = Blueprint('biometrias',__name__)


@biometria.route('/asdas')
def holamundo():
    return("Aca podras registar tu biometria")

@biometria.route("/APIasd", methods=["POST"])
def API():
    return{"prueba api": ["prueba API1","Prueba Api2","Prueba API3"]}   


@biometria.route('/')
def signup():
    email = request.json["email"]
    password = request.json["password"]
    
    
    userexist = Usuario.query.filter_by(email=email).first() is not None
    
    if userexist:
        return jsonify ({"error": "email already exist"}), 409
    
    
    
    return jsonify ({
        "id": "1",
        "email": email
    })
    