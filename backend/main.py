from pathlib import Path
import sys
import joblib
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Ensure backend dir is on path when running as main
_BACKEND_DIR = Path(__file__).resolve().parent
if str(_BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(_BACKEND_DIR))

from ml.sentiment_training import get_sentiment_negativity
from ml.burnout_training import load_burnout_artifacts, predict_burnout_score

ML_DIR = Path(__file__).resolve().parent / "ml"
MODELS_DIR = ML_DIR / "models"

_sentiment_vectorizer = None
_sentiment_model = None
_burnout_scaler = None
_burnout_model = None


def _load_ml_artifacts():
    global _sentiment_vectorizer, _sentiment_model, _burnout_scaler, _burnout_model
    if _sentiment_vectorizer is None:
        _sentiment_vectorizer = joblib.load(MODELS_DIR / "vectorizer.joblib")
        _sentiment_model = joblib.load(MODELS_DIR / "sentiment_model.joblib")
    if _burnout_scaler is None:
        _burnout_scaler, _burnout_model = load_burnout_artifacts()


@asynccontextmanager
async def lifespan(app: FastAPI):
    _load_ml_artifacts()
    yield


app = FastAPI(lifespan=lifespan)

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    text: str
    sleep_hours: float
    work_hours_per_day: float


def _sleep_penalty(sleep_hours: float) -> float:
    if sleep_hours >= 7:
        return 0.0
    if sleep_hours >= 6:
        return 0.05
    if sleep_hours >= 5:
        return 0.10
    return 0.20


@app.get("/")
def root():
    return {"message": "ZenMode FastAPI running"}


@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    _load_ml_artifacts()
    sentiment_negativity = get_sentiment_negativity(req.text, _sentiment_vectorizer, _sentiment_model)
    stress_level = 1 + 9 * sentiment_negativity
    burnout_score = predict_burnout_score(
        req.work_hours_per_day, stress_level, _burnout_scaler, _burnout_model
    )
    penalty = _sleep_penalty(req.sleep_hours)
    final_risk = 0.5 * burnout_score + 0.2 * penalty + 0.3 * sentiment_negativity
    final_risk = max(0.0, min(final_risk, 1.0))
    return {
        "sentiment_negativity": round(sentiment_negativity, 4),
        "burnout_score": round(burnout_score, 4),
        "final_risk": round(final_risk, 4),
    }
