from flask import Flask, json, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run()