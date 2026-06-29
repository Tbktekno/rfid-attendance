# Dokumentasi Face Recognition

## 5.1 Gambaran Umum

Service Face Recognition adalah microservice **Python FastAPI** yang menyediakan kemampuan enkoding dan verifikasi wajah. Menggunakan **DeepFace** (framework pengenalan wajah deep learning) dengan model **Facenet128** dan **MediaPipe** untuk deteksi wajah.

**Peran dalam Sistem:** Service face recognition adalah microservice ketiga dalam arsitektur, bersama Express Gateway dan gRPC Service Layer. Dipanggil oleh backend Node.js untuk:
1. Enkoding gambar wajah menjadi vektor 128-dimensi (saat registrasi karyawan)
2. Memverifikasi apakah wajah yang diambil cocok dengan karyawan terdaftar (saat absensi)

## 5.2 Tumpukan Teknologi

| Komponen | Teknologi | Versi |
|----------|-----------|-------|
| Web Framework | FastAPI | 0.115.12 |
| ASGI Server | Uvicorn | 0.34.2 |
| Deteksi Wajah | MediaPipe | 0.10.20 |
| Embedding Wajah | Facenet128 (via DeepFace) | latest |
| Pengolahan Citra | OpenCV (headless) | latest |
| Loading Gambar | Pillow | 11.2.1 |
| Komputasi Numerik | NumPy | <2.0.0 |
| Deep Learning | TensorFlow | latest |
| Keras | tf-keras | latest |

## 5.3 Arsitektur

```
┌─────────────────────────────────────────────────────────┐
│               Python Face Service                        │
│               FastAPI port 8000                          │
│                                                          │
│  ┌────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  /encode   │  │   /verify    │  │   /health      │  │
│  │  Endpoint  │  │   Endpoint   │  │   Endpoint     │  │
│  └─────┬──────┘  └──────┬───────┘  └────────────────┘  │
│        │                │                                │
│        ▼                ▼                                │
│  ┌──────────────────────────────────────────────────┐   │
│  │           Pipeline DeepFace                       │   │
│  │                                                    │   │
│  │  1. Decode Base64 → OpenCV Image (BGR)            │   │
│  2. Deteksi Wajah (MediaPipe)                        │   │
│  3. Alignment + Normalisasi Wajah                    │   │
│  4. Ekstraksi Embedding (Facenet128)                 │   │
│  5. Cosine Distance (verify only)                    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │           Cache Model (~/.deepface/weights/)      │   │
│  │           Facenet128 weights (~90MB)              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 5.4 File: `python-face-service/main.py`

**Lokasi:** `I:\rfid_v3\python-face-service\main.py`
**Jumlah Baris:** 139

**Tujuan:** Aplikasi FastAPI utama dengan endpoint enkoding dan verifikasi wajah.

### Import

```python
import base64              # Decoding Base64
import io                  # BytesIO untuk penanganan gambar
import os                  # Konfigurasi environment
from typing import List    # Type hints
import cv2                 # OpenCV (pengolahan citra)
import numpy as np         # Operasi numerik
from fastapi import FastAPI, HTTPException  # Web framework
from pydantic import BaseModel              # Validasi request
from PIL import Image      # Loading gambar
from deepface import DeepFace  # Framework pengenalan wajah
```

### Model Pydantic

**`EncodeRequest`:**
```python
class EncodeRequest(BaseModel):
    imageBase64: str  # Gambar yang dienkode Base64 (JPEG/PNG)
```

**`VerifyRequest`:**
```python
class VerifyRequest(BaseModel):
    imageBase64: str           # Gambar wajah yang dienkode Base64
    referenceDescriptor: List[float]  # Embedding 128-d dari karyawan terdaftar
    threshold: float = 0.40    # Ambang jarak Cosine (di-override oleh backend)
```

### Event Startup

```python
@app.on_event("startup")
async def startup_event():
    DeepFace.build_model("Facenet")  # Download weights pada first run (~90MB)
