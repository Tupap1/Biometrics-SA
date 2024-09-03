""" from flask import Blueprint, request, jsonify,session
from models.usuarios import Usuario
from app import createdb, create_app, encriptacion
from routes.init import login




def registeroutes(app, db):
    bcrypt =  encriptacion(app)


    @login.route("/signup", methods=["POST","GET"])
    def signup():
        email = request.json["email"]
        contrasena = request.json["contrasena"]
        nombres = request.json["nombres"]
        apellidos = request.json["apellidos"]
        nuip = request.json["nuip"]
        rol = request.json["rol"]
    
        user_exists = Usuario.query.filter_by(email=email).first() is not None
    
        if user_exists:
            return jsonify({"error": "Ya existe un usuario con este email"}), 409
        
        hashed_password = bcrypt.generate_password_hash(contrasena)
        new_user = Usuario(email = email, contrasena = hashed_password, nombres = nombres, apellidos = apellidos, nuip = nuip, rol = rol)
        db.session.add(new_user)
        db.session.commit()
    
        session["user_id"] = new_user.iduser
    
    
        data = {    "id": "123",
                    "email": "asd@123"}
        return login


    @login.route('/pruebalogin')
    def method_name():
        return "hola mundo" """