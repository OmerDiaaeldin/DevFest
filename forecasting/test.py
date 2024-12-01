from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import 
app = Flask(__name__)

# Load the model using joblib
model = joblib.load('lgb.pkl')
# prediction = model.predict(X=features)
df = pd.DataFrame({'Months': [1], 'Years': [2]})
print(model.predict(df))