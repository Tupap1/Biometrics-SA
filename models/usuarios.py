from extensions import db

class Usuario(db.Model):
    __tablename__ = 'usuario'
    
    iduser = db.Column(db.INT, primary_key = True)
    nombres = db.Column (db.String(200))
    apellidos = db.Column (db.String(200))
    email = db.Column(db.String(100))
    nuip = db.Column (db.INT)
    rol = db.Column (db.INT) 
    contrasena = db.Column (db.VARCHAR(30))
    
    
def __int__(self, nombres, apellidos, email, nuip, rol, contrasena ):
        self.nombres = nombres
        self.apellidos = apellidos
        self.email = email
        self.nuip = nuip
        self.rol = rol
        self.contrasena = contrasena
        
        
def __repr__(self):
    return f'nombre usuario{self.nombres}, apellido usuario{self.apellidos}'