# Arsitektur Sistem

## 2.1 Arsitektur Level Tinggi

Sistem absensi menggunakan **arsitektur microservices** dengan tiga layanan utama dan dua komponen firmware IoT.

```
┌─────────────────────────────────────────────────────────────┐
│                   LAPISAN KLIEN                              │
│  ┌──────────────────────┐  ┌──────────────────────────┐     │
│  │   Web Frontend       │  │   Hardware IoT            │     │
│  │   (React + Vite)     │  │   ESP8266 + ESP32-CAM     │     │
│  │   Port 5173           │  │   (Jaringan Lokal)        │     │
│  └────────┬─────────────┘  └────────┬─────────────────┘     │
│           │ HTTP/WebSocket          │ HTTP (mDNS)            │
├───────────┼─────────────────────────┼────────────────────────┤
│           │                         │                        │
│           ▼                         ▼                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           LAPISAN API GATEWAY                        │    │
│  │           Express.js (Port 3000)                     │    │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────────────┐   │    │
│  │  │ REST    │  │ Socket.IO│  │ Static/Uploads   │   │    │
│  │  │ Routes  │  │ Events   │  │ (Multer)         │   │    │
│  │  └────┬────┘  └──────────┘  └──────────────────┘   │    │
│  └───────┼─────────────────────────────────────────────┘    │
│          │                                                  │
├──────────┼──────────────────────────────────────────────────┤
│          ▼                                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           LAPISAN SERVICE (gRPC - Port 50051)        │    │
│  │  ┌──────┐  ┌──────────┐  ┌─────────┐  ┌─────────┐  │    │
│  │  │Auth  │  │Employee  │  │Device   │  │Attend-  │  │    │
│  │  │Service│  │Service   │  │Service  │  │ance     │  │    │
│  │  │       │  │          │  │         │  │Service  │  │    │
│  │  └───────┘  └──────────┘  └─────────┘  └────┬────┘  │    │
│  └──────────────────────────────────────────────┼───────┘    │
│                                                  │           │
│          ┌───────────────────────────────────────┼──────────┐│
│          │          LAPISAN DATA                 │          ││
│          │  ┌──────────────────┐  ┌──────────────▼────────┐ ││
│          │  │  SQLite (SQL.js) │  │  Face Recognition     │ ││
│          │  │  storage/        │  │  Python FastAPI       │ ││
│          │  │  rfid_v3.sqlite  │  │  Port 8000            │ ││
│          │  └──────────────────┘  └───────────────────────┘ ││
│          └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## 2.2 Penjelasan Lapisan

### 2.2.1 Gateway Layer (`src/gateway/`)

Gateway adalah satu-satunya titik masuk untuk semua permintaan eksternal. Menangani:

- **HTTP REST API** — Semua operasi CRUD untuk karyawan, absensi, perangkat, auth, pengaturan
- **Socket.IO** — Streaming event real-time ke frontend web
- **Upload File** — Gambar wajah melalui multipart/form-data (Multer)
- **File Statis** — Melayani gambar terupload melalui path `/uploads/`
- **CORS** — Permintaan lintas asal dari frontend (port 5173)
- **Autentikasi** — Middleware verifikasi token JWT
- **mDNS** — Publikasi layanan Bonjour untuk penemuan perangkat otomatis

Gateway TIDAK mengandung logika bisnis. Semua operasi didelegasikan ke layanan gRPC.

### 2.2.2 Service Layer (gRPC - `src/grpc/`)

Layanan gRPC menyediakan:

- **AuthService** — Login, pembuatan pengguna, generate JWT
- **EmployeeService** — CRUD karyawan, manajemen deskriptor wajah
- **DeviceService** — Pendaftaran perangkat, heartbeat, daftar perangkat
- **AttendanceService** — Penanganan RFID, penanganan wajah, manajemen sesi, riwayat, sinkronisasi, verifikasi, penjadwalan ulang
- **SettingsService** — Baca/tulis pengaturan sistem

Setiap service mengikuti Clean Architecture:
```
Handler (gRPC) → Controller → Service → Repository → SQLite
```

### 2.2.3 Lapisan Data

**SQLite (SQL.js)**
- File database tunggal: `storage/rfid_v3.sqlite`
- In-memory dengan mode WAL untuk performa
- Otomatis dipersist ke disk setelah setiap operasi tulis
- Tabel: `users`, `employees`, `devices`, `attendance_sessions`, `attendance_records`, `system_settings`

**Face Recognition Service**
- Microservice Python FastAPI
- Berkomunikasi via HTTP (axios dari Node.js)
- Endpoint: `POST /encode`, `POST /verify`, `GET /health`

### 2.2.4 Frontend Layer

Single Page Application React dengan:
- **Halaman**: Login, Dashboard, Monitoring, History, Employees, Simulator, Settings
- **State**: Zustand stores (auth, attendance)
- **Real-time**: Socket.IO client + SSE fallback
- **Routing**: React Router v6 dengan protected routes

### 2.2.5 IoT Firmware Layer

**ESP8266 (Master)**
- Terhubung ke WiFi (dukungan dual network)
- Menemukan server via mDNS (`_attendtrack._tcp`)
- Membaca kartu RFID via MFRC522 (SPI)
- Menampilkan status di LCD 16x2 I2C
- Memicu ESP32-CAM via SoftwareSerial
- Portal konfigurasi (mode AP) untuk pengaturan awal

**ESP32-CAM (Slave)**
- Menerima perintah dari ESP8266 via Hardware Serial2
- Mengambil gambar wajah dengan kamera OV2640
- Mengirim gambar ke backend via HTTP POST
- Mengirim heartbeat setiap 30 detik
- LED Flash untuk penerangan

## 2.3 Protokol Komunikasi

| Protokol | Digunakan Antara | Port |
|----------|-----------------|------|
| HTTP/1.1 | Frontend → Gateway | 3000 |
| HTTP/1.1 | ESP8266 → Gateway | 3000 |
| HTTP/1.1 | ESP32-CAM → Gateway | 3000 |
| HTTP/1.1 | Gateway → Face Service | 8000 |
| HTTP/2 (gRPC) | Gateway → Service Layer | 50051 |
| WebSocket | Frontend ↔ Gateway | 3000 (Socket.IO) |
| Serial (UART) | ESP8266 → ESP32-CAM | 9600 baud |
| mDNS (Bonjour) | Perangkat → Gateway | 5353 |

## 2.4 Pemetaan Port

| Service | Port Internal | Akses Eksternal | Protokol |
|---------|--------------|-----------------|----------|
| Express Gateway | 3000 | Ya (LAN) | HTTP + WS |
| gRPC Server | 50051 | Tidak (internal) | gRPC |
| Face Recognition | 8000 | Tidak (internal) | HTTP |
| Frontend (Dev) | 5173 | Ya (LAN) | HTTP |
| mDNS | 5353 | Ya (LAN) | UDP |

## 2.5 Pemetaan Clean Architecture

Backend mengikuti prinsip Clean Architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    CONTROLLER                            │
│   HTTP: src/gateway/app.ts (Express routes)              │
│   gRPC: src/grpc/handlers/*.handler.ts                   │
│   Peran: Parse request, validasi input, panggil service  │
│   Dependency: → Service layer                            │
├─────────────────────────────────────────────────────────┤
│                    SERVICE                               │
│   src/modules/*/service/*.service.ts                     │
│   Peran: Logika bisnis, orkestrasi, validasi             │
│   Dependency: → Repository, → External clients           │
├─────────────────────────────────────────────────────────┤
│                    REPOSITORY                            │
│   src/modules/*/repository/*.repository.ts               │
│   Peran: Akses data, pembuatan query                     │
│   Dependency: → Database SQLite                          │
├─────────────────────────────────────────────────────────┤
│                    ENTITY                                │
│   src/modules/*/entity/*.model.ts                        │
│   Peran: Model domain, definisi tipe                     │
│   Dependency: Tidak ada                                  │
├─────────────────────────────────────────────────────────┤
│                    DTO                                   │
│   src/modules/*/dto/*.dto.ts                             │
│   Peran: Kontrak request/response, validasi (Zod)        │
│   Dependency: Tidak ada                                  │
└─────────────────────────────────────────────────────────┘
```

