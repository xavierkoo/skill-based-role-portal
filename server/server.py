from flask import Flask, jsonify
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return "Hello World!"
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5101, debug=True)