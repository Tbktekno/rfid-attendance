# Alur Fitur Lengkap

## 13.1 Fitur Login

**Tujuan:** Mengautentikasi pengguna untuk mengakses sistem.

**Langkah-langkah:**
1. Pengguna membuka aplikasi di browser
2. Sistem memeriksa token JWT di localStorage
3. Jika tidak ada token, arahkan ke halaman login
4. Pengguna memasukkan email dan password
5. Frontend mengirim `POST /api/v1/auth/login`
6. Gateway meneruskan ke gRPC AuthService.Login
7. AuthService mencari user berdasarkan email di tabel `users`
8. Membandingkan password dengan bcrypt
9. Jika cocok, generate JWT dengan payload `{ id, email, role }`
10. Kembalikan `{ token, user }` ke frontend
11. Frontend menyimpan token di localStorage dan state
12. Redirect ke halaman dashboard
13. Memuat data awal (karyawan, perangkat, sesi, riwayat)
14. Menghubungkan Socket.IO untuk update real-time

**Error Handling:**
- Email tidak ditemukan → 401 "Email atau password salah"
- Password salah → 401 "Email atau password salah"
- Token expired → redirect ke login

**Komponen Terlibat:**
- Frontend: `login-page.tsx`, `auth-store.ts`, `auth.service.ts`
- Backend: `auth.controller.ts`, `auth.service.ts`, `user.repository.ts`
- gRPC: `auth.handler.ts`, `AuthService.Login`

---

## 13.2 Fitur Dashboard

**Tujuan:** Menampilkan ringkasan absensi dan status sistem secara real-time.

**Langkah-langkah:**
1. Setelah login, sistem navigasi ke `/`
2. `useBootstrapData()` memuat data paralel:
   - `GET /api/v1/employees` → daftar karyawan
   - `GET /api/v1/devices` → daftar perangkat
   - `GET /api/v1/attendance/sessions` → sesi aktif
   - `GET /api/v1/attendance/history?page=1&pageSize=50` → riwayat terkini
3. `useRealtimeAttendance()` menghubungkan Socket.IO
4. `SummaryStrip` menghitung statistik dari data riwayat
5. `LiveFeed` menampilkan 5 record terbaru
6. `DeviceOverview` menampilkan status perangkat
7. Semua komponen merespon perubahan state secara reaktif

**Update Real-time:**
- Record absensi baru → `attendance:new` → update ringkasan + feed
- Perubahan status perangkat → `device:status` → update overview

---

## 13.3 Fitur Manajemen Karyawan

**Tujuan:** CRUD data karyawan dengan pendaftaran wajah dan RFID.

**Langkah-langkah (Tambah Karyawan):**
1. Buka halaman `/employees`
2. Klik "Tambah Karyawan"
3. Isi form: Nama, Departemen, Jabatan
4. Masukkan UID RFID (manual atau scan simulasi)
5. Capture wajah via webcam:
   - Browser minta izin kamera (getUserMedia)
   - Tampilkan preview webcam
   - Klik "Capture" → ambil frame dari video
   - Tampilkan pratinjau hasil capture
6. Klik "Simpan":
   - Frontend buat FormData dengan field + file gambar
   - POST `/api/v1/employees` (multipart)
7. Backend:
   - Simpan data karyawan ke tabel `employees`
   - Simpan file gambar ke `storage/uploads/`
   - Kirim gambar ke Python service `POST /encode`
   - Simpan face descriptor (128 float) di kolom `face_descriptor`
8. Kembalikan response sukses
9. Frontend refresh tabel karyawan

**Langkah-langkah (Edit Karyawan):**
1. Klik ikon edit pada baris karyawan
2. Modal terbuka dengan data yang ada
3. Ubah field yang diperlukan
4. Opsional: recapture wajah
5. PUT `/api/v1/employees/:id`
6. Backend update data + face descriptor jika ada gambar baru

**Langkah-langkah (Hapus Karyawan):**
1. Klik ikon hapus
2. Dialog konfirmasi
3. DELETE `/api/v1/employees/:id`
4. Hapus dari database
5. Refresh tabel

**Validasi:**
- RFID UID harus unik
- Nama, departemen, jabatan wajib diisi
- Wajah harus terdeteksi jika upload foto

---

## 13.4 Fitur Absensi RFID

**Tujuan:** Memproses absensi melalui kartu RFID dengan verifikasi wajah.

**Langkah-langkah Detail:**
1. ESP8266 membaca kartu RFID via MFRC522
2. ESP8266 mengirim `POST /api/v1/attendance/check-rfid`
3. Gateway memeriksa apakah UID terdaftar di tabel `employees`
4. Jika TERDAFTAR:
   a. ESP8266 mengirim perintah `CAPTURE|UID` ke ESP32-CAM via Serial
   b. ESP32-CAM mengambil foto wajah
   c. ESP32-CAM mengirim `POST /api/v1/attendance/face` dengan header `X-Purpose: attendance`
   d. Gateway membuat sesi absensi (status: CREATED)
   e. Gateway menyimpan gambar dan update sesi (status: READY)
   f. ESP8266 mengirim `POST /api/v1/attendance/rfid`
   g. Gateway melakukan verifikasi wajah:
      - Cari karyawan berdasarkan RFID UID
      - Ambil face descriptor tersimpan
      - Panggil Python service `POST /verify`
      - Bandingkan captured face dengan reference descriptor
   h. Jika cocok:
      - Simpan record absensi (VALID)
      - Tentukan kategori ENTRY/EXIT
      - Hitung punctuality
      - Kirim response 200 ke ESP8266
      - Emit `attendance:new` via Socket.IO
   i. Jika tidak cocok:
      - Simpan record absensi (INVALID)
      - Kirim response 400 ke ESP8266
