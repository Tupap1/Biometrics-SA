from flask import Blueprint, render_template, request, jsonify




usuarios = Blueprint('usuarios',__name__)

@usuarios.route('/crearusuario')
def crearusuarios():
    return render_template("index.html")
    
@usuarios.route('/123')
def verusuarios():
    return("sadasasddas ")

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
        

    print("nuevoUsuario")
        
    return "Usuario creado"

@usuarios.route("/modificar/<iduser>" , methods =['GET'])
def modificarusuarios():
    return("Aca podras modificar los usuarios") 


""" @usuarios.route("/registrarse",method =["POST"])
def ingresar():
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = Usuario.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })     
 """
 
 
@usuarios.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })