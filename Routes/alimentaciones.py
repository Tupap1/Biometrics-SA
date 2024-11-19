from flask import Blueprint, request, jsonify    
from Models.alimentacion import  alimentacion
from Models.alimento import alimento
from Models.estanque import estanque
from extensions import db

Alimentacion = Blueprint('Alimentacion', __name__)

@Alimentacion.route('/crearalimentacion', methods=['POST'])
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
    
    
    
@Alimentacion.route('/veralimentacion')
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


@Alimentacion.route('/verAlimentaciones/<int:id_estanque>', methods=['GET'])
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


@Alimentacion.route('/alimentaciones/<int:id>', methods=['PUT'])
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
    
    
    
    
@Alimentacion.route('/borraralimentacion/<int:id>', methods=['DELETE'])
def borraralimentacion(id):


    alimentacionborrada = alimentacion.query.get(id)
    if alimentacion is None:
        return jsonify({'mensaje': 'Alimentación no encontrada'}), 404

    db.session.delete(alimentacionborrada)
    db.session.commit()

    return jsonify({'mensaje': 'Alimentación eliminada con éxito'})