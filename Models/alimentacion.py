from sqlalchemy import Column, Integer, ForeignKey,Date, Float,String, create_engine, Date, Time
from sqlalchemy.orm import relationship
from extensions import db

class alimentacion(db.Model):
    __tablename__ = 'alimentacion'
    
    idalimentacion = db.Column(db.Integer, primary_key = True)
    idAlimento = db.Column(Integer, ForeignKey('alimento.idAlimento'))
    id_estanque = db.Column(Integer, ForeignKey('estanque.id_estanque')) 
    cantidad = db.Column(Float)
    fecha = db.Column(Date) 
    hora = db.Column(Time)
    observaciones = db.Column(String(5000))