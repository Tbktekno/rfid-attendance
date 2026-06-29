# Dokumentasi Socket.IO

## 10.1 Gambaran Umum

Socket.IO menyediakan **komunikasi real-time bidirectional** antara server backend dan aplikasi frontend web. Digunakan untuk update absensi langsung, perubahan status perangkat, dan event registrasi.

**Transport:** WebSocket dengan fallback HTTP long-polling
**Port:** Sama dengan Express Gateway (3000)
**Path:** `/socket.io/` (default)

## 10.2 Arsitektur

```
┌──────────────────┐         ┌────────────────────┐         ┌──────────────┐
│   Frontend React │ ◄─────► │  Socket.IO Server  │ ◄────── │  Event gRPC  │
│   (Socket.IO     │         │  (Express Gateway) │         │  (Internal   │
│    Client)       │         │                    │         │   EventBus)  │
└──────────────────┘         └────────────────────┘         └──────────────┘

Alur event:
  Services emit → EventEmitter → Socket.IO Server → WebSocket → Frontend
                                                                      │
  Device POST → Controller → EventEmitter → Socket.IO → Frontend ◄────┘
```

## 10.3 Setup Koneksi

**Server-side** (`src/gateway/realtime.ts`):
```typescript
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  const token = socket.handshake.auth.token;
  if (token) {
    const user = validateToken(token);
    socket.data.user = user;
  }
});
```

**Client-side** (`src/services/realtime.service.ts`):
```typescript
const socket = io(VITE_API_BASE_URL, {
  auth: { token },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: Infinity
});
```

## 10.4 Event Client → Server

### `subscribe:attendance`

**Tujuan:** Berlangganan event absensi real-time.

**Payload:** (tidak ada)

**Aksi Server:** Join socket ke room `attendance`

**Dipanggil oleh:** Frontend saat mount (di hook `useRealtimeAttendance`)

---

### `subscribe:device`

**Tujuan:** Berlangganan event status perangkat.

**Payload:** (tidak ada)

**Aksi Server:** Join socket ke room `device`

---

## 10.5 Event Server → Client

### `attendance:new`

**Tujuan:** Memberi tahu frontend saat record absensi baru dibuat.

**Pengirim:** `AttendanceService` setelah verifikasi sukses

**Payload:**
```json
{
  "id": "uuid",
  "employee_id": "uuid",
  "employee_name": "Budi Santoso",
  "department": "Produksi",
  "rfid_uid": "A1B2C3D4",
  "status": "VALID",
  "category": "ENTRY",
  "punctuality": "ON_TIME",
  "confidence": 0.87,
  "image_path": "uploads/abc-123.jpg",
  "verified_at": "2024-01-01T07:30:00.000Z"
}
```

**Trigger:** Verifikasi absensi selesai dengan status VALID atau INVALID

**Handler Frontend:**
- `attendanceStore.pushRealtimeEvent(event)`
- Membuat notifikasi toast
- Merefresh history jika di halaman history
- Mengupdate ringkasan dashboard

---

### `attendance:update`

**Tujuan:** Memberi tahu saat status sesi absensi berubah.

**Payload:**
```json
{
  "sessionId": "uuid",
  "status": "COMPLETED",
  "previousStatus": "PROCESSING"
}
```

**Trigger:** Sesi bertransisi antar state (CREATED → READY → PROCESSING → COMPLETED)

---

### `rfid:new`

**Tujuan:** Memberi tahu saat kartu RFID dipindai.

**Payload:**
```json
{
  "uid": "A1B2C3D4",
  "deviceCode": "ESP8266-MASTER-01",
  "registered": true,
  "employee_name": "Budi Santoso",
  "timestamp": "2024-01-01T07:30:00.000Z"
}
```

**Trigger:** ESP8266 mengirim POST ke `/api/v1/attendance/rfid`

---

### `registration:image`

**Tujuan:** Memberi tahu frontend saat gambar registrasi wajah diterima dari ESP32-CAM.

