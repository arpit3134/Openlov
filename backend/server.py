"""
Minimal backend server for Signal Editorial Platform
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Signal API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "signal-api"}

@app.get("/api/")
async def root():
    return {"message": "Signal API is running"}
