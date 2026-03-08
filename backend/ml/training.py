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
    """Clean a single string: regex → lower → split → lemmatize → drop stopwords → join.
    Use this for both training and inference (e.g. journal entries) so preprocessing stays consistent."""
    doc = re.sub('[^a-zA-Z]', ' ', text)
    doc = doc.lower()
    doc = doc.split()
    doc = [lemmatizer.lemmatize(word) for word in doc if word not in stopwords_set]
    return ' '.join(doc)


# Read the dataset from the zip file and extract random 20,000 rows
# Take only input: target (level of sentiment) and text
zip_path = "data/training.1600000.processed.noemoticon.csv.zip"
with ZipFile(zip_path) as z:
    with z.open("training.1600000.processed.noemoticon.csv") as f:
        sen_data = pd.read_csv(f, encoding="latin-1", names=['target', 'id', 'date', 'flag', 'user', 'text'], usecols=['target', 'text'])


# Preprocessing 1: Apply same cleaning used at inference (regex → lower → lemmatize → drop stopwords)
clean_sendata = sen_data['text'].apply(preprocess_text).tolist()

# Define Label y for the training set
y = sen_data['target'].replace({0: 0, 4: 1})

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