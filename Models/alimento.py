from sqlalchemy import Column, Integer, ForeignKey,Date, Float,String, create_engine, Date, Time
from sqlalchemy.orm import relationship
from extensions import db

class alimento(db.Model):
    __tablename__ = 'alimento'
    
    idAlimento = db.Column(db.Integer, primary_key = True)
    NombreAlimento = db.Column (db.String(1000))
    cantidad = db.Column (db.Float)
    unidad = db.Column (db.String(10))
    alimentaciones = relationship('alimentacion', backref='alimento')