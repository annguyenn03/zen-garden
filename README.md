# Zen Garden

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

The backend will run at http://localhost:8000

## Frontend Setup

1. Open a new terminal and navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

The frontend will run at http://localhost:3000