**Payload:**
```json
{
  "uid": "A1B2C3D4",
  "imagePath": "uploads/reg-abc-123.jpg",
  "timestamp": "2024-01-01T07:30:00.000Z"
}
```

**Trigger:** ESP32-CAM mengirim gambar dengan header `X-Purpose: registration`

---

### `device:status`

**Tujuan:** Memberi tahu saat perangkat online atau offline.

**Payload:**
```json
{
  "deviceCode": "ESP32CAM-MASTER-01",
  "type": "FACE_SCANNER",
  "status": "ONLINE",
  "lastSeenAt": "2024-01-01T07:30:00.000Z"
}
```

**Trigger:** Heartbeat perangkat diterima, atau perangkat tidak terlihat >60 detik

---

### `session:created`

**Tujuan:** Memberi tahu saat sesi absensi baru dibuat.

**Payload:**
```json
{
  "sessionId": "uuid",
  "rfid_uid": "A1B2C3D4",
  "pairingKey": "ROOM-1",
  "status": "CREATED"
}
```

---

## 10.6 Alur Event

### Alur Pembuatan Absensi

```
1. ESP8266 POST RFID → Gateway
2. Gateway buat sesi → emit `session:created` via EventEmitter
3. EventEmitter → Socket.IO → Frontend
4. ESP32-CAM POST wajah → Gateway
5. Gateway tambah wajah ke sesi → emit `attendance:update` (status=READY)
6. Verifikasi proses → emit `attendance:update` (status=PROCESSING)
7. Verifikasi selesai → emit `attendance:new` dengan record lengkap
8. Frontend terima `attendance:new` → tambah ke history, tampilkan toast
```

### Alur Status Perangkat

```
1. ESP32-CAM POST heartbeat setiap 30s → Gateway
2. Gateway update status → emit `device:status` via EventEmitter
3. EventEmitter → Socket.IO → Frontend
4. Frontend update DeviceOverview component

Jika tidak ada heartbeat >60s:
5. Sistem tandai perangkat sebagai OFFLINE
6. Gateway emit `device:status` (status=OFFLINE)
7. Frontend tampilkan toast "Perangkat offline"
```

## 10.7 SSE Fallback

Selain Socket.IO, sistem mendukung SSE via endpoint `/api/v1/attendance/stream`.

**URL:** `GET /api/v1/attendance/stream`
**Auth:** JWT required
**Content-Type:** `text/event-stream`

**Client:** Library `@microsoft/fetch-event-source`

**Tujuan:** Fallback saat koneksi WebSocket dibatasi (misal: proxy korporat)

## 10.8 Jembatan EventEmitter (`src/shared/realtime/realtime-events.ts`)

Backend menggunakan Node.js `EventEmitter` sebagai message bus internal:

```typescript
const realtimeEvents = new EventEmitter();
// Event: attendance:new, attendance:update, rfid:new,
//        registration:image, device:status, session:created
```

**Alur:**
1. Service layer emit event pada `realtimeEvents` EventEmitter
2. Gateway `realtime.ts` mendengarkan EventEmitter dan meneruskan ke Socket.IO
3. Baik gRPC handler maupun HTTP controller bisa emit event

## 10.9 Ringkasan Event Socket.IO

| Event | Arah | Dipicu Oleh | Diterima Oleh | Isi Payload |
|-------|------|-------------|---------------|-------------|
| `attendance:new` | Server → Client | Verifikasi selesai | Frontend | Record absensi lengkap |
| `attendance:update` | Server → Client | Perubahan state sesi | Frontend | sessionId, status |
| `rfid:new` | Server → Client | Pemindaian RFID | Frontend | uid, deviceCode, karyawan |
| `registration:image` | Server → Client | Capture registrasi | Frontend | uid, imagePath |
| `device:status` | Server → Client | Heartbeat/timeout | Frontend | deviceCode, status |
| `session:created` | Server → Client | Sesi baru | Frontend | sessionId, status |
| `subscribe:attendance` | Client → Server | Frontend mount | Server | — |
| `subscribe:device` | Client → Server | Frontend mount | Server | — |
