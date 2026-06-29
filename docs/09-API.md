# Dokumentasi API

## 9.1 Gambaran Umum

Semua endpoint API dilayani oleh Express Gateway pada port 3000. Endpoint diawali dengan `/api/v1/`.

**Base URL:** `http://{server-ip}:3000/api/v1`

**Autentikasi:** Sebagian besar endpoint memerlukan token JWT Bearer di header `Authorization`.

## 9.2 Endpoint Autentikasi

### POST `/api/v1/auth/login`

**Tujuan:** Mengautentikasi user dan menerima token JWT.

**Autentikasi:** Tidak (publik)

**Request:**
```json
{
  "email": "admin@rfid.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "name": "System Admin",
    "email": "admin@rfid.com",
    "role": "ADMIN"
  }
}
```

**Error:**
| Status | Body |
|--------|------|
| 401 | `{ "error": "Email atau password salah" }` |
| 400 | `{ "error": "Email dan password harus diisi" }` |

---

### POST `/api/v1/auth/register`

**Tujuan:** Membuat akun user baru.

**Autentikasi:** Tidak (publik)

**Request:**
```json
{
  "name": "Operator Name",
  "email": "operator@rfid.com",
  "password": "securepass123",
  "role": "OPERATOR"
}
```

**Response (201):** `{ "id": "uuid", "name": "...", "email": "...", "role": "..." }`

---

### GET `/api/v1/auth/me`

**Tujuan:** Mendapatkan profil user yang sedang terautentikasi.

**Autentikasi:** JWT Required

**Headers:** `Authorization: Bearer {token}`

**Response (200):** `{ "id": "uuid", "name": "...", "email": "...", "role": "..." }`

---

## 9.3 Endpoint Karyawan

### GET `/api/v1/employees` (Alias: `/api/v1/students`)

**Tujuan:** Mendaftar semua karyawan.

**Autentikasi:** JWT Required

**Parameter Query:**
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `search` | string | Cari berdasarkan nama/departemen |
| `department` | string | Filter departemen |
| `active` | boolean | Filter status aktif |
| `page` | number | Halaman (default: 1) |
| `pageSize` | number | Item per halaman (default: 50) |

**Response (200):** `{ "employees": [...], "total": 50, "page": 1, "pageSize": 50 }`

---

### POST `/api/v1/employees` (Alias: `/api/v1/students`)

**Tujuan:** Membuat karyawan baru dengan foto wajah opsional.

**Autentikasi:** JWT Required

**Content-Type:** `multipart/form-data`

**Field Form:**
| Field | Tipe | Wajib | Deskripsi |
|-------|------|-------|-----------|
| `full_name` | string | Ya | Nama lengkap |
| `department` | string | Ya | Departemen |
| `position` | string | Ya | Jabatan |
| `rfid_uid` | string | Ya | UID kartu RFID |
| `faceImage` | file | Tidak | Foto wajah (JPEG) |

**Response (201):** Object karyawan

**Error:**
| Status | Body |
|--------|------|
| 400 | `{ "error": "RFID UID sudah terdaftar" }` |
| 400 | `{ "error": "Tidak ada wajah terdeteksi" }` |

---

### PUT `/api/v1/employees/:id`

**Tujuan:** Mengupdate karyawan yang ada.

**Autentikasi:** JWT Required

**Content-Type:** `multipart/form-data`

**Response (200):** Object karyawan yang diupdate

---

### DELETE `/api/v1/employees/:id`

**Tujuan:** Menghapus karyawan.

**Autentikasi:** JWT Required

**Response (200):** `{ "message": "Karyawan berhasil dihapus" }`

---

## 9.4 Endpoint Absensi

### POST `/api/v1/attendance/check-rfid`

**Tujuan:** Memeriksa apakah UID RFID terdaftar. Digunakan oleh ESP8266 sebelum memicu pengambilan wajah.

**Autentikasi:** Tidak (perangkat IoT)

**Request:**
```json
{
  "uid": "A1B2C3D4",
  "deviceCode": "ESP8266-MASTER-01",
  "pairingKey": "ROOM-1"
}
```

**Response (200) — Terdaftar:**
```json
{ "registered": true }
```

**Response (200) — Tidak Terdaftar (Mode Registrasi):**
```json
{ "registered": false, "action": "REGISTER_CAPTURE" }
```

**Response (200) — Tidak Terdaftar:**
```json
{ "registered": false }
```

---

### POST `/api/v1/attendance/rfid`

**Tujuan:** Memproses pemindaian RFID — membuat sesi absensi, menunggu korelasi wajah.

**Autentikasi:** Tidak (perangkat IoT)

**Request:**
```json
{
  "uid": "A1B2C3D4",
  "deviceCode": "ESP8266-MASTER-01",
  "pairingKey": "ROOM-1"
}
```

