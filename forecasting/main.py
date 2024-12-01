from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load the model using joblib
model = joblib.load('lgb.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.get_json()
    print("TOP LEVEL DATA:", data)

    # Check if 'features' is part of the request and contains the expected values
    features_obj = data.get('features')
    
    if features_obj is None:
        return jsonify({"error": "Features not provided"}), 400

    print("Features object:", features_obj)

    # Ensure the features are in the correct format (e.g., array or list of values)
    features =   pd.DataFrame({'Months': [features_obj['Months']], 'Years': [features_obj['Years']]})

    if features is None or features.shape[0] == 0:
        print("Invalid features passed:", features)
    else:
        print("Features:", features)
    
    # prediction = model.predict(X=features)
    prediction = model.predict(features)
    
    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # You can change the port if needed
