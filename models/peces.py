from utils.db import db 

class peces(db.Model):
    id_pez = db.Column(db.Integer, primary_key = True)
    nombre_cientifico = db.Column (db.String(1000))
    cantidadSemilla = db.Column (db.String(10))
    
    
def __int__(self, nombre_cientifico, cantidadSemilla):
        self.nombre_cientifico = nombre_cientifico
        self.cantidadSemilla = cantidadSemilla   