#########################################################
# To train the sentiment model: python sentiment_training.py
#########################################################

import pandas as pd
from zipfile import ZipFile
import re
from pathlib import Path
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

#Download stopwords
nltk.download('stopwords')
nltk.download('wordnet')

stopwords_set = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()


def preprocess_text(text):
    """Clean a single string: regex → lower → split → lemmatize → drop stopwords → join."""
    doc = re.sub('[^a-zA-Z]', ' ', text)
    doc = doc.lower()
    doc = doc.split()
    doc = [lemmatizer.lemmatize(word) for word in doc if word not in stopwords_set]
    return ' '.join(doc)


def get_sentiment_negativity(text: str, vectorizer, model) -> float:
    """Return negativity score in [0, 1] for inference. Requires pre-loaded vectorizer and model."""
    cleaned = preprocess_text(text)
    X = vectorizer.transform([cleaned])
    proba = model.predict_proba(X)[0]
    return float(proba[0])


def _load_or_build_clean_data():
    """Load preprocessed data from cache if present; else read zip, preprocess, save cache, return."""
    DATA_DIR = Path(__file__).resolve().parent / "data"
    CACHE_FILE = DATA_DIR / "clean_sentiment_data.pkl"

    if CACHE_FILE.exists():
        data = joblib.load(CACHE_FILE)
        return data["clean_sendata"], data["y"]

    zip_path = "data/training.1600000.processed.noemoticon.csv.zip"
    with ZipFile(zip_path) as z:
        with z.open("training.1600000.processed.noemoticon.csv") as f:
            sen_data = pd.read_csv(
                f, encoding="latin-1",
                names=['target', 'id', 'date', 'flag', 'user', 'text'],
                usecols=['target', 'text']
            )
    clean_sendata = sen_data['text'].apply(preprocess_text).tolist()
    y = sen_data['target'].replace({0: 0, 4: 1}).tolist()

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump({"clean_sendata": clean_sendata, "y": y}, CACHE_FILE)
    return clean_sendata, y


if __name__ == "__main__":
    clean_sendata, y = _load_or_build_clean_data()
    y = pd.Series(y)

    # Train/test split (stratified, 80/20) for evaluation
    X_train_list, X_test_list, y_train, y_test = train_test_split(
        clean_sendata, y, test_size=0.2, random_state=42, stratify=y
    )

    # Preprocessing 2: TF-IDF - fit on train only, then transform train and test
    vectorizer = TfidfVectorizer(stop_words='english')
    X_train = vectorizer.fit_transform(X_train_list)
    X_test = vectorizer.transform(X_test_list)

    # Train classifier on training set
    model = LogisticRegression(max_iter=200, C=1.0, class_weight='balanced', solver='saga')
    model.fit(X_train, y_train)

    # Evaluate on held-out test set
    y_pred = model.predict(X_test)
    print("=== Evaluation (test set) ===")
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print("\nClassification report:")
    print(classification_report(y_test, y_pred, target_names=["negative", "positive"]))
    print("Confusion matrix:")
    print(confusion_matrix(y_test, y_pred))

    # Retrain on full data and save (production model uses all data)
    X = vectorizer.fit_transform(clean_sendata)
    model.fit(X, y)

    # Save model and vectorizer for inference (load both when predicting on new text)
    MODELS_DIR = Path(__file__).resolve().parent / "models"
    MODELS_DIR.mkdir(exist_ok=True)
    joblib.dump(vectorizer, MODELS_DIR / "vectorizer.joblib")
    joblib.dump(model, MODELS_DIR / "sentiment_model.joblib")