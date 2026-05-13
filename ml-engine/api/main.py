from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import time
import sys
import os

# Add parent directory to path to allow absolute imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.inference import ml_pipeline

app = FastAPI(title="Sentinel NIDS ML Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PacketFeatureVector(BaseModel):
    sourceIp: str
    destIp: str
    sourcePort: int
    destPort: int
    protocol: str
    size: int
    flags: str = None
    ttl: int = None
    # Assuming extended features from extractor will be added here
    features: Dict[str, float] = {}

class PredictionResponse(BaseModel):
    adversityScore: int
    classification: str
    confidence: float
    shapValues: Dict[str, float]

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "timestamp": time.time()}

@app.post("/api/v1/predict", response_model=PredictionResponse)
def predict_packet(packet: PacketFeatureVector):
    # This is where we route the packet data to the inferred ML model.
    import pandas as pd
    
    # Convert incoming dict into a simple pandas DataFrame row
    packet_df = pd.DataFrame([packet.dict()])
    
    # Pass to inference pipeline
    result = ml_pipeline.predict(packet_df)
    
    return result