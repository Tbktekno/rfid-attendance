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
import mediapipe as mp

# Disable TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

mp_face_detection = mp.solutions.face_detection
_face_detector = None

def get_face_detector():
    global _face_detector
    if _face_detector is None:
        _face_detector = mp_face_detection.FaceDetection(min_detection_confidence=0.5)
    return _face_detector

def detect_and_crop_face(image_cv: np.ndarray):
    detector = get_face_detector()
    rgb = cv2.cvtColor(image_cv, cv2.COLOR_BGR2RGB)
    results = detector.process(rgb)

    if not results.detections:
        return None, None

    detection = results.detections[0]
    bbox = detection.location_data.relative_bounding_box
    h, w, _ = image_cv.shape

    x = int(bbox.xmin * w)
    y = int(bbox.ymin * h)
    bw = int(bbox.width * w)
    bh = int(bbox.height * h)

    img_with_box = image_cv.copy()
    cv2.rectangle(img_with_box, (x, y), (x + bw, y + bh), (0, 255, 0), 2)

    margin = 20
    x1 = max(0, x - margin)
    y1 = max(0, y - margin)
    x2 = min(w, x + bw + margin)
    y2 = min(h, y + bh + margin)
    cropped = image_cv[y1:y2, x1:x2]

    return img_with_box, cropped

def encode_cv_to_base64(image_cv: np.ndarray) -> str:
    _, buffer = cv2.imencode('.jpg', image_cv, [cv2.IMWRITE_JPEG_QUALITY, 85])
    return base64.b64encode(buffer).decode('utf-8')

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
    threshold: float = 0.40

class DetectRequest(BaseModel):
    imageBase64: str

def decode_image_to_cv(value: str) -> np.ndarray:
    if "," in value:
        value = value.split(",", 1)[1]

    image_bytes = base64.b64decode(value)
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/detect")
def detect_face(payload: DetectRequest):
    try:
        image_cv = decode_image_to_cv(payload.imageBase64)
        img_with_box, cropped = detect_and_crop_face(image_cv)

        if img_with_box is None:
            return {"hasFace": False, "displayImageBase64": None}

        display_b64 = encode_cv_to_base64(img_with_box)
        return {"hasFace": True, "displayImageBase64": display_b64}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/encode")
def encode_face(payload: EncodeRequest):
    try:
        image_cv = decode_image_to_cv(payload.imageBase64)

        img_with_box, cropped = detect_and_crop_face(image_cv)
        if img_with_box is None:
            raise HTTPException(status_code=400, detail="No face detected")

        results = DeepFace.represent(
            img_path=cropped,
            model_name="Facenet",
            detector_backend="mediapipe",
            enforce_detection=True,
            align=True
        )

        if not results:
            raise HTTPException(status_code=400, detail="No face detected")

        descriptor = results[0]["embedding"]
        display_b64 = encode_cv_to_base64(img_with_box)
        return {"descriptor": descriptor, "croppedImageBase64": display_b64}
    except Exception as e:
        logger_err = str(e)
        if "Face could not be detected" in logger_err:
            raise HTTPException(status_code=400, detail="No face detected")
        raise HTTPException(status_code=500, detail=logger_err)

@app.post("/verify")
def verify_face(payload: VerifyRequest):
    try:
        image_cv = decode_image_to_cv(payload.imageBase64)

        img_with_box, cropped = detect_and_crop_face(image_cv)
        if img_with_box is None:
            raise HTTPException(status_code=400, detail="No face detected")

        results = DeepFace.represent(
            img_path=cropped,
            model_name="Facenet",
            detector_backend="mediapipe",
            enforce_detection=True,
            align=True
        )

        if not results:
            raise HTTPException(status_code=400, detail="No face detected")

        descriptor = np.array(results[0]["embedding"])
        reference = np.array(payload.referenceDescriptor)

        if len(reference) != len(descriptor):
            return {
                "isMatch": False,
                "distance": 99.0,
                "confidence": 0.0,
                "croppedImageBase64": None,
                "error": "Incompatible descriptor length. Please re-register the employee."
            }

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
        confidence = max(0.0, 1.0 - (distance / max(payload.threshold * 2, 0.01)))

        display_b64 = encode_cv_to_base64(img_with_box)

        return {
            "isMatch": is_match,
            "distance": distance,
            "confidence": confidence,
            "croppedImageBase64": display_b64,
        }
    except Exception as e:
        logger_err = str(e)
        if "Face could not be detected" in logger_err:
            raise HTTPException(status_code=400, detail="No face detected")
        raise HTTPException(status_code=500, detail=logger_err)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