```

**Tujuan:** Pre-load model Facenet ke memory saat startup untuk menghindari cold-start latency. Pada first run, mendownload model weights ke `~/.deepface/weights/`.

### Fungsi Inti: `decode_image_to_cv()`

```python
def decode_image_to_cv(value: str) -> np.ndarray:
    if "," in value:
        value = value.split(",", 1)[1]  # Hapus prefix data URL
    image_bytes = base64.b64decode(value)
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
```

**Input:** String Base64 (mungkin dengan prefix `data:image/...`)
**Output:** OpenCV BGR image (`numpy.ndarray`)
**Proses:**
1. Hapus prefix data URL jika ada
2. Decode base64 ke bytes
3. Buka dengan Pillow sebagai RGB
4. Konversi ke format OpenCV BGR

### Endpoint: `GET /health`

```python
@app.get("/health")
def health():
    return {"status": "ok"}
```

**Tujuan:** Health check untuk monitoring.
**Response:** `{ "status": "ok" }`

### Endpoint: `POST /encode`

```python
@app.post("/encode")
def encode_face(payload: EncodeRequest):
    image_cv = decode_image_to_cv(payload.imageBase64)
    results = DeepFace.represent(
        img_path=image_cv,
        model_name="Facenet",
        detector_backend="mediapipe",
        enforce_detection=True,
        align=True
    )
    if not results:
        raise HTTPException(400, "No face detected")
    descriptor = results[0]["embedding"]
    return {"descriptor": descriptor}
```

**Tujuan:** Menghasilkan embedding wajah 128-dimensi (deskriptor) dari gambar.

**Input:** `{ "imageBase64": "base64_string" }`

**Output:**
```json
{
  "descriptor": [0.0123, -0.0456, ..., 0.0789]  // 128 nilai float
}
```

**Pipeline:**
1. Decode base64 ke OpenCV image
2. Deteksi wajah menggunakan MediaPipe
3. Align wajah (rotasi/scale untuk standardisasi)
4. Proses melalui model Facenet128 → embedding 128-d
5. Kembalikan vektor embedding

**Error Response:**
- `400` — "No face detected"
- `500` — Internal error

**Dipanggil oleh:** `EmployeeService.create/update` → `FaceRecognitionClient.encodeFace()`

### Endpoint: `POST /verify`

```python
@app.post("/verify")
def verify_face(payload: VerifyRequest):
    image_cv = decode_image_to_cv(payload.imageBase64)
    results = DeepFace.represent(
        img_path=image_cv,
        model_name="Facenet",
        detector_backend="mediapipe",
        enforce_detection=True,
        align=True
    )
    if not results:
        raise HTTPException(400, "No face detected")
    
    descriptor = np.array(results[0]["embedding"])
    reference = np.array(payload.referenceDescriptor)
    
    # Cek kompatibilitas panjang deskriptor
    if len(reference) != len(descriptor):
        return {
            "isMatch": False,
            "distance": 99.0,
            "confidence": 0.0,
            "error": "Panjang deskriptor tidak kompatibel. Harap daftarkan ulang karyawan."
        }
    
    # Perhitungan Cosine distance
    a, b = np.array(descriptor), np.array(reference)
    norm_a, norm_b = np.linalg.norm(a), np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        distance = 1.0
    else:
        similarity = np.dot(a, b) / (norm_a * norm_b)
        distance = float(1.0 - similarity)
    
    is_match = distance <= payload.threshold
    
    # Confidence: linear ramp dari 1.0 (distance=0) ke 0.0 (distance=threshold*2)
    confidence = max(0.0, 1.0 - (distance / max(payload.threshold * 2, 0.01)))
    
    return {
        "isMatch": is_match,
        "distance": distance,
        "confidence": confidence,
    }
