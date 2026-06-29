# Dokumentasi Backend

## 3.1 Gambaran Umum

Backend adalah aplikasi TypeScript Node.js yang terstruktur dengan prinsip **Clean Architecture**. Terdiri dari dua komponen runtime:

1. **Express Gateway** (port 3000) — REST API + Socket.IO
2. **gRPC Server** (port 50051) — Logika bisnis

Keduanya berjalan dalam proses Node.js yang sama (dijalankan bersama via `npm run dev`).

## 3.2 Struktur Proyek

```
src/
├── config/
│   └── env.ts                    # Validasi environment variable dengan Zod
├── gateway/
│   ├── server.ts                 # Bootstrap HTTP server + mDNS + Socket.IO
│   ├── app.ts                    # Setup Express routes & middleware
│   └── realtime.ts               # Handler event Socket.IO & jembatan gRPC→Socket
├── grpc/
│   ├── server.ts                 # Bootstrap server gRPC
│   └── handlers/                 # Handler request gRPC
│       ├── auth.handler.ts
│       ├── employee.handler.ts
│       ├── device.handler.ts
│       ├── attendance.handler.ts
│       └── settings.handler.ts
├── modules/                      # Modul fitur (Clean Architecture)
│   ├── auth/
│   │   ├── controller/           # Handler route HTTP
│   │   ├── dto/                  # Schema validasi request/response
│   │   ├── entity/               # Model domain
│   │   ├── repository/           # Lapisan akses data
│   │   └── service/              # Logika bisnis
│   ├── employee/                 # Struktur sama
│   ├── device/                   # Struktur sama
│   ├── attendance/               # Struktur sama (modul terbesar)
│   └── settings/                 # Struktur sama
├── proto/
│   └── platform.proto            # Definisi service protobuf (266 baris)
├── shared/
│   ├── container.ts              # Dependency Injection container
│   ├── clients/
│   │   └── face-recognition.client.ts   # HTTP client untuk service Python
│   ├── database/
│   │   └── sqlite.ts             # Wrapper SQL.js, migrasi, koneksi
│   ├── errors/
│   │   └── app-error.ts          # Kelas error kustom AppError
│   ├── grpc/
│   │   ├── proto.ts              # Utility pemuat Protobuf
│   │   ├── grpc-client.ts        # Factory client gRPC dengan promisify
│   │   └── grpc-error.ts         # Pemetaan error gRPC
│   ├── logger/
│   │   └── index.ts              # Konfigurasi logger Pino
│   ├── middleware/
│   │   ├── async-handler.ts      # Wrapper async error Express
│   │   ├── authenticate.ts       # Middleware verifikasi JWT
│   │   ├── authorize.ts          # Kontrol akses berbasis peran
│   │   └── error-handler.ts      # Global error handler
│   ├── realtime/
│   │   └── realtime-events.ts    # EventEmitter Node.js untuk jembatan SSE/Socket
│   └── utils/
│       ├── correlation.ts        # Generate correlation ID
│       ├── file-storage.ts       # Multer + penyimpanan file base64
│       └── pdf-generator.ts      # Generate laporan PDF dengan PDFMake
└── scripts/
    ├── seed-admin.ts              # Membuat akun admin awal
    ├── reset-admin.ts             # Reset password admin
    └── seed-dummy-attendance.ts   # Generate data absensi uji coba
```

## 3.3 Dokumentasi File per File

### `src/config/env.ts`

**Tujuan:** Memuat dan memvalidasi semua environment variable menggunakan schema validasi Zod.

**Lokasi:** `src/config/env.ts`

**Import:**
- `zod` dari `zod` — Library validasi schema
- `dotenv` dari `dotenv` — Memuat file `.env`
- `path` dari `path` — Resolusi path

**Ekspor:**
- `env` — Objek environment yang sudah diparse dan divalidasi dengan type inference TypeScript

