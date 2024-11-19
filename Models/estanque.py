from sqlalchemy import Column, Integer, ForeignKey,Date, Float,String, create_engine, Date, Time
from sqlalchemy.orm import relationship
from extensions import db

class estanque(db.Model):
    __tablename__ = 'estanque'

    id_estanque = db.Column(Integer, primary_key=True)
    id_pez = db.Column(Integer, ForeignKey('peces.id_pez'))  
    tamanoEstanque = db.Column(Integer)  
    numeropeces =db.Column(Integer)
    nombreEstanque = db.Column(String(500))
    natalidad = db.Column(Integer)
    mortalidad = db.Column(Integer)
    biometria = db.relationship('biometria', backref=db.backref('estanque', lazy=True))
    WQ = db.relationship('wq', backref=db.backref('estanque', lazy=True))
    alimentacion = db.relationship('alimentacion', backref=db.backref('alimentacion', lazy=True))