from extensions import db
from flask import  request, jsonify, session, Blueprint
from Models.Models  import usuario, peces, estanque, biometria, wq, alimentacion, alimento
from extensions import  jwt_required, get_jwt_identity, create_access_token, bcrypt



pruebaroutes = Blueprint('pruebaroutes', __name__)

@pruebaroutes.route("/signup", methods=["POST"])
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

@pruebaroutes.route('/token')
@jwt_required()
def gettoken():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@pruebaroutes.route("/login", methods=["POST"])
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
        
   
@pruebaroutes.route("/user")
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
    
    
@pruebaroutes.route("/logout")
def logout():
    session.pop("user_id")
    return 200 






                   
                                  

    
@pruebaroutes.route('/WQ', methods=['POST'])
def create_measurement():
    data = request.get_json()
    new_measurement = wq(
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
    

@pruebaroutes.route('/consultarwq', methods=['GET'])
def consultarwq():
    WaterQualities = wq.query.join(estanque, wq.id_estanque == estanque.id_estanque).all()

    
    WQS = []
    for WaterQuality in WaterQualities:
        WQS.append({
            "id":WaterQuality.id,
            "idestanque":WaterQuality.id_estanque,
            "nombreEstanque":WaterQuality.estanque.nombreEstanque,
            "hora":str(WaterQuality.hora),
            "fecha":str(WaterQuality.fecha)
        })
    return jsonify(WQS)


@pruebaroutes.route('/wq/<int:wq_id>', methods=['PUT'])
def actualizarwq(wq_id):
    data = request.get_json()
    wq = wq.query.get(wq_id)
    if wq:
        wq.id_estanque = data['idestanque']
        db.session.commit()
        return jsonify({'message': 'WQ actualizada correctamente'}), 200
    else:
        return jsonify({'error': 'WQ no encontrada'}), 404
    
    
@pruebaroutes.route('/verWQ/<int:id_estanque>', methods=['GET'])
def verWQ(id_estanque):
   
    wqs = wq.query.filter_by(id_estanque=id_estanque).all()

    if wqs:
        wqsestanque = []
        for wqinidividual in wqs:
            wqsestanque.append({
                "id":wqinidividual.id,
                "fecha":str(wqinidividual.fecha),
                "hora":str(wqinidividual.hora)

                
            })
        return jsonify(wqsestanque), 200
    else:
        return jsonify({'error': 'Alimentaciones no encontradas'}), 404
    
       
@pruebaroutes.route('/crearalimento', methods=['POST'])
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


@pruebaroutes.route('/veralimentos', methods=['GET'])
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



@pruebaroutes.route('/alimento/<int:id>', methods=['PUT'])
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
    
    
    
    
@pruebaroutes.route('/borraralimento/<int:id>', methods=['DELETE'])
def borraralimento(id):


    alimentoborrado = alimento.query.get(id)
    if alimento is None:
        return jsonify({'mensaje': 'Alimento no encontrado'}), 404

    db.session.delete(alimentoborrado)
    db.session.commit()

    return jsonify({'mensaje': 'Alimento eliminado con éxito'})
    
    
    
    
@pruebaroutes.route('/crearalimentacion', methods=['POST'])
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
    
    
    
@pruebaroutes.route('/veralimentacion')
def veralimentacion():
    alimentaciones = alimentacion.query.join(alimento, alimentacion.idAlimento == alimento.idAlimento) \
                                    .join(estanque, alimentacion.id_estanque == estanque.id_estanque) \
                                    .add_columns(alimentacion.idalimentacion, estanque.nombreEstanque, alimento.unidad,alimento.NombreAlimento, 
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


@pruebaroutes.route('/verAlimentaciones/<int:id_estanque>', methods=['GET'])
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


@pruebaroutes.route('/alimentaciones/<int:id>', methods=['PUT'])
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
    
    
    
    
@pruebaroutes.route('/borraralimentacion/<int:id>', methods=['DELETE'])
def borraralimentacion(id):


    alimentacionborrada = alimentacion.query.get(id)
    if alimentacion is None:
        return jsonify({'mensaje': 'Alimentación no encontrada'}), 404

    db.session.delete(alimentacionborrada)
    db.session.commit()

    return jsonify({'mensaje': 'Alimentación eliminada con éxito'})