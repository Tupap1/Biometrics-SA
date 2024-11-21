from flask import  request, jsonify, Blueprint
from extensions import db
from Models.wq  import wq
from Models.estanque import estanque


Wq = Blueprint('WQ', __name__)

@Wq.route('/WQ', methods=['POST'])
def create_measurement():
    data = request.get_json()
    new_measurement = wq(
        id_estanque=data['idestanque'],
        nitrogeno=data['Nitrogeno'],
        oxigeno=data['Oxigeno'],
        sulfuro=data['Sulfuro'],
        nitritos=data['Nitratos'],
        informacion=data['Informacion'],
        hora = data['hora'],
        fecha = data['fecha']
    )
    db.session.add(new_measurement)
    db.session.commit()
    return jsonify({'mensaje': 'WQ creada con exito '})
    

@Wq.route('/consultarwq', methods=['GET'])
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


@Wq.route('/wq/<int:wq_id>', methods=['PUT'])
def actualizarwq(wq_id):
    data = request.get_json()
    wqeditada = wq.query.get(wq_id)
    if wqeditada:
        wqeditada.id_estanque = data['idestanque']
        db.session.commit()
        return jsonify({'message': 'WQ actualizada correctamente'}), 200
    else:
        return jsonify({'error': 'WQ no encontrada'}), 404
    
    
@Wq.route('/verWQ/<int:id_estanque>', methods=['GET'])
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
        return jsonify({'error': 'WQ no encontrada'}), 404