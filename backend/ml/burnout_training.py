########################################################################
# To train the burnout prediction model: python burnout_training.py
########################################################################

import pandas as pd
from pathlib import Path
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

DATA_DIR = Path(__file__).resolve().parent / "data"
MODELS_DIR = Path(__file__).resolve().parent / "models"

X_COLS = ["WorkHoursPerWeek", "StressLevel"]
Y_COL = "Burnout"
CSV_PATH = DATA_DIR / "synthetic_employee_burnout.csv"
CACHE_PATH = DATA_DIR / "clean_burnout_data.pkl"


def _load_or_build_clean_data():
    """Load X, y from cache if present; else read CSV, build X/y, save cache, return."""
    if CACHE_PATH.exists():
        data = joblib.load(CACHE_PATH)
        return data["X"], data["y"]

    df = pd.read_csv(CSV_PATH)
    X = df[X_COLS].astype(float).values
    y = df[Y_COL].values

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump({"X": X, "y": y}, CACHE_PATH)
    return X, y


def load_burnout_artifacts():
    """Load saved scaler and model for inference. Returns (scaler, model)."""
    scaler = joblib.load(MODELS_DIR / "burnout_scaler.joblib")
    model = joblib.load(MODELS_DIR / "burnout_model.joblib")
    return scaler, model


# Typical working days per week (for converting user input "hours per day" -> "hours per week")
WORK_DAYS_PER_WEEK = 5


def predict_burnout_score(work_hours_per_day, stress_level, scaler=None, model=None):
    """Predict burnout probability. Returns float in [0, 1].
    work_hours_per_day: user input, hours worked per (work) day.
    stress_level: in same scale as training (e.g. 0-10 or 0-1).
    Pass scaler, model from load_burnout_artifacts() or None to load on demand."""
    if scaler is None or model is None:
        scaler, model = load_burnout_artifacts()
    work_hours_per_week = work_hours_per_day * WORK_DAYS_PER_WEEK
    row = np.array([[work_hours_per_week, stress_level]], dtype=float)
    row_scaled = scaler.transform(row)
    return float(model.predict_proba(row_scaled)[0][1])


if __name__ == "__main__":
    X, y = _load_or_build_clean_data()

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Normalize the values to be on the same scale
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Train the model
    model = LogisticRegression(max_iter=500, class_weight="balanced", random_state=42)
    model.fit(X_train_scaled, y_train)

    # Predict the result
    y_pred = model.predict(X_test_scaled)
    print("=== Burnout model evaluation (test set) ===")
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print("\nClassification report:")
    print(classification_report(y_test, y_pred, target_names=["no_burnout", "burnout"]))
    print("Confusion matrix:")
    print(confusion_matrix(y_test, y_pred))

    X_scaled = scaler.fit_transform(X)
    model.fit(X_scaled, y)

    MODELS_DIR.mkdir(exist_ok=True)
    joblib.dump(scaler, MODELS_DIR / "burnout_scaler.joblib")
    joblib.dump(model, MODELS_DIR / "burnout_model.joblib")
    print("\nSaved burnout_scaler.joblib and burnout_model.joblib to", MODELS_DIR)