**Fungsionalitas:**
1. Memanggil `dotenv.config()` untuk memuat file `.env`
2. Mendefinisikan schema Zod dengan semua env var yang diharapkan:
   - `PORT` — coerced number, default 3000
   - `GRPC_PORT` — coerced number, default 50051
   - `JWT_SECRET` — string, required
   - `JWT_EXPIRES_IN` — string, default "1h"
   - `SQLITE_PATH` — string, default "storage/rfid_v3.sqlite"
   - `FACE_SERVICE_URL` — string, default "http://localhost:8000"
   - `FACE_MATCH_THRESHOLD` — number, default 0.45
   - `ATTENDANCE_MATCH_WINDOW_SECONDS` — number, default 20
   - `UPLOAD_DIR` — string, default "storage/uploads"
   - `LOG_LEVEL` — string, default "info"
3. Memparse `process.env` terhadap schema
4. Keluar dari proses dengan error jika validasi gagal

**Dipanggil oleh:** Semua modul yang membutuhkan nilai konfigurasi.

---

### `src/gateway/server.ts`

**Tujuan:** Entry point untuk server HTTP Gateway. Mengatur Express, Socket.IO, mDNS, dan mulai mendengarkan.

**Lokasi:** `src/gateway/server.ts`

**Import:**
- `http` dari `http` — Pembuatan server HTTP
- `{ Server }` dari `socket.io` — Server Socket.IO
- `{ env }` dari `../config/env` — Konfigurasi
- `{ app }` dari `./app` — Aplikasi Express
- `{ setupRealtime }` dari `./realtime` — Handler event Socket.IO
- `{ registerService }` dari `bonjour-service` — Registrasi mDNS
- `{ logger }` dari `../shared/logger` — Logging

**Fungsionalitas:**
1. Membuat server HTTP dari Express app: `http.createServer(app)`
2. Membuat server Socket.IO yang terikat ke server HTTP
3. Memanggil `setupRealtime(io)` untuk menginisialisasi handler Socket.IO
4. Mulai mendengarkan di `env.PORT`
5. Mendaftarkan layanan mDNS (Bonjour) `_attendtrack._tcp` pada port `env.PORT` untuk penemuan perangkat
6. Mencetak pesan startup

**Dipanggil oleh:** Script npm (`npm run dev`, `npm run start:gateway`)

---

### `src/gateway/app.ts`

**Tujuan:** Konfigurasi aplikasi Express — middleware, routes, file statis, CORS.

**Lokasi:** `src/gateway/app.ts`

**Import:**
- `express` dari `express` — Framework Express
- `cors` dari `cors` — Middleware CORS
- `helmet` dari `helmet` — Security headers
- `path` dari `path` — Resolusi path
- Controller modul untuk semua fitur
- Middleware error handler

**Ekspor:**
- `app` — Aplikasi Express yang sudah dikonfigurasi

**Pemetaan Route:**

| Method | Path | Handler | Auth |
|--------|------|---------|------|
| POST | `/api/v1/auth/login` | `authController.login` | Tidak |
| POST | `/api/v1/auth/register` | `authController.register` | Tidak |
| GET | `/api/v1/auth/me` | `authController.me` | JWT |
| GET/POST/PUT/DELETE | `/api/v1/employees` | `employeeController.*` | JWT |
| GET/POST/PUT/DELETE | `/api/v1/students` | Alias ke `/api/v1/employees` | JWT |
| GET | `/api/v1/attendance/history` | `attendanceController.getHistory` | JWT |
| GET | `/api/v1/attendance/sessions` | `attendanceController.getSessions` | JWT |
| GET | `/api/v1/attendance/stream` | `attendanceStreamController.stream` | JWT |
| POST | `/api/v1/attendance/rfid` | `attendanceController.handleRfid` | Tidak |
| POST | `/api/v1/attendance/face` | `attendanceController.handleFace` | Tidak |
| POST | `/api/v1/attendance/check-rfid` | `attendanceController.checkRfid` | Tidak |
| POST | `/api/v1/devices/register` | `deviceController.register` | Tidak |
| POST | `/api/v1/devices/heartbeat` | `deviceController.heartbeat` | Tidak |
| GET | `/api/v1/devices` | `deviceController.list` | JWT |
| GET/POST/DELETE | `/api/v1/settings` | `settingsController.*` | JWT |
| GET | `/api/v1/export/pdf` | `attendanceController.exportPdf` | JWT |
| GET | `/uploads/*` | File statis | Tidak |