## 2.6 Arsitektur Korelasi Sesi

Bagian paling kritis dari sistem adalah menghubungkan pemindaian RFID dengan pengambilan wajah. Ini ditangani oleh:

### Metode Korelasi

1. **Pairing Key (Direkomendasikan)**
   - ESP8266 mengirim `pairingKey` (misal: `"ROOM-1"`)
   - ESP32-CAM mengirim `pairingKey` yang sama di header
   - Sistem mencocokkan event dalam `ATTENDANCE_MATCH_WINDOW_SECONDS` (default: 20s)

2. **Jendela Waktu (Fallback)**
   - Jika tidak ada pairing key, sistem membuat bucket berdasarkan kode perangkat
   - Event dalam jendela waktu yang sama dikorelasikan
   - Kurang andal dibanding pairing key

### State Machine Sesi

```
CREATED → READY → PROCESSING → COMPLETED (VALID/INVALID)
  │         │
  └──EXPIRED (jika timeout)
```

- **CREATED**: RFID dipindai, menunggu gambar wajah
- **READY**: RFID dan wajah diterima, antri untuk verifikasi
- **PROCESSING**: Verifikasi sedang berlangsung
- **COMPLETED**: Verifikasi selesai (VALID atau INVALID)
- **EXPIRED**: Sesi timeout

### Mekanisme Retry

`AttendanceRetrySchedulerService` berjalan saat startup untuk:
1. Menemukan semua sesi `READY` yang belum selesai diverifikasi
2. Mengulangi verifikasi wajah untuk masing-masing
3. Menangani error sementara (misal: Python service tidak tersedia sementara)
