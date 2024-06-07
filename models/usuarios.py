from app import db 
from app import db 

class usuarios(db.Model):
    iduser = db.Column(db.Integer, primary_key = True)
    nombres = db.Column (db.String(200))
    apellidos = db.Column (db.String(200))
    nuip = db.Column (db.Int(20))
    rol = db.Column (db.Bolean(50)) 
    
    
def __int__(self, nombres, apellidos, nuip, rol ):
        self.nombres = nombres
        self.apellidos = apellidos
        self.nuip = nuip
        self.rol = rol