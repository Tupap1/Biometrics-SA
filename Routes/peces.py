from flask import  request, jsonify, session, Blueprint, current_app
from extensions import db
from Models.Models import peces,alimentacion

Peces = Blueprint('peces', __name__)
@Peces.route("/registrarpeces", methods=["POST"])
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
        
        
@Peces.route("/consultarpeces", methods=["GET"])
def consultarpeces():
    peces_data = peces.query.all()
    return jsonify([
        {'label': pez.nombre_cientifico, 'cantidadSemilla': pez.cantidadSemilla, 'id': pez.id_pez,'unidad':pez.unidad}
        for pez in peces_data
    ])
    
    

@Peces.route('/peces/<int:id>', methods=['PUT'])
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
    
    
    
@Peces.route('/borrarpez/<int:id>', methods=['DELETE'])
def borrarpez(id):
    pezaborrar = peces.query.get(id)
    
    if alimentacion is None:
        return jsonify({'mensaje': 'Alimentación no encontrada'}), 404

    db.session.delete(pezaborrar)
    db.session.commit()

    return jsonify({'mensaje': 'Alimentación eliminada con éxito'})