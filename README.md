# 🌱 zen garden

**AI-Powered Brain Wellness app**

zen garden is a gentle AI companion for brain wellness. Reflecting on journal entries, sleep patterns, and daily workload, it helps reveal early signs of burnout.

Instead of overwhelming numbers, your mental well-being is visualized as a growing **Mind Garden**, helping students pause, reflect, and care for their minds before stress takes root.

zen garden — Home

---

# 🧠 The Problem

Student burnout is often invisible until it becomes overwhelming.

Early signals exist but are easy to miss:

- Negative patterns in journaling
- Poor sleep habits
- Long work sessions
- Increasing stress trends

By the time burnout is obvious, recovery becomes much harder.

The Problem

---

# 💡 Our Solution

zen garden analyzes everyday signals to detect **early burnout risk**.

We combine:

- **Journal sentiment analysis**
- **Sleep patterns**
- **Workload signals**

to generate a **real-time burnout probability** and provide gentle wellness guidance.

Instead of presenting complex data, zen garden transforms mental health insights into an intuitive visual experience.

---

# 🌿 The Mind Garden

Mental wellbeing grows like a garden.

Healthy habits help your garden bloom, while stress can cause it to wilt.


| Signal            | Garden Element  |
| ----------------- | --------------- |
| Healthy sleep     | 🌸 Flower       |
| Balanced workload | 🌿 Plant        |
| Moderate stress   | 🌱 Small sprout |
| Burnout signals   | 🍂 Wilted leaf  |


Example visualization:

```
🌸 🌿 🌿 🍂
```

This turns abstract mental health signals into a **living story of your wellbeing**.

---

# ⚙️ How It Works

How it works

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

# 📊 Example Output

### Burnout Risk

**78% — High Risk**

### Signals Detected

- Negative sentiment in journal entries
- Sleep below 6 hours
- Long coding sessions

### Wellness Suggestion

> Take a 20 minute walk outside and allow your mind to reset.

### Mind Garden

```
🌿 🍂 🍂 🍂
```

Your garden is under stress today. Rest and reflection can help it grow again.

zen garden — Example

zen garden — Mind Garden

zen garden — Insights

zen garden — Wellness

zen garden — Garden View

zen garden — Dashboard

---

# ❤️ Impact

zen garden helps students:

- Recognize stress patterns early
- Reflect on their mental wellbeing
- Take proactive steps toward balance

By combining **AI, health insights, and artistic visualization**, we make brain wellness more approachable and meaningful.

---

# 🛠 Tech Stack (Overview)

**Frontend**

- Next.js
- TailwindCSS

**Backend**

- FastAPI
- Python

**Machine Learning**

- VADER Sentiment Analysis
- Logistic Regression

**Database**

- MongoDB Atlas

**Datasets**

- Sentiment140 dataset
- Tweet Sentiment & Emotion datasets

---

# 🚀 Future Ideas

- Personalized wellness insights over time
- Garden growth animations
- Mood-based visual environments
- Guided mindfulness reflections

---

# 🌸 Closing

zen garden helps students care for their minds in a more gentle and intuitive way.

**Healthy minds grow slowly — just like gardens.**

---

# 👥 Team

*Add your team here.*

---

# Zen Garden — Project Summary

Zen Garden is a simple AI-powered wellness tool that analyzes journal entries and predicts stress levels using sentiment analysis and basic behavioral indicators (sleep and work hours). The goal of the project is to help users recognize early signs of burnout by tracking mood trends and stress patterns over time.

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