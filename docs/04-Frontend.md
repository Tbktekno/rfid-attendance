# Dokumentasi Frontend

## 4.1 Gambaran Umum

Frontend adalah aplikasi **React 18** single-page yang dibangun dengan **Vite 5** dan **TypeScript**. Menyediakan dashboard modern dan responsif untuk mengelola sistem absensi.

**Tumpukan Teknologi:**
- **UI Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3 (sistem desain kustom)
- **State Management:** Zustand 5
- **HTTP Client:** Axios
- **Real-time:** Socket.IO Client + SSE (EventSource)
- **Routing:** React Router v6
- **Animasi:** Framer Motion
- **Ikon:** Lucide React
- **Tanggal:** date-fns v4

## 4.2 Struktur Proyek

```
frontend/
├── index.html                    # Entry point HTML
├── package.json                  # Dependensi
├── vite.config.ts                # Konfigurasi Vite
├── tailwind.config.ts            # Kustomisasi tema Tailwind
├── postcss.config.cjs            # Konfigurasi PostCSS
├── tsconfig.json                 # Konfigurasi TypeScript
├── tsconfig.app.json             # Konfigurasi TS spesifik aplikasi
├── tsconfig.node.json            # Konfigurasi TS spesifik Node
├── .env                          # Variabel environment
├── .env.example                  # Contoh environment
└── src/
    ├── main.tsx                  # Entry point React
    ├── app.tsx                   # Komponen root + routing
    ├── styles.css                # Style global + direktif Tailwind
    ├── types/
    │   └── domain.ts             # Interface & enum TypeScript
    ├── state/
    │   ├── auth-store.ts         # State auth Zustand
    │   └── attendance-store.ts   # State absensi Zustand
    ├── services/
    │   ├── http.ts               # Instance Axios dengan interceptor
    │   ├── auth.service.ts       # Panggilan API auth
    │   ├── attendance.service.ts # Panggilan API absensi
    │   ├── employee.service.ts   # Panggilan API karyawan
    │   ├── settings.service.ts   # Panggilan API pengaturan
    │   └── realtime.service.ts   # Klien Socket.IO + SSE
    ├── hooks/
    │   ├── use-auth-hydrate.ts   # Hook hidrasi auth
    │   ├── use-bootstrap-data.ts # Hook pemuatan data awal
    │   └── use-realtime-attendance.ts  # Hook event real-time
    ├── pages/
    │   ├── login-page.tsx        # Halaman login
    │   ├── dashboard-page.tsx    # Dashboard utama
    │   ├── monitoring-page.tsx   # Monitoring sesi
    │   ├── history-page.tsx      # Riwayat absensi
    │   ├── employees-page.tsx    # Manajemen karyawan
    │   ├── simulator-page.tsx    # Simulator perangkat
    │   ├── settings-page.tsx     # Pengaturan sistem
    │   └── not-found-page.tsx    # Halaman 404
    ├── components/
    │   ├── layout/
    │   │   ├── app-shell.tsx     # Layout utama
    │   │   ├── app-sidebar.tsx   # Sidebar navigasi
    │   │   └── topbar.tsx        # Navigation bar atas
    │   ├── dashboard/
    │   │   ├── summary-strip.tsx  # Kartu statistik ringkasan
    │   │   ├── summary-card.tsx   # Kartu statistik individu
    │   │   ├── live-feed.tsx     # Umpan absensi langsung
    │   │   └── device-overview.tsx # Status perangkat
    │   ├── common/
    │   │   ├── status-badge.tsx   # Badge status reusable
    │   │   └── toast-viewport.tsx # Kontainer notifikasi toast
    │   ├── monitoring/
    │   │   └── session-monitor.tsx # Kartu monitoring sesi
    │   └── history/
    │       ├── history-filters.tsx # Filter riwayat absensi
    │       └── history-table.tsx   # Tabel riwayat absensi
    └── utils/
        ├── api-base.ts            # Konstanta base URL API
        ├── image.ts               # Resolver URL gambar
        └── format.ts              # Utilitas format tanggal
```

## 4.3 Dokumentasi File per File

### Entry Points

#### `src/main.tsx`

**Tujuan:** Entry point aplikasi. Me-render aplikasi React di dalam BrowserRouter.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

**Import:** React, ReactDOM, BrowserRouter, App

---

#### `src/app.tsx`

**Tujuan:** Komponen root yang mendefinisikan semua route dan guard autentikasi.

**Struktur:**
1. Route publik: `/login` → `LoginPage`
2. Route terproteksi (dibungkus `ProtectedRoutes`):
   - `/` → `DashboardPage`
   - `/monitoring` → `MonitoringPage`
   - `/history` → `HistoryPage`
   - `/employees` → `EmployeesPage`
   - `/simulator` → `SimulatorPage`
   - `/settings` → `SettingsPage`
   - `*` → `NotFoundPage`