```

**Tujuan:** Memverifikasi apakah wajah yang diambil cocok dengan deskriptor wajah karyawan terdaftar.

**Input:**
```json
{
  "imageBase64": "base64_string",
  "referenceDescriptor": [0.0123, ...],
  "threshold": 0.45
}
```

**Output (cocok):**
```json
{
  "isMatch": true,
  "distance": 0.23,
  "confidence": 0.74
}
```

**Output (tidak cocok):**
```json
{
  "isMatch": false,
  "distance": 0.67,
  "confidence": 0.26
}
```

**Pipeline Verifikasi:**
1. Decode base64 ke OpenCV image
2. Deteksi wajah menggunakan MediaPipe
3. Ekstrak embedding menggunakan Facenet128
4. Cek kompatibilitas panjang deskriptor (harus 128)
5. Hitung **Cosine distance** antara deskriptor saat ini dan referensi
6. Bandingkan jarak dengan threshold
7. Hitung confidence score

**Threshold:** `0.40` (default Python) — di-override ke `0.45` oleh `FACE_MATCH_THRESHOLD` di backend

## 5.5 Pipeline Face Recognition (Detail)

### Langkah 1: Akuisisi Gambar
- Gambar tiba sebagai string Base64 (dari ESP32-CAM atau webcam)
- Bisa menyertakan prefix `data:image/jpeg;base64,`
- Didecode ke format OpenCV BGR melalui perantara Pillow

### Langkah 2: Deteksi Wajah (MediaPipe)
- **Detector Backend:** MediaPipe
- Mendeteksi bounding box dan landmark wajah
- `enforce_detection=True` — error jika tidak ada wajah
- `align=True` — transformasi affine untuk align wajah

### Langkah 3: Embedding Wajah (Facenet128)
- **Model:** Facenet128 (arsitektur Inception-ResNet v1)
- **Input:** Gambar wajah yang sudah di-align (160x160 pixels)
- **Output:** Vektor embedding 128-dimensi
- **Penyimpanan weights:** ~90MB, cache di `~/.deepface/weights/facenet_weights.h5`

### Langkah 4: Perhitungan Jarak
- **Metric:** Cosine distance
- Formula: `distance = 1.0 - cos(θ)` dimana `cos(θ) = (A·B) / (||A|| * ||B||)`
- Range: 0.0 (identik) hingga 2.0 (berlawanan)

### Langkah 5: Keputusan Pencocokan
- `isMatch = distance <= threshold`
- Default threshold: 0.40 (Python) → 0.45 (Produksi via env)
- Threshold lebih rendah = pencocokan lebih ketat

### Langkah 6: Confidence Score
- Fungsi linear ramp
- `confidence = max(0.0, 1.0 - distance / (threshold * 2))`
- Pada `distance = 0` → confidence = 1.0
- Pada `distance = threshold` → confidence = 0.5
- Pada `distance = threshold * 2` → confidence = 0.0

## 5.6 Integrasi dengan Backend

### `src/shared/clients/face-recognition.client.ts`

**Tujuan:** HTTP client TypeScript yang berkomunikasi dengan service Python.

**Konfigurasi:**
```typescript
this.http = axios.create({
  baseURL: env.FACE_SERVICE_URL,   // Default: http://localhost:8000
  timeout: 15000                    // Timeout 15 detik
});
```

**Method:**

| Method | Deskripsi | Dipanggil Oleh |
|--------|-----------|----------------|
| `encodeFace(input)` | Mengirim gambar ke `/encode`, mengembalikan array deskriptor 128-d | `EmployeeService.create/update` |
| `verifyFace(input)` | Mengirim gambar + reference descriptor ke `/verify`, mengembalikan hasil cocok/tidak | `AttendanceVerificationService.verify()` |

## 5.7 Karakteristik Performa

| Metrik | Nilai |
|--------|-------|
| Ukuran Model | ~90MB (weights Facenet128) |
| First-load Time | ~30-60s (download weights) |
| Subsequent Load | ~3-5s (dari disk cache) |
| Encode Latency | ~500-1500ms per gambar |
| Verify Latency | ~800-2000ms per perbandingan |
| Max Ukuran Gambar | 50MB (dikonfigurasi di Express) |
| Format Didukung | JPEG, PNG (via Pillow) |

## 5.8 Penanganan Error

| Skenario | Kode HTTP | Response |
|----------|-----------|----------|
| Tidak ada wajah di gambar | 400 | `"No face detected"` |
| Banyak wajah | 200 | Menggunakan wajah pertama |
| Gambar korup | 500 | Detail pesan error |
| Ketidakcocokan deskriptor | 200 (isMatch=false) | `"Incompatible descriptor length"` |
| Model tidak terload | 500 | Detail pesan error |
| Timeout | N/A | Timeout 15s di HTTP client |

## 5.9 Requirements

```
fastapi==0.115.12
uvicorn==0.34.2
numpy<2.0.0
Pillow==11.2.1
mediapipe==0.10.20
opencv-python-headless
deepface
tensorflow
tf-keras
```

## 5.10 Menjalankan

```bash
cd python-face-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

Atau gunakan batch script:
```bash
run_ai.bat
```
