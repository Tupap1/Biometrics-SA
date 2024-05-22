from flask import Flask, request, jsonify
#from models import db, user

app = Flask(__name__)


@app.route('/')
def holamundo():
    return("hola mundo")


@app.route('/Login')
def method_name():
    return(
        "Bienvenido a Biometrics SA"
    ) 
        
        
if __name__ == "__main__":        
    app.run(debug=True)