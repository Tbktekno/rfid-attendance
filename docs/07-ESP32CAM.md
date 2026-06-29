# Dokumentasi Firmware ESP32-CAM

## 7.1 Gambaran Umum

Firmware ESP32-CAM berjalan di modul **ESP32-CAM** dan berfungsi sebagai **Kamera Pengambil Wajah**. Menerima perintah dari ESP8266 melalui koneksi serial, mengambil gambar wajah, dan mengirimnya ke server backend via HTTP.

**Komponen Hardware:**
- **MCU:** ESP32 (ESP32-CAM module)
- **Kamera:** OV2640 (2MP)
- **LED Flash:** GPIO4
- **PSRAM:** Opsional (2MB jika tersedia)
- **Serial:** Hardware Serial2 untuk komunikasi ESP8266

**Pemetaan Pin (Kamera OV2640):**

| Sinyal | GPIO | Sinyal | GPIO |
|--------|------|--------|------|
| PWDN | 32 | Y2 | 5 |
| RESET | -1 (NC) | Y3 | 18 |
| XCLK | 0 | Y4 | 19 |
| SIOD | 26 | Y5 | 21 |
| SIOC | 27 | Y6 | 36 |
| Y9 | 35 | Y7 | 39 |
| Y8 | 34 | Y8 | 34 |
| VSYNC | 25 | PCLK | 22 |
| HREF | 23 | FLASH | 4 |

## 7.2 File: `firmware/esp32cam_face_firmware.ino`

**Lokasi:** `I:\rfid_v3\firmware\esp32cam_face_firmware.ino`
**Jumlah Baris:** 398

**Tujuan:** Firmware utama untuk modul pengambil wajah ESP32-CAM dengan streaming HTTP ke backend, monitoring heartbeat, kontrol flash, dan pemrosesan perintah serial dari ESP8266.

### 7.2.1 Library yang Digunakan

| Library | Tujuan |
|---------|--------|
| `esp_camera.h` | Driver kamera ESP32 |
| `WiFi.h` | Konektivitas WiFi |
| `HTTPClient.h` | Request HTTP ke backend |
| `ArduinoJson.h` | Serialisasi/deserialisasi JSON |
| `LittleFS.h` | Filesystem untuk penyimpanan konfigurasi |
| `ESPmDNS.h` | Penemuan layanan mDNS |

### 7.2.2 Konstanta & Definisi

```cpp
#define FLASH_GPIO_NUM 4      // LED Flash
#define RX2_PIN 13             // Serial2 RX (dari ESP8266)
#define TX2_PIN 12             // Serial2 TX (ke ESP8266)
#define MAX_WIFI 2             // Maksimal jaringan WiFi
```

### 7.2.3 Variabel Global

| Variabel | Tipe | Tujuan |
|----------|------|--------|
| `wifiNetworks[2]` | `WiFiNetwork[]` | Array kredensial WiFi |
| `serverHostname` | `String` | Hostname mDNS (default: "attendtrack") |
| `serverPort` | `int` | Port server backend (default: 3000) |
| `deviceCode` | `String` | Identitas perangkat |
| `pairingKey` | `String` | Kunci pemasangan ruangan |
| `resolvedServerUrl` | `String` | URL lengkap setelah resolusi mDNS |
| `waitingForConfig` | `bool` | Apakah menunggu konfigurasi dari ESP8266 |
| `lastHeartbeat` | `unsigned long` | Timestamp heartbeat terakhir |

### 7.2.4 Fungsi

#### `void loadConfig()`

**Tujuan:** Memuat konfigurasi perangkat dari LittleFS `/config.json`.

**Alur:**
1. Mount LittleFS (format jika gagal)
2. Cek apakah `/config.json` ada
3. Jika ada, parse JSON dan populasi:
   - `wifiNetworks[]`
   - `serverHostname`, `serverPort`
   - `deviceCode` — auto-konversi prefix ESP8266 ke ESP32CAM (contoh: "ESP8266-MASTER-01" → "ESP32CAM-MASTER-01")
   - `pairingKey`
4. Jika tidak ditemukan, gunakan default

**Dipanggil oleh:** `setup()`

---

#### `void saveConfigFromJSON(String jsonStr)`

**Tujuan:** Menyimpan konfigurasi yang diterima dari ESP8266 via serial.

**Input:** String JSON dari ESP8266 (dikirim sebagai `SYNC_JSON|{json}`)

**Alur:**
1. Parse JSON
2. Simpan JSON mentah ke LittleFS `/config.json`
3. Cetak "New config saved from ESP8266! Rebooting..."
4. Tunggu 1 detik
5. Reboot ESP32 (`ESP.restart()`)

**Dipanggil oleh:** `loop()` saat perintah `SYNC_JSON|` diterima

---

#### `bool connectWiFi()`

