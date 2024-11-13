from flask import Flask, request, jsonify, session
from flask_migrate import Migrate
from flask_session import Session
from flask_cors import cross_origin, CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, ForeignKey,Date, Float,String, create_engine, Date, Time
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from authlib.integrations.flask_client import OAuth
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for
import jwt
import requests
from functools import wraps
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from windowsservice import BaseService




app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/biometricssa'
CORS(app, origins=['http://localhost:5173'])
engine = create_engine('mysql://root:@localhost/biometricssa')
db = SQLAlchemy(app)
oauth = OAuth(app)
Base = declarative_base()
app.config["JWT_SECRET_KEY"] = "asdfasuhfige4123y79hdasbndc7812gebjaksd82f3rgwfsgeedagyuf"
app.secret_key = 'asiofjnwohrNuH)"#BI()#ROBNER/)BAJKSBD)/Q"Bbnfba'
jwt = JWTManager(app)

migrate = Migrate(app, db)

class peces(db.Model):
    id_pez = db.Column(db.Integer, primary_key = True)
    nombre_cientifico = db.Column (db.String(1000))
    cantidadSemilla = db.Column (db.Float)
    unidad = db.Column (db.String(10))
    estanque = db.relationship('Estanque', backref=db.backref('peces', lazy=True))


class alimento(db.Model):
    __tablename__ = 'alimento'
    
    idAlimento = db.Column(db.Integer, primary_key = True)
    NombreAlimento = db.Column (db.String(1000))
    cantidad = db.Column (db.Float)
    unidad = db.Column (db.String(10))
    alimentaciones = relationship('alimentacion', backref='alimento')
    
class alimentacion(db.Model):
    __tablename__ = 'alimentacion'
    
    idalimentacion = db.Column(db.Integer, primary_key = True)
    idAlimento = db.Column(Integer, ForeignKey('alimento.idAlimento'))
    id_estanque = db.Column(Integer, ForeignKey('estanque.id_estanque')) 
    cantidad = db.Column(Float)
    fecha = db.Column(Date) 
    hora = db.Column(Time)
    observaciones = db.Column(String(5000))

     

class Usuario(db.Model):
    __tablename__ = 'usuario'
    
    iduser = db.Column(db.INT, primary_key = True)
    nombres = db.Column (db.String(200))
    apellidos = db.Column (db.String(200))
    email = db.Column(db.String(100))
    nuip = db.Column (db.INT, unique=True)
    rol = db.Column (db.Enum('Admin','Instructor','Aprendiz')) 
    contrasena = db.Column (db.VARCHAR(300))
    
    
class Biometria(db.Model):
    __tablename__ = 'biometria'

    id_biometria = db.Column(Integer, primary_key=True)
    id_estanque = db.Column(Integer, ForeignKey('estanque.id_estanque'))  
    fecha = db.Column(Date) 
    hora = db.Column(Time)
    peso = db.Column(Float)
    longitud = db.Column(Float)
    tamano_muestra = db.Column(Integer)
    cantidad_biomasa = db.Column(Float)


