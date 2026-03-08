# 🌱 zen garden

**AI-Powered Brain Wellness app**

zen garden is a gentle AI application for brain wellness. Reflecting on journal entries, sleep patterns, and daily workload, it helps reveal early signs of burnout.

Instead of overwhelming numbers, your mental well-being is visualized as a growing **mind garden**, helping students pause, reflect, and care for their minds before stress takes root.

---

# 🧠 The Problem

Student burnout is often invisible until it becomes overwhelming.

Early signals exist but are easy to miss:

- Negative patterns in journaling
- Poor sleep habits
- Long work sessions
- Increasing stress trends

By the time burnout is obvious, recovery becomes much harder.

---

# 💡 Our Solution

zen garden analyzes everyday signals to detect **early burnout risk**.

We combine:

- **Journal sentiment analysis**
- **Sleep patterns**
- **Workload signals**

to generate a **real-time burnout probability** and provide gentle wellness guidance. instead of presenting complex data, zen garden transforms mental health insights into a visual experience.

---

# 🌿 The Mind Garden

Mental wellbeing grows like a garden. Healthy habits help your garden bloom, while stress can cause it to wilt.

| Signal            | Garden Element  |
| ----------------- | --------------- |
| Healthy sleep     | 🌸 Flower       |
| Balanced workload | 🌿 Plant        |
| Moderate stress   | 🌱 Small sprout |
| Burnout signals   | 🍂 Wilted leaf  |

This turns abstract mental health signals into a **living story of your wellbeing**.

---

# How It Works

```
User Input
↓
Journal entry
Sleep hours
Work hours

↓

AI Analysis
Sentiment analysis
Burnout risk prediction

↓

Output
Burnout score
Mind Garden visualization
Wellness suggestions
```

---

# Tech Stack

**Frontend**
- Next.js
- TailwindCSS

**Backend**
- FastAPI
- Python

**Machine Learning**
- VADER Sentiment Analysis
- Logistic Regression

**Datasets**
- Sentiment140 dataset
- Tweet Sentiment & Emotion datasets

---
# 👥 Team
Jennifer Huang
An Nguyen

# Tech Stack

- Frontend: Next.js, Tailwind CSS
- Backen: FastAPI
- Machine Learning: scikit-learn, pandas
- Dataset: [Sentiment140 Twitter Dataset](https://www.kaggle.com/datasets/kazanova/sentiment140), [Synthetic HR Burnout Dataset](https://www.kaggle.com/datasets/ankam6010/synthetic-hr-burnout-dataset)

# How to Run

## Prepare Dataset

Go to the 2 dataset link listed above and put both of them in folder `backend/ml/data`

## Clone the Repository

`git remote add origin https://github.com/annguyenn03/zen-mode.git`

## Backend Setup

1. Navigate to the backend directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment:
  - Mac / Linux
   `source venv/bin/activate`
  - Windows
  `venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the API server: `uvicorn main:app --reload`

The backend will run at [http://localhost:8000](http://localhost:8000)

## Frontend Setup

1. Open a new terminal and navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

The frontend will run at [http://localhost:3000](http://localhost:3000)
