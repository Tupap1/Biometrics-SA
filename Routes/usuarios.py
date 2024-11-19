from extensions import db
from flask import  request, jsonify, session, Blueprint
from Models.usuarios  import usuario
from extensions import  jwt_required, get_jwt_identity, create_access_token, bcrypt



Usuarios = Blueprint('Usuarios', __name__)

@Usuarios.route("/signup", methods=["POST"])
def signup():
    try:    
        email = request.json["email"]
        contrasena = request.json["contrasena"]
        nombres = request.json ["nombres"]
        apellidos = request.json ["apellidos"]
        nuip = request.json["nuip"]
        rol = request.json["rol"]

 
    except KeyError as e:
            print(jsonify({"error": f"Missing key: {e.args[0]}"}), 400) 
    
    user_exists = usuario.query.filter_by(email=email).first() is not None
    nuipexist = usuario.query.filter_by(nuip=nuip).first() is not None
    
    
    if user_exists:
        return jsonify({"error": "Ya existe un usuario con este email"}), 409


    elif nuipexist:
        return jsonify({"error:": "Ya existe un usuario con esta identificacion"})

    hashed_contrasena = bcrypt.generate_password_hash(contrasena)
    nuevousuario = usuario(email = email, contrasena = hashed_contrasena, apellidos = apellidos, nombres = nombres, nuip = nuip, rol = rol)
    db.session.add(nuevousuario)
    db.session.commit()

    session["user_id"] = nuevousuario.iduser
 
    return jsonify({
        "iduser": nuevousuario.iduser,
        "nombres": nuevousuario.nombres,
        "email": nuevousuario.email
    })

@Usuarios.route('/token')
@jwt_required()
def gettoken():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@Usuarios.route("/login", methods=["POST"])
def login_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400

        email = data.get("email")
        contrasena = data.get("contrasena")

        if not email or not contrasena:
            return jsonify({"error": "Email y contraseña son requeridos"}), 400

        user = usuario.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"error": "No existe este usuario"}), 401

        if not bcrypt.check_password_hash(user.contrasena, contrasena):
            return jsonify({"error": "Datos incorrectos"}), 401

        session["user_id"] = user.iduser    
        access_token = create_access_token(identity=email)
        
        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.iduser,
                "email": user.email
            }
        })

    except Exception as e:  
        print(f"Error during login: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
        
   
@Usuarios.route("/user")
def user():
    id_user = session.get("user_id")
    
    if not id_user:
        return jsonify({"error": "123Datos incorrectos"}), 401
    
    user = usuario.query.filter_by(iduser=id_user).first()
    return jsonify({
            "id": user.iduser,
            "email": user.email,
            "nombre": user.nombres
        })
    
    
@Usuarios.route("/logout")
def logout():
    session.pop("user_id")
    return 200 






                   
                                  

    

    
       

    
