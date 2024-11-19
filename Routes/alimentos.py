from flask import Blueprint, request, jsonify
from Models.alimento import alimento
from extensions import db


Alimentos = Blueprint('Alimentos', __name__)

@Alimentos.route('/crearalimento', methods=['POST'])
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


@Alimentos.route('/veralimentos', methods=['GET'])
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



@Alimentos.route('/alimento/<int:id>', methods=['PUT'])
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
    
    
    
    
@Alimentos.route('/borraralimento/<int:id>', methods=['DELETE'])
def borraralimento(id):


    alimentoborrado = alimento.query.get(id)
    if alimento is None:
        return jsonify({'mensaje': 'Alimento no encontrado'}), 404

    db.session.delete(alimentoborrado)
    db.session.commit()

    return jsonify({'mensaje': 'Alimento eliminado con éxito'})
    
    
    