from flask import Flask, request, jsonify,session
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/biometricssa'

db = SQLAlchemy(app)

class peces(db.Model):
    id_pez = db.Column(db.Integer, primary_key = True)
    nombre_cientifico = db.Column (db.String(1000))
    cantidadSemilla = db.Column (db.String(10))

class Usuario(db.Model):
    __tablename__ = 'usuario'
    
    iduser = db.Column(db.INT, primary_key = True)
    nombres = db.Column (db.String(200))
    apellidos = db.Column (db.String(200))
    email = db.Column(db.String(100))
    nuip = db.Column (db.INT)
    rol = db.Column (db.INT) 
    contrasena = db.Column (db.VARCHAR(30))

with app.app_context():
    db.create_all()
    print("Tablas creadas")



bcrypt = Bcrypt(app)


@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    contrasena = request.json["contrasena"]
 
    user_exists = Usuario.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_contrasena = bcrypt.generate_password_hash(contrasena)
    new_user = Usuario(email=email, contrasena=hashed_contrasena)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.iduser
 
    return jsonify({
        "iduser": new_user.iduser,
        "email": new_user.email
    })
 
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    contrasena = request.json["contrasena"]
  
    user = Usuario.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(Usuario.contrasena, contrasena):
        return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.iduser
  
    return jsonify({
        "iduser": user.iduser,
        "email": user.email
    })