**Fungsionalitas:**
1. Membuat Express app
2. Menerapkan middleware: `cors()`, `helmet()`, `express.json({ limit: '50mb' })`, `express.urlencoded({ extended: true })`
3. Melayani file statis dari `storage/uploads/` di path `/uploads/`
4. Mendaftarkan semua route API dengan controller yang sesuai
5. Menerapkan global error handler middleware

**Dipanggil oleh:** `server.ts`

---

### `src/gateway/realtime.ts`

**Tujuan:** Penanganan event Socket.IO dan jembatan antara event gRPC dan klien WebSocket.

**Lokasi:** `src/gateway/realtime.ts`

**Import:**
- `{ Server, Socket }` dari `socket.io`
- `{ grpcClient }` dari `../shared/grpc/grpc-client`
- `{ realtimeEvents }` dari `../shared/realtime/realtime-events`
- Berbagai modul service

**Ekspor:**
- `setupRealtime(io: Server)` — Inisialisasi Socket.IO
- `getIO()` — Mendapatkan instance server Socket.IO

**Fungsionalitas:**
1. Mengatur handler koneksi Socket.IO — autentikasi via token JWT di handshake `auth`
2. Menangani event klien:
   - `subscribe:attendance` — Bergabung ke room attendance
   - `subscribe:device` — Bergabung ke room monitoring perangkat
3. Menjembatani event EventEmitter internal ke Socket.IO:
   - `attendance:new` — dikirim saat record absensi baru dibuat
   - `attendance:update` — dikirim saat status sesi berubah
   - `rfid:new` — dikirim saat RFID dipindai
   - `registration:image` — dikirim saat registrasi wajah
   - `device:status` — dikirim saat perangkat online/offline
   - `session:created` — dikirim saat sesi absensi dibuat

**Dipanggil oleh:** `server.ts`

---

### `src/grpc/server.ts`

**Tujuan:** Server gRPC yang menjadi host semua service logika bisnis.

**Lokasi:** `src/grpc/server.ts`

**Import:**
- Library gRPC
- Semua modul handler
- Utility pemuatan proto

**Fungsionalitas:**
1. Memuat definisi protobuf dari `src/proto/platform.proto`
2. Membuat server gRPC
3. Mendaftarkan semua service dengan implementasi handler:
   - `AuthService`
   - `EmployeeService`
   - `DeviceService`
   - `AttendanceService`
   - `SettingsService`
4. Memulai server di `env.GRPC_PORT`
5. Mencetak startup

**Dipanggil oleh:** Script npm via `src/grpc/server.ts` sebagai entry point

---

### `src/proto/platform.proto`

**Tujuan:** Definisi service Protobuf untuk semua layanan gRPC.

**Lokasi:** `src/proto/platform.proto`

**Service yang Didefinisikan:**

```protobuf
service AuthService {
  rpc Login(LoginRequest) returns (LoginResponse);
  rpc Register(RegisterRequest) returns (RegisterResponse);
  rpc ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse);
}

service EmployeeService {
  rpc Create(CreateEmployeeRequest) returns (EmployeeResponse);
  rpc Update(UpdateEmployeeRequest) returns (EmployeeResponse);
  rpc FindById(FindByIdRequest) returns (EmployeeResponse);
  rpc FindAll(FindAllRequest) returns (EmployeeListResponse);
  rpc Delete(DeleteRequest) returns (DeleteResponse);
  rpc FindByRfid(FindByRfidRequest) returns (EmployeeResponse);
}

service DeviceService {
  rpc Register(RegisterDeviceRequest) returns (DeviceResponse);
  rpc Heartbeat(HeartbeatRequest) returns (HeartbeatResponse);
  rpc FindAll(FindAllDevicesRequest) returns (DeviceListResponse);
  rpc Update(UpdateDeviceRequest) returns (DeviceResponse);
}

service AttendanceService {
  rpc CheckRfid(CheckRfidRequest) returns (CheckRfidResponse);
  rpc HandleRfid(HandleRfidRequest) returns (HandleRfidResponse);
  rpc HandleFace(HandleFaceRequest) returns (HandleFaceResponse);
  rpc GetHistory(GetHistoryRequest) returns (AttendanceHistoryResponse);
  rpc GetSessions(GetSessionsRequest) returns (SessionListResponse);
  rpc GetSummary(GetSummaryRequest) returns (SummaryResponse);
  rpc ProcessVerification(ProcessVerificationRequest) returns (ProcessVerificationResponse);
  rpc StreamAttendances(StreamAttendancesRequest) returns (stream AttendanceEvent);
}

service SettingsService {
  rpc Get(GetSettingsRequest) returns (GetSettingsResponse);
  rpc Upsert(UpsertSettingRequest) returns (UpsertSettingResponse);
  rpc Reset(ResetSettingsRequest) returns (ResetSettingsResponse);
}
```

