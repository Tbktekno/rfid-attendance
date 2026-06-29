# Gambaran Umum Proyek — Sistem Absensi RFID v3

## 1.1 Pendahuluan

**AttendTrack** adalah sistem manajemen absensi lengkap yang menggabungkan teknologi RFID (Radio Frequency Identification) dengan Kecerdasan Buatan Pengenalan Wajah (Face Recognition AI) untuk memberikan verifikasi absensi dua faktor. Sistem ini dirancang untuk institusi pendidikan, perkantoran, dan lingkungan manufaktur yang membutuhkan pencatatan absensi yang andal.

Sistem menggunakan **arsitektur three-tier microservices**:

| Lapisan | Teknologi | Tujuan |
|---------|-----------|--------|
| API Gateway | Express.js (Node.js) port 3000 | REST API, Socket.IO, upload file, komunikasi perangkat |
| gRPC Service | @grpc/grpc-js port 50051 | Logika bisnis internal, validasi, penyimpanan data |
| Face Recognition | FastAPI (Python) port 8000 | Enkoding wajah & verifikasi menggunakan DeepFace + Facenet128 |

## 1.2 Fitur Utama

- **Absensi berbasis RFID**: Memindai kartu RFID melalui ESP8266 + pembaca MFRC522
- **Verifikasi Pengenalan Wajah**: Autentikasi dua faktor dengan biometric wajah
- **Monitoring Real-time**: Event absensi langsung melalui Socket.IO
- **Manajemen Karyawan**: Operasi CRUD lengkap untuk data karyawan
- **Manajemen Perangkat**: Penemuan otomatis via mDNS, monitoring heartbeat
- **Laporan Absensi**: Ringkasan harian, pelacakan ketepatan waktu, ekspor PDF
- **Korelasi Sesi**: Menghubungkan event RFID + Wajah menggunakan jendela waktu
- **Pendaftaran Otomatis**: Kartu RFID baru memicu alur pengambilan wajah secara otomatis

## 1.3 Komponen Hardware

| Perangkat | Peran | Komponen Utama |
|-----------|-------|----------------|
| **ESP8266** | Pemindai RFID Master | Pembaca MFRC522 RFID, LCD 16x2 I2C, Buzzer, SoftwareSerial |
| **ESP32-CAM** | Kamera Pengambil Wajah | Kamera OV2640, LED Flash, PSRAM (opsional) |
| **Server Backend** | Server Aplikasi | Mesin apa pun yang menjalankan Node.js + Python |

## 1.4 Tumpukan Software

### Backend (Node.js)
- **Runtime**: Node.js + TypeScript
- **HTTP Framework**: Express 5
- **RPC Framework**: @grpc/grpc-js
- **Database**: SQL.js (SQLite dikompilasi ke WebAssembly)
- **Real-time**: Socket.IO + Server-Sent Events (SSE)
- **Autentikasi**: JWT + bcryptjs
- **Validasi**: Zod
- **Logging**: Pino
- **Upload File**: Multer
- **Generate PDF**: PDFMake
- **Penemuan Perangkat**: Bonjour-service (mDNS)

### Frontend (React)
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 (sistem desain kustom)
- **State Management**: Zustand 5
- **HTTP Client**: Axios
- **Real-time**: Socket.IO Client + fetch-event-source (SSE)
- **Routing**: React Router v6
- **Animasi**: Framer Motion
- **Ikon**: Lucide React
- **Tanggal**: date-fns v4

### Face Recognition (Python)
- **Web Framework**: FastAPI
- **Deteksi Wajah**: MediaPipe
- **Embedding Wajah**: Facenet128 (via DeepFace)
- **Pengolahan Citra**: OpenCV + Pillow
- **ASGI Server**: Uvicorn

### Firmware IoT (Arduino)
- **ESP8266**: Framework Arduino dengan library untuk MFRC522, LCD, WiFi, mDNS, HTTP, JSON, LittleFS
- **ESP32-CAM**: Core ESP32 Arduino dengan driver kamera ESP32, WiFi, HTTP, LittleFS, mDNS

## 1.5 Arsitektur Komunikasi