3. Route terproteksi menggunakan `AppShell` (sidebar + topbar + konten)
4. Hook yang dijalankan di route terproteksi:
   - `useBootstrapData()` — memuat data awal
   - `useRealtimeAttendance()` — menghubungkan Socket.IO

**Alur Autentikasi:**
- Cek apakah token ada di localStorage
- Jika tidak ada token, redirect ke `/login`
- Jika ada token, hidrasi state auth
- Route terproteksi di-render hanya setelah hidrasi selesai

---

### State Management

#### `src/state/auth-store.ts`

**Tujuan:** State management autentikasi dengan Zustand.

**State:**
```typescript
{
  token: string | null,      // Token JWT
  user: AuthUser | null,     // Info user saat ini
  isLoading: boolean,        // State loading
  isHydrated: boolean,       // Apakah state sudah dipulihkan dari localStorage
  error: string | null       // Pesan error
}
```

**Aksi:**
| Aksi | Deskripsi |
|------|-----------|
| `login(email, password)` | Memanggil authService.login, menyimpan token + user, persist ke localStorage |
| `logout()` | Menghapus token, user, hapus dari localStorage |
| `hydrate()` | Memulihkan state auth dari localStorage |
| `clearError()` | Menghapus state error |

**Persistensi:** Token dan user disimpan di `localStorage("rfid-v3-auth")`

---

#### `src/state/attendance-store.ts`

**Tujuan:** State terpusat untuk semua data terkait absensi.

**State:**
```typescript
{
  employees: Employee[],
  devices: Device[],
  sessions: AttendanceSession[],
  history: AttendanceRecord[],
  events: RealtimeMessage[],
  toasts: ToastMessage[],
  statusFilter, deptFilter, dateFilter, monthFilter, employeeFilter: string,
  page, pageSize, total: number,
  view: 'log' | 'report',
  isLoading, isStreaming: boolean
}
```

**Aksi Utama:**
| Aksi | Deskripsi |
|------|-----------|
| `refreshAll()` | Mengambil data employees, devices, sessions, history secara paralel |
| `fetchHistory(params)` | Fetch history dengan pagination dan filter |
| `pushRealtimeEvent(event)` | Menangani event Socket.IO, membuat toast |
| `summary()` | Menghitung statistik harian dari history |

---

### Services

#### `src/services/http.ts`

**Tujuan:** Instance Axios yang dikonfigurasi dengan interceptor auth.