5. Jika TIDAK TERDAFTAR:
   - Jika mode `REGISTER_CAPTURE`:
     - ESP8266 kirim `REGISTER_CAPTURE|UID` ke ESP32-CAM
     - ESP32-CAM capture foto dengan header `X-Purpose: registration`
     - Gateway buat karyawan baru dengan foto + encode face
   - Jika tidak: ESP8266 tampilkan "RFID TIDAK TERDAFTAR"

---

## 13.5 Fitur Pengenalan Wajah

**Tujuan:** Memverifikasi identitas karyawan melalui pencocokan wajah.

**Langkah-langkah Enkoding (Registrasi):**
1. Backend menerima gambar wajah dari frontend atau ESP32-CAM
2. File gambar disimpan ke `storage/uploads/`
3. Gambar di-convert ke base64
4. HTTP POST ke Python service `POST /encode`
5. Python: decode base64 → detect face (MediaPipe) → embed (Facenet128)
6. Kembalikan array 128 float
7. Backend simpan array sebagai JSON string di kolom `face_descriptor`

**Langkah-langkah Verifikasi (Absensi):**
1. Backend memiliki captured face image + reference descriptor
2. HTTP POST ke Python service `POST /verify`
3. Python: decode base64 → detect face → embed → cosine distance
4. Bandingkan distance dengan threshold (0.45)
5. Kembalikan `{ isMatch, distance, confidence }`
6. Backend tentukan VALID/INVALID berdasarkan hasil

**Threshold:**
- `FACE_MATCH_THRESHOLD = 0.45` (dari .env)
- Distance <= 0.45 → MATCH
- Distance > 0.45 → NO MATCH

---

## 13.6 Fitur Pendaftaran RFID

**Tujuan:** Mendaftarkan kartu RFID baru ke sistem.

**Langkah-langkah:**
1. Kartu RFID baru di-tap ke reader
2. Backend mendeteksi UID tidak terdaftar
3. Response: `{ registered: false, action: "REGISTER_CAPTURE" }`
4. ESP8266 trigger ESP32-CAM untuk mengambil foto
5. ESP32-CAM kirim foto dengan header `X-Purpose: registration`
6. Gateway:
   - Simpan gambar
   - Emit `registration:image` via Socket.IO
   - Encode face via Python service
   - Buat record employee sementara
7. Frontend menerima event → tampilkan notifikasi
8. Admin melengkapi data karyawan (nama, departemen, jabatan)

---

## 13.7 Fitur Log Absensi

**Tujuan:** Menampilkan riwayat absensi dengan filter dan pagination.

**Langkah-langkah:**
1. Buka halaman `/history`
2. Filter default: bulan berjalan
3. `GET /api/v1/attendance/history` dengan parameter filter
4. Backend query `attendance_records` JOIN `employees`
5. Kembalikan data ter-paginate
6. Tabel menampilkan:
   - Nama hari (Senin, Selasa, ...)
   - Tanggal
   - Waktu
   - Kategori badge (Masuk/Pulang)
   - Ketepatan badge (Tepat Waktu/Terlambat)
   - Status badge (Sah/Tidak Sah)
7. Pagination: Previous/Next
8. Filter: ganti bulan, tanggal, status, karyawan

---

## 13.8 Fitur Laporan Absensi

**Tujuan:** Export laporan absensi sebagai PDF.

**Langkah-langkah:**
1. Atur filter (bulan, tahun, status, karyawan)
2. Klik "Export PDF"
3. `GET /api/v1/export/pdf` dengan parameter
4. Backend query data absensi dengan filter
5. Generate PDF menggunakan PDFMake:
   - Header: judul + periode
   - Tabel: No, Nama, Departemen, Tanggal, Jam Masuk, Jam Pulang, Status
   - Footer: total karyawan, ringkasan
6. Kembalikan file PDF (application/pdf)
7. Browser download file

---

## 13.9 Fitur Monitoring Perangkat

**Tujuan:** Memonitor status perangkat IoT secara real-time.

**Langkah-langkah:**
1. Setiap 30 detik, ESP32-CAM mengirim heartbeat
   `POST /api/v1/devices/heartbeat`
2. Backend update `last_seen_at` dan `status = ONLINE`
3. Backend emit `device:status` via Socket.IO
4. Jika tidak ada heartbeat > 60 detik:
   - Backend set `status = OFFLINE`
   - Emit `device:status` dengan status OFFLINE
5. Frontend:
   - Update status di `DeviceOverview`
   - Tampilkan toast jika perangkat offline
6. Halaman `/monitoring`:
   - Tampilkan sesi absensi aktif
   - Update real-time saat sesi berubah status

---

## 13.10 Fitur Simulator Perangkat

**Tujuan:** Menguji alur absensi tanpa hardware fisik.

**Langkah-langkah:**
1. Buka halaman `/simulator`
2. Konfigurasi device code dan pairing key
3. Masukkan UID RFID manual
4. Capture wajah dari webcam browser
5. Klik "Send Attendance"
6. Frontend kirim `POST /api/v1/attendance/face` (multipart)
7. Sama seperti alur dari ESP32-CAM
8. Tampilkan response dari backend
