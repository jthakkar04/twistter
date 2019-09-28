from flask import Flask, json, request, render_template, redirect
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/login')
def login():
    return render_template("index.html")


if __name__ == "__main__":
    app.run()