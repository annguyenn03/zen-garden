from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import joblib

from ml.sentiment_training import preprocess_text

app = FastAPI()

# Enable CORS
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load sentiment model and vectorizer (from backend/ml/models)
SEN_MODELS_DIR = Path(__file__).resolve().parent / "ml" / "models"
vectorizer = joblib.load(SEN_MODELS_DIR / "vectorizer.joblib")
sen_model = joblib.load(SEN_MODELS_DIR / "sentiment_model.joblib")


######## Request models ########
class AnalyzeRequest(BaseModel):
    text: str
    sleep_hours: float
    work_hours_per_day: float


######### Helpers ########
def predict_sentiment(text: str):
    """Predict sentiment for one string. Returns (class, negativity_score in [0, 1])."""
    cleaned = preprocess_text(text)
    X = vectorizer.transform([cleaned])
    pred = sen_model.predict(X)[0]          # 0 = negative, 1 = positive
    proba = sen_model.predict_proba(X)[0]  # [prob_neg, prob_pos]
    return pred, float(proba[0])            # negativity score


def sleep_penalty(sleep_hours: float) -> float:
    if sleep_hours >= 7:
        return 0.0
    if sleep_hours >= 6:
        return 0.05
    if sleep_hours >= 5:
        return 0.10
    return 0.20


def burnout_level_from_risk(risk: float) -> str:
    if risk < 0.25:
        return "Low"
    if risk < 0.5:
        return "Moderate"
    if risk < 0.75:
        return "High"
    return "Severe"


######## Endpoints ########
@app.get("/")
def root():
    return {"message": "ZenMode FastAPI running"}


@app.post("/analyze")
def analyze(entry: AnalyzeRequest):
    # 1) Sentment Negativity Prediction Probability
    _, sentiment_negativity = predict_sentiment(entry.text)

    # 2) Bunrout Prediction Probability
    penalty = sleep_penalty(entry.sleep_hours)
    work_factor = min(entry.work_hours_per_day / 12.0, 1.0)  # 12h/day ~= max load

    # Weighted combination (tweak weights as you like)
    final_risk = 0.5 * sentiment_negativity + 0.2 * penalty + 0.3 * work_factor
    final_risk = max(0.0, min(final_risk, 1.0))

    level = burnout_level_from_risk(final_risk)
    burnout_probability = round(final_risk * 100)

    return {
        "sentiment_negativity": round(sentiment_negativity, 4),
        "final_risk": round(final_risk, 4),
        "burnout_level": level,
        "burnout_probability": burnout_probability,
        "zen_suggestions": (
            "Take a short break, hydrate, and consider a brief walk or some deep breathing. "
            "Small resets during the day can lower stress over time."
        ),
    }