```
[Aplikasi Web Frontend]        [ESP8266 RFID] ──Serial──► [ESP32-CAM]
       │                            │
       │ HTTP/WS                     │ HTTP/mDNS
       ▼                            ▼
[Express Gateway :3000] ◄───────────────────────┐
       │                                        │
       ├──► [gRPC Service :50051]              │
       │         │                              │
       │         ├──► [SQLite DB]               │
       │         │                              │
       └──► [Python Face Service :8000]         │
                                                │
       ◄────────────────────────────────────────┘
                  mDNS _attendtrack._tcp
```

## 1.6 Alur Data Ringkas

1. **ESP8266** mendeteksi kartu RFID → mengirim UID ke Gateway (`POST /api/v1/attendance/check-rfid`)
2. Gateway memeriksa apakah RFID terdaftar melalui gRPC → mengembalikan terdaftar/tidak
3. Jika tidak terdaftar dengan mode registrasi → ESP8266 memicu **ESP32-CAM** via Serial untuk pengambilan gambar
4. Jika terdaftar → ESP8266 memicu ESP32-CAM untuk pengambilan wajah absensi
5. **ESP32-CAM** mengambil gambar → mengirim ke Gateway (`POST /api/v1/attendance/face`)
6. Gateway menghubungkan event RFID + Wajah melalui `pairingKey` atau jendela waktu
7. **Attendance Service** memanggil **Face Recognition Service** (`POST /verify`) untuk membandingkan wajah
8. Hasil disimpan di SQLite → event real-time dikirim melalui **Socket.IO** ke **Frontend**

## 1.7 Direktori Utama

```
I:\rfid_v3\
├── src/                       # Sumber TypeScript Backend
│   ├── config/                # Konfigurasi environment
│   ├── gateway/               # Gateway Express HTTP + Socket.IO
│   ├── grpc/                  # Server gRPC + handler
│   ├── modules/               # Modul fitur (Clean Architecture)
│   │   ├── auth/              # Modul autentikasi
│   │   ├── employee/          # Modul manajemen karyawan
│   │   ├── device/            # Modul manajemen perangkat
│   │   ├── attendance/        # Modul absensi inti
│   │   └── settings/          # Modul pengaturan sistem
│   ├── proto/                 # Definisi Protobuf
│   ├── shared/                # Infrastruktur bersama
│   │   ├── clients/           # Klien layanan eksternal
│   │   ├── database/          # Lapisan database SQLite
│   │   ├── errors/            # Kelas error kustom
│   │   ├── grpc/              # Utilitas gRPC
│   │   ├── logger/            # Logger Pino
│   │   ├── middleware/        # Middleware Express
│   │   ├── realtime/          # Event emitter untuk real-time
│   │   └── utils/             # Fungsi utilitas
│   └── scripts/               # Script CLI seed/reset
├── frontend/                  # Frontend React + Vite
│   └── src/
│       ├── components/        # Komponen UI
│       ├── hooks/             # React hooks
│       ├── pages/             # Komponen halaman
│       ├── services/          # Lapisan service API
│       ├── state/             # State management Zustand
│       ├── types/             # Interface TypeScript
│       └── utils/             # Fungsi utilitas
├── python-face-service/       # Face recognition FastAPI
│   └── main.py                # Endpoint enkoding + verifikasi wajah
├── firmware/                  # Firmware Arduino ESP8266 + ESP32-CAM
│   ├── esp8266_rfid_firmware.ino
│   └── esp32cam_face_firmware.ino
├── storage/                   # Database SQLite + gambar terupload
└── docs/                      # Dokumentasi
```

## 1.8 Variabel Environment

| Variable | Default | Deskripsi |
|----------|---------|-----------|
| `PORT` | `3000` | Port Gateway HTTP |
| `GRPC_PORT` | `50051` | Port server gRPC |
| `JWT_SECRET` | `super-secret-jwt` | Rahasia penandatanganan JWT |
| `JWT_EXPIRES_IN` | `1h` | Durasi kedaluwarsa token JWT |
| `SQLITE_PATH` | `storage/rfid_v3.sqlite` | Path file database SQLite |
| `FACE_SERVICE_URL` | `http://localhost:8000` | URL layanan face recognition |
| `FACE_MATCH_THRESHOLD` | `0.45` | Ambang jarak cosine untuk pencocokan wajah |
| `ATTENDANCE_MATCH_WINDOW_SECONDS` | `20` | Jendela waktu untuk korelasi RFID + Wajah |
| `UPLOAD_DIR` | `storage/uploads` | Direktori penyimpanan gambar wajah |
| `LOG_LEVEL` | `info` | Level log Pino |