**Response (200) — Sukses:**
```json
{
  "status": "VALID",
  "confidence": 0.87,
  "category": "ENTRY",
  "punctuality": "ON_TIME",
  "message": "Absensi tercatat"
}
```

**Response (401) — Wajah Tidak Cocok:**
```json
{
  "status": "INVALID",
  "message": "Wajah tidak cocok"
}
```

**Response (202) — Diproses:**
```json
{
  "status": "PROCESSING",
  "message": "Menunggu verifikasi wajah"
}
```

---

### POST `/api/v1/attendance/face`

**Tujuan:** Menerima gambar wajah dari ESP32-CAM atau simulator frontend.

**Autentikasi:** Tidak (IoT) atau JWT (web)

**Headers (ESP32-CAM):**
| Header | Nilai |
|--------|-------|
| `Content-Type` | `application/octet-stream` |
| `X-UID` | UID RFID |
| `X-Purpose` | `attendance` / `registration` |
| `X-Device-Code` | Kode perangkat |
| `X-Pairing-Key` | Kunci pemasangan |

**Response (200):**
```json
{
  "status": "received",
  "sessionId": "uuid",
  "ready": true
}
```

---

### GET `/api/v1/attendance/history`

**Tujuan:** Mendapatkan riwayat absensi dengan pagination dan filter.

**Autentikasi:** JWT Required

**Parameter Query:**
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `page` | number | Halaman (default: 1) |
| `pageSize` | number | Item per halaman (default: 20) |
| `status` | string | Filter: `VALID`, `INVALID`, atau kosong |
| `category` | string | Filter: `ENTRY`, `EXIT` |
| `date` | string | Filter tanggal (ISO) |
| `month` | string | Filter bulan (YYYY-MM) |
| `employeeId` | string | Filter karyawan |

**Response (200):**
```json
{
  "records": [...],
  "total": 150,
  "page": 1,
  "pageSize": 20
}
```

---

### GET `/api/v1/attendance/sessions`

**Tujuan:** Mendapatkan sesi absensi aktif.

**Autentikasi:** JWT Required

**Response (200):** `{ "sessions": [...] }`

---

### GET `/api/v1/attendance/stream`

**Tujuan:** SSE stream untuk update absensi real-time.

**Autentikasi:** JWT Required

**Response:** SSE stream `text/event-stream`

---

### GET `/api/v1/export/pdf`

**Tujuan:** Export laporan absensi sebagai PDF.

**Autentikasi:** JWT Required

**Parameter Query:** `month`, `year`, `status`, `employeeId`

**Response (200):** `application/pdf` binary

---

## 9.5 Endpoint Perangkat

### POST `/api/v1/devices/register`

**Tujuan:** Mendaftarkan perangkat IoT baru (auto-register pada heartbeat pertama).

**Autentikasi:** Tidak (IoT)

**Request:**
```json
{ "deviceCode": "ESP8266-MASTER-01", "type": "RFID_READER" }
```

**Response (201):** Object device

---

### POST `/api/v1/devices/heartbeat`

**Tujuan:** Keepalive perangkat.

**Autentikasi:** Tidak (IoT)

**Request:**
```json
{ "deviceCode": "ESP32CAM-MASTER-01", "type": "FACE_SCANNER" }
```

**Response (200):** `{ "status": "ok", "deviceCode": "..." }`

---

### GET `/api/v1/devices`

**Tujuan:** Mendaftar semua perangkat.

**Autentikasi:** JWT Required

**Response (200):** `{ "devices": [...] }`

---

## 9.6 Endpoint Pengaturan

### GET `/api/v1/settings`

**Tujuan:** Mendapatkan semua pengaturan sistem.

**Autentikasi:** JWT Required

**Response (200):**
```json
{
  "entry_start_time": "07:00",
  "entry_end_time": "09:00",
  "exit_start_time": "16:00",
  "exit_end_time": "18:00",
  "late_threshold_minutes": "15"
}
```

---

### POST `/api/v1/settings`

**Tujuan:** Mengupdate pengaturan sistem.

**Autentikasi:** JWT Required

**Response (200):** `{ "status": "saved" }`

---

### DELETE `/api/v1/settings/reset`

**Tujuan:** Mereset semua pengaturan ke default.

**Autentikasi:** JWT Required

**Response (200):** `{ "message": "Pengaturan direset ke default" }`

---

## 9.7 Format Error Response

Semua error API mengikuti struktur ini:

```json
{
  "error": "Pesan error yang bisa dibaca",
  "statusCode": 400
}
```

**Kode Status HTTP yang Digunakan:**
| Kode | Arti |
|------|------|
| 200 | Sukses |
| 201 | Dibuat |
| 202 | Diterima (diproses) |
| 400 | Bad Request |
| 401 | Tidak Terautentikasi |
| 403 | Dilarang |
| 404 | Tidak Ditemukan |
| 500 | Internal Server Error |
