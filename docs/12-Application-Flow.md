# Alur Aplikasi Lengkap

## 12.1 Alur Login

```
1. User buka browser → navigasi ke http://{server-ip}:5173
2. React app load → main.tsx render App di dalam BrowserRouter
3. App.tsx cek token auth yang ada di localStorage
4. Jika TIDAK ada token → redirect ke /login
5. LoginPage render dengan form email/password
6. User masukkan kredensial → klik Login
7. Frontend panggil POST /api/v1/auth/login
   → Gateway terima request
   → Gateway panggil AuthService.Login via gRPC
   → AuthService validasi kredensial (bcrypt compare)
   → AuthService generate token JWT
   → Kembalikan { token, user }
8. Frontend simpan token + user di authStore (Zustand)
9. authStore persist ke localStorage("rfid-v3-auth")
10. React Router navigasi ke / (Dashboard)
11. App.tsx render AppShell dengan Sidebar + Topbar
12. Hook useBootstrapData() jalan:
    - Fetch employees, devices, sessions, history secara paralel
    - Populasi attendanceStore
13. Hook useRealtimeAttendance() jalan:
    - Konek Socket.IO ke backend
    - Subscribe ke event attendance:new, device:status
14. DashboardPage render SummaryStrip + LiveFeed + DeviceOverview
```

## 12.2 Alur Absensi RFID (Alur Inti)

Ini adalah alur paling kritis dalam sistem:

```
1. HARDWARE: User tap kartu RFID di MFRC522 reader
2. ESP8266 deteksi kartu → baca UID (misal: "A1B2C3D4")
3. ESP8266 beep (100ms) → tampilkan "Memproses..." di LCD
4. ESP8266 POST ke /api/v1/attendance/check-rfid
   Body: { "uid": "A1B2C3D4", "deviceCode": "ESP8266-MASTER-01", "pairingKey": "ROOM-1" }
5. GATEWAY terima request
   → Panggil AttendanceService.CheckRfid via gRPC
   → EmployeeRepository.findByRfid("A1B2C3D4")
   
   KASUS A: RFID TIDAK TERDAFTAR
   ├── Response: { "registered": false, "action": "REGISTER_CAPTURE" }
   ├── ESP8266 lihat action "REGISTER_CAPTURE"
   ├── Kirim "REGISTER_CAPTURE|A1B2C3D4" ke ESP32-CAM via Serial
   ├── ESP32-CAM:
   │   - Nyalakan flash LED
   │   - Tunggu 800ms
   │   - Flush frame buffer
   │   - Capture foto
   │   - POST ke /api/v1/attendance/face
   │     Headers: X-Purpose: registration, X-UID: A1B2C3D4
   │     Body: byte JPEG mentah
   ├── Gateway:
   │   - Simpan gambar ke storage/uploads/
   │   - Emit "registration:image" via Socket.IO
   │   - Panggil FaceRecognitionClient.encodeFace()
   │   - Buat employee dengan RFID + face descriptor
   └── Frontend tampilkan notifikasi registrasi karyawan baru
   
   KASUS B: RFID TERDAFTAR (ALUR NORMAL)
   ├── Response: { "registered": true }
   ├── ESP8266 tampilkan "Mengambil Foto.." di LCD
   ├── Kirim "CAPTURE|A1B2C3D4" ke ESP32-CAM via Serial
   ├── ESP32-CAM:
   │   - Nyalakan flash LED
   │   - Flush frame buffer (2 frame)
   │   - Capture frame baru
   │   - Matikan flash LED
   │   - POST ke /api/v1/attendance/face
   │     Headers: X-UID: A1B2C3D4, X-Purpose: attendance
   │
   ├── GATEWAY terima gambar wajah
   │   - Simpan gambar ke storage/uploads/{uuid}.jpg
   │   - Buat sesi absensi (status: CREATED)
   │   - Cari sesi cocok berdasarkan pairingKey + time window
   │   - Update sesi status ke READY
   │   - Emit session:created via Socket.IO
   │
   ├── ESP8266 POST ke /api/v1/attendance/rfid (timeout 25s)
   │   Body: { "uid": "A1B2C3D4", ... }
   │
   ├── GATEWAY proses RFID untuk verifikasi
   │   - Cari sesi berdasarkan pairingKey
   │   - Cari karyawan berdasarkan UID RFID
   │   - Ambil face descriptor tersimpan
   │   - Panggil FaceRecognitionClient.verifyFace()
   │     → POST ke Python service /verify
   │     → Payload: captured image + reference descriptor
   │     → Python: detect face → embed → cosine distance
   │     → Return: { isMatch, distance, confidence }
   │
   ├── Jika COCOK (distance <= 0.45):
   │   - Sesi status: COMPLETED
   │   - Record absensi: VALID
   │   - Hitung punctuality dari system settings
   │   - Tentukan kategori (ENTRY/EXIT by time)
   │   - Emit attendance:new via Socket.IO
   │   - Response 200 ke ESP8266: "Wajah Cocok! Verified"
   │   - LCD: "Wajah Cocok!" + beep panjang (500ms)
   │
   └── Jika TIDAK COCOK (distance > 0.45):
       - Sesi status: FAILED
       - Record absensi: INVALID
       - Emit attendance:new via Socket.IO
       - Response 400 ke ESP8266: "Wajah Tdk Cocok"
       - LCD: "Wajah Tdk Cocok" + 3 beep error

6. Setelah 3 detik → ESP8266 kembali ke idle screen
7. Kartu RFID di-halt → siap untuk scan berikutnya
```

