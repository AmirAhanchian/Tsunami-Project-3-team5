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
warnings.filterwarnings('ignore')

# Import dependencies
from pymongo import MongoClient
from pprint import pprint

# Create an instance of MongoClient
mongo = MongoClient(port=27017)

# assign the Tsunami database to a variable name
db = mongo['Tsunamidb']

# Query Death_Only Dataset 

query_death = {"Total Deaths": {'$gte': 0}}
dataset_total_death = list(db.Tsunami.find(query_death))
print(dataset_total_death[0])

# Flask Set-Up
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"Welcome to the Tsunami API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/Tsunami<br/>"
    )

# # App Calling
# # ----------------------------------------------------------------------------------------------------

@app.route("/api/v1.0/Tsunami")
def intensity():
    # Query Intensity Dataset 
    query = {"Year": {'$gte': 1921}}
    dataset_intensity = list(db.Tsunami.find(query))    
    return jsonify(dataset_intensity)

# # Debug ON
if __name__ == '__main__':
    app.run(debug=True)