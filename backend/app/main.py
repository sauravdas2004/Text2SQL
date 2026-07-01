from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from sqlalchemy import text
from app.api.query import router as query_router
from app.api.text2sql import router as ai_router

from app.database import engine

app = FastAPI(
    title="Text2SQL API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(query_router, prefix="/api")
app.include_router(ai_router, prefix="/api")


@app.get("/")
def home():
    return {
        "message": "College Text2SQL API 🚀"
    }


@app.get("/health")
def health():

    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "status": "Database Connected ✅"
    }