```typescript
const http = axios.create({ baseURL: VITE_API_BASE_URL });
http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**Digunakan oleh:** Semua modul service

---

#### `src/services/auth.service.ts`

**Tujuan:** Panggilan API autentikasi.

| Fungsi | Endpoint | Method |
|--------|----------|--------|
| `login(email, password)` | `/api/v1/auth/login` | POST |

**Response:** `{ token, user }`

---

#### `src/services/attendance.service.ts`

**Tujuan:** Panggilan API data absensi.

| Fungsi | Endpoint | Method |
|--------|----------|--------|
| `getHistory(params)` | `/api/v1/attendance/history` | GET |
| `getSessions()` | `/api/v1/attendance/sessions` | GET |
| `getDevices()` | `/api/v1/devices` | GET |
| `getEmployees()` | `/api/v1/employees` | GET |
| `exportPdf(params)` | `/api/v1/export/pdf` | GET |

---

#### `src/services/employee.service.ts`

**Tujuan:** Panggilan API CRUD karyawan.

| Fungsi | Endpoint | Method |
|--------|----------|--------|
| `getAll()` | `/api/v1/employees` | GET |
| `create(data)` | `/api/v1/employees` | POST (FormData) |
| `update(id, data)` | `/api/v1/employees/:id` | PUT (FormData) |
| `remove(id)` | `/api/v1/employees/:id` | DELETE |

---

#### `src/services/settings.service.ts`

**Tujuan:** Panggilan API pengaturan sistem.

| Fungsi | Endpoint | Method |
|--------|----------|--------|
| `get()` | `/api/v1/settings` | GET |
| `update(data)` | `/api/v1/settings` | POST |
| `reset()` | `/api/v1/settings/reset` | DELETE |

---

#### `src/services/realtime.service.ts`

**Tujuan:** Service komunikasi real-time dengan Socket.IO dan fallback SSE.

**Koneksi Socket.IO:**
- Terhubung ke `VITE_API_BASE_URL` dengan token auth
- Reconnection dengan exponential backoff

**Method:**
| Method | Deskripsi |
|--------|-----------|
| `subscribeAttendance(handler)` | Mendengarkan event absensi |
| `subscribeDeviceStatus(handler)` | Mendengarkan event status perangkat |
| `unsubscribeAttendance()` | Menghapus listener absensi |
| `unsubscribeDeviceStatus()` | Menghapus listener perangkat |
| `disconnect()` | Menutup koneksi socket |

**Event yang Didengarkan:**
- `attendance:new` — Record absensi baru
- `attendance:update` — Update sesi
- `rfid:new` — Pemindaian kartu RFID
- `registration:image` — Gambar registrasi diterima
- `device:status` — Perubahan status perangkat

---

### Hooks

#### `src/hooks/use-auth-hydrate.ts`
Memanggil `authStore.hydrate()` untuk memulihkan state auth dari localStorage.

#### `src/hooks/use-bootstrap-data.ts`
Memuat data awal (employees, devices, sessions, history) saat user terautentikasi.

#### `src/hooks/use-realtime-attendance.ts`
Menghubungkan Socket.IO dan menangani event absensi real-time.

---

### Halaman (Pages)

#### `src/pages/login-page.tsx`
**Tujuan:** Halaman autentikasi user.
**Fitur:** Layout dual-panel, form email/password, validasi, redirect ke dashboard.

#### `src/pages/dashboard-page.tsx`
**Tujuan:** Dashboard utama menampilkan ringkasan absensi.
**Komposisi:** SummaryStrip + LiveFeed + DeviceOverview

#### `src/pages/monitoring-page.tsx`
**Tujuan:** Monitoring sesi real-time.
**Komposisi:** Header + SessionMonitor

#### `src/pages/history-page.tsx`
**Tujuan:** Riwayat absensi dengan filter dan pagination.
**Komposisi:** HistoryFilters + HistoryTable

#### `src/pages/employees-page.tsx`
**Tujuan:** Manajemen karyawan dengan operasi CRUD.
**Fitur:** Search, tabel, modal tambah/edit, webcam capture, RFID scan simulation.

#### `src/pages/simulator-page.tsx`
**Tujuan:** Simulator perangkat untuk pengujian tanpa hardware fisik.
**Fitur:** Webcam preview, input UID manual, konfigurasi perangkat, capture + send.

#### `src/pages/settings-page.tsx`
**Tujuan:** Pengaturan konfigurasi sistem.
**Fitur:** Jam masuk/keluar, threshold keterlambatan, Danger Zone (reset data).

#### `src/pages/not-found-page.tsx`
**Tujuan:** Halaman 404 sederhana.

---

### Komponen

#### Layout
- **`app-shell.tsx`** — Grid CSS: sidebar kiri, konten + topbar kanan, overlay toast
- **`app-sidebar.tsx`** — Navigasi: Ringkasan, Karyawan, Log Presensi, Monitor, Pengaturan + logout + indikator streaming
- **`topbar.tsx`** — Judul halaman, search bar, tanggal, ikon notifikasi/help

#### Dashboard
- **`summary-strip.tsx`** — 4 kartu ringkasan (valid hari ini, invalid, total, perangkat online)
- **`summary-card.tsx`** — Kartu reusable dengan ikon, label, nilai, tema warna
- **`live-feed.tsx`** — Tabel 5 record absensi terbaru dengan foto, kategori, ketepatan, status
- **`device-overview.tsx`** — Daftar status perangkat dengan indikator online/offline

#### Common
- **`status-badge.tsx`** — Badge warna: SAH (hijau), TIDAK SAH (merah), DARING (hijau), LURING (abu)
- **`toast-viewport.tsx`** — Notifikasi toast pojok kanan atas, auto-dismiss 5 detik

#### Monitoring
- **`session-monitor.tsx`** — Kartu sesi aktif dengan gambar wajah, RFID, status, timer

#### History
- **`history-filters.tsx`** — Dropdown karyawan, bulan, tanggal, status, departemen + tombol Export PDF
- **`history-table.tsx`** — Tabel riwayat dengan nama hari, tanggal, waktu, kategori, ketepatan, status, pagination

---

### Tipe

#### `src/types/domain.ts`
```typescript
AuthUser { id, name, email, role }
Employee { id, full_name, department, position, rfid_uid, face_image_path, is_active, ... }
Device { id, device_code, type, name, location, status, metadata, last_seen_at }
AttendanceRecord { id, employee_id, employee_name, department, status, category, punctuality, ... }
AttendanceSession { id, correlation_id, rfid_uid, status, reason, started_at, expires_at }
AttendanceSummary { validToday, invalidToday, totalToday, devicesOnline }
ToastMessage { id, type, title, message }
```

### Utilitas
- **`api-base.ts`** — `export const apiBaseUrl = VITE_API_BASE_URL`
- **`image.ts`** — `resolveCaptureUrl(path)` — menangani URL absolut/relatif
- **`format.ts`** — `formatDateTime`, `formatClock`, `formatShortDate` dengan date-fns locale `id`

### Styling
- **`styles.css`** — Google Fonts (Manrope, IBM Plex Mono), direktif Tailwind, class kustom (`.app-shell`, `.panel`)
- **`tailwind.config.ts`** — Tema kustom: warna ink/mist/pine/ember/blush/cloud, font, shadow, animasi pulseLine