---

## 3.4 Struktur Modul (Clean Architecture)

Setiap modul mengikuti pola yang sama:

```
modules/{fitur}/
├── controller/     # Parse request HTTP, panggil service, format response
├── dto/            # Schema Zod untuk validasi request + tipe TypeScript
├── entity/         # Interface model domain
├── repository/     # Query SQL (SELECT/INSERT/UPDATE/DELETE)
└── service/        # Logika bisnis, panggil repository, service eksternal
```

### Modul Auth

**File:**
- `auth.controller.ts` — Menangani `POST /login`, `POST /register`, `GET /me`
- `auth.dto.ts` — `LoginDto` (email, password), `RegisterDto` (name, email, password, role)
- `user.model.ts` — Interface `User` (id, name, email, password_hash, role, timestamps)
- `user.repository.ts` — `findByEmail()`, `findById()`, `create()`
- `auth.service.ts` — `login()` (validasi kredensial, generate JWT), `register()` (hash password, create user), `validateToken()`

### Modul Employee

**File:**
- `employee.controller.ts` — Endpoint CRUD untuk karyawan
- `employee.dto.ts` — `CreateEmployeeDto`, `UpdateEmployeeDto` dengan validasi Zod
- `employee.model.ts` — Interface `Employee` (id, full_name, department, position, rfid_uid, face_descriptor, face_image_path, is_active)
- `employee.repository.ts` — `create()`, `update()`, `findById()`, `findAll()`, `delete()`, `findByRfid()`
- `employee.service.ts` — Logika CRUD, enkoding deskriptor wajah saat registrasi

### Modul Device

**File:**
- `device.controller.ts` — Register, heartbeat, list, update
- `device.dto.ts` — DTO registrasi dan heartbeat
- `device.model.ts` — Interface `Device` (id, device_code, type, name, location, status, metadata, last_seen_at)
- `device.repository.ts` — `create()`, `update()`, `findByCode()`, `findAll()`, `upsert()`
- `device.service.ts` — Logika perangkat, pemrosesan heartbeat, manajemen status

### Modul Attendance

**File:**
- `attendance.controller.ts` — Check RFID, handle RFID, handle face, history, sessions, summary, export PDF
- `attendance-stream.controller.ts` — Endpoint SSE stream
- `attendance.dto.ts` — Semua DTO untuk operasi absensi
- `attendance-session.model.ts` — Interface `AttendanceSession`
- `attendance-record.model.ts` — Interface `AttendanceRecord`
- `attendance.repository.ts` — Query kompleks untuk session, records, history
- `attendance.service.ts` — Orkestrasi absensi inti
- `attendance-sync.service.ts` — Sinkronisasi event RFID-Face
- `attendance-verification.service.ts` — Logika verifikasi wajah
- `attendance-retry-scheduler.service.ts` — Mengulang verifikasi yang gagal

### Modul Settings

**File:**
- `settings.controller.ts` — GET, POST, DELETE settings
- `settings.dto.ts` — DTO settings
- `settings.repository.ts` — `get()`, `upsert()`, `reset()`
- `settings.service.ts` — Logika bisnis settings

---

## 3.5 Infrastruktur Bersama

### `src/shared/database/sqlite.ts`

**Tujuan:** Wrapper database SQL.js yang menyediakan manajemen koneksi, inisialisasi schema, dan eksekusi query.

