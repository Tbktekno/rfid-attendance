# RFID V3 Backend

Backend absensi RFID + face recognition berbasis Node.js dengan:

- Express.js sebagai REST API Gateway
- gRPC sebagai komunikasi internal service layer
- Clean architecture per module: `Auth`, `Student`, `Attendance`, `Device`
- Scheduler lokal berbasis proses untuk sinkronisasi event RFID dan retry verifikasi
- SQLite untuk persistence lokal berbasis file
- Python FastAPI microservice untuk face recognition

## Struktur

```text
src/
  gateway/           # REST API gateway
  grpc/              # gRPC server + handlers
  modules/
    auth/
    student/
    attendance/
    device/
  shared/            # config, logger, db, grpc, utils
python-face-service/ # microservice face recognition
```

## Menjalankan

### Backend

1. Copy `.env.example` menjadi `.env`
2. SQLite tidak butuh service tambahan. File database akan dibuat otomatis di `storage/rfid_v3.sqlite`.

3. Install dependency Node:

```bash
npm install
```

4. Jalankan service Node:

```bash
npm run dev
```

5. Jalankan face recognition service:

```bash
cd python-face-service
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend

1. Masuk ke folder frontend:

```bash
cd frontend
```

2. Copy `frontend/.env.example` menjadi `frontend/.env`

3. Jalankan frontend:

```bash
npm install
npm run dev
```

## Endpoint REST

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Student

- `POST /api/v1/students`
- `PUT /api/v1/students/:id`
- `GET /api/v1/students`
- `GET /api/v1/students/:id`
- `DELETE /api/v1/students/:id`

### Attendance

- `POST /api/v1/attendance/rfid`
- `POST /api/v1/attendance/face`
- `GET /api/v1/attendance/history`
- `GET /api/v1/attendance/sessions`
- `GET /api/v1/attendance/stream`

### Device

- `POST /api/v1/devices/register`
- `POST /api/v1/devices/heartbeat`
- `GET /api/v1/devices`

## Contoh Flow Absensi

1. Daftarkan siswa dengan `rfidUid` dan foto wajah.
2. ESP8266 kirim RFID ke `/api/v1/attendance/rfid`.
3. ESP32CAM kirim foto ke `/api/v1/attendance/face`.
4. Gunakan `correlationId` atau `pairingKey` yang sama untuk sinkronisasi paling akurat.
5. Scheduler internal akan:
   - menggabungkan event RFID + image
   - mencari siswa berdasarkan RFID
   - memverifikasi wajah
   - retry otomatis jika verifikasi gagal sementara
   - menyimpan histori dengan status `VALID` atau `INVALID`

## Catatan Integrasi Device

- `pairingKey` direkomendasikan jika RFID reader dan camera adalah device terpisah.
- Jika `correlationId` tidak dikirim, sistem membuat bucket waktu otomatis berdasarkan `ATTENDANCE_MATCH_WINDOW_SECONDS`.
- Endpoint face mendukung multipart file (`image`) atau `imageBase64`.
- Path database diatur lewat `SQLITE_PATH` pada `.env`.
- Frontend React + Vite + Tailwind ada di folder `frontend/`.

## gRPC Internal

Kontrak ada di [src/proto/platform.proto](/I:/rfid_v3/src/proto/platform.proto).

Service:

- `AuthService`
- `StudentService`
- `DeviceService`
- `AttendanceService`
