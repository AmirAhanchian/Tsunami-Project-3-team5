#######################################
# Import Dependencies 
#######################################

# brew services start mongodb-community@6.0
# mongoimport --type csv -d Tsunamidb -c Tsunami --headerline --drop Cleaned_Data_intensity.csv

from flask import Flask
from flask import jsonify
import json
import numpy as np
import pandas as pd
import warnings
from flask_cors import CORS
warnings.filterwarnings('ignore')

# Import dependencies
from pymongo import MongoClient
from pprint import pprint

# Create an instance of MongoClient
mongo = MongoClient(port=27017)

# assign the Tsunami database to a variable name
db = mongo['Tsunamidb']

# Flask Set-Up
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"Welcome to the Tsunami API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/Tsunami<br/>"
        f"/api/v1.0/Death_Only<br/>"
    )

# # App Calling
# # ----------------------------------------------------------------------------------------------------

@app.route("/api/v1.0/Tsunami")
def intensity():
    # Query Intensity Dataset 
    dataset_intensity = list(db.Tsunami.find({}, {'_id': False}))    
    return jsonify(dataset_intensity)

@app.route("/api/v1.0/Death_Only")
def death_only():
    dataset_total_death = list(db.Tsunami.find({"Total Deaths": {'$gt': 0}}, {'_id': 0}))
    return jsonify(dataset_total_death)

# # Debug ON
if __name__ == '__main__':
    app.run(debug=True)