**Fungsionalitas:**
1. Membuka database SQLite dari path file
2. Mengaktifkan mode WAL untuk performa baca konkuren
3. Menjalankan pembuatan schema (CREATE TABLE IF NOT EXISTS untuk 6 tabel)
4. Menyisipkan pengaturan sistem default
5. Mengekspor objek `sqlite` dengan method: `run()`, `get()`, `all()`, `exec()`
6. Otomatis mempersist database ke file setelah setiap operasi tulis

### `src/shared/clients/face-recognition.client.ts`

**Tujuan:** HTTP client untuk berkomunikasi dengan service Face Recognition Python.

**Fungsionalitas:**
- `encodeFace(input)` → Mengirim gambar base64 ke `/encode`, mengembalikan array deskriptor 128-d
- `verifyFace(input)` → Mengirim gambar base64 + reference descriptor ke `/verify`, mengembalikan `{ isMatch, distance, confidence }`
- Enkoding otomatis file gambar ke base64 jika path diberikan
- Timeout 15 detik

**Dipanggil oleh:** `EmployeeService` (untuk enkoding saat registrasi), `AttendanceVerificationService` (untuk verifikasi saat absensi)

### `src/shared/utils/file-storage.ts`

**Tujuan:** Utilitas penyimpanan file untuk menyimpan gambar wajah yang diupload.

**Fungsionalitas:**
- `saveBase64Image(base64, filename?)` → Decode base64, simpan ke `UPLOAD_DIR`, kembalikan path relatif
- `readFileAsBase64(path)` → Baca file, kembalikan string base64
- Menggunakan UUID v4 untuk nama file unik

### `src/shared/utils/pdf-generator.ts`

**Tujuan:** Menghasilkan laporan PDF absensi menggunakan PDFMake.

**Fungsionalitas:**
- `generateAttendanceReport(records, filters)` → Membuat PDF terstruktur dengan:
  - Judul dan header rentang tanggal
  - Tabel dengan kolom: No, Nama, Departemen, Tanggal, Waktu, Kategori, Ketepatan, Status
  - Label bahasa Indonesia
  - Font Roboto

### `src/shared/utils/correlation.ts`

**Tujuan:** Pembuatan Correlation ID untuk memasangkan event RFID dan wajah.

**Fungsionalitas:**
- `generateCorrelationId(uid, pairingKey)` → Membuat correlation ID deterministik dari UID + pairingKey
- Digunakan untuk mencocokkan pemindaian RFID dengan pengambilan wajah tanpa pertukaran ID eksplisit

### `src/shared/realtime/realtime-events.ts`

**Tujuan:** EventEmitter Node.js untuk propagasi event real-time internal.

**Event yang Dikirim:**
- `attendance:new` — Record absensi baru dibuat
- `attendance:update` — Status sesi diperbarui
- `rfid:new` — Kartu RFID dipindai
- `registration:image` — Gambar registrasi wajah diterima
- `device:status` — Perangkat terhubung/terputus
- `session:created` — Sesi baru dimulai

### Middleware

**`authenticate.ts`:** Verifikasi token JWT. Mengekstrak Bearer token dari header `Authorization`, memvalidasi via gRPC, melampirkan user ke `req.user`.

**`authorize.ts`:** Kontrol akses berbasis peran. `authorize(...roles)` mengembalikan middleware yang memeriksa `req.user.role`.

**`error-handler.ts`:** Global error handler. Menangkap error, memeriksa apakah `AppError`, mencatat detail, mengembalikan response JSON terstruktur.

**`async-handler.ts`:** Membungkus handler route async untuk menangkap rejection promise.

---

## 3.6 Script CLI

### `src/scripts/seed-admin.ts`
Membuat akun admin default:
- Email: `admin@rfid.com`
- Password: `password123`
- Nama: `System Admin`
- Role: `ADMIN`

### `src/scripts/reset-admin.ts`
Mereset password admin menjadi `password123`.

### `src/scripts/seed-dummy-attendance.ts`
Menghasilkan 10 record absensi dummy untuk pengujian, membuat karyawan dummy jika belum ada.
