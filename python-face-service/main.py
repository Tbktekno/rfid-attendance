import base64
import io
import os
from typing import List

import cv2
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from PIL import Image
from deepface import DeepFace

# Disable TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

app = FastAPI(title="Face Recognition Service (DeepFace + Facenet128)")

@app.on_event("startup")
async def startup_event():
    try:
        print("---")
        print("INITIALIZING FACE RECOGNITION SERVICE")
        print("Model: Facenet128")
        print("This may take a minute on first run (downloading weights)...")
        DeepFace.build_model("Facenet")
        print("SERVICE READY: Model loaded successfully.")
        print("---")
    except Exception as e:
        print(f"FATAL ERROR DURING STARTUP: {e}")

class EncodeRequest(BaseModel):
    imageBase64: str

class VerifyRequest(BaseModel):
    imageBase64: str
    referenceDescriptor: List[float]
    threshold: float = 0.40 # Default threshold for Facenet128 Cosine distance

def decode_image_to_cv(value: str) -> np.ndarray:
    if "," in value:
        value = value.split(",", 1)[1]
    
    image_bytes = base64.b64decode(value)
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/encode")
def encode_face(payload: EncodeRequest):
    try:
        image_cv = decode_image_to_cv(payload.imageBase64)
        
        # DeepFace represent returns a list of detections
        # We use 'mediapipe' as detector backend as requested
        results = DeepFace.represent(
            img_path=image_cv,
            model_name="Facenet",
            detector_backend="mediapipe",
            enforce_detection=True,
            align=True
        )
        
        if not results:
            raise HTTPException(status_code=400, detail="No face detected")
            
        # Get embedding from the first detected face
        descriptor = results[0]["embedding"]
        return {"descriptor": descriptor}
    except Exception as e:
        logger_err = str(e)
        if "Face could not be detected" in logger_err:
            raise HTTPException(status_code=400, detail="No face detected")
        raise HTTPException(status_code=500, detail=logger_err)

@app.post("/verify")
def verify_face(payload: VerifyRequest):
    try:
        image_cv = decode_image_to_cv(payload.imageBase64)
        
        # Get embedding for the current face
        results = DeepFace.represent(
            img_path=image_cv,
            model_name="Facenet",
            detector_backend="mediapipe",
            enforce_detection=True,
            align=True
        )
        
        if not results:
            raise HTTPException(status_code=400, detail="No face detected")
            
        descriptor = np.array(results[0]["embedding"])
        reference = np.array(payload.referenceDescriptor)
        
        # Check if reference descriptor length matches Facenet128 (128)
        # If not, it might be an old landmark-based descriptor (1404) or a different model
        if len(reference) != len(descriptor):
            return {
                "isMatch": False,
                "distance": 99.0,
                "confidence": 0.0,
                "error": "Incompatible descriptor length. Please re-register the employee."
            }

        # Compare using Cosine distance (1 - similarity)
        a = np.array(descriptor)
        b = np.array(reference)
        norm_a = np.linalg.norm(a)
        norm_b = np.linalg.norm(b)
        
        if norm_a == 0 or norm_b == 0:
            distance = 1.0
        else:
            similarity = np.dot(a, b) / (norm_a * norm_b)
            distance = float(1.0 - similarity)

        is_match = distance <= payload.threshold
        
        # Confidence calculation for Cosine distance
        # 0.0 distance = 1.0 confidence. distance >= threshold*2 = 0.0 confidence.
        confidence = max(0.0, 1.0 - (distance / max(payload.threshold * 2, 0.01)))
        
        return {
            "isMatch": is_match,
            "distance": distance,
            "confidence": confidence,
        }
    except Exception as e:
        logger_err = str(e)
        if "Face could not be detected" in logger_err:
            raise HTTPException(status_code=400, detail="No face detected")
        raise HTTPException(status_code=500, detail=logger_err)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