**Tujuan:** Mencoba terhubung ke jaringan WiFi yang dikonfigurasi.

**Alur:**
1. Set mode WiFi ke STA
2. Iterasi melalui `wifiNetworks[]`
3. Untuk setiap jaringan:
   - Panggil `WiFi.begin()`
   - Kedipkan LED flash selama koneksi
   - Tunggu hingga 10 detik
   - Jika terhubung, matikan flash, return `true`
4. Return `false` jika semua gagal

**Pola Kedip:** LED flash toggle setiap 500ms selama koneksi

**Dipanggil oleh:** `setup()`, `loop()` (reconnection)

---

#### `void resolveBackend()`

**Tujuan:** Menemukan server backend menggunakan mDNS.

**Alur:**
1. Inisialisasi mDNS responder
2. Query untuk service `_attendtrack._tcp` (hingga 5 attempts)
3. Jika ditemukan:
   - Simpan `resolvedServerUrl`
   - Nyalakan LED flash solid selama 2 detik (indikator siap)
4. Jika tidak ditemukan: lanjutkan dengan URL kosong

**Dipanggil oleh:** `setup()`, `loop()` (re-discovery)

---

#### `void initCamera()`

**Tujuan:** Inisialisasi kamera OV2640 dengan pengaturan optimal.

**Konfigurasi Kamera:**
```cpp
config.xclk_freq_hz = 20000000;     // Clock 20MHz
config.pixel_format = PIXFORMAT_JPEG;  // Output JPEG

if (psramFound()) {
    config.frame_size = FRAMESIZE_SVGA;   // 800×600
    config.jpeg_quality = 10;              // Kualitas tinggi
    config.fb_count = 2;                   // Double buffer
} else {
    config.frame_size = FRAMESIZE_VGA;    // 640×480
    config.jpeg_quality = 12;              // Kualitas standar
    config.fb_count = 1;                   // Single buffer
}
```

**Penyesuaian Kualitas:**
- Dengan PSRAM: SVGA (800×600), quality 10, double buffer
- Tanpa PSRAM: VGA (640×480), quality 12, single buffer

**Penanganan Error:** Jika inisialisasi kamera gagal, tunggu 3 detik dan reboot.

**Dipanggil oleh:** `setup()`

---

#### `void sendHeartbeat()`

**Tujuan:** Mengirim heartbeat periodik ke backend untuk menunjukkan perangkat online.

**Alur:**
1. Cek WiFi dan server URL
2. POST ke `/api/v1/devices/heartbeat`
3. Payload: `{ "deviceCode": "...", "type": "ESP32CAM" }`
4. Log kode response

**Headers:** `Content-Type: application/json`
**Timeout:** 3 detik
**Interval:** 30 detik

**Dipanggil oleh:** `loop()` setiap 30 detik

---

#### `void captureAndSend(String uid)`

**Tujuan:** Mengambil gambar wajah dan mengirim ke backend untuk verifikasi absensi.

**Input:** `uid` — UID RFID yang terkait dengan pengambilan ini

**Alur:**
```
1. Nyalakan LED flash
2. Tunggu 800ms (stabilisasi pencahayaan)
3. Flush frame buffer lama:
   a. Ambil dan discard dummy frame 1
   b. Ambil dan discard dummy frame 2
   c. Tunggu 50ms
4. Capture frame baru: camera_fb_t *fb = esp_camera_fb_get()
5. Matikan LED flash
6. Jika capture gagal:
   - Kirim "RESULT|FAILED" ke ESP8266 via Serial2
   - Return
7. Jika WiFi terhubung dan server ter-resolve:
   a. POST ke /api/v1/attendance/face
   b. Headers:
      - Content-Type: application/octet-stream
      - X-UID: {uid}
      - X-Device-Code: {deviceCode}
      - X-Pairing-Key: {pairingKey}
   c. Body: byte JPEG mentah (fb->buf, fb->len)
   d. Timeout: 20 detik
   e. Jika sukses (200/201) → Kirim "RESULT|SUCCESS" ke ESP8266
   f. Jika gagal → Kirim "RESULT|FAILED" ke ESP8266
8. Kembalikan frame buffer
```

**Kualitas Gambar:** JPEG dengan pengaturan kualitas dari `initCamera()` (10 atau 12)

**Dipanggil oleh:** `loop()` saat perintah `CAPTURE|UID` diterima dari ESP8266

---

#### `void captureAndSendRegistration(String uid)`

**Tujuan:** Mengambil gambar wajah untuk pendaftaran karyawan BARU (belum ada wajah terdaftar).

**Input:** `uid` — UID RFID untuk karyawan baru

**Alur:** Sama dengan `captureAndSend()` tetapi dengan header berbeda:

