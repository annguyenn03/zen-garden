from burnout_training import load_burnout_artifacts, predict_burnout_score

sleep_hours = 6 # Sleep hours from USER INPUT
sentiment_negativity = 0.65 # Got from sentiment model

# Calculate the stress_level
stress_level = 1 + 9 * sentiment_negativity


# Load the model and scaler to normalize
scaler, model = load_burnout_artifacts()

# Predict the burnout score (parameter: workhours, stress level, satisfaction level)
burnout_score = predict_burnout_score(8, stress_level, scaler, model)
print(burnout_score)


### FINAL FORMULA: final_risk = w1 * burnout_score + w2 * sleep_penalty + w3 * sentiment_negativity

# Add sleep hours as a penalty
if sleep_hours >= 7:
    sleep_penalty = 0
elif sleep_hours >=6:
    sleep_penalty = 0.05
elif sleep_hours >=5:
    sleep_penalty = 0.10
else:
    sleep_penalty = 0.20


final_risk = 0.5 * burnout_score + 0.2 * sleep_penalty + 0.3 * sentiment_negativity
final_risk = max (0, min(final_risk, 1))
print(final_risk)
