from flask import Flask
from flask_cors import  CORS
from extensions import oauth,bcrypt,jwt, migrate,db


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/biometricssa'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False   


    db.init_app(app)

    with app.app_context():
        db.create_all()
        print("Tablas creadas")
    oauth.init_app(app)
    bcrypt.init_app(app)   
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    from Routes.usuarios import Usuarios
    from Routes.peces import Peces
    from Routes.biometria import Biometria
    from Routes.estanque import Estanque
    from Routes.alimentos import Alimentos
    from Routes.alimentaciones import Alimentacion
    from Routes.wq import Wq

    app.register_blueprint(Alimentacion)
    app.register_blueprint(Wq)
    app.register_blueprint(Alimentos)
    app.register_blueprint(Estanque)
    app.register_blueprint(Usuarios)
    app.register_blueprint(Peces)
    app.register_blueprint(Biometria)

    CORS(app, origins=['http://localhost:5173'])


    app.config["JWT_SECRET_KEY"] = "asdfasuhfige4123y79hdasbndc7812gebjaksd82f3rgwfsgeedagyuf"
    app.secret_key = 'asiofjnwohrNuH)"#BI()#ROBNER/)BAJKSBD)/Q"Bbnfba'
        


    return app





if __name__ == '__main__':
    app = create_app()

    app.run(debug=True, host='0.0.0.0')