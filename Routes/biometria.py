from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from extensions import db
from Models.Models import estanque  
from Models.Models import biometria

Biometria = Blueprint('Biometria', __name__)

@Biometria.route('/biometria', methods=['POST'])
#@jwt_required()
def agregar_biometria():
    data = request.get_json()


    nueva_biometria = biometria(
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


@Biometria.route('/consultarbiometrias', methods=['GET'])
#@jwt_required()
def consultarbiometrias():
    biometrias = biometria.query.join(estanque, biometria.id_estanque == estanque.id_estanque).all()

    
    biometriasconsultadas = []
    for biometriaindividual in biometrias:
        biometriasconsultadas.append({
            "id":biometriaindividual.id_biometria,
            "fecha":str(biometriaindividual.fecha),
            "hora":str(biometriaindividual.hora),
            "nombreEstanque":biometriaindividual.estanque.nombreEstanque,
            "numeroPeces":biometriaindividual.estanque.numeropeces,
            "peso":biometriaindividual.peso,
            "longitud":biometriaindividual.longitud,
            "cantidad_biomasa":biometriaindividual.cantidad_biomasa,
            "label":biometriaindividual.id_biometria
        })
    return jsonify(biometriasconsultadas)


@Biometria.route('/biometria/<int:id_biometria>', methods=['GET'])
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
    
    
@Biometria.route('/biometria/<int:biometria_id>', methods=['PUT'])
def update_biometria(biometria_id):
    data = request.get_json()
    BiometriaActualizar = biometria.query.get(biometria_id)
    if biometria:
        BiometriaActualizar.id_estanque = data['idestanque']
        BiometriaActualizar.tamano_muestra =data["tamanomuestra"] 
        db.session.commit()
        return jsonify({'message': 'Biometria actualizada correctamente'}), 200
    else:
        return jsonify({'error': 'Biometria no encontrada'}), 404
    
    
@Biometria.route('/verbiometria/<int:id_estanque>', methods=['GET'])
def verBiometrias(id_estanque):
   
    biometrias = biometria.query.filter_by(id_estanque=id_estanque).all()

    if biometrias:
        biometriasconid = []
        for biometriaindividual in biometrias:
            biometriasconid.append({
                "id":biometriaindividual.id_biometria,
                "fecha":str(biometriaindividual.fecha),
                "hora":str(biometriaindividual.hora),
                "biomasa":biometriaindividual.cantidad_biomasa
                
            })
        return jsonify(biometriasconid), 200
    else:
        return jsonify({'error': 'Biometrias no encontradas'}), 404



@Biometria.route('/borrarbiometria/<int:id>', methods=['DELETE'])
def borrarbiometria(id):
    biometriaborrar = biometria.query.get(id)
    
    if biometriaborrar is None:
        return jsonify({'mensaje': 'Biometria no encontrada'}), 404

    db.session.delete(biometriaborrar)
    db.session.commit()

    return jsonify({'mensaje': 'Biometria eliminada con éxito'})