## 12.3 Alur Dashboard

```
DashboardPage
│
├── SummaryStrip
│   ├── Hitung dari attendanceStore.summary()
│   ├── Tampilkan: Valid Hari Ini, Invalid, Total Scan, Perangkat Online
│   └── Update reaktif saat attendanceStore berubah
│
├── LiveFeed
│   ├── Tampilkan 5 record absensi terbaru
│   ├── Kolom: Foto, Nama, Departemen, Waktu, Kategori, Ketepatan, Status
│   └── Auto-update via event Socket.IO
│
└── DeviceOverview
    ├── Daftar semua perangkat terdaftar
    ├── Tampilkan status online/offline
    ├── Tampilkan alamat IP dari metadata
    └── Update via event device:status Socket.IO
```

## 12.4 Alur Riwayat Absensi

```
1. User klik "Log Presensi" di sidebar
2. Frontend navigasi ke /history
3. HistoryPage render HistoryFilters + HistoryTable
4. HistoryFilters inisialisasi:
   - Dropdown karyawan dari attendanceStore.employees
   - Month picker set ke bulan berjalan
   - Filter status: ALL
5. attendanceStore.fetchHistory() dipanggil:
   - GET /api/v1/attendance/history?page=1&pageSize=20&month=2024-01
   - Gateway → gRPC → AttendanceRepository query SQLite
   - Return paginated records dengan join employee
6. HistoryTable render baris dengan:
   - Nama hari (Indonesia)
   - Tanggal
   - Waktu
   - Badge kategori (Masuk/Pulang)
   - Badge ketepatan (Tepat Waktu/Terlambat)
   - Badge status (Sah/Tidak Sah)
7. User bisa filter berdasarkan karyawan, bulan, tanggal, status
   - Setiap perubahan filter trigger API call baru
8. User klik "Export PDF":
   - GET /api/v1/export/pdf?month=1&year=2024
   - Backend generate PDF menggunakan PDFMake
   - Response: application/pdf binary
   - Browser download file
```

## 12.5 Alur Manajemen Karyawan

```
1. User klik "Karyawan" di sidebar
2. Frontend navigasi ke /employees
3. EmployeesPage render:
   - Search bar
   - Tabel karyawan (nama, departemen, jabatan, RFID, status)
   - Tombol "Tambah Karyawan"
4. Menambah karyawan baru:
   a. Klik "Tambah Karyawan" → modal form terbuka
   b. Isi: Nama, Departemen, Jabatan
   c. Ketik atau scan UID RFID
   d. Capture wajah via webcam (getUserMedia)
   e. Klik "Simpan"
   f. POST /api/v1/employees (multipart/form-data)
   g. Backend:
      - Simpan file gambar
      - Kirim ke Python service /encode
      - Simpan employee dengan face descriptor
   h. Modal tutup → tabel refresh
5. Edit karyawan:
   a. Klik ikon edit → modal terbuka dengan data existing
   b. Ubah field
   c. Opsional recapture wajah
   d. PUT /api/v1/employees/:id
6. Hapus karyawan:
   a. Klik ikon hapus → dialog konfirmasi
   b. DELETE /api/v1/employees/:id
```

## 12.6 Alur Update Real-time ke Frontend

```
HOOK: useRealtimeAttendance()
│
├── Socket.IO konek ke backend
├── Subscribe ke:
│   ├── attendance:new
│   ├── attendance:update
│   ├── rfid:new
│   ├── registration:image
│   └── device:status
│
├── On attendance:new:
│   ├── attendanceStore.pushRealtimeEvent(event)
│   ├── Buat toast notification (pojok kanan atas, 5s auto-dismiss)
│   ├── Update history jika di halaman history
│   └── Update ringkasan dashboard
│
├── On device:status:
│   ├── Update device di attendanceStore.devices
│   ├── Jika OFFLINE → tampilkan warning toast
│   └── Update DeviceOverview component
│
└── On registration:image:
    ├── Update halaman employees dengan gambar baru
    └── Tampilkan notifikasi sukses
```

## 12.7 Alur Monitoring Perangkat

```
1. User klik "Monitor" di sidebar
2. MonitoringPage render SessionMonitor
3. SessionMonitor fetch sesi aktif
   GET /api/v1/attendance/sessions?status=READY
4. Setiap kartu sesi tampilkan:
   - Gambar wajah (jika sudah di-capture)
   - UID RFID
   - Status (CREATED → READY → PROCESSING → COMPLETED)
   - Timer (waktu sejak pembuatan)
5. Update real-time via Socket.IO
6. Saat sesi selesai → kartu update status
   - Jika VALID: border hijau, icon check
   - Jika INVALID: border merah, icon X
   - Jika EXPIRED: border abu, icon jam
```