class WQ(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_estanque = db.Column(Integer, ForeignKey('estanque.id_estanque'))
    nitrogeno = db.Column(db.Float)
    oxigeno = db.Column(db.Float)
    sulfuro = db.Column(db.Float)
    nitratos = db.Column(db.Float)
    informacion = db.Column(db.String(1000))
    fecha = db.Column(Date) 
    hora = db.Column(Time)
    
    
class Estanque(db.Model):
    __tablename__ = 'estanque'

    id_estanque = db.Column(Integer, primary_key=True)
    id_pez = db.Column(Integer, ForeignKey('peces.id_pez'))  
    tamanoEstanque = db.Column(Integer)  
    numeropeces =db.Column(Integer)
    nombreEstanque = db.Column(String(500))
    natalidad = db.Column(Integer)
    mortalidad = db.Column(Integer)
    Biometria = db.relationship('Biometria', backref=db.backref('Estanque', lazy=True))
    WQ = db.relationship('WQ', backref=db.backref('Estanque', lazy=True))
    alimentacion = db.relationship('alimentacion', backref=db.backref('alimentacion', lazy=True))
    
    
with app.app_context():
    db.create_all()
    print("Tablas creadas")


bcrypt = Bcrypt(app)


@app.route("/signup", methods=["POST"])
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
    
    user_exists = Usuario.query.filter_by(email=email).first() is not None
    nuipexist = Usuario.query.filter_by(nuip=nuip).first() is not None
    
    
    if user_exists:
        return jsonify({"error": "Ya existe un usuario con este email"}), 409


    elif nuipexist:
        return jsonify({"error:": "Ya existe un usuario con esta identificacion"})

    hashed_contrasena = bcrypt.generate_password_hash(contrasena)
    nuevousuario = Usuario(email = email, contrasena = hashed_contrasena, apellidos = apellidos, nombres = nombres, nuip = nuip, rol = rol)
    db.session.add(nuevousuario)
    db.session.commit()

    session["user_id"] = nuevousuario.iduser
 
    return jsonify({
        "iduser": nuevousuario.iduser,
        "nombres": nuevousuario.nombres,
        "email": nuevousuario.email
    })

@app.route('/token')
@jwt_required()
def gettoken():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route("/login", methods=["POST"])
def login_user():
    try:

        print("Request data:", request.get_json())
        
 
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400

        email = data.get("email")
        contrasena = data.get("contrasena")

        if not email or not contrasena:
            return jsonify({"error": "Email y contraseña son requeridos"}), 400

        user = Usuario.query.filter_by(email=email).first()

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
        
   
@app.route("/user")
def user():
    id_user = session.get("user_id")
    
    if not id_user:
        return jsonify({"error": "123Datos incorrectos"}), 401
    
    user = Usuario.query.filter_by(iduser=id_user).first()
    return jsonify({
            "id": user.iduser,
            "email": user.email,
            "nombre": user.nombres
        })
    
    
@app.route("/logout")
def logout():
    session.pop("user_id")
    return 200 


@app.route('/biometria', methods=['POST'])
def agregar_biometria():
    data = request.get_json()


    nueva_biometria = Biometria(
        id_estanque=data['id_estanque'],
        fecha=data['fecha'],
        hora=data['hora'],
        peso=data['peso'],
        longitud=data['longitud'],
        tamano_muestra=data['tamano_muestra'],
        cantidad_biomasa=data['biomasa']
    )

 
    db.session.add(nueva_biometria)
    db.session.commit()

    return jsonify({'mensaje': 'Datos de biometría agregados correctamente'}), 201


@app.route('/consultarbiometrias', methods=['GET'])
def consultarbiometrias():
    biometrias = Biometria.query.join(Estanque, Biometria.id_estanque == Estanque.id_estanque).all()

    
    biometriasconsultadas = []
    for biometria in biometrias:
        biometriasconsultadas.append({
            "id":biometria.id_biometria,
            "fecha":str(biometria.fecha),
            "hora":str(biometria.hora),
            "nombreEstanque":biometria.Estanque.nombreEstanque,
            "numeroPeces":biometria.Estanque.numeropeces,
            "peso":biometria.peso,
            "longitud":biometria.longitud,
            "cantidad_biomasa":biometria.cantidad_biomasa,
            "label":biometria.id_biometria
        })
    return jsonify(biometriasconsultadas)


@app.route('/biometria/<int:id_biometria>', methods=['GET'])
def obtener_biometria(id_biometria):


    biometria = Biometria.query.get(id_biometria)

    if biometria:
        return jsonify({
            'id_biometria': biometria.id_biometria,
            'id_estanque': biometria.id_estanque,
            'fecha': str(biometria.fecha),
            'hora': str(biometria.hora),
            "biomasa":biometria.cantidad_biomasa
        }), 200
    else:
        return jsonify({'mensaje': 'Biometría no encontrada'}), 404
    
    
@app.route('/biometria/<int:biometria_id>', methods=['PUT'])
def update_biometria(biometria_id):
    data = request.get_json()
    biometria = Biometria.query.get(biometria_id)
    if biometria:
        biometria.id_estanque = data['idestanque']
        biometria.tamano_muestra =data["tamanomuestra"] 
        db.session.commit()
        return jsonify({'message': 'Biometria actualizada correctamente'}), 200
    else:
        return jsonify({'error': 'Biometria no encontrada'}), 404
    
    
@app.route('/verbiometria/<int:id_estanque>', methods=['GET'])
def verBiometrias(id_estanque):
   
    biometrias = Biometria.query.filter_by(id_estanque=id_estanque).all()

    if biometrias:
        biometriasconid = []
        for biometria in biometrias:
            biometriasconid.append({
                "id":biometria.id_biometria,
                "fecha":str(biometria.fecha),
                "hora":str(biometria.hora),
                "biomasa":biometria.cantidad_biomasa
                
            })
        return jsonify(biometriasconid), 200
    else:
        return jsonify({'error': 'Biometrias no encontradas'}), 404



@app.route('/borrarbiometria/<int:id>', methods=['DELETE'])
def borrarbiometria(id):
    biometriaborrar = Biometria.query.get(id)
    
    if Biometria is None:
        return jsonify({'mensaje': 'Biometria no encontrada'}), 404

    db.session.delete(biometriaborrar)
    db.session.commit()

    return jsonify({'mensaje': 'Biometria eliminada con éxito'})




@app.route("/registrarpeces", methods=["POST"])
def registrarpeces():
        if request:
            nombre_cientifico = request.json["Raza"]
            cantidadSemilla = request.json["cantidadSemilla"]
            unidad = request.json["unidad"]
        else:
            return jsonify({"error": "Invalid content type"}), 400
        

        
        CrearPeces = peces(nombre_cientifico = nombre_cientifico, cantidadSemilla = cantidadSemilla, unidad = unidad)
        
        db.session.add(CrearPeces)
        db.session.commit()
        
        return jsonify({
                "mensaje": "Peces creados con éxito",
    })
        
        
@app.route("/consultarpeces", methods=["GET"])
def consultarpeces():
    peces_data = peces.query.all()
    return jsonify([
        {'label': pez.nombre_cientifico, 'cantidadSemilla': pez.cantidadSemilla, 'id': pez.id_pez,'unidad':pez.unidad}
        for pez in peces_data
    ])
    
    
    
    
    
@app.route('/peces/<int:id>', methods=['PUT'])
def actualizarpez(id):
    data = request.get_json()
    pez = peces.query.get(id)
    if pez:
        pez.nombre_cientifico = data['nombrepez']
        pez.cantidadSemilla = data['cantidadsemilla']
        pez.unidad = data['unidad']
        db.session.commit()
        return jsonify({'message': 'pez actualizada correctamente'}), 200
    else:
        return jsonify({'error': 'pez no encontrada'}), 404
    
    
    
    
    
    
@app.route('/borrarpez/<int:id>', methods=['DELETE'])
def borrarpez(id):
    pezaborrar = peces.query.get(id)
    
    if alimentacion is None:
        return jsonify({'mensaje': 'Alimentación no encontrada'}), 404

    db.session.delete(pezaborrar)
    db.session.commit()

    return jsonify({'mensaje': 'Alimentación eliminada con éxito'})
                   
                                  
@app.route("/crearestanque", methods=["POST"])
def crearestanque():
    if request:
        nombreEstanque = request.json["nombreEstanque"]
        tamanoestanque = request.json["tamanoestanque"]
        numeropeces = request.json["numeropeces"]
        id_pez = request.json["id_pez"]
        
    else:
            return jsonify({"error": "Invalid content type"}), 400
    
    
    nuevoestanque = Estanque(id_pez = id_pez, tamanoEstanque = tamanoestanque, nombreEstanque = nombreEstanque, numeropeces = numeropeces)
    
    db.session.add(nuevoestanque)
    db.session.commit()
    
    return jsonify({
            "id": nombreEstanque,
            "email": tamanoestanque,
            "nombre": id_pez
        })
        

@app.route("/consultarestanque", methods=["GET"])
def consultarestanque():
    estanques = Estanque.query.join(peces, Estanque.id_pez == peces.id_pez).all()  
    

    estanques_json = []
    for estanque in estanques:
        estanques_json.append({
            "id_estanque": estanque.id_estanque,
            "nombre_pez": estanque.peces.nombre_cientifico,
            "id_pez": estanque.id_pez,
            "tamanoEstanque": estanque.tamanoEstanque,
            "numeropeces":estanque.numeropeces,
            "nombreEstanque": estanque.nombreEstanque,
            "label":estanque.nombreEstanque,
            "id":estanque.id_estanque
        })


    return jsonify(estanques_json)


@app.route('/estanque/<int:id_estanque>')
def get_estanque(id_estanque):
    estanqueunico = Estanque.query.get(id_estanque)
    if estanqueunico:
        return jsonify({
            "id": estanqueunico.id_estanque,
            "nombre":estanqueunico.nombreEstanque,
            "tamano":estanqueunico.tamanoEstanque,
            "numeropeces":estanqueunico.numeropeces,
            "mortalidad":estanqueunico.mortalidad,
            "idpez":estanqueunico.id_pez,
            "nombrepez":estanqueunico.peces.nombre_cientifico
                

        })
    else:
        return jsonify({'error': 'Estanque no encontrado'}), 404
    
    
    
    
    
@app.route('/estanque/<int:id_estanque>', methods=['PUT'])
def actualizarestanque(id_estanque):
    data = request.get_json()
    estanque = Estanque.query.get(id_estanque)
    if estanque:
        estanque.nombreEstanque = data['nombreEstanque']
        estanque.numeropeces = data['numeropeces']
        estanque.mortalidad = data['mortalidad']
        estanque.tamanoEstanque = data['tamano']
        estanque.id_pez = data['id_pez']
        db.session.commit()
        return jsonify({'message': 'estanque actualizado correctamente'}), 200
    else:
        return jsonify({'error': 'estanque no encontrado'}), 404
    
@app.route('/WQ', methods=['POST'])
def create_measurement():
    data = request.get_json()
    new_measurement = WQ(
        id_estanque=data['idestanque'],
        nitrogeno=data['Nitrogeno'],
        oxigeno=data['Oxigeno'],
        sulfuro=data['Sulfuro'],
        nitratos=data['Nitratos'],
        informacion=data['Informacion'],
        hora = data['hora'],
        fecha = data['fecha']
    )
    db.session.add(new_measurement)
    db.session.commit()
    return jsonify({'mensaje': 'WQ creada con exito '})
    

@app.route('/consultarwq', methods=['GET'])
def consultarwq():
    WaterQualities = WQ.query.join(Estanque, WQ.id_estanque == Estanque.id_estanque).all()

    
    WQS = []
    for WaterQuality in WaterQualities:
        WQS.append({
            "id":WaterQuality.id,
            "idestanque":WaterQuality.id_estanque,
            "nombreEstanque":WaterQuality.Estanque.nombreEstanque,
            "hora":str(WaterQuality.hora),
            "fecha":str(WaterQuality.fecha)
        })
    return jsonify(WQS)


@app.route('/wq/<int:wq_id>', methods=['PUT'])
def actualizarwq(wq_id):
    data = request.get_json()
    wq = WQ.query.get(wq_id)
    if wq:
        wq.id_estanque = data['idestanque']
        db.session.commit()
        return jsonify({'message': 'WQ actualizada correctamente'}), 200
    else:
        return jsonify({'error': 'WQ no encontrada'}), 404
    
    
@app.route('/verWQ/<int:id_estanque>', methods=['GET'])
def verWQ(id_estanque):
   
    wqs = WQ.query.filter_by(id_estanque=id_estanque).all()

    if wqs:
        wqsestanque = []
        for wq in wqs:
            wqsestanque.append({
                "id":wq. id,
                "fecha":str(wq.fecha),
                "hora":str(wq.hora)

                
            })
        return jsonify(wqsestanque), 200
    else:
        return jsonify({'error': 'Alimentaciones no encontradas'}), 404
    
       
@app.route('/crearalimento', methods=['POST'])
def crearalimento():
    data = request.get_json()
    alimentonuevo = alimento(
        NombreAlimento = data['nombrealimento'],
        cantidad = data['cantidad'],
        unidad = data['unidad']
    )
    db.session.add(alimentonuevo)
    db.session.commit()
    return jsonify({
        'mensaje':'alimento creado con exito'
    })


@app.route('/veralimentos', methods=['GET'])
def veralimentos():
    Alimentos = alimento.query.all()

    
    alimentos = []
    for alimentacionunica in Alimentos:
        alimentos.append({
            "id":alimentacionunica.idAlimento,
            "nombrealimento":alimentacionunica.NombreAlimento,
            "cantidad":alimentacionunica.cantidad,
            "unidad":alimentacionunica.unidad,
            "label":alimentacionunica.NombreAlimento,
            "info":alimentacionunica.cantidad


        })
    return jsonify(alimentos)



@app.route('/alimento/<int:id>', methods=['PUT'])
def actualizaralimento(id):
    data = request.get_json()
    alimentacionunica = alimento.query.get(id)
    if alimentacionunica:
        alimentacionunica.NombreAlimento = data['nombrealimento']
        alimentacionunica.cantidad = data['cantidad']
        alimentacionunica.unidad = data['unidad']
        db.session.commit()
        return jsonify({'message': 'Alimento actualizado correctamente'}), 200
    else:
        return jsonify({'error': 'Alimento no encontrado'}), 404
    
    
    
    
@app.route('/borraralimento/<int:id>', methods=['DELETE'])
def borraralimento(id):


    alimentoborrado = alimento.query.get(id)
    if alimento is None:
        return jsonify({'mensaje': 'Alimento no encontrado'}), 404

    db.session.delete(alimentoborrado)
    db.session.commit()

    return jsonify({'mensaje': 'Alimento eliminado con éxito'})
    
    
    
    
@app.route('/crearalimentacion', methods=['POST'])
def crearalimentacion():
    data = request.get_json()
    alimentacionnueva = alimentacion(
        idAlimento = data['idAlimento'],
        id_estanque = data['id_estanque'],
        cantidad = data['cantidad'],
        fecha = data['fecha'],
        hora = data['hora'],
        observaciones = data['observaciones']
    )
    db.session.add(alimentacionnueva)
    db.session.commit()
    return jsonify({
        'mensaje':'alimentacion creada con exito'
    })
    
    
    
@app.route('/veralimentacion')
def veralimentacion():
    alimentaciones = alimentacion.query.join(alimento, alimentacion.idAlimento == alimento.idAlimento) \
                                    .join(Estanque, alimentacion.id_estanque == Estanque.id_estanque) \
                                    .add_columns(alimentacion.idalimentacion, Estanque.nombreEstanque, alimento.unidad,alimento.NombreAlimento, 
                                                 alimentacion.cantidad, alimentacion.fecha, alimentacion.hora, alimentacion.observaciones, alimentacion.id_estanque, alimentacion.idalimentacion) \
                                    .all()


    Alimentacionesarray = []
    for Alimentacion in alimentaciones:
        Alimentacionesarray.append({
            "id":Alimentacion.idalimentacion,
            "idestanque":Alimentacion.id_estanque,
            "idalimentacion":Alimentacion.idalimentacion,
            "nombreestanque": Alimentacion.nombreEstanque,
            "nombreAlimento":Alimentacion.NombreAlimento,
            "cantidad":Alimentacion.cantidad,
            "fecha":str(Alimentacion.fecha),
            "hora":str(Alimentacion.hora),
            "observaciones":Alimentacion.observaciones,
            "unidad":Alimentacion.unidad
            
            
            
        })
    return jsonify(Alimentacionesarray)


@app.route('/verAlimentaciones/<int:id_estanque>', methods=['GET'])
def verAlimentaciones(id_estanque):
   
    Alimentaciones = alimentacion.query.filter_by(id_estanque=id_estanque).all()

    if Alimentaciones:
        Alimentacionesestanque = []
        for Alimentacion in Alimentaciones:
            Alimentacionesestanque.append({
                "id":Alimentacion.idalimentacion,
                "cantidad":Alimentacion.cantidad,
                "nombreAlimento":Alimentacion.alimento.NombreAlimento,
                "fecha":str(Alimentacion.fecha),
                "hora":str(Alimentacion.hora)

                
            })
        return jsonify(Alimentacionesestanque), 200
    else:
        return jsonify({'error': 'Alimentaciones no encontradas'}), 404


@app.route('/alimentaciones/<int:id>', methods=['PUT'])
def actualizaralimentaciones(id):
    data = request.get_json()
    alimentacionunica = alimentacion.query.get(id)
    if alimentacionunica:
        alimentacionunica.idAlimento = data['nombrealimento']
        alimentacionunica.id_estanque = data['estanque']
        alimentacionunica.cantidad = data['cantidad']
        alimentacionunica.unidad = data['unidad']
        alimentacionunica.observaciones = data['observaciones']
        db.session.commit()
        return jsonify({'message': 'Alimento actualizado correctamente'}), 200
    else:
        return jsonify({'error': 'Alimento no encontrado'}), 404
    
    
    
    
@app.route('/borraralimentacion/<int:id>', methods=['DELETE'])
def borraralimentacion(id):


    alimentacionborrada = alimentacion.query.get(id)
    if alimentacion is None:
        return jsonify({'mensaje': 'Alimentación no encontrada'}), 404

    db.session.delete(alimentacionborrada)
    db.session.commit()

    return jsonify({'mensaje': 'Alimentación eliminada con éxito'})


from app import app, db

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')