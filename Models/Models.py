from sqlalchemy import Column, Integer, ForeignKey,Date, Float,String, create_engine, Date, Time
from sqlalchemy.orm import relationship
from extensions import db


class peces(db.Model):
    id_pez = db.Column(db.Integer, primary_key = True)
    nombre_cientifico = db.Column (db.String(1000))
    cantidadSemilla = db.Column (db.Float)
    unidad = db.Column (db.String(10))
    estanque = relationship("estanque", backref="peces")


class alimento(db.Model):
    __tablename__ = 'alimento'
    
    idAlimento = db.Column(db.Integer, primary_key = True)
    NombreAlimento = db.Column (db.String(1000))
    cantidad = db.Column (db.Float)
    unidad = db.Column (db.String(10))
    alimentaciones = relationship('alimentacion', backref='alimento')
    
class alimentacion(db.Model):
    __tablename__ = 'alimentacion'
    
    idalimentacion = db.Column(db.Integer, primary_key = True)
    idAlimento = db.Column(Integer, ForeignKey('alimento.idAlimento'))
    id_estanque = db.Column(Integer, ForeignKey('estanque.id_estanque')) 
    cantidad = db.Column(Float)
    fecha = db.Column(Date) 
    hora = db.Column(Time)
    observaciones = db.Column(String(5000))

     

class usuario(db.Model):
    __tablename__ = 'usuario'
    
    iduser = db.Column(db.INT, primary_key = True)
    nombres = db.Column (db.String(200))
    apellidos = db.Column (db.String(200))
    email = db.Column(db.String(100))
    nuip = db.Column (db.INT, unique=True)
    rol = db.Column (db.Enum('Admin','Instructor','Aprendiz')) 
    contrasena = db.Column (db.VARCHAR(300))
    
    
class biometria(db.Model):
    __tablename__ = 'biometria'

    id_biometria = db.Column(Integer, primary_key=True)
    id_estanque = db.Column(Integer, ForeignKey('estanque.id_estanque'))  
    fecha = db.Column(Date) 
    hora = db.Column(Time)
    peso = db.Column(Float)
    longitud = db.Column(Float)
    tamano_muestra = db.Column(Integer)
    cantidad_biomasa = db.Column(Float)


class wq(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_estanque = db.Column(Integer, ForeignKey('estanque.id_estanque'))
    nitrogeno = db.Column(db.Float)
    oxigeno = db.Column(db.Float)
    sulfuro = db.Column(db.Float)
    nitratos = db.Column(db.Float)
    informacion = db.Column(db.String(1000))
    fecha = db.Column(Date) 
    hora = db.Column(Time)
    
    
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

    
    
