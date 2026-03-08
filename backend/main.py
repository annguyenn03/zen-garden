from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import os
import joblib

from dotenv import load_dotenv
load_dotenv()

from ml.sentiment_training import preprocess_text
from google import genai

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

######## Connect with Gemini API for Zen Suggestion ########
api_key = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

######## Endpoints ########
@app.get("/")
def root():
    return {"message": "ZenMode FastAPI running"}


@app.post("/analyze")
def analyze(entry: AnalyzeRequest):
    # 1) Sentiment negativity
    _, sentiment_negativity = predict_sentiment(entry.text)

    # 2) Burnout prediction
    penalty = sleep_penalty(entry.sleep_hours)
    work_factor = min(entry.work_hours_per_day / 12.0, 1.0)

    final_risk = 0.5 * sentiment_negativity + 0.2 * penalty + 0.3 * work_factor
    final_risk = max(0.0, min(final_risk, 1.0))

    level = burnout_level_from_risk(final_risk)
    burnout_probability = round(final_risk * 100)

    # Zen suggestion: Gemini or default
    default_suggestion = (
        "Connecting error. Please try again"
    )
    
    response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=f"""
You are a calm, supportive wellness assistant that gives short Zen-style suggestions to help people relax and reduce burnout.

User Data:
- Burnout Probability: {burnout_probability}%
- Sleep Hours (last night): {entry.sleep_hours}
- Work Hours Per Day: {entry.work_hours_per_day}
- Journal Entry: "{entry.text[:500]}"

Instructions:
1. Analyze the emotional tone of the journal entry and the burnout metrics.
2. Consider sleep and work hours as contributing stress factors.
3. Tailor your advice to the burnout level (Low/Moderate/High/Severe).
4. Write in a calm, compassionate Zen tone. Keep the response concise (3-5 sentences).
5. Provide practical suggestions someone can do today. Do not mention burnout numbers. Avoid sounding clinical.

Output: Return only the relaxation suggestion text.
""",
            )
    
    return {
        "sentiment_negativity": round(sentiment_negativity, 4),
        "final_risk": round(final_risk, 4),
        "burnout_level": level,
        "burnout_probability": burnout_probability,
        "zen_suggestions": response.text,
    }
