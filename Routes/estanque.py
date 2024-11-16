from flask import Blueprint, request, jsonify
from Models.Models import estanque, peces
from extensions import db

Estanque = Blueprint('Estanque', __name__)

@Estanque.route("/crearestanque", methods=["POST"])
def crearestanque():
    if request:
        nombreEstanque = request.json["nombreEstanque"]
        tamanoestanque = request.json["tamanoestanque"]
        numeropeces = request.json["numeropeces"]
        id_pez = request.json["id_pez"]
        
    else:
            return jsonify({"error": "Invalid content type"}), 400
    
    
    nuevoestanque = estanque(id_pez = id_pez, tamanoEstanque = tamanoestanque, nombreEstanque = nombreEstanque, numeropeces = numeropeces)
    
    db.session.add(nuevoestanque)
    db.session.commit()
    
    return jsonify({
            "id": nombreEstanque,
            "tamanoEstanque": tamanoestanque,
            "IdPez": id_pez
        })
        

@Estanque.route("/consultarestanque", methods=["GET"])
def consultarestanque():
    estanques = db.session.query(estanque).join(peces, estanque.id_pez == peces.id_pez).all() 
    

    estanques_json = []
    for estanquee in estanques:
        estanques_json.append({
            "id_estanque": estanquee.id_estanque,
            "nombre_pez": estanquee.peces.nombre_cientifico,
            "id_pez": estanquee.id_pez,
            "tamanoEstanque": estanquee.tamanoEstanque,
            "numeropeces":estanquee.numeropeces,
            "nombreEstanque": estanquee.nombreEstanque,
            "label":estanquee.nombreEstanque,
            "id":estanquee.id_estanque
        })

    print(estanques)
    return jsonify(estanques_json)


@Estanque.route('/estanque/<int:id_estanque>')
def get_estanque(id_estanque):
    estanqueunico = estanque.query.get(id_estanque)
    if estanqueunico:
        return jsonify({
            "id": estanqueunico.id_estanque,
            "nombre":estanqueunico.nombreEstanque,
            "tamano":estanqueunico.tamanoEstanque,
            "numeropeces":estanqueunico.numeropeces,
            "mortalidad":estanqueunico.mortalidad,
            "idpez":estanqueunico.id_pez,
            "nombrepez":estanqueunico.peces.nombre_cientifico      })
    else:
        return jsonify({'error': 'Estanque no encontrado'}), 404
    
    
    
    
    
@Estanque.route('/estanque/<int:id_estanque>', methods=['PUT'])
def actualizarestanque(id_estanque):
    data = request.get_json()
    estanquee = estanque.query.get(id_estanque)
    if estanquee:
        estanquee.nombreEstanque = data['nombreEstanque']
        estanquee.numeropeces = data['numeropeces']
        estanquee.mortalidad = data['mortalidad']
        estanquee.tamanoEstanque = data['tamano']
        estanquee.id_pez = data['id_pez']
        db.session.commit()
        return jsonify({'message': 'estanque actualizado correctamente'}), 200
    else:
        return jsonify({'error': 'estanque no encontrado'}), 404
    
@Estanque.route('/borraralimento/<int:id_estanque>', methods=['DELETE'])
def borraralimento(id_estanque):


    estanqueborrado = estanque.query.get(id_estanque)
    if estanqueborrado is None:
        return jsonify({'mensaje': 'Alimento no encontrado'}), 404

    db.session.delete(estanqueborrado)
    db.session.commit()

    return jsonify({'mensaje': 'Alimento eliminado con éxito'})