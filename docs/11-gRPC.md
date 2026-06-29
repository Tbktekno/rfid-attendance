# Dokumentasi gRPC

## 11.1 Gambaran Umum

gRPC digunakan untuk **komunikasi internal service-to-service** antara Express Gateway dan lapisan logika bisnis. Menyediakan kontrak yang strongly-typed melalui Protocol Buffers.

**Server:** `@grpc/grpc-js` port 50051
**Protokol:** HTTP/2
**Serialisasi:** Protocol Buffers (protobuf)
**Definisi Service:** `src/proto/platform.proto` (266 baris)

## 11.2 Arsitektur

```
┌────────────────────────┐         ┌────────────────────────────┐
│   Express Gateway      │  gRPC   │   gRPC Server (port 50051) │
│   (Port 3000)          │ ◄─────► │                            │
│                        │         │  ┌──────────────────────┐  │
│  ┌──────────────────┐  │         │  │  AuthService         │  │
│  │ grpc-client.ts   │──┼─────────┼─►│  EmployeeService     │  │
│  │ (Promisified)    │  │         │  │  DeviceService       │  │
│  └──────────────────┘  │         │  │  AttendanceService   │  │
│                        │         │  │  SettingsService     │  │
│  HTTP routes call      │         │  └──────────────────────┘  │
│  gRPC client methods   │         │                            │
└────────────────────────┘         └────────────────────────────┘
```

## 11.3 Definisi Service

### AuthService

**Login(LoginRequest) returns (LoginResponse)**
- Autentikasi user dan mengembalikan JWT
- Request: `{ email, password }`
- Response: `{ token, user }`

**Register(RegisterRequest) returns (RegisterResponse)**
- Membuat user baru
- Request: `{ name, email, password, role }`
- Response: `{ id, name, email, role }`

**ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse)**
- Memverifikasi validitas token JWT
- Request: `{ token }`
- Response: `{ valid, user }`

### EmployeeService

**Create(CreateEmployeeRequest) returns (EmployeeResponse)**
- Membuat karyawan baru dengan data wajah opsional
- Request: `{ full_name, department, position, rfid_uid, face_descriptor?, face_image_path? }`
- Response: Employee object

**Update(UpdateEmployeeRequest) returns (EmployeeResponse)**
- Mengupdate karyawan yang ada
- Request: `{ id, full_name?, department?, position?, rfid_uid?, face_descriptor?, face_image_path?, is_active? }`

**FindById(FindByIdRequest) returns (EmployeeResponse)**
- Mendapatkan karyawan berdasarkan UUID

**FindAll(FindAllRequest) returns (EmployeeListResponse)**
- Mendaftar karyawan dengan pagination
- Response: `{ employees[], total, page, pageSize }`

**Delete(DeleteRequest) returns (DeleteResponse)**
- Menghapus karyawan

**FindByRfid(FindByRfidRequest) returns (EmployeeResponse)**
- Mencari karyawan berdasarkan UID RFID

### DeviceService

**Register(RegisterDeviceRequest) returns (DeviceResponse)**
- Mendaftarkan perangkat IoT baru

**Heartbeat(HeartbeatRequest) returns (HeartbeatResponse)**
- Mengupdate timestamp last_seen perangkat

**FindAll(FindAllDevicesRequest) returns (DeviceListResponse)**
- Mendaftar semua perangkat

**Update(UpdateDeviceRequest) returns (DeviceResponse)**
- Mengupdate info perangkat

### AttendanceService

**CheckRfid(CheckRfidRequest) returns (CheckRfidResponse)**
- Memeriksa apakah UID RFID terdaftar (untuk ESP8266)
- Response: `{ registered, action? }`

**HandleRfid(HandleRfidRequest) returns (HandleRfidResponse)**
- Memproses pemindaian RFID dan membuat sesi

**HandleFace(HandleFaceRequest) returns (HandleFaceResponse)**
- Memproses gambar wajah dan menghubungkan dengan sesi

**GetHistory(GetHistoryRequest) returns (AttendanceHistoryResponse)**
- Mendapatkan riwayat absensi dengan pagination

**GetSessions(GetSessionsRequest) returns (SessionListResponse)**
- Mendapatkan sesi aktif

**GetSummary(GetSummaryRequest) returns (SummaryResponse)**
- Mendapatkan statistik ringkasan absensi

**ProcessVerification(ProcessVerificationRequest) returns (ProcessVerificationResponse)**
- Memicu verifikasi wajah untuk suatu sesi

**StreamAttendances(StreamAttendancesRequest) returns (stream AttendanceEvent)**
- Streaming endpoint untuk event absensi real-time

### SettingsService

**Get(GetSettingsRequest) returns (GetSettingsResponse)**
- Mendapatkan semua pengaturan sistem

**Upsert(UpsertSettingRequest) returns (UpsertSettingResponse)**
- Membuat atau mengupdate pengaturan

**Reset(ResetSettingsRequest) returns (ResetSettingsResponse)**
- Mereset semua pengaturan ke default

## 11.4 Client gRPC (`src/shared/grpc/grpc-client.ts`)

**Tujuan:** Membuat client gRPC yang di-promisify untuk Gateway memanggil service.

```typescript
const grpcClient = {
  auth: promisifyClient(new proto.attendtrack.AuthService(...)),
  employee: promisifyClient(new proto.attendtrack.EmployeeService(...)),
  device: promisifyClient(new proto.attendtrack.DeviceService(...)),
  attendance: promisifyClient(new proto.attendtrack.AttendanceService(...)),
  settings: promisifyClient(new proto.attendtrack.SettingsService(...))
};
```

## 11.5 Server gRPC (`src/grpc/server.ts`)

Memulai server gRPC dan mendaftarkan semua handler service.

## 11.6 Handler gRPC

| File | Implementasi | Baris |
|------|-------------|-------|
| `auth.handler.ts` | AuthService | 21 |
| `employee.handler.ts` | EmployeeService | 59 |
| `device.handler.ts` | DeviceService | 62 |
| `attendance.handler.ts` | AttendanceService | 139 |
| `settings.handler.ts` | SettingsService | 59 |

## 11.7 Pemetaan Error gRPC (`src/shared/grpc/grpc-error.ts`)

| HTTP Status | kode gRPC |
|-------------|-----------|
| 400 | `INVALID_ARGUMENT` |
| 401 | `UNAUTHENTICATED` |
| 403 | `PERMISSION_DENIED` |
| 404 | `NOT_FOUND` |
| 409 | `ALREADY_EXISTS` |
| 500 | `INTERNAL` |

## 11.8 Alur Komunikasi

```
HTTP Request (dari Frontend/Device)
  │
  ▼
Express Route Handler (gateway/app.ts)
  │
  ▼
Module Controller (e.g., attendance.controller.ts)
  │
  ▼
gRPC Client Call (grpc-client.ts)
  │
  ▼  (gRPC over HTTP/2, localhost:50051)
gRPC Handler (e.g., attendance.handler.ts)
  │
  ▼
Module Service (e.g., attendance.service.ts)
  │
  ▼
Module Repository (e.g., attendance.repository.ts)
  │
  ▼
SQLite Database
```

Keuntungan arsitektur ini:
- **Pemisahan concern**: Lapisan HTTP tidak tahu tentang database
- **Contract-driven**: File proto mendefinisikan semua interface
- **Type safety**: TypeScript types dari proto
- **Keamanan internal**: Port gRPC (50051) tidak diekspos secara eksternal
- **Dukungan streaming**: `StreamAttendances` menggunakan gRPC server streaming
