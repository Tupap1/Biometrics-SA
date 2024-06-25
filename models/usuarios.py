from utils.db import db

class Usuario(db.Model):
    iduser = db.Column(db.Integer, primary_key = True)
    nombres = db.Column (db.String(200))
    apellidos = db.Column (db.String(200))
    email = db.Column(db.String(100))
    nuip = db.Column (db.Int(20))
    rol = db.Column (db.Bolean(50)) 
    
    
def __int__(self, nombres, apellidos, email, nuip, rol ):
        self.nombres = nombres
        self.apellidos = apellidos
        self.email = email
        self.nuip = nuip
        self.rol = rol