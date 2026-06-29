# Panduan Troubleshooting

## 16.1 Masalah Backend

### Server Tidak Mau Start
**Gejala:** `npm run dev` gagal, tidak ada log atau error.

**Penyebab & Solusi:**
1. **Port sudah digunakan:**
   ```
   Error: listen EADDRINUSE :::3000
   ```
   Solusi: Matikan proses lain di port tersebut atau ganti PORT di `.env`.

2. **Node.js versi salah:**
   ```
   Error: Requires Node.js v18 or higher
   ```
   Solusi: Update Node.js ke v18+.

3. **Environment variable tidak lengkap:**
   ```
   Error: Zod validation failed: JWT_SECRET is required
   ```
   Solusi: Pastikan file `.env` ada dan berisi semua variabel yang diperlukan.

### SQLite Database Error
**Gejala:** Error saat akses database.

**Penyebab & Solusi:**
1. **File database terkunci:**
   ```
   Error: SQLITE_BUSY: database is locked
   ```
   Solusi: Hentikan proses lain yang mengakses file SQLite. Hapus file `storage/rfid_v3.sqlite` dan restart.

2. **Directory storage tidak ada:**
   ```
   Error: ENOENT: no such file or directory, open 'storage/rfid_v3.sqlite'
   ```
   Solusi: Buat direktori `storage/` secara manual.

3. **Korupsi database:**
   Solusi: Hapus file `storage/rfid_v3.sqlite` dan restart server. Database akan dibuat ulang.

### JWT Error
**Gejala:** Tidak bisa login atau token tidak valid.

**Penyebab & Solusi:**
1. **JWT_SECRET berubah:** Semua token yang ada menjadi invalid.
   Solusi: Login ulang untuk mendapatkan token baru.

2. **Token expired:**
   Solusi: Login ulang. Atau perpanjang `JWT_EXPIRES_IN` di `.env`.

### gRPC Connection Error
**Gejala:** Error komunikasi antara Gateway dan gRPC Server.

**Penyebab & Solusi:**
1. **gRPC port berbeda:**
   ```
   Error: 14 UNAVAILABLE: failed to connect to all addresses
   ```
   Solusi: Pastikan `GRPC_PORT` sama di Gateway dan gRPC server config.

2. **Proto file tidak ditemukan:**
   ```
   Error: ENOENT: no such file or directory, open 'src/proto/platform.proto'
   ```
   Solusi: Jalankan dari root proyek, bukan dari subdirektori.

## 16.2 Masalah Frontend

### Halaman Kosong (Blank Page)
**Gejala:** Browser menampilkan halaman putih.

**Penyebab & Solusi:**
1. **Build error:** Cek console browser untuk error JavaScript.
2. **API_BASE_URL salah:** Pastikan `.env` di frontend memiliki `VITE_API_BASE_URL=http://localhost:3000`.
3. **CORS error:** Pastikan backend mengizinkan origin frontend.

### Socket.IO Tidak Connect
**Gejala:** Data real-time tidak muncul.

**Penyebab & Solusi:**
1. **Backend tidak jalan:** Pastikan server backend berjalan.
2. **Firewall blocking:** Buka port 3000 di firewall.
3. **Proxy issue:** Jika menggunakan Nginx, pastikan konfigurasi WebSocket benar.

### Login Tidak Bisa
**Gejala:** Error "Email atau password salah".

**Penyebab & Solusi:**
1. **Admin belum di-seed:** Jalankan `npm run seed:admin`.
2. **Kredensial salah:** Default admin: `admin@rfid.com` / `password123`.
3. **Reset password:** Jalankan `npm run reset:admin`.

## 16.3 Masalah ESP8266

### Tidak Connect WiFi
**Gejala:** ESP8266 tidak terhubung ke jaringan.

**Penyebab & Solusi:**
1. **SSID/Password salah:** Masuk ke portal konfigurasi (192.168.4.1) dan perbaiki.
2. **Sinyal WiFi lemah:** Dekatkan ESP8266 ke router.
3. **Mode AP tidak muncul:** Reset ESP8266 dengan tombol reset.

### Tidak Bisa Baca RFID
**Gejala:** Kartu RFID tidak terdeteksi.

**Penyebab & Solusi:**
1. **Koneksi MFRC522 longgar:** Periksa kabel SPI.
2. **Kartu tidak kompatibel:** Pastikan kartu adalah kartu RFID 13.56MHz (MIFARE).
3. **MFRC522 rusak:** Ganti modul MFRC522.
4. **Debug:** Buka Serial Monitor Arduino IDE (baud 115200) untuk melihat log.

### LCD Tidak Menampilkan Apa-apa
**Gejala:** LCD gelap atau hanya menampilkan kotak.

**Penyebab & Solusi:**
1. **Kontras salah:** Atur trimpot pada LCD (jika ada).
2. **Alamat I2C salah:** Coba alamat 0x27 atau 0x3F. Scan I2C dengan sketch contoh.
3. **Koneksi longgar:** Periksa kabel SDA/SCL/VCC/GND.

### ESP8266 Crash/Restart Loop
**Gejala:** ESP8266 restart terus-menerus.

**Penyebab & Solusi:**
1. **Power tidak cukup:** Gunakan adaptor 5V/2A, jangan dari USB komputer.
2. **SoftwareSerial conflict:** Pastikan pin RX/TX tidak bentrok.
3. **Heap memory habis:** Kurangi penggunaan String, gunakan char array.

## 16.4 Masalah ESP32-CAM

### Tidak Bisa Upload Firmware
**Gejala:** Gagal flashing di Arduino IDE.

**Penyebab & Solusi:**
1. **GPIO0 tidak di-GND:** Hubungkan GPIO0 ke GND saat flashing.
2. **Salah board:** Pastikan pilih "AI Thinker ESP32-CAM".
3. **Driver serial tidak ada:** Install driver CP2102 atau CH340.

### Gambar Buram/Gelap
**Gejala:** Foto yang diambil tidak jelas.

**Penyebab & Solusi:**
1. **Kurang cahaya:** Pastikan lampu sekitar cukup atau flash LED menyala.
2. **Lensa kotor:** Bersihkan lensa dengan kain microfiber.
3. **Fokus salah:** Putar lensa sedikit untuk menyesuaikan fokus (lensa bisa diputar).

### ESP32-CAM Tidak Connect ke Backend
**Gejala:** ESP32-CAM tidak muncul di Device Overview.

**Penyebab & Solusi:**
1. **mDNS tidak bekerja:** Pastikan server backend dan ESP32-CAM di jaringan yang sama.
2. **mDNS tidak support di jaringan:** Gunakan IP static backend.
3. **Cek heartbeat:** Buka log Serial ESP32-CAM untuk melihat status koneksi.

### ESP32-CAM Overheat
**Gejala:** Chip ESP32 sangat panas.

**Penyebab & Solusi:**
1. **LED flash menyala terus:** Firmware harus mematikan flash setelah capture.
2. **Clock terlalu tinggi:** Turunkan XCLK frequency di firmware (dari 20MHz ke 10MHz).

## 16.5 Masalah Face Recognition

### Service Tidak Start
**Gejala:** Python service error saat startup.

**Penyebab & Solusi:**
1. **TensorFlow error:**
   ```
   ImportError: DLL load failed while importing _pywrap_tensorflow
   ```
   Solusi: Install Microsoft Visual C++ Redistributable. Atau gunakan TensorFlow versi CPU-only.

2. **Port 8000 sudah digunakan:**
   Solusi: Matikan proses lain di port 8000 atau ubah port.

3. **Memory tidak cukup:**
   ```
   Error: CUDA out of memory
   ```
   Solusi: Tutup aplikasi lain. Gunakan CPU-only TensorFlow.

### Face Recognition Lambat
**Gejala:** Proses verifikasi wajah memakan waktu >10 detik.

**Penyebab & Solusi:**
1. **CPU 100%:** Face recognition intensive. Gunakan GPU jika perlu.
2. **Model loading ulang:** Pastikan model di-load sekali saat startup, bukan per request.
3. **Image terlalu besar:** Downscale gambar ke 640x480 sebelum dikirim.

### False Positive (Salah Deteksi)
**Gejala:** Wajah orang berbeda dianggap cocok.

**Penyebab & Solusi:**
1. **Threshold terlalu rendah:** Naikkan `FACE_MATCH_THRESHOLD` di `.env` (default 0.45).
2. **Kualitas gambar buruk:** Pastikan pencahayaan cukup.
3. **Model tidak cocok:** Facenet128 sudah optimal, tapi bisa diganti dengan model DeepFace lain.

### False Negative (Tidak Terdeteksi)
**Gejala:** Wajah orang yang sama tidak dikenali.

**Penyebab & Solusi:**
1. **Threshold terlalu tinggi:** Turunkan `FACE_MATCH_THRESHOLD`.
2. **Perubahan drastis:** Rambut, janggut, kacamata baru bisa mempengaruhi.
3. **Sudut kamera berbeda:** Pastikan pengguna melihat ke kamera.

## 16.6 Masalah Jaringan

### ESP8266 Tidak Bisa Menemukan Server (mDNS)
**Gejala:** ESP8266 tidak bisa resolve hostname backend.

**Penyebab & Solusi:**
1. **mDNS tidak broadcast:** Beberapa jaringan (terutama enterprise) tidak support mDNS.
   Solusi: Gunakan IP static backend di konfigurasi ESP8266.
2. **Firewall blocking port 5353:** mDNS menggunakan UDP port 5353.
   Solusi: Buka port 5353 di firewall.

### Koneksi Intermiten
**Gejala:** Koneksi putus-nyambung.

**Penyebab & Solusi:**
1. **WiFi signal lemah:** Tambah access point atau pindahkan perangkat.
2. **Interferensi:** Hindari menempatkan ESP8266 dekat dengan perangkat listrik besar.
3. **Channel WiFi sibuk:** Ganti channel WiFi di router.

## 16.7 Log Penting

### Lokasi Log
- **Backend Node.js:** Stdout (console). Bisa redirect ke file: `npm run dev > app.log 2>&1`
- **Python Face Service:** Stdout. Bisa redirect: `python main.py > face.log 2>&1`
- **ESP8266:** Serial Monitor (baud 115200)
- **ESP32-CAM:** Serial Monitor (baud 115200)

### Log Level
Set `LOG_LEVEL` di `.env`:
- `error` - Hanya error
- `warn` - Error + warning
- `info` - Normal (default)
- `debug` - Semua detail

## 16.8 Factory Reset

### Reset ESP8266
1. Hubungkan GPIO0 ke GND
2. Tekan tombol RESET
3. Upload firmware baru via Arduino IDE
4. Lepaskan GPIO0 dari GND
5. ESP8266 akan masuk mode AP untuk konfigurasi ulang

### Reset Database
```bash
# Hentikan server
# Hapus file database
rm storage/rfid_v3.sqlite
# Restart server (database akan dibuat ulang)
npm run dev
```
