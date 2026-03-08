#########################################################
# To run the test file: python test_sentiment.py
#########################################################

from pathlib import Path
import joblib
from sentiment_training import preprocess_text

# Load artifacts (same paths as in training.py)
MODELS_DIR = Path(__file__).resolve().parent / "models"
vectorizer = joblib.load(MODELS_DIR / "vectorizer.joblib")
model = joblib.load(MODELS_DIR / "sentiment_model.joblib")


def predict_sentiment(text: str):
    """Predict sentiment for one string. Returns class (0/1) and score in [0, 1]."""
    cleaned = preprocess_text(text)
    X = vectorizer.transform([cleaned])
    pred = model.predict(X)[0]           # 0 = negative, 1 = positive
    proba = model.predict_proba(X)[0]   # [prob_neg, prob_pos]
    return pred, proba[0]               # proba[0] = negative score



if __name__ == "__main__":
    examples = [
        "I feel great today!",
        "This is so frustrating and exhausting.",
        "Nothing special happened.",
    ]
    for s in examples:
        pred, score = predict_sentiment(s)
        if pred == 1:
            label = "positive"
        else:
            label = "negative"
        print(f"{s!r}")
        print(f"  -> {label} (score: {score:.3f})\n")