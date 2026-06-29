# AttendTrack - Sistem Absensi RFID + Face Recognition

**AttendTrack** adalah sistem manajemen absensi lengkap yang menggabungkan teknologi **RFID** dengan **Face Recognition AI** untuk verifikasi absensi dua faktor. Sistem ini dirancang untuk institusi pendidikan, perkantoran, dan lingkungan manufaktur.

## Arsitektur

```
┌──────────────────┐     ┌──────────────────────┐
│  React Frontend  │     │  ESP8266 (RFID)      │
│  (Vite + React)  │     │  + ESP32-CAM (Face)  │
│  Port 5173       │     │  (IoT Hardware)      │
└────────┬─────────┘     └──────────┬───────────┘
         │ HTTP/WebSocket           │ HTTP (mDNS)
         ▼                          ▼
┌─────────────────────────────────────────────┐
│         Express Gateway (Port 3000)         │
│  REST API + Socket.IO + File Uploads       │
└──────────────────┬──────────────────────────┘
                   │ gRPC
                   ▼
┌─────────────────────────────────────────────┐
│         gRPC Server (Port 50051)            │
│  Auth · Employee · Device · Attendance     │
└──────────────────┬──────────────────────────┘
                   │
┌─────────────────────────────────────────────┐
│   Python Face Service (Port 8000)           │
│   FastAPI + DeepFace + Facenet128          │
└─────────────────────────────────────────────┘
```

## Fitur Utama

- **Absensi RFID** — Scan kartu RFID via ESP8266 + MFRC522
- **Verifikasi Wajah** — Autentikasi dua faktor dengan Face Recognition AI
- **Real-time Monitoring** — Update absensi langsung via Socket.IO
- **Manajemen Karyawan** — CRUD lengkap dengan data wajah
- **Manajemen Perangkat** — Auto-discovery via mDNS + heartbeat monitoring
- **Laporan PDF** — Ekspor laporan absensi dengan filter tanggal & departemen
- **Multi-Device** — Support banyak pasangan ESP8266 + ESP32-CAM

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Backend | Node.js + TypeScript, Express.js, gRPC, Socket.IO |
| Frontend | React 18, Vite 5, Tailwind CSS 3, Zustand 5 |
| Database | SQLite (SQL.js) |
| Face Recognition | Python, FastAPI, DeepFace, Facenet128, MediaPipe |
| IoT Firmware | C++ (Arduino), ESP8266, ESP32-CAM, MFRC522 |
| Communication | REST, gRPC, Socket.IO, Serial (IoT), mDNS |

## Mulai Cepat

### Prasyarat
- Node.js v18+
- Python 3.10+
- npm atau yarn

### Instalasi Backend
```bash
git clone <repo-url>
cd rfid-v3
npm install
cp .env.example .env   # Edit JWT_SECRET dan konfigurasi lainnya
npm run seed:admin      # Buat admin default
npm run dev             # Jalankan server (port 3000 + gRPC 50051)
```

### Instalasi Face Recognition Service
```bash
cd python-face-service
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python main.py           # Jalankan di port 8000
```

### Instalasi Frontend
```bash
cd frontend
npm install
npm run dev              # Jalankan di port 5173
```

### Login
Buka `http://localhost:5173` dan login dengan:
- **Email:** `admin@rfid.com`
- **Password:** `password123`

## Dokumentasi Lengkap

Dokumentasi detail tersedia di folder [`docs/`](docs/):

| Dokumen | Deskripsi |
|---------|-----------|
| [01-Project-Overview](docs/01-Project-Overview.md) | Gambaran umum proyek |
| [02-System-Architecture](docs/02-System-Architecture.md) | Arsitektur sistem |
| [03-Backend](docs/03-Backend.md) | Dokumentasi backend |
| [04-Frontend](docs/04-Frontend.md) | Dokumentasi frontend |
| [05-Face-Recognition](docs/05-Face-Recognition.md) | Dokumentasi face recognition service |
| [06-ESP8266](docs/06-ESP8266.md) | Dokumentasi firmware ESP8266 |
| [07-ESP32CAM](docs/07-ESP32CAM.md) | Dokumentasi firmware ESP32-CAM |
| [08-Database](docs/08-Database.md) | Dokumentasi database |
| [09-API](docs/09-API.md) | Dokumentasi API endpoints |
| [10-SocketIO](docs/10-SocketIO.md) | Dokumentasi Socket.IO |
| [11-gRPC](docs/11-gRPC.md) | Dokumentasi gRPC |
| [12-Application-Flow](docs/12-Application-Flow.md) | Alur aplikasi lengkap |
| [13-Feature-Flow](docs/13-Feature-Flow.md) | Alur fitur lengkap |
| [14-Sequence-Diagram](docs/14-Sequence-Diagram.md) | Diagram sekuens |
| [15-Deployment](docs/15-Deployment.md) | Panduan deployment |
| [16-Troubleshooting](docs/16-Troubleshooting.md) | Panduan troubleshooting |
| [17-Best-Practices](docs/17-Best-Practices.md) | Praktik terbaik |

## Struktur Proyek

```
rfid-v3/
├── src/                    # Backend (TypeScript)
│   ├── config/            # Konfigurasi
│   ├── gateway/           # Express Gateway + Socket.IO
│   ├── grpc/              # gRPC Server + Handlers
│   ├── modules/           # Fitur modul (Clean Architecture)
│   │   ├── auth/          # Autentikasi
│   │   ├── employee/      # Manajemen karyawan
│   │   ├── device/        # Manajemen perangkat
│   │   ├── attendance/    # Absensi (modul terbesar)
│   │   └── settings/      # Pengaturan sistem
│   ├── proto/             # Definisi protobuf
│   ├── shared/            # Shared infrastructure
│   └── scripts/           # Utility scripts
├── frontend/              # Frontend (React + Vite)
│   └── src/
│       ├── components/    # React components
│       ├── pages/         # Halaman
│       ├── services/      # API services
│       ├── state/         # Zustand stores
│       ├── hooks/         # Custom hooks
│       └── types/         # Type definitions
├── python-face-service/   # Face Recognition (Python FastAPI)
├── firmware/              # Firmware ESP8266 + ESP32-CAM
├── docs/                  # Dokumentasi
└── storage/               # File database & uploads
```

## Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan backend (development) |
| `npm run seed:admin` | Buat admin default |
| `npm run reset:admin` | Reset password admin |
| `npm run seed:dummy` | Generate data dummy attendance |

## Firmware IoT

### ESP8266 (RFID Scanner)
- **File:** `firmware/esp8266_rfid_firmware.ino`
- **Library:** MFRC522, LiquidCrystal_I2C, ArduinoJson, ESP8266mDNS
- **Fitur:** RFID scan, LCD display, buzzer feedback, konfigurasi via WiFi portal

### ESP32-CAM (Face Capture)
- **File:** `firmware/esp32cam_face_firmware.ino`
- **Library:** ESP32-Camera, ArduinoJson, ESPmDNS
- **Fitur:** Capture wajah, flash LED, heartbeat, komunikasi serial dengan ESP8266

## Lisensi

Proyek ini dilisensikan di bawah MIT License.
