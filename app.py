from flask import Flask, render_template, request
import pickle
import pandas as pd
import random


app = Flask(__name__)

# =====================================
# LOAD TRAINED MODEL
# =====================================
print("Model Loaded Successfully")
model = pickle.load(open("model.pkl","rb"))
encoder = pickle.load(open("label_encoder.pkl","rb"))

# =====================================
# AQI CATEGORY
# =====================================

def get_aqi_category(aqi):

    if aqi <= 50:
        return {
            "status": "Good",
            "color": "#30D158",
            "message": "Air quality is excellent."
        }

    elif aqi <= 100:
        return {
            "status": "Moderate",
            "color": "#FFD60A",
            "message": "Air quality is acceptable."
        }

    elif aqi <= 200:
        return {
            "status": "Poor",
            "color": "#FF9F0A",
            "message": "Wear an N95 mask outdoors."
        }

    elif aqi <= 300:
        return {
            "status": "Very Poor",
            "color": "#FF453A",
            "message": "Avoid prolonged outdoor exposure."
        }

    else:
        return {
            "status": "Severe",
            "color": "#BF5AF2",
            "message": "Stay indoors if possible."
        }

# =====================================
# HEALTH RECOMMENDATIONS
# =====================================

def health_recommendation(aqi):

    if aqi <= 50:
        return [
            "Perfect for outdoor activities",
            "Fresh air conditions",
            "No special precautions required",
            "Ideal for exercise"
        ]

    elif aqi <= 100:
        return [
            "Outdoor activity is generally safe",
            "Sensitive groups should monitor symptoms",
            "Stay hydrated",
            "Monitor local AQI updates"
        ]

    elif aqi <= 200:
        return [
            "Wear an N95 mask outdoors",
            "Reduce outdoor exercise",
            "Keep windows closed",
            "Use an air purifier"
        ]

    elif aqi <= 300:
        return [
            "Avoid outdoor workouts",
            "Wear respiratory protection",
            "Run air purifier continuously",
            "Limit outdoor exposure"
        ]

    else:
        return [
            "Stay indoors",
            "Avoid outdoor activities",
            "Use high-grade air filtration",
            "Protect children and elderly"
        ]

# =====================================
# HOME
# =====================================

@app.route("/")
def home():
    return render_template("index.html")

# =====================================
# PREDICT
# =====================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        temperature = float(request.form["temperature"])
        humidity = float(request.form["humidity"])
        pm25 = float(request.form["pm25"])
        pm10 = float(request.form["pm10"])
        no2 = float(request.form["no2"])
        so2 = float(request.form["so2"])
        co = float(request.form["co"])
        industrial = float(request.form["industrial"])
        population = float(request.form["population"])

        input_df = pd.DataFrame({

            "Temperature":[temperature],
            "Humidity":[humidity],
            "PM2.5":[pm25],
            "PM10":[pm10],
            "NO2":[no2],
            "SO2":[so2],
            "CO":[co],
            "Proximity_to_Industrial_Areas":[industrial],
            "Population_Density":[population]

        })

        prediction = model.predict(input_df)

        air_quality = encoder.inverse_transform(
            prediction
        )[0]

        pollutants = {

            "Temperature": temperature,
            "Humidity": humidity,
            "PM2.5": pm25,
            "PM10": pm10,
            "NO2": no2,
            "SO2": so2,
            "CO": co,
            "Industrial Area": industrial,
            "Population Density": population

        }

        return render_template(
            "result.html",
            air_quality=air_quality,
            pollutants=pollutants,
            rend_data=[20,40,60,80,100]
        )

    except Exception as e:
        return f"Prediction Error: {str(e)}"

# =====================================
# API DEMO
# =====================================

@app.route("/api/aqi")
def api_aqi():

    return {

        "city": "Delhi",

        "aqi": random.randint(40,200),

        "temperature": 31,

        "humidity": 65,

        "status": "Moderate"

    }

# =====================================
# MAIN
# =====================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )