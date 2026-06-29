# Praktik Terbaik

## 17.1 Keamanan

### JWT & Autentikasi
- **Ganti JWT_SECRET default:** Jangan gunakan `change-me` atau `password123` di production
- **Set JWT expiry wajar:** `8h` untuk shift kerja, jangan lebih dari 24 jam
- **Gunakan HTTPS** jika sistem diakses dari luar jaringan lokal
- **Jangan simpan password plaintext:** Gunakan bcrypt dengan cost factor 10+

### Environment Variables
- **Jangan commit `.env`** ke repository. Gunakan `.env.example` sebagai template
- **Gunakan file `.env` terpisah** untuk setiap environment (development, staging, production)
- **Restrict file permission**: `chmod 600 .env` di Linux

### API Security
- **Validasi semua input** menggunakan Zod schema di DTO layer
- **Rate limiting** untuk endpoint publik (login, register) jika diperlukan
- **CORS ketat:** Di production, set origin spesifik, jangan `*`
- **Helmet middleware:** Sudah terpasang, pastikan aktif di semua environment

### Firmware Security
- **Ganti password AP default** pada konfigurasi ESP8266
- **Gunakan pairing key** yang unik untuk setiap device
- **Jangan hardcode kredensial** di firmware; gunakan LittleFS config file
- **Update firmware** secara berkala untuk patch keamanan

## 17.2 Performa

### Backend
- **Database indexing:** Pastikan kolom yang sering di-query memiliki index (rfid_uid, device_code, employee_id)
- **Connection pool:** SQL.js single-connection, jadi hindari query paralel yang berat
- **Cache face descriptor** di memory untuk karyawan yang sering absen
- **Batch processing:** Jika ada ribuan record attendance, proses dalam batch

### Face Recognition
- **Pre-load model** saat startup, bukan per request
- **Downscale gambar** sebelum dikirim ke face service (960x720 sudah cukup)
- **Gunakan GPU** (CUDA) jika tersedia untuk mempercepat inferensi
- **Set timeout** yang wajar (15 detik) untuk face verification

### Frontend
- **Lazy loading** components dengan React.lazy() + Suspense
- **Virtual scroll** untuk daftar attendance history yang panjang (react-window)
- **Debounce search** input untuk menghindari terlalu banyak request API
- **Cache data** yang jarang berubah (employees, devices) di memory

### ESP8266
- **Gunakan deep sleep** jika tidak ada aktivitas (untuk battery-powered)
- **Batch heartbeat:** Jangan kirim heartbeat setiap detik; 30-60 detik sudah cukup
- **Hindari String concatenation:** Gunakan sprintf atau char array untuk menghemat heap

## 17.3 Reliabilitas

### Error Handling
- **Semua async handler** harus di-wrap dengan `asyncHandler` middleware
- **Graceful shutdown:** Tangkap SIGTERM/SIGINT untuk cleanup database
- **Retry logic** untuk face verification gagal (sudah ada scheduler otomatis)
- **Logging terstruktur** dengan Pino untuk debugging mudah

### Database
- **Backup database** secara berkala (cron job untuk copy file .sqlite)
- **Test recovery:** Pastikan backup bisa di-restore
- **WAL mode** sudah diaktifkan untuk performa read concurrent
- **Jangan hapus file database** tanpa backup

### Firmware
- **Watchdog timer** aktif untuk mengatasi hang
- **Fallback config:** Jika LittleFS corrupt, gunakan default values
- **Reconnect logic:** Auto-retry koneksi WiFi dan HTTP

## 17.4 Pengembangan

### Code Organization
- **Ikuti Clean Architecture:** Jangan campur logic bisnis di controller
- **Satu file satu tanggung jawab:** Controller hanya handle routing, service untuk logic
- **Gunakan DTO pattern:** Validasi input di DTO layer, bukan di service
- **TypeScript strict mode** sudah diaktifkan; jangan gunakan `any`

### Git Workflow
- **Commit message deskriptif:** `feat: add face verification retry scheduler`
- **Branch naming:** `feature/xxx`, `fix/xxx`, `refactor/xxx`
- **Jangan commit file besar:** Tambahkan `*.sqlite`, `.env`, `node_modules/` ke `.gitignore`
- **Review sebelum merge:** Pastikan tidak ada kode yang di-comment

### Testing
- **Unit test** untuk service layer (Jest)
- **Integration test** untuk API endpoints
- **Test edge cases:** RFID tidak terdaftar, face mismatch, token expired
- **Jangan test library code:** Fokus test business logic sendiri

## 17.5 Hardware

### Wiring & Cabling
- **Gunakan kabel berkualitas** untuk koneksi SPI (max 10cm untuk MFRC522)
- **Berikan kapasitor 100µF** di VCC ESP8266 untuk filtering power
- **Pull-up resistor** untuk SDA/SCL I2C (4.7kΩ ke 3.3V)
- **Aktifkan internal pull-up** ESP8266 untuk pin yang tidak terpakai

### ESP32-CAM Specific
- **Heat sink** untuk ESP32 jika beroperasi terus-menerus
- **Flash LED resistor:** Gunakan resistor 100Ω seri dengan LED flash
- **Antenna eksternal** jika ESP32-CAM ditempatkan di dalam housing logam
- **PSRAM:** Pastikan PSRAM diaktifkan di menu config Arduino IDE

## 17.6 Operasional

### Monitoring
- **Cek device heartbeat** secara rutin. Jika ada device OFFLINE >5 menit, investigasi
- **Monitor disk usage:** File gambar wajah bisa membesar seiring waktu
- **Log rotation:** Backup dan hapus log lama secara periodik
- **Alerting:** Setup notifikasi jika face service down

### Maintenance
- **Bersihkan lensa kamera** setiap minggu
- **Update firmware** jika ada perbaikan bug
- **Hapus data attendance lama** secara periodik (archive ke file terpisah)
- **Test backup database** setiap bulan

### Scaling
- **Satu ESP8266 + ESP32-CAM** per pintu/ruangan
- **Pairing key unik** untuk setiap pasangan device
- **Multi-device:** Backend support banyak device secara native
- **Database growth:** SQLite cukup untuk >100.000 record. Jika lebih, migrasi ke PostgreSQL

## 17.7 Troubleshooting Checklist

Jika sistem bermasalah, periksa dalam urutan ini:

1. **Power:** Semua perangkat menyala? (LED indikator?)
2. **Jaringan:** ESP8266 terhubung ke WiFi? Bisa ping ke server?
3. **Backend:** Server running? Cek log.
4. **Face Service:** Python service running? Cek port 8000.
5. **Database:** File SQLite ada? Ukuran wajar?
6. **RFID Reader:** Kartu terdeteksi? Cek Serial Monitor.
7. **ESP32-CAM:** Foto terkirim? Cek log serial.
8. **Socket.IO:** Frontend terhubung? Cek tab Network browser.
