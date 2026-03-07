from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

# Define data model
class JournalEntry(BaseModel):
    text: str

# Root endpoint
@app.get("/")
def root():
    return {"message": "ZenMode FastAPI running"}

# Analyze endpoint
@app.post("/analyze")
def analyze(entry: JournalEntry):
    return {
        "stress_level": "high",
        "score": 0.82
    }