**Headers:**
- `Content-Type: application/octet-stream`
- `X-UID: {uid}`
- `X-Purpose: registration`  ← **Membedakan dari capture absensi**
- `X-Device-Code: {deviceCode}`
- `X-Pairing-Key: {pairingKey}`

**Perbedaan Utama dari `captureAndSend()`:**
- Mengirim header `X-Purpose: registration`
- Backend tahu untuk membuat record karyawan, bukan verifikasi absensi
- Tidak ada pesan `RESULT` yang dikirim kembali ke ESP8266

**Dipanggil oleh:** `loop()` saat perintah `REGISTER_CAPTURE|UID` diterima

---

#### `void setup()`

**Tujuan:** Inisialisasi semua hardware dan konektivitas.

**Alur:**
```
1. Inisialisasi Serial (115200 debug) dan Serial2 (9600, komunikasi ESP8266)
2. Konfigurasi pin LED flash sebagai OUTPUT, matikan
3. initCamera()
4. loadConfig()
5. Cek apakah ada WiFi dikonfigurasi
6. Jika WiFi dikonfigurasi dan koneksi berhasil:
   - resolveBackend()
7. Jika tidak ada WiFi atau koneksi gagal:
   - Set waitingForConfig = true
   - Cetak "Waiting for config from ESP8266..."
```

---

#### `void loop()`

**Tujuan:** Loop utama program — memproses perintah serial, menangani heartbeat, mengelola konektivitas.

**Alur:**
```
1. Cek Serial2 untuk perintah dari ESP8266:
   a. Jika "SYNC_JSON|{json}" → saveConfigFromJSON(json)
   b. Jika "CAPTURE|{uid}" dan NOT waitingForConfig → captureAndSend(uid)
   c. Jika "REGISTER_CAPTURE|{uid}" dan NOT waitingForConfig → captureAndSendRegistration(uid)
   
2. Jika waitingForConfig:
   - Return segera (tidak melakukan apa-apa, tunggu config dari ESP8266)
   
3. Setiap 30 detik (millis() - lastHeartbeat > 30000):
   - sendHeartbeat()
   - Update lastHeartbeat
   
4. Cek konektivitas WiFi:
   - Jika terputus:
     - Coba connectWiFi()
     - Jika gagal lagi → waitingForConfig = true
     - Jika berhasil → resolveBackend()
```

## 7.3 Konfigurasi Kamera Detail

### Pengaturan Resolusi

| PSRAM | Resolusi | Kualitas | Buffer | Perkiraan Ukuran |
|-------|----------|----------|--------|-----------------|
| Tersedia | SVGA (800×600) | 10 | 2 frame | ~30-50KB per JPEG |
| Tidak Tersedia | VGA (640×480) | 12 | 1 frame | ~20-40KB per JPEG |

### Flushing Frame Buffer

Double-buffer di-flush sebelum capture untuk memastikan gambar segar:
```cpp
camera_fb_t *dummy_fb = esp_camera_fb_get();
if (dummy_fb) esp_camera_fb_return(dummy_fb);
// Ulangi untuk buffer kedua (jika fb_count = 2)
```

Ini mencegah frame basi terkirim saat ESP32-CAM telah idle.

## 7.4 Protokol Serial (dari ESP8266)

Perintah diterima via Hardware Serial2 (9600 baud):

| Perintah | Format | Handler |
|----------|--------|---------|
| CAPTURE | `CAPTURE|{UID}\n` | `captureAndSend(uid)` |
| REGISTER_CAPTURE | `REGISTER_CAPTURE|{UID}\n` | `captureAndSendRegistration(uid)` |
| SYNC_JSON | `SYNC_JSON|{json}\n` | `saveConfigFromJSON(json)` |

Response yang dikirim kembali:
| Response | Kondisi |
|----------|---------|
| `RESULT|SUCCESS\n` | HTTP upload mengembalikan 200/201 |
| `RESULT|FAILED\n` | HTTP upload gagal atau capture gagal |

## 7.5 Endpoint HTTP yang Dipanggil

| Endpoint | Method | Tujuan | Timeout |
|----------|--------|--------|---------|
| `/api/v1/attendance/face` | POST | Kirim gambar wajah untuk diproses | 20s |
| `/api/v1/devices/heartbeat` | POST | Keepalive perangkat | 3s |

## 7.6 Pemulihan Error

| Skenario | Perilaku |
|----------|----------|
| Inisialisasi Kamera Gagal | Reboot setelah 3 detik |
| Capture Gagal | Kirim `RESULT|FAILED` ke ESP8266 |
| HTTP Upload Gagal | Kirim `RESULT|FAILED` ke ESP8266 |
| WiFi Terputus | Coba reconnect, fallback ke mode tunggu config |
| Semua WiFi Gagal | `waitingForConfig = true`, tunggu config dari ESP8266 |
| LED Flash | Kedip selama koneksi WiFi, solid 2s saat terhubung |
