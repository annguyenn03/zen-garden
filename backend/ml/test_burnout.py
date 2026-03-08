from burnout_training import load_burnout_artifacts, predict_burnout_score

# Load the model and scaler to normalize
scaler, model = load_burnout_artifacts()

# Predict the burnout score (parameter: workhours, stress level, satisfaction level)
burnout_score = predict_burnout_score(80, 5, scaler, model)
print(burnout_score)


### FINAL FORMULA: 
# final_risk = w1 * burnout_score + w2 * sleep_penalty + w3 * sentiment_negativity

sleep_hours = 6 # Sleep hours from user input
sentiment_score = 0.65 #Score predict from sentiment model

# Add sleep hours as a penalty
if sleep_hours >= 7:
    sleep_penalty = 0
elif sleep_hours >=6:
    sleep_penalty = 0.05
elif sleep_hours >=5:
    sleep_penalty = 0.10
else:
    sleep_penalty = 0.20


final_risk = 0.5 * burnout_score + 0.2 * sleep_penalty + 0.3 * sentiment_score
final_risk = max (0, min(final_risk, 1))
print(final_risk)
