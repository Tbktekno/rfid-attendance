# New session - 2026-06-25T08:35:11.102Z

**Session ID:** ses_10214c981ffe59y9aiHmf9eRUc
**Created:** 6/25/2026, 4:35:11 PM
**Updated:** 6/25/2026, 5:52:23 PM

---

## User

# TASK: Generate Complete Technical Documentation for the Attendance System## ContextSistem absensi ini telah selesai dikembangkan dan seluruh fitur utama telah berjalan dengan baik.Saya ingin membuat **dokumentasi teknis yang sangat lengkap** untuk keseluruhan sistem agar dapat digunakan sebagai:* Developer Documentation* Technical Documentation* System Architecture Documentation* Maintenance Guide* Onboarding Guide untuk developer baru* Referensi pengembangan fitur di masa depanDokumentasi harus menjelaskan sistem dari awal hingga akhir secara detail.Jangan hanya membuat README sederhana.Dokumentasi harus setara dengan dokumentasi proyek enterprise.---# Documentation GoalsBuat dokumentasi lengkap yang menjelaskan seluruh sistem mulai dari:* Arsitektur* Teknologi yang digunakan* Struktur Project* Cara komunikasi antar service* Flow aplikasi* Detail setiap module* Detail setiap folder* Detail setiap file* Detail setiap function* Relasi antar service* Database* API* Socket.IO* gRPC* Face Recognition* ESP8266* ESP32-CAMSemua harus dijelaskan secara rinci.---# Separate DocumentationPisahkan dokumentasi menjadi beberapa bagian besar.## 1. Backend DocumentationJelaskan secara lengkap mengenai backend.Meliputi:* Clean Architecture* Folder Structure* Domain* Module* Controller* Service* Repository* Database Layer* Gateway* gRPC Service* Socket.IO* Middleware* Authentication* Validation* Helper* Utility* ConfigUntuk setiap folder dan file jelaskan:* Tujuan file* Fungsi file* Hubungan dengan file lain* Function yang tersedia* Parameter* Return Value* Kapan dipanggil* Oleh siapa dipanggil* Service yang menggunakan function tersebut---## 2. Frontend DocumentationJelaskan seluruh frontend secara lengkap.Meliputi:* Folder Structure* Components* Pages* Modules* Hooks* Services* API Layer* Socket.IO Client* Routing* Authentication* State Management* UI ComponentsUntuk setiap file jelaskan:* Tujuan* Fungsi* Alur pemanggilan* Komponen yang menggunakan* API yang dipanggil* Event Socket yang digunakan---## 3. Face Recognition DocumentationBuat dokumentasi khusus Face Recognition.Jelaskan:* Arsitektur* Framework yang digunakan* Model AI yang digunakan* Face Detection* Face Embedding* Face Verification* Threshold* Image Processing* Pipeline* Performance* Error HandlingJelaskan secara rinci setiap file Python.Untuk setiap file:* Fungsi* Class* Method* Input* Output* Hubungan dengan backend---## 4. ESP8266 DocumentationJelaskan:* Struktur kode* Flow RFID* Flow LCD* HTTP Request* Socket* Komunikasi ke Backend* Komunikasi ke ESP32-CAM* Error Handling* RetryJelaskan setiap function.---## 5. ESP32-CAM DocumentationJelaskan:* Camera Initialization* Capture* HTTP Upload* Registration Capture* Attendance Capture* Communication* Error Recovery* Retry MechanismJelaskan seluruh function.---# Communication DocumentationBuat bab khusus mengenai komunikasi antar sistem.Jelaskan secara rinci komunikasi:Frontend↓Express Gateway↓gRPC Backend↓Face Recognition Service↓Database↓ESP8266↓ESP32-CAMJelaskan:* siapa memanggil siapa* menggunakan protocol apa* endpoint apa* request* response* kapan dipanggil---# API DocumentationDokumentasikan seluruh API.Untuk setiap endpoint jelaskan:* URL* Method* Request* Response* Validation* Authentication* Error Response---# Socket.IO DocumentationJelaskan seluruh event.Contoh:* attendance:new* attendance:update* rfid:new* registration:image* device:statusUntuk setiap event jelaskan:* emitter* receiver* payload* trigger* tujuan---# Database DocumentationJelaskan:* ERD* Semua tabel* Semua relasi* Semua field* Semua foreign key* Constraint* Index* Flow penyimpanan data---# Application Flow DocumentationBuat flow lengkap mulai dari user membuka aplikasi hingga selesai.Misalnya:## Login↓Dashboard↓Scan RFID↓Backend Validation↓Face Recognition↓Attendance Saved↓Realtime Update↓Attendance Log↓Attendance ReportJelaskan setiap langkah secara detail.---# Feature Flow DocumentationBuat flow khusus untuk setiap fitur:* Login* Dashboard* Employee Management* Device Management* Attendance* Face Registration* RFID Registration* Attendance Log* Attendance Report* Face Recognition* Device MonitoringSetiap flow dijelaskan langkah demi langkah.---# Sequence DiagramBuat sequence diagram untuk:* Login* Scan RFID* Attendance* Face Recognition* Employee Registration* RFID Registration* Device Communication* Attendance Report---# Architecture DiagramBuat diagram arsitektur yang menjelaskan hubungan antara:* Frontend* Backend Gateway* gRPC Service* Face Recognition* SQLite/PostgreSQL* ESP8266* ESP32-CAM* Socket.IO---# Source Code DocumentationLakukan analisis source code secara menyeluruh.Untuk setiap file:* Nama file* Lokasi file* Fungsi file* Import* Export* Function* Class* Dependency* Dipanggil oleh* Memanggil file apa sajaJelaskan hubungan antar file hingga mudah dipahami oleh developer baru.---# Deployment DocumentationJelaskan:* Development Environment* Production Environment* Environment Variable* Build Process* Deployment Flow* Running Service* Port* Reverse Proxy* PM2* Database Migration---# Troubleshooting GuideBuat bab khusus berisi:* Error yang mungkin terjadi* Penyebab* Cara memperbaiki* Cara debugging* Log yang harus diperiksa---# Best PracticesJelaskan:* Coding Standard* Folder Structure* Naming Convention* Security* Performance* Scalability* Maintainability---# DeliverablesSusun dokumentasi menjadi beberapa file Markdown terpisah agar mudah dibaca.Contoh struktur:```textdocs/│├── 01-Project-Overview.md├── 02-System-Architecture.md├── 03-Backend.md├── 04-Frontend.md├── 05-Face-Recognition.md├── 06-ESP8266.md├── 07-ESP32CAM.md├── 08-Database.md├── 09-API.md├── 10-SocketIO.md├── 11-gRPC.md├── 12-Application-Flow.md├── 13-Feature-Flow.md├── 14-Sequence-Diagram.md├── 15-Deployment.md├── 16-Troubleshooting.md├── 17-Best-Practices.md└── README.md```## Important* Jangan membuat dokumentasi berdasarkan asumsi.* Analisis seluruh source code yang ada.* Jelaskan berdasarkan implementasi nyata pada project.* Pastikan setiap file, function, class, dan hubungan antar komponen terdokumentasi dengan lengkap.* Gunakan bahasa yang mudah dipahami namun tetap profesional.* Hasil dokumentasi harus cukup lengkap sehingga seorang developer baru dapat memahami, menjalankan, memelihara, dan mengembangkan sistem hanya dengan membaca dokumentasi tersebut tanpa harus bertanya kepada developer sebelumnya.

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.8s)

_Thinking:_

The user wants me to create comprehensive technical documentation for their attendance system. They have a detailed structure they want me to follow. Let me first explore the codebase to understand the project structure, then create all the documentation files.

Let me start by understanding the project structure.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Explore project structure and understand codebase",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "content": "Create 01-Project-Overview.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 02-System-Architecture.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 03-Backend.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 04-Frontend.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 05-Face-Recognition.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 06-ESP8266.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 07-ESP32CAM.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 08-Database.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 09-API.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 10-SocketIO.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 11-gRPC.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 12-Application-Flow.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 13-Feature-Flow.md",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create 14-Sequence-Diagram.md",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create 15-Deployment.md",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create 16-Troubleshooting.md",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create 17-Best-Practices.md",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create README.md",
      "status": "pending",
      "priority": "medium"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Explore project structure and understand codebase",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Create 01-Project-Overview.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 02-System-Architecture.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 03-Backend.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 04-Frontend.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 05-Face-Recognition.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 06-ESP8266.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 07-ESP32CAM.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 08-Database.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 09-API.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 10-SocketIO.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 11-gRPC.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 12-Application-Flow.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 13-Feature-Flow.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 14-Sequence-Diagram.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create 15-Deployment.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create 16-Troubleshooting.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create 17-Best-Practices.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create README.md",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 181.1s)

_Thinking:_

Let me start by exploring the project structure thoroughly.

**Tool: task**

**Input:**
```json
{
  "description": "Explore backend structure",
  "prompt": "Explore the backend directory structure of this project. The project is at I:\\rfid_v3. I need to understand:\n\n1. List ALL files in the backend/ directory recursively (full paths)\n2. Read the main entry point files (app.js, server.js, index.js, main.js, etc.)\n3. Read package.json files to understand dependencies\n4. Read any configuration files (.env, config files, etc.)\n5. Read all route/controller/service files\n6. Read any gRPC proto files\n7. Read Socket.IO handler files\n8. Read middleware files\n9. Read database/model files\n\nReturn the COMPLETE contents of every file you find in the backend directory. I need to see everything - every line of code. Be very thorough.",
  "subagent_type": "general"
}
```

**Output:**
```
<task id="ses_102148fdcffePc290ORByUcyYH" state="completed">
<task_result>
Here is the complete backend codebase for **AttendTrack / RFID v3 Attendance System**.

---

## Project Structure

```
I:\rfid_v3\
├── .env / .env.example          # Environment configuration
├── package.json                 # Dependencies (Express, gRPC, Socket.IO, SQL.js)
├── tsconfig.json                # TypeScript config (ES2022, CommonJS)
├── .gitignore
├── start_dev.bat                # Launches all 3 services
├── run_backend.bat              # Launches backend (gateway + gRPC)
├── run_frontend.bat             # Launches React frontend
├── run_ai.bat                   # Launches Python face service
│
├── src/                         # *** MAIN BACKEND SOURCE ***
│   ├── config/
│   │   └── env.ts               # Environment variable validation (Zod)
│   │
│   ├── gateway/                 # Express HTTP Gateway (port 3000)
│   │   ├── server.ts            # HTTP server + mDNS + Socket.IO setup
│   │   ├── app.ts               # Express routes & middleware
│   │   └── realtime.ts          # Socket.IO + gRPC event bridge
│   │
│   ├── grpc/                    # gRPC Service Layer (port 50051)
│   │   ├── server.ts            # gRPC server bootstrap
│   │   └── handlers/
│   │       ├── auth.handler.ts
│   │       ├── employee.handler.ts
│   │       ├── device.handler.ts
│   │       ├── attendance.handler.ts
│   │       └── settings.handler.ts
│   │
│   ├── proto/
│   │   └── platform.proto       # Protobuf service definitions
│   │
│   ├── modules/                 # Feature modules (service layer)
│   │   ├── auth/                # Authentication (JWT, bcrypt)
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   │
│   │   ├── employee/            # Employee (student) CRUD
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   │
│   │   ├── device/              # Device registration & heartbeat
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   │
│   │   ├── attendance/          # Attendance core logic
│   │   │   ├── controller/
│   │   │   │   ├── attendance.controller.ts
│   │   │   │   └── attendance-stream.controller.ts
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   │       ├── attendance.service.ts
│   │   │       ├── attendance-sync.service.ts
│   │   │       ├── attendance-verification.service.ts
│   │   │       └── attendance-retry-scheduler.service.ts
│   │   │
│   │   └── settings/            # System settings (entry/exit times)
│   │       ├── controller/
│   │       ├── dto/
│   │       ├── repository/
│   │       └── service/
│   │
│   ├── shared/                  # Shared infrastructure
│   │   ├── container.ts         # DI container (manual)
│   │   ├── clients/
│   │   │   └── face-recognition.client.ts  # Python face API client
│   │   ├── database/
│   │   │   └── sqlite.ts        # SQL.js (SQLite in-memory + file persistence)
│   │   ├── errors/
│   │   │   └── app-error.ts     # Custom error class
│   │   ├── grpc/
│   │   │   ├── proto.ts         # Proto loading
│   │   │   ├── grpc-client.ts   # gRPC client + promisify helper
│   │   │   └── grpc-error.ts    # Error mapping
│   │   ├── logger/
│   │   │   └── index.ts         # Pino logger
│   │   ├── middleware/
│   │   │   ├── async-handler.ts
│   │   │   ├── authenticate.ts   # JWT verification
│   │   │   ├── authorize.ts      # Role-based access
│   │   │   └── error-handler.ts  # Global error handler
│   │   ├── realtime/
│   │   │   └── realtime-events.ts # EventEmitter for SSE/Socket
│   │   └── utils/
│   │       ├── correlation.ts    # Correlation ID for RFID+face matching
│   │       ├── file-storage.ts   # Multer + base64 image persistence
│   │       └── pdf-generator.ts  # PDFMake attendance reports
│   │
│   └── scripts/                 # CLI utilities
│       ├── seed-admin.ts
│       ├── reset-admin.ts
│       └── seed-dummy-attendance.ts
│
├── python-face-service/         # Python face recognition API
│   ├── main.py                  # FastAPI (DeepFace + Facenet128)
│   ├── requirements.txt
│   └── .venv/
│
├── firmware/                    # ESP8266 + ESP32-CAM firmware
│   ├── esp8266_rfid_firmware.ino   # RFID scanner (master, WiFi AP config portal)
│   └── esp32cam_face_firmware.ino  # Face camera (slave, serial commands)
│
├── frontend/                    # React + Vite frontend
├── prisma/                      # Empty (was for Prisma, now using SQL.js)
├── dist/                        # Compiled JS output
└── storage/                     # SQLite DB + uploaded images
```

---

## Architecture Summary

**Three-tier microservices:**

| Service | Tech | Port | Purpose |
|---------|------|------|---------|
| **API Gateway** | Express 5 + Socket.IO | 3000 | HTTP REST API, WebSocket/SSE, static uploads |
| **gRPC Server** | @grpc/grpc-js | 50051 | Business logic, validation, persistence |
| **Face Service** | FastAPI + DeepFace | 8000 | Face encoding & verification (Facenet128) |

**Data flow:**
- ESP8266 reads RFID → POSTs to `/api/v1/attendance/rfid` → Gateway calls gRPC
- ESP8266 tells ESP32-CAM to capture via serial → ESP32-CAM sends binary face image to `/api/v1/attendance/face`
- gRPC server matches RFID+face sessions via correlation ID (time-window + pairing key)
- Verification: employee face descriptor vs captured face (via Python service)
- Results propagated via EventEmitter → Socket.IO (web) + gRPC WatchEvents stream

**Database:** SQL.js (SQLite compiled to WebAssembly) with WAL mode, auto-persists to `storage/rfid_v3.sqlite`

**Device Discovery:** mDNS (Bonjour) auto-discovery - ESP8266 finds the server via `_attendtrack._tcp` mDNS service

**Hardware:** ESP8266 (RC522 RFID reader + I2C LCD) + ESP32-CAM (OV2640 camera) connected via serial UART

All 55 source files have been read and presented above in their entirety. The total codebase is approximately ~4,200 lines of TypeScript + 850 lines of Python + 850 lines of Arduino C++ + 266 lines of Protobuf.
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Explore frontend structure",
  "prompt": "Explore the frontend directory structure of this project. The project is at I:\\rfid_v3. I need to understand:\n\n1. List ALL files in the frontend/ directory recursively (full paths)\n2. Read package.json files to understand dependencies\n3. Read main entry point files (App.js, main.js, index.js, etc.)\n4. Read all page/component files\n5. Read all service/api layer files\n6. Read all hook files\n7. Read routing files\n8. Read any configuration files\n9. Read store/state management files\n\nReturn the COMPLETE contents of every file you find in the frontend directory. I need to see everything. Be very thorough.",
  "subagent_type": "general"
}
```

**Output:**
```
<task id="ses_102148aa4ffeD3CeUHVfect1Gx" state="completed">
<task_result>
I've now read every file in the `frontend/src/` directory and all configuration files. Here's the complete inventory:

---

## **Project: RFID V3 Frontend** — Full Inventory (32 source files)

### **Config & Build Files** (12 files)

| File | Lines | Purpose |
|------|-------|---------|
| `frontend/.env` | 1 | `VITE_API_BASE_URL=http://localhost:3000` |
| `frontend/.env.example` | 1 | Same as `.env` |
| `frontend/index.html` | 12 | HTML entry, `<div id="root">`, font Manrope/IBM Plex Mono |
| `frontend/package.json` | 34 | React 18, Vite 5, Zustand 5, Tailwind 3, Socket.io, Axios, Framer Motion, date-fns, clsx |
| `frontend/postcss.config.cjs` | 6 | Tailwind + Autoprefixer |
| `frontend/tailwind.config.ts` | 34 | Custom colors (ink/mist/pine/ember/blush/cloud), fonts, shadow-soft, pulseLine animation |
| `frontend/tsconfig.json` | 7 | References `tsconfig.app.json` + `tsconfig.node.json` |
| `frontend/tsconfig.app.json` | 18 | Strict TS, JSX react-jsx, Vite client types, target ES2020, moduleResolution Bundler |
| `frontend/tsconfig.node.json` | 10 | For `vite.config.ts` only |
| `frontend/vite.config.ts` | 9 | React plugin, dev server on port 5173 |
| `frontend/vite.config.js` | 8 | Duplicate of `.ts` |
| `frontend/vite.config.d.ts` | 2 | Type declaration stub |

---

### **Entry Points** (2 files)

**`src/main.tsx`** (10 lines) — Renders `<App>` inside `<BrowserRouter>`.

**`src/app.tsx`** (55 lines) — Root component with route structure:
- Public: `/login` → `LoginPage`
- Protected (via `<ProtectedRoutes>`): checks token hydration, wraps in `<AppShell>` which provides sidebar/layout then renders pages:
  - `/` → DashboardPage
  - `/monitoring` → MonitoringPage
  - `/history` → HistoryPage
  - `/employees` → EmployeesPage
  - `/simulator` → SimulatorPage
  - `/settings` → SettingsPage
  - `*` → NotFoundPage
- Hooks run in protected routes: `useBootstrapData()`, `useRealtimeAttendance()`

---

### **State Management** (2 files, Zustand 5)

**`src/state/auth-store.ts`** (61 lines) — `useAuthStore`:
- State: `token`, `user`, `isLoading`, `isHydrated`, `error`
- Actions: `login()` calls `authService`, persists to `localStorage("rfid-v3-auth")`; `logout()` clears; `hydrate()` restores from localStorage

**`src/state/attendance-store.ts`** (229 lines) — `useAttendanceStore`:
- Stores: `employees`, `devices`, `sessions`, `history`, `events`, `toasts`, filters (`statusFilter`, `deptFilter`, `dateFilter`, `monthFilter`, `employeeFilter`), pagination (`page`, `pageSize`), `view` ("log"|"report"), `isLoading`, `isStreaming`
- Key actions: `refreshAll()` — fetches employees, devices, sessions, history in parallel; `fetchHistory()` — paginated; `pushRealtimeEvent()` — creates toasts from socket events; `summary()` — computes daily stats from history

---

### **Services** (5 files)

| File | Lines | Endpoints |
|------|-------|-----------|
| `src/services/http.ts` | 17 | Axios instance, base URL from env, Bearer token interceptor |
| `src/services/auth.service.ts` | 9 | `POST /api/v1/auth/login` |
| `src/services/attendance.service.ts` | 81 | `GET /history`, `GET /sessions`, `GET /devices`, `GET /employees`, `GET /export/pdf` |
| `src/services/employee.service.ts` | 33 | `GET /employees`, `POST /employees`, `PUT /employees/:id`, `DELETE /employees/:id` |
| `src/services/settings.service.ts` | 21 | `GET /settings`, `POST /settings`, `DELETE /settings/reset` |
| `src/services/realtime.service.ts` | 62 | Socket.io client (`io`), SSE via `fetchEventSource` at `/api/v1/attendance/stream` |

---

### **Hooks** (3 files)

| File | Lines | Purpose |
|------|-------|---------|
| `src/hooks/use-auth-hydrate.ts` | 10 | Calls `authStore.hydrate()` on mount |
| `src/hooks/use-bootstrap-data.ts` | 16 | Calls `attendanceStore.refreshAll()` when token available |
| `src/hooks/use-realtime-attendance.ts` | 43 | Connects WebSocket, listens for events → pushes to store, navigates to `/history` on verification completed |

---

### **Pages** (8 files)

| File | Lines | Content |
|------|-------|---------|
| `src/pages/login-page.tsx` | 85 | Dual-panel login form (descriptive side + email/password form), redirects if already logged in |
| `src/pages/dashboard-page.tsx` | 13 | Composes `SummaryStrip` + `LiveFeed` + `DeviceOverview` |
| `src/pages/monitoring-page.tsx` | 15 | Header + `SessionMonitor` component |
| `src/pages/history-page.tsx` | 9 | `HistoryFilters` + `HistoryTable` |
| `src/pages/employees-page.tsx` | 457 | Employee directory with search, CRUD table, inline `EmployeeForm` modal (uses Socket.io for real-time RFID scan + ESP32-CAM image capture during registration) |
| `src/pages/simulator-page.tsx` | 217 | Simulates ESP32-CAM + RFID interaction: live webcam preview, manual UID entry, device config, capture + send via multipart POST to `/api/v1/attendance/face` |
| `src/pages/settings-page.tsx` | 148 | Entry/exit time settings form + Danger Zone (reset all data) |
| `src/pages/not-found-page.tsx` | 11 | Simple 404 with link back to dashboard |

---

### **Components** (10 files)

**Layout** (3):
- `app-shell.tsx` (23 lines) — CSS grid layout: sidebar on left, `<Outlet>` + topbar on right, toast viewport overlay
- `app-sidebar.tsx` (75 lines) — Nav links (Ringkasan, Karyawan, Log Presensi, Monitor, Pengaturan), user info with logout button, streaming indicator
- `topbar.tsx` (56 lines) — Page title based on route, search bar, date display, notification/help icons

**Dashboard** (4):
- `summary-strip.tsx` (119 lines) — 4 summary cards (valid today, invalid scans, total scans, IoT devices online)
- `summary-card.tsx` (36 lines) — Reusable card component
- `live-feed.tsx` (116 lines) — Table showing latest 5 attendance records with photo, category (entry/exit), punctuality badges, status
- `device-overview.tsx` (61 lines) — Device status list (ESP32CAM/ESP8266/GATEWAY) with online/offline indicators and IP from metadata

**Common** (2):
- `status-badge.tsx` (37 lines) — Color-coded badge for VALID/INVALID/ONLINE/READY/etc. with Indonesian labels
- `toast-viewport.tsx` (64 lines) — Toast notifications positioned top-right with auto-dismiss after 5s

**Monitoring** (1):
- `session-monitor.tsx` (90 lines) — Cards for each attendance session showing face image, RFID data, verification status, entry/exit badge

**History** (2):
- `history-filters.tsx` (175 lines) — Dropdowns for employee, month, date, department, status + export PDF button + success modal
- `history-table.tsx` (191 lines) — Paginated attendance history table with day name, date, time, category, punctuality badge, reason, pagination controls

---

### **Types** (1 file)

**`src/types/domain.ts`** (100 lines) — TypeScript interfaces: `AuthUser`, `Employee`, `Device`, `AttendanceRecord`, `AttendanceSession`, `RealtimeMessage`, `AttendanceSummary`, `ToastMessage`, enums `AttendanceStatus`, `SessionStatus`

---

### **Utils** (3 files)

| File | Lines | Purpose |
|------|-------|---------|
| `src/utils/api-base.ts` | 1 | Exports `apiBaseUrl` from `VITE_API_BASE_URL` env var |
| `src/utils/image.ts` | 16 | Resolves capture URLs (handles absolute URLs, relative paths → `/uploads/filename`) |
| `src/utils/format.ts` | 26 | Date formatters: `formatDateTime`, `formatClock`, `formatShortDate` using date-fns |

---

### **Styles** (1 file)

**`src/styles.css`** (39 lines) — Imports Google Fonts, Tailwind directives, custom component classes (`.app-shell`, `.panel`, `.panel-muted`)

---

### **Tech Stack Summary**

- **Framework:** React 18 + TypeScript
- **Build:** Vite 5
- **Styling:** Tailwind CSS 3 (custom theme), CSS modules via Tailwind utilities
- **State:** Zustand 5 (no Redux)
- **HTTP:** Axios with interceptor
- **Real-time:** Socket.io-client + `@microsoft/fetch-event-source` (SSE fallback)
- **Routing:** react-router-dom v6
- **UI Animation:** Framer Motion
- **Icons:** Lucide React
- **Date:** date-fns v4

**Total source lines:** ~1,900 lines across 31 source files (excluding `node_modules`, lockfile, tsbuildinfo).
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Explore face recognition service",
  "prompt": "Explore the face recognition Python service of this project. The project is at I:\\rfid_v3. I need to understand:\n\n1. List ALL files in any face recognition / python directory recursively (full paths)\n2. Read all Python files completely\n3. Read any requirements.txt or configuration files\n4. Read any model files or scripts\n5. Understand the face detection, embedding, and verification pipeline\n\nReturn the COMPLETE contents of every file you find. Be very thorough.",
  "subagent_type": "general"
}
```

**Output:**
```
<task id="ses_10214862bffeaemjfe1jL7ejqx" state="completed">
<task_result>
Here is the complete exploration of the face recognition Python service:

---

## 1. ALL FILES in the face recognition directory

```
I:\rfid_v3\python-face-service\
├── main.py                          (138 lines - main service)
├── requirements.txt                 (9 lines - dependencies)
├── __pycache__\
│   └── main.cpython-312.pyc
├── .venv\                           (Python 3.12 virtual environment)
│   ├── pyvenv.cfg
│   ├── package_info.json
│   ├── requirements.txt
│   └── ...
└── python-face-service\             (empty nested dir)
```

---

## 2. COMPLETE FILE CONTENTS

### `I:\rfid_v3\python-face-service\main.py` (139 lines)

```python
import base64
import io
import os
from typing import List

import cv2
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from PIL import Image
from deepface import DeepFace

# Disable TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

app = FastAPI(title="Face Recognition Service (DeepFace + Facenet128)")

@app.on_event("startup")
async def startup_event():
    try:
        print("---")
        print("INITIALIZING FACE RECOGNITION SERVICE")
        print("Model: Facenet128")
        print("This may take a minute on first run (downloading weights)...")
        DeepFace.build_model("Facenet")
        print("SERVICE READY: Model loaded successfully.")
        print("---")
    except Exception as e:
        print(f"FATAL ERROR DURING STARTUP: {e}")

class EncodeRequest(BaseModel):
    imageBase64: str

class VerifyRequest(BaseModel):
    imageBase64: str
    referenceDescriptor: List[float]
    threshold: float = 0.40 # Default threshold for Facenet128 Cosine distance

def decode_image_to_cv(value: str) -> np.ndarray:
    if "," in value:
        value = value.split(",", 1)[1]
    
    image_bytes = base64.b64decode(value)
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/encode")
def encode_face(payload: EncodeRequest):
    try:
        image_cv = decode_image_to_cv(payload.imageBase64)
        
        # DeepFace represent returns a list of detections
        # We use 'mediapipe' as detector backend as requested
        results = DeepFace.represent(
            img_path=image_cv,
            model_name="Facenet",
            detector_backend="mediapipe",
            enforce_detection=True,
            align=True
        )
        
        if not results:
            raise HTTPException(status_code=400, detail="No face detected")
            
        # Get embedding from the first detected face
        descriptor = results[0]["embedding"]
        return {"descriptor": descriptor}
    except Exception as e:
        logger_err = str(e)
        if "Face could not be detected" in logger_err:
            raise HTTPException(status_code=400, detail="No face detected")
        raise HTTPException(status_code=500, detail=logger_err)

@app.post("/verify")
def verify_face(payload: VerifyRequest):
    try:
        image_cv = decode_image_to_cv(payload.imageBase64)
        
        # Get embedding for the current face
        results = DeepFace.represent(
            img_path=image_cv,
            model_name="Facenet",
            detector_backend="mediapipe",
            enforce_detection=True,
            align=True
        )
        
        if not results:
            raise HTTPException(status_code=400, detail="No face detected")
            
        descriptor = np.array(results[0]["embedding"])
        reference = np.array(payload.referenceDescriptor)
        
        # Check if reference descriptor length matches Facenet128 (128)
        # If not, it might be an old landmark-based descriptor (1404) or a different model
        if len(reference) != len(descriptor):
            return {
                "isMatch": False,
                "distance": 99.0,
                "confidence": 0.0,
                "error": "Incompatible descriptor length. Please re-register the employee."
            }

        # Compare using Cosine distance (1 - similarity)
        a = np.array(descriptor)
        b = np.array(reference)
        norm_a = np.linalg.norm(a)
        norm_b = np.linalg.norm(b)
        
        if norm_a == 0 or norm_b == 0:
            distance = 1.0
        else:
            similarity = np.dot(a, b) / (norm_a * norm_b)
            distance = float(1.0 - similarity)

        is_match = distance <= payload.threshold
        
        # Confidence calculation for Cosine distance
        # 0.0 distance = 1.0 confidence. distance >= threshold*2 = 0.0 confidence.
        confidence = max(0.0, 1.0 - (distance / max(payload.threshold * 2, 0.01)))
        
        return {
            "isMatch": is_match,
            "distance": distance,
            "confidence": confidence,
        }
    except Exception as e:
        logger_err = str(e)
        if "Face could not be detected" in logger_err:
            raise HTTPException(status_code=400, detail="No face detected")
        raise HTTPException(status_code=500, detail=logger_err)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### `I:\rfid_v3\python-face-service\requirements.txt`

```
fastapi==0.115.12
uvicorn==0.34.2
numpy<2.0.0
Pillow==11.2.1
mediapipe==0.10.20
opencv-python-headless
deepface
tensorflow
tf-keras
```

### TypeScript Client: `I:\rfid_v3\src\shared\clients\face-recognition.client.ts` (60 lines)

```typescript
import axios, { AxiosInstance } from "axios";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/app-error";
import { env } from "../../config/env";
import { readFileAsBase64 } from "../utils/file-storage";

interface EncodeResponse {
  descriptor: number[];
}

interface VerifyResponse {
  isMatch: boolean;
  distance: number;
  confidence: number;
}

export class FaceRecognitionClient {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: env.FACE_SERVICE_URL,
      timeout: 15000
    });
  }

  async encodeFace(input: { imageBase64?: string; imagePath?: string }): Promise<number[]> {
    const imageBase64 = input.imageBase64 ?? (input.imagePath ? await readFileAsBase64(input.imagePath) : undefined);
    if (!imageBase64) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Face image is required");
    }
    const { data } = await this.http.post<EncodeResponse>("/encode", { imageBase64 });
    return data.descriptor;
  }

  async verifyFace(input: {
    imageBase64?: string;
    imagePath?: string;
    referenceDescriptor: number[];
  }): Promise<VerifyResponse> {
    const imageBase64 = input.imageBase64 ?? (input.imagePath ? await readFileAsBase64(input.imagePath) : undefined);
    if (!imageBase64) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Face image is required");
    }
    const { data } = await this.http.post<VerifyResponse>("/verify", {
      imageBase64,
      referenceDescriptor: input.referenceDescriptor,
      threshold: env.FACE_MATCH_THRESHOLD
    });
    return data;
  }
}
```

---

## 3. PIPELINE ARCHITECTURE

### Face Detection, Embedding & Verification Pipeline

**Stack:** DeepFace (wrapper) + Facenet128 (embedding model) + MediaPipe (face detector) + Cosine distance (comparison)

#### A) Endpoints

| Endpoint | Method | Input | Output |
|---|---|---|---|
| `/health` | GET | — | `{"status": "ok"}` |
| `/encode` | POST | `{ imageBase64 }` | `{ descriptor: number[128] }` |
| `/verify` | POST | `{ imageBase64, referenceDescriptor, threshold }` | `{ isMatch, distance, confidence }` |

#### B) Encode Pipeline (`POST /encode`)

1. **Decode** — base64 string → `PIL.Image` (RGB) → OpenCV BGR `ndarray`
2. **Detect** — `DeepFace.represent()` with `detector_backend="mediapipe"`, `enforce_detection=True`, `align=True`
3. **Embed** — Facenet model generates a **128-dimensional float vector** (embedding/descriptor)
4. **Return** — the 128-float array as `{ descriptor }`
5. **Used by** — `EmployeeService.create/update` → stores `faceDescriptor` on the employee record

#### C) Verify Pipeline (`POST /verify`)

1. **Decode** — same as encode
2. **Detect + Embed** — same `DeepFace.represent()` call → gets current 128-d descriptor
3. **Length check** — if stored `referenceDescriptor` length ≠ 128 (e.g., old landmark format = 1404), returns `isMatch: false` with error message
4. **Cosine distance** — `distance = 1.0 - cos_similarity(descriptor, reference)`
5. **Match decision** — `isMatch = distance <= threshold` (default 0.40 in Python, overridden to 0.45 by TypeScript `FACE_MATCH_THRESHOLD`)
6. **Confidence** — linear ramp: `confidence = max(0.0, 1.0 - distance / (threshold * 2))`
7. **Used by** — `AttendanceVerificationService.verify` → after RFID-triggered attendance session

#### D) System Integration (TypeScript side)

```
AttendanceVerificationService
  └─ FaceRecognitionClient (axios → http://python:8000)
       ├─ POST /encode  (employee registration)
       └─ POST /verify   (attendance verification)

Container (DI) wire-up:
  EmployeeService → FaceRecognitionClient
  AttendanceVerificationService → FaceRecognitionClient
```

#### E) Key Configuration (`env.ts`)

| Variable | Default | Purpose |
|---|---|---|
| `FACE_SERVICE_URL` | (required) | Base URL for the Python FastAPI service |
| `FACE_MATCH_THRESHOLD` | `0.45` | Cosine distance threshold sent to `/verify` |

#### F) Startup Behavior

On `uvicorn` start, the `startup_event` handler calls `DeepFace.build_model("Facenet")` which downloads the Facenet weights (~90MB) on first run and caches them in `~/.deepface/weights/`. Prints `SERVICE READY: Model loaded successfully.` when done.

#### G) Error Handling

- **No face detected** → HTTP 400 with detail `"No face detected"`
- **Descriptor length mismatch** (verify only) → returns `isMatch: false, distance: 99.0, confidence: 0.0` with error string (not a 500)
- **Other exceptions** → HTTP 500 with the exception message
- **TF logging** suppressed via `TF_CPP_MIN_LOG_LEVEL=3`
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Explore Arduino/IoT firmware",
  "prompt": "Explore the Arduino/IoT firmware files of this project. The project is at I:\\rfid_v3. I need to understand:\n\n1. List ALL files in any Arduino, ESP8266, ESP32, or IoT directories recursively (full paths)\n2. Read all .ino, .cpp, .h, and other firmware files completely\n3. Look for any hardware-related configuration files\n\nReturn the COMPLETE contents of every file you find. Be very thorough.",
  "subagent_type": "general"
}
```

**Output:**
```
<task id="ses_1021481aaffeA5Vv8eS0RHqj40" state="completed">
<task_result>
Here is the **complete inventory** of all Arduino/IoT firmware files found in the project.

---

## 📂 All Firmware Files Found

| # | File | Path |
|---|------|------|
| 1 | `esp8266_rfid_firmware.ino` | `I:\rfid_v3\firmware\esp8266_rfid_firmware.ino` (451 lines) |
| 2 | `esp32cam_face_firmware.ino` | `I:\rfid_v3\firmware\esp32cam_face_firmware.ino` (398 lines) |
| 3 | `esp8266.ino` | `I:\rfid_v3\esp8266.ino` (266 lines) |

---

**Project: AttendTrack V2** — An RFID + Face Recognition attendance system with:

### Hardware/Peripheral Configuration

**ESP8266 (Master Scanner)** — *firmware/esp8266_rfid_firmware.ino*
- **MCU:** ESP8266
- **RFID Reader:** MFRC522 via SPI (SS=GPIO15, RST=GPIO2)
- **Display:** 16×2 LCD I2C (0x27 addr, SDA=GPIO4, SCL=GPIO5)
- **Buzzer:** GPIO0 (active-low)
- **Serial link to ESP32-CAM:** SoftwareSerial on RX=GPIO3, TX=GPIO16 @ 9600 baud
- **WiFi:** Dual-network configurable (up to 2 saved networks)
- **Backend discovery:** mDNS service `_attendtrack._tcp`
- **Config storage:** LittleFS `/config.json`
- **Config portal:** AP mode `AttendTrack-Setup` at 192.168.4.1 with captive web UI

**ESP32-CAM (Face Capture)** — *firmware/esp32cam_face_firmware.ino*
- **MCU:** ESP32 (ESP32-CAM module)
- **Camera:** OV2640 with PSRAM (SVGA@10 quality, 2-frame buffer) or no-PSRAM (VGA@12, 1-frame)
- **Flash LED:** GPIO4
- **Serial link from ESP8266:** Hardware Serial2 on RX2=GPIO13, TX2=GPIO12 @ 9600 baud
- **Backend discovery:** mDNS `_attendtrack._tcp`
- **Config storage:** LittleFS `/config.json`
- **Heartbeat:** POSTs to `/api/v1/devices/heartbeat` every 30s

**Legacy Firmware** — *esp8266.ino*
- **Hardcoded** WiFi (`Ikannn`/`11122233344556`) and server IP (`10.16.199.114:3000`)
- Same MFRC522/LCD/buzzer pinout as the master firmware
- No config portal — uses compile-time constants only

### API Endpoints Consumed by Firmware

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/attendance/check-rfid` | Check if UID is registered |
| POST | `/api/v1/attendance/face` | Send face image (with `X-UID`, `X-Purpose`, `X-Device-Code`, `X-Pairing-Key` headers) |
| POST | `/api/v1/attendance/rfid` | Verify RFID + face match |
| POST | `/api/v1/devices/heartbeat` | ESP32-CAM keepalive |

### Supporting Services

- **`python-face-service/main.py`** — FastAPI + DeepFace (Facenet128) + MediaPipe face recognition on port 8000
- **`python-face-service/requirements.txt`** — Deps: fastapi, uvicorn, numpy, Pillow, mediapipe, opencv, deepface, tensorflow, tf-keras
- **`run_ai.bat`** — Launches face service via uvicorn on port 8000
- **`run_backend.bat`** — Launches Express API gateway + gRPC server
- **`.env`** — Config: `FACE_MATCH_THRESHOLD=0.45`, `ATTENDANCE_MATCH_WINDOW_SECONDS=20`, port 3000, gRPC port 50051

### Communication Architecture

```
[MFRC522 RFID] ──SPI──► [ESP8266 MASTER] ──Serial──► [ESP32-CAM]
                               │                         │
                               │ HTTP/mDNS               │ HTTP
                               ▼                         ▼
                     [Express API Gateway :3000]
                               │
                    ┌──────────┼──────────┐
                    ▼          ▼          ▼
              [gRPC :50051] [SQLite]  [Python Face Service :8000]
```

All **3 firmware files** have been read in full above. No other `.cpp`, `.h`, `.hpp`, or compiled Arduino files exist in the project.
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Explore project root config",
  "prompt": "Explore the root directory of this project at I:\\rfid_v3. I need to understand:\n\n1. List ALL files at the root level\n2. Read package.json at root if any\n3. Read any docker-compose files\n4. Read any README files\n5. Read any .env files or .env.example\n6. Read any docker files\n7. Read any .gitignore files\n8. Read any PM2 configuration files\n9. Read any nginx or proxy configuration files\n10. List the top-level directory structure\n\nBe very thorough and return all contents.",
  "subagent_type": "general"
}
```

**Output:**
```
<task id="ses_102147c6dffeUEsHKQWNpd128O" state="completed">
<task_result>
Here is the complete project overview for **RFID V3 - Attendance System**.

---

## Root Directory Listing (24 entries)

```
.ai/
.env
.env.example
.git/
.gitignore
dist/
docs/
esp8266.ino
firmware/
frontend/
node_modules/
package-lock.json
package.json
prisma/          (empty)
python-face-service/
README.md
run_ai.bat
run_backend.bat
run_frontend.bat
scratch/
src/
start_dev.bat
storage/
tsconfig.json
```

---

## Configuration Files

### `.env` / `.env.example`
```env
PORT=3000
GRPC_PORT=50051
JWT_SECRET=super-secret-jwt
JWT_EXPIRES_IN=1h
SQLITE_PATH=storage/rfid_v3.sqlite
FACE_SERVICE_URL=http://localhost:8000
FACE_MATCH_THRESHOLD=0.45
ATTENDANCE_MATCH_WINDOW_SECONDS=20
UPLOAD_DIR=storage/uploads
LOG_LEVEL=info
```

### `frontend/.env`
```env
VITE_API_BASE_URL=http://localhost:3000
```

### `.gitignore`
```
node_modules/
dist/
.env
frontend/node_modules/
frontend/dist/
storage/uploads/*
!storage/uploads/.gitkeep
storage/*.sqlite
*.log
python-face-service/.venv/
.ai/
.venv/
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

**No Docker, nginx, proxy, or PM2 configuration files exist.**

---

## `package.json` (Backend - `rfid-v3-backend`)
- **Scripts:** `dev` (concurrent gRPC + gateway via nodemon/tsx), `build` (tsc), `start:gateway`, `start:grpc`, `lint` (tsc --noEmit)
- **Key Dependencies:** Express 5, gRPC (@grpc/grpc-js), Socket.IO, SQL.js (SQLite), Zod, jsonwebtoken, bcryptjs, multer, pdfmake, pino logger, bonjour-service (mDNS), date-fns, axios, dotenv, helmet, cors
- **Dev Deps:** TypeScript, tsx, nodemon, concurrently, type definitions

---

## Project Structure

### `src/` - Backend TypeScript source (Clean Architecture)
```
src/
  config/           env.ts
  gateway/          app.ts, realtime.ts, server.ts
  grpc/             server.ts + handlers/
  modules/
    attendance/     Controller, Service, Repository, DTO, Entity
    auth/           Controller, Service, Repository, DTO, Entity
    device/         Controller, Service, Repository, DTO, Entity
    employee/       Controller, Service, Repository, DTO, Entity
    settings/       Controller, Service, Repository, DTO, Entity
  proto/            platform.proto (gRPC contracts)
  scripts/          reset-admin.ts, seed-admin.ts, seed-dummy-attendance.ts
  shared/           clients/, container.ts, database/, errors/, grpc/, logger/, middleware/, queue/, realtime/, utils/
  assets/fonts/     Roboto TTF files
  workers/          (empty)
```

### `frontend/` - React + Vite + Tailwind
```
frontend/
  .env / .env.example
  index.html
  package.json       (rfid-v3-frontend)
  vite.config.ts
  postcss.config.cjs
  tailwind.config.ts
  tsconfig.json / tsconfig.app.json / tsconfig.node.json
  src/
    app.tsx, main.tsx, styles.css
    assets/
    components/
    hooks/
    pages/
    services/
    state/
    types/
    utils/
```

### `python-face-service/` - FastAPI face recognition microservice
- **`main.py`** — `POST /encode`, `POST /verify`, `GET /health`
- Uses **DeepFace** with **Facenet128** model + **Mediapipe** face detector
- **`requirements.txt`** — fastapi, uvicorn, numpy, Pillow, mediapipe, opencv-python-headless, deepface, tensorflow, tf-keras

### `firmware/` - ESP8266 + ESP32-CAM Arduino code
- **`esp8266_rfid_firmware.ino`** (V2) — mDNS service discovery, config portal (AP mode), LittleFS config storage, multi-WiFi support, MFRC522 + LCD I2C + buzzer
- **`esp32cam_face_firmware.ino`** — ESP32-CAM camera capture, HTTP streaming to backend, flash control, heartbeat, config sync from ESP8266 via Serial

### `esp8266.ino` - Legacy ESP8266 firmware (hardcoded IPs, single WiFi)

### `docs/`
- `architecture.md` — System architecture, attendance flow, clean architecture mapping
- `database_schema.md` — Full DB schema ERD (mermaid) + table docs: `users`, `employees`, `devices`, `attendance_sessions`, `attendance_records`, `system_settings`

### `storage/`
- `rfid_v3.sqlite` — SQLite database file
- `uploads/` — Face images (.jpg), `.gitkeep`
- `logs/` — `backend.log`, `gateway.log`, `grpc.log`

### `scratch/` - Debug/test scripts
- `check-users.js`, `debug-pdfmake.js`, `inspect-font.js`, `reset-db.js`, `test-all-api.js`, `test-grpc.js`, `test-helvetica.js`, `test-http.js`, `test-pdf-endpoint.js`, `test-pdf.js`, `test-sqlite-strftime.js`, `test-sqljs.js`, `verify-token.js`

### `.ai/` - AI error log
- `error-log.md` — Documents bugs encountered during development (import issues, schema migration, CORS, font/PDF issues, backward compatibility)

### Launch Scripts
| Script | Purpose |
|--------|---------|
| `start_dev.bat` | Launches all 3 services in separate windows |
| `run_backend.bat` | Starts Node.js backend (gateway + gRPC) |
| `run_frontend.bat` | Starts Vite frontend |
| `run_ai.bat` | Starts Python face recognition service |

---

## Architecture Summary

**RFID Attendance System** with:
1. **ESP8266** reads RFID, checks backend, triggers ESP32-CAM
2. **ESP32-CAM** captures face photo, sends to backend
3. **Express Gateway** (port 3000) — REST API for frontend + devices
4. **gRPC Service** (port 50051) — Internal module services
5. **SQLite** — Local file-based persistence (no external DB needed)
6. **Python FastAPI** (port 8000) — Face descriptor encoding + verification via DeepFace/Facenet128
7. **Socket.IO** — Real-time event streaming
8. **mDNS (Bonjour)** — Device auto-discovery on local network

### REST Endpoints
- **Auth:** `POST /api/v1/auth/register`, `POST /api/v1/auth/login`
- **Employees:** CRUD `/api/v1/employees` (aliased to `/api/v1/students`)
- **Attendance:** `POST /rfid`, `POST /face`, `GET /history`, `GET /sessions`, `GET /stream`
- **Devices:** `POST /register`, `POST /heartbeat`, `GET /devices`

### gRPC Services (defined in `platform.proto`)
- AuthService, EmployeeService, DeviceService, AttendanceService, SettingsService
</task_result>
</task>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 109.7s)

_Thinking:_

I now have a comprehensive understanding of the project. Now I need to read the actual source files in detail to create the documentation. Let me read the key files I need to document thoroughly.

Now let me read all the key source files in detail to create accurate documentation.

**Tool: task**

**Input:**
```json
{
  "description": "Read all backend source files",
  "subagent_type": "general",
  "prompt": "Read ALL TypeScript source files from the backend at I:\\rfid_v3\\src. I need the COMPLETE contents of every .ts file. Read every single file - do not skip any. These are the files I need:\n\n1. src/config/env.ts\n2. src/gateway/server.ts\n3. src/gateway/app.ts\n4. src/gateway/realtime.ts\n5. src/grpc/server.ts\n6. src/grpc/handlers/auth.handler.ts\n7. src/grpc/handlers/employee.handler.ts\n8. src/grpc/handlers/device.handler.ts\n9. src/grpc/handlers/attendance.handler.ts\n10. src/grpc/handlers/settings.handler.ts\n11. src/proto/platform.proto\n12. src/shared/container.ts\n13. src/shared/clients/face-recognition.client.ts\n14. src/shared/database/sqlite.ts\n15. src/shared/errors/app-error.ts\n16. src/shared/grpc/proto.ts\n17. src/shared/grpc/grpc-client.ts\n18. src/shared/grpc/grpc-error.ts\n19. src/shared/logger/index.ts\n20. src/shared/middleware/async-handler.ts\n21. src/shared/middleware/authenticate.ts\n22. src/shared/middleware/authorize.ts\n23. src/shared/middleware/error-handler.ts\n24. src/shared/realtime/realtime-events.ts\n25. src/shared/utils/correlation.ts\n26. src/shared/utils/file-storage.ts\n27. src/shared/utils/pdf-generator.ts\n\nAnd ALL module files:\n- src/modules/auth/controller/*.ts\n- src/modules/auth/dto/*.ts\n- src/modules/auth/entity/*.ts\n- src/modules/auth/repository/*.ts\n- src/modules/auth/service/*.ts\n- src/modules/employee/controller/*.ts\n- src/modules/employee/dto/*.ts\n- src/modules/employee/entity/*.ts\n- src/modules/employee/repository/*.ts\n- src/modules/employee/service/*.ts\n- src/modules/device/controller/*.ts\n- src/modules/device/dto/*.ts\n- src/modules/device/entity/*.ts\n- src/modules/device/repository/*.ts\n- src/modules/device/service/*.ts\n- src/modules/attendance/controller/*.ts\n- src/modules/attendance/dto/*.ts\n- src/modules/attendance/entity/*.ts\n- src/modules/attendance/repository/*.ts\n- src/modules/attendance/service/*.ts\n- src/modules/settings/controller/*.ts\n- src/modules/settings/dto/*.ts\n- src/modules/settings/entity/*.ts\n- src/modules/settings/repository/*.ts\n- src/modules/settings/service/*.ts\n\nReturn EVERY line of every file. Do not summarize or skip any file."
}
```

**Output:**
```
<task id="ses_10211c253ffexfBD1P7sKRvevS" state="completed">
<task_result>
All 42 TypeScript files have been read in full. Here's a summary of what was provided:

**Config:**
- `src/config/env.ts` (30 lines) - env schema with Zod, dotenv config

**Gateway:**
- `src/gateway/server.ts` (34 lines) - HTTP server + mDNS + realtime setup
- `src/gateway/app.ts` (116 lines) - Express app with routes, middleware, CORS
- `src/gateway/realtime.ts` (76 lines) - Socket.io + gRPC event bridging

**gRPC:**
- `src/grpc/server.ts` (48 lines) - gRPC server bootstrap
- `src/grpc/handlers/auth.handler.ts` (21 lines)
- `src/grpc/handlers/employee.handler.ts` (59 lines)
- `src/grpc/handlers/device.handler.ts` (62 lines)
- `src/grpc/handlers/attendance.handler.ts` (139 lines)
- `src/grpc/handlers/settings.handler.ts` (59 lines)

**Proto:**
- `src/proto/platform.proto` (266 lines) - full protobuf definitions

**Shared:**
- `src/shared/container.ts` (45 lines) - DI container
- `src/shared/clients/face-recognition.client.ts` (60 lines)
- `src/shared/database/sqlite.ts` (268 lines) - sql.js wrapper with migrations
- `src/shared/errors/app-error.ts` (10 lines)
- `src/shared/grpc/proto.ts` (16 lines)
- `src/shared/grpc/grpc-client.ts` (36 lines)
- `src/shared/grpc/grpc-error.ts` (37 lines)
- `src/shared/logger/index.ts` (26 lines)
- `src/shared/middleware/async-handler.ts` (7 lines)
- `src/shared/middleware/authenticate.ts` (30 lines)
- `src/shared/middleware/authorize.ts` (13 lines)
- `src/shared/middleware/error-handler.ts` (36 lines)
- `src/shared/realtime/realtime-events.ts` (48 lines)
- `src/shared/utils/correlation.ts` (17 lines)
- `src/shared/utils/file-storage.ts` (40 lines)
- `src/shared/utils/pdf-generator.ts` (156 lines) - Indonesian-language PDF reports

**Modules - Auth:**
- `auth.controller.ts` (28), `auth.dto.ts` (16), `user.model.ts` (27), `user.repository.ts` (48), `auth.service.ts` (67)

**Modules - Employee:**
- `employee.controller.ts` (91), `employee.dto.ts` (24), `employee.model.ts` (38), `employee.repository.ts` (81), `employee.service.ts` (59)

**Modules - Device:**
- `device.controller.ts` (44), `device.dto.ts` (18), `device.model.ts` (38), `device.repository.ts` (95), `device.service.ts` (58)

**Modules - Attendance:**
- `attendance.controller.ts` (274), `attendance-stream.controller.ts` (35), `attendance.dto.ts` (65), `attendance-session.model.ts` (56), `attendance-record.model.ts` (18), `attendance.repository.ts` (398), `attendance.service.ts` (164), `attendance-sync.service.ts` (65), `attendance-verification.service.ts` (161), `attendance-retry-scheduler.service.ts` (54)

**Modules - Settings:**
- `settings.controller.ts` (54), `settings.dto.ts` (13), `settings.repository.ts` (26), `settings.service.ts` (62)
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Read all frontend source files",
  "subagent_type": "general",
  "prompt": "Read ALL TypeScript/TSX source files from the frontend at I:\\rfid_v3\\frontend\\src. I need the COMPLETE contents of EVERY file. Do not skip any file. Files are:\n\n1. src/main.tsx\n2. src/app.tsx\n3. src/styles.css\n4. src/state/auth-store.ts\n5. src/state/attendance-store.ts\n6. src/services/http.ts\n7. src/services/auth.service.ts\n8. src/services/attendance.service.ts\n9. src/services/employee.service.ts\n10. src/services/settings.service.ts\n11. src/services/realtime.service.ts\n12. src/hooks/use-auth-hydrate.ts\n13. src/hooks/use-bootstrap-data.ts\n14. src/hooks/use-realtime-attendance.ts\n15. src/types/domain.ts\n16. src/utils/api-base.ts\n17. src/utils/image.ts\n18. src/utils/format.ts\n19. src/pages/login-page.tsx\n20. src/pages/dashboard-page.tsx\n21. src/pages/monitoring-page.tsx\n22. src/pages/history-page.tsx\n23. src/pages/employees-page.tsx\n24. src/pages/simulator-page.tsx\n25. src/pages/settings-page.tsx\n26. src/pages/not-found-page.tsx\n27. src/components/app-shell.tsx\n28. src/components/app-sidebar.tsx\n29. src/components/topbar.tsx\n30. src/components/summary-strip.tsx\n31. src/components/summary-card.tsx\n32. src/components/live-feed.tsx\n33. src/components/device-overview.tsx\n34. src/components/status-badge.tsx\n35. src/components/toast-viewport.tsx\n36. src/components/session-monitor.tsx\n37. src/components/history-filters.tsx\n38. src/components/history-table.tsx\n\nReturn EVERY line of EVERY file."
}
```

**Output:**
```
<task id="ses_102118d5dffeEcGpJzhfR7XkEb" state="completed">
<task_result>
All 38 files have been read completely. Here's a summary:

**Structure note:** The component files are organized in subdirectories (`layout/`, `dashboard/`, `common/`, `monitoring/`, `history/`), not directly under `components/`. The imports in `app.tsx` reference `./components/layout/app-shell` which is correct.

Files and line counts:

| # | File | Lines |
|---|------|-------|
| 1 | `src/main.tsx` | 10 |
| 2 | `src/app.tsx` | 55 |
| 3 | `src/styles.css` | 39 |
| 4 | `src/state/auth-store.ts` | 61 |
| 5 | `src/state/attendance-store.ts` | 229 |
| 6 | `src/services/http.ts` | 17 |
| 7 | `src/services/auth.service.ts` | 9 |
| 8 | `src/services/attendance.service.ts` | 81 |
| 9 | `src/services/employee.service.ts` | 33 |
| 10 | `src/services/settings.service.ts` | 21 |
| 11 | `src/services/realtime.service.ts` | 62 |
| 12 | `src/hooks/use-auth-hydrate.ts` | 10 |
| 13 | `src/hooks/use-bootstrap-data.ts` | 16 |
| 14 | `src/hooks/use-realtime-attendance.ts` | 43 |
| 15 | `src/types/domain.ts` | 100 |
| 16 | `src/utils/api-base.ts` | 1 |
| 17 | `src/utils/image.ts` | 16 |
| 18 | `src/utils/format.ts` | 26 |
| 19 | `src/pages/login-page.tsx` | 85 |
| 20 | `src/pages/dashboard-page.tsx` | 13 |
| 21 | `src/pages/monitoring-page.tsx` | 15 |
| 22 | `src/pages/history-page.tsx` | 9 |
| 23 | `src/pages/employees-page.tsx` | 457 |
| 24 | `src/pages/simulator-page.tsx` | 217 |
| 25 | `src/pages/settings-page.tsx` | 148 |
| 26 | `src/pages/not-found-page.tsx` | 11 |
| 27 | `src/components/layout/app-shell.tsx` | 23 |
| 28 | `src/components/layout/app-sidebar.tsx` | 75 |
| 29 | `src/components/layout/topbar.tsx` | 56 |
| 30 | `src/components/dashboard/summary-strip.tsx` | 119 |
| 31 | `src/components/dashboard/summary-card.tsx` | 36 |
| 32 | `src/components/dashboard/live-feed.tsx` | 116 |
| 33 | `src/components/dashboard/device-overview.tsx` | 61 |
| 34 | `src/components/common/status-badge.tsx` | 37 |
| 35 | `src/components/common/toast-viewport.tsx` | 64 |
| 36 | `src/components/monitoring/session-monitor.tsx` | 90 |
| 37 | `src/components/history/history-filters.tsx` | 175 |
| 38 | `src/components/history/history-table.tsx` | 191 |

**Total: ~2,828 lines across 38 files.** Everything returned in full above.
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Read firmware files fully",
  "subagent_type": "general",
  "prompt": "Read every firmware file completely at I:\\rfid_v3. Read these files:\n\n1. firmware/esp8266_rfid_firmware.ino\n2. firmware/esp32cam_face_firmware.ino\n3. esp8266.ino (legacy)\n4. python-face-service/main.py\n5. python-face-service/requirements.txt\n6. src/scripts/seed-admin.ts\n7. src/scripts/reset-admin.ts\n8. src/scripts/seed-dummy-attendance.ts\n\nReturn the COMPLETE contents of every file."
}
```

**Output:**
```
<task id="ses_102118c19ffeBu4LtjxmSpqS8i" state="completed">
<task_result>
Here are all 8 files:

---

### 1. `firmware/esp8266_rfid_firmware.ino` (451 lines)

```cpp
/**
 * AttendTrack V2 - RFID Scanner Firmware (ESP8266 MASTER)
 * - Zero Hardcoded IPs
 * - Multi-WiFi Support
 * - mDNS Service Discovery
 * - Configuration Portal (AP Mode)
 */

#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <LittleFS.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

#define SS_PIN  15
#define RST_PIN 2
#define BUZZER_PIN 0   // D3 (GPIO0)
#define RX_PIN 3       // RX

MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2);
SoftwareSerial linkSerial(RX_PIN, 16); 

// Config Structs
struct WiFiNetwork {
  String ssid;
  String password;
};
#define MAX_WIFI 2
WiFiNetwork wifiNetworks[MAX_WIFI];

String serverHostname = "attendtrack";
int serverPort = 3000;
String deviceCode = "ESP8266-MASTER-01";
String pairingKey = "ROOM-1";

String resolvedServerUrl = "";
bool inConfigMode = false;
ESP8266WebServer server(80);

unsigned long lastScanAt = 0;
const unsigned long scanCooldownMs = 3000;

// Config Portal HTML
const char* htmlTemplate PROGMEM = R"rawliteral(
<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>
body{font-family:'Segoe UI',Tahoma,sans-serif;background:#f4f7f6;color:#333;margin:0;padding:0;}
.container{max-width:400px;margin:30px auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);}
h2{text-align:center;color:#2c3e50;}
label{display:block;margin-top:15px;font-weight:bold;font-size:14px;}
input{width:100%;padding:10px;margin-top:5px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;}
.btn{display:block;width:100%;background:#3498db;color:#fff;border:none;padding:12px;margin-top:20px;border-radius:4px;cursor:pointer;font-size:16px;font-weight:bold;}
.btn:hover{background:#2980b9;}
.group{border:1px solid #e0e0e0;padding:15px;margin-top:10px;border-radius:4px;background:#fafafa;}
</style></head><body>
<div class="container"><h2>AttendTrack Setup</h2>
<form action="/save" method="POST">
<div class="group"><h3>WiFi Networks</h3>
<label>WiFi 1 SSID</label><input type="text" name="ssid0" value="%SSID0%">
<label>WiFi 1 Password</label><input type="password" name="pass0" value="%PASS0%">
<label>WiFi 2 SSID</label><input type="text" name="ssid1" value="%SSID1%">
<label>WiFi 2 Password</label><input type="password" name="pass1" value="%PASS1%">
</div>
<div class="group"><h3>Backend Settings</h3>
<label>Server Hostname (without .local)</label><input type="text" name="hostname" value="%HOSTNAME%">
<label>Server Port</label><input type="number" name="port" value="%PORT%">
</div>
<div class="group"><h3>Device Settings</h3>
<label>Device Code</label><input type="text" name="code" value="%CODE%">
<label>Pairing Key</label><input type="text" name="key" value="%KEY%">
</div>
<button class="btn" type="submit">Save & Reboot</button>
</form></div></body></html>
)rawliteral";

void beep(int durationMs = 100) {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(durationMs);
  digitalWrite(BUZZER_PIN, LOW);
}

void loadConfig() {
  if (!LittleFS.begin()) {
    Serial.println("Failed to mount LittleFS, attempting to format...");
    LittleFS.format();
    if (!LittleFS.begin()) {
      Serial.println("LittleFS Mount Failed!");
      return;
    }
  }
  if (!LittleFS.exists("/config.json")) {
    Serial.println("Config file not found, using defaults");
    return;
  }
  File file = LittleFS.open("/config.json", "r");
  StaticJsonDocument<1024> doc;
  DeserializationError error = deserializeJson(doc, file);
  if (!error) {
    for (int i = 0; i < MAX_WIFI; i++) {
      wifiNetworks[i].ssid = doc["wifi"][i]["ssid"] | "";
      wifiNetworks[i].password = doc["wifi"][i]["password"] | "";
    }
    serverHostname = doc["hostname"] | "attendtrack";
    serverPort = doc["port"] | 3000;
    deviceCode = doc["code"] | "ESP8266-MASTER-01";
    pairingKey = doc["key"] | "ROOM-1";
    Serial.println("Config loaded successfully");
  }
  file.close();
}

void saveConfig() {
  StaticJsonDocument<1024> doc;
  JsonArray wifiArray = doc.createNestedArray("wifi");
  for (int i = 0; i < MAX_WIFI; i++) {
    JsonObject wifiObj = wifiArray.createNestedObject();
    wifiObj["ssid"] = wifiNetworks[i].ssid;
    wifiObj["password"] = wifiNetworks[i].password;
  }
  doc["hostname"] = serverHostname;
  doc["port"] = serverPort;
  doc["code"] = deviceCode;
  doc["key"] = pairingKey;
  
  File file = LittleFS.open("/config.json", "w");
  if (!file) {
    Serial.println("Failed to open config.json for writing");
    return;
  }
  serializeJson(doc, file);
  file.close();
  Serial.println("Config saved");
}

void handleRoot() {
  String html = htmlTemplate;
  html.replace("%SSID0%", wifiNetworks[0].ssid);
  html.replace("%PASS0%", wifiNetworks[0].password);
  html.replace("%SSID1%", wifiNetworks[1].ssid);
  html.replace("%PASS1%", wifiNetworks[1].password);
  html.replace("%HOSTNAME%", serverHostname);
  html.replace("%PORT%", String(serverPort));
  html.replace("%CODE%", deviceCode);
  html.replace("%KEY%", pairingKey);
  server.send(200, "text/html", html);
}

void handleSave() {
  wifiNetworks[0].ssid = server.arg("ssid0");
  wifiNetworks[0].password = server.arg("pass0");
  wifiNetworks[1].ssid = server.arg("ssid1");
  wifiNetworks[1].password = server.arg("pass1");
  serverHostname = server.arg("hostname");
  // Clean hostname in case user typed .local
  if (serverHostname.endsWith(".local")) {
    serverHostname = serverHostname.substring(0, serverHostname.length() - 6);
  }
  serverPort = server.arg("port").toInt();
  deviceCode = server.arg("code");
  pairingKey = server.arg("key");
  saveConfig();
  
  // Kirim JSON config ke ESP32-CAM via Serial (RX/TX)
  StaticJsonDocument<512> doc;
  JsonArray wifiArray = doc.createNestedArray("wifi");
  for (int i = 0; i < MAX_WIFI; i++) {
    JsonObject wifiObj = wifiArray.createNestedObject();
    wifiObj["ssid"] = wifiNetworks[i].ssid;
    wifiObj["password"] = wifiNetworks[i].password;
  }
  doc["hostname"] = serverHostname;
  doc["port"] = serverPort;
  doc["code"] = deviceCode;
  doc["key"] = pairingKey;
  
  String jsonStr;
  serializeJson(doc, jsonStr);
  linkSerial.println("SYNC_JSON|" + jsonStr);
  Serial.println("Sent sync config to ESP32-CAM");
  
  server.send(200, "text/html", "<h2>Saved! Rebooting...</h2><script>setTimeout(()=>location.reload(), 5000);</script>");
  delay(2000);
  ESP.restart();
}

void startConfigPortal() {
  inConfigMode = true;
  WiFi.mode(WIFI_AP);
  WiFi.softAP("AttendTrack-Setup", "12345678");
  
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("CONFIG MODE");
  lcd.setCursor(0, 1);
  lcd.print("192.168.4.1");
  Serial.println("Started Config Portal at 192.168.4.1");

  server.on("/", handleRoot);
  server.on("/save", HTTP_POST, handleSave);
  server.begin();
  
  while (true) {
    server.handleClient();
    delay(10);
  }
}

bool connectWiFi() {
  WiFi.mode(WIFI_STA);
  for (int i = 0; i < MAX_WIFI; i++) {
    if (wifiNetworks[i].ssid.length() > 0) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("CONNECTING WiFi");
      lcd.setCursor(0, 1);
      lcd.print(wifiNetworks[i].ssid);
      
      Serial.print("Connecting to ");
      Serial.println(wifiNetworks[i].ssid);
      
      WiFi.begin(wifiNetworks[i].ssid.c_str(), wifiNetworks[i].password.c_str());
      int retry = 0;
      while (WiFi.status() != WL_CONNECTED && retry < 20) {
        delay(500);
        Serial.print(".");
        retry++;
      }
      if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nWiFi Connected!");
        lcd.clear();
        lcd.print("WiFi CONNECTED");
        delay(1000);
        return true;
      }
    }
  }
  Serial.println("\nAll WiFi failed!");
  return false;
}

void resolveBackend() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("SEARCHING SERVER");
  
  if (!MDNS.begin("attendtrack-esp8266")) {
    Serial.println("Error setting up MDNS responder!");
  }
  
  Serial.println("Searching for _attendtrack._tcp service...");
  
  int attempts = 0;
  while (attempts < 5) {
    int n = MDNS.queryService("attendtrack", "tcp");
    if (n > 0) {
      resolvedServerUrl = "http://" + MDNS.IP(0).toString() + ":" + String(MDNS.port(0));
      Serial.println("Server found: " + resolvedServerUrl);
      lcd.clear();
      lcd.print("SERVER FOUND");
      delay(1000);
      return;
    }
    delay(1000);
    attempts++;
    Serial.print(".");
  }
  
  lcd.clear();
  lcd.print("SERVER OFFLINE");
  Serial.println("Server not found via mDNS");
  delay(2000);
}

void showIdle() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Ready to Scan");
  lcd.setCursor(0, 1);
  lcd.print("Tempel Kartu...");
}

String readUID() {
  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();
  return uid;
}

void setup() {
  Serial.begin(115200, SERIAL_8N1, SERIAL_TX_ONLY);
  linkSerial.begin(9600);
  Wire.begin(4, 5);
  lcd.init();
  lcd.backlight();
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  lcd.print("AttendTrack V2");
  delay(1000);

  loadConfig();
  
  bool hasWifi = false;
  for(int i=0; i<MAX_WIFI; i++) if(wifiNetworks[i].ssid.length() > 0) hasWifi = true;
  
  if (!hasWifi || !connectWiFi()) {
    startConfigPortal();
  }

  resolveBackend();

  lcd.clear();
  lcd.print("RFID Init...");
  SPI.begin();
  mfrc522.PCD_Init();
  delay(1000);
  showIdle();
}

void loop() {
  if (inConfigMode) return;

  if (millis() - lastScanAt < scanCooldownMs) return;

  if (WiFi.status() != WL_CONNECTED) {
    if(!connectWiFi()) {
       startConfigPortal();
    }
    resolveBackend();
    showIdle();
  }

  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) return;

  String uid = readUID();
  beep(100);
  Serial.println("UID: " + uid);
  lastScanAt = millis();

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Memproses...");

  if (resolvedServerUrl == "") resolveBackend();
  if (resolvedServerUrl == "") {
    lcd.setCursor(0, 1);
    lcd.print("Server Offline");
    beep(100); delay(50); beep(100);
    delay(2000);
    showIdle();
    return;
  }

  WiFiClient client;
  HTTPClient http;
  
  http.begin(client, resolvedServerUrl + "/api/v1/attendance/check-rfid");
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(5000);

  String payload = "{\"uid\":\"" + uid + "\",\"deviceCode\":\"" + deviceCode + "\",\"pairingKey\":\"" + pairingKey + "\"}";
  int checkCode = http.POST(payload);

  if (checkCode == 200) {
    String responseBody = http.getString();
    StaticJsonDocument<512> doc;
    deserializeJson(doc, responseBody);
    
    if (doc["registered"] == false) {
      if (doc["action"] == "REGISTER_CAPTURE") {
        lcd.clear();
        lcd.print("Registrasi Baru");
        lcd.setCursor(0, 1);
        lcd.print("Ambil Foto...");
        linkSerial.println("REGISTER_CAPTURE|" + uid);
        beep(100); delay(100); beep(100);
        http.end();
        delay(2000);
        mfrc522.PICC_HaltA();
        mfrc522.PCD_StopCrypto1();
        showIdle();
        return;
      } else {
        lcd.clear();
        lcd.print("RFID TIDAK");
        lcd.setCursor(0, 1);
        lcd.print("TERDAFTAR");
        beep(100); delay(100); beep(100);
        http.end();
        delay(3000);
        mfrc522.PICC_HaltA();
        mfrc522.PCD_StopCrypto1();
        showIdle();
        return;
      }
    }
  } else {
    lcd.clear();
    lcd.print("Koneksi Error");
    beep(100); delay(50); beep(100);
    http.end();
    delay(3000);
    showIdle();
    return;
  }
  http.end();

  lcd.clear();
  lcd.print("Mengambil Foto..");
  linkSerial.println("CAPTURE|" + uid);

  http.begin(client, resolvedServerUrl + "/api/v1/attendance/rfid");
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(25000);
  
  int verifyCode = http.POST(payload);

  lcd.clear();
  if (verifyCode == 200) {
    lcd.print("Wajah Cocok!");
    lcd.setCursor(0, 1);
    lcd.print("Verified");
    beep(500);
  } else if (verifyCode == 400 || verifyCode == 401) { 
    lcd.print("Wajah Tdk Cocok");
    lcd.setCursor(0, 1);
    lcd.print("Verifikasi Gagal");
    beep(100); delay(50); beep(100); delay(50); beep(100);
  } else {
    lcd.print("Koneksi Timeout");
    lcd.setCursor(0, 1);
    lcd.print("Coba Lagi");
    beep(100); delay(50); beep(100);
  }
  http.end();
  
  delay(3000);
  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  showIdle();
}
```

---

### 2. `firmware/esp32cam_face_firmware.ino` (398 lines)

```cpp
#include "esp_camera.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <LittleFS.h>
#include <ESPmDNS.h>

// ================= CAMERA PIN =================
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

#define FLASH_GPIO_NUM     4

// Serial dari ESP8266
#define RX2_PIN 13
#define TX2_PIN 12 

// Config Structs
struct WiFiNetwork {
  String ssid;
  String password;
};
#define MAX_WIFI 2
WiFiNetwork wifiNetworks[MAX_WIFI];

String serverHostname = "attendtrack";
int serverPort = 3000;
String deviceCode = "ESP32CAM-MASTER-01";
String pairingKey = "ROOM-1";

String resolvedServerUrl = "";
bool waitingForConfig = false;
unsigned long lastHeartbeat = 0;

void loadConfig() {
  if (!LittleFS.begin(true)) {
    Serial.println("LittleFS Mount Failed");
    return;
  }
  
  if (!LittleFS.exists("/config.json")) {
    Serial.println("Config file not found, using defaults");
    return;
  }
  
  File file = LittleFS.open("/config.json", "r");
  StaticJsonDocument<1024> doc;
  DeserializationError error = deserializeJson(doc, file);
  if (!error) {
    for (int i = 0; i < MAX_WIFI; i++) {
      wifiNetworks[i].ssid = doc["wifi"][i]["ssid"] | "";
      wifiNetworks[i].password = doc["wifi"][i]["password"] | "";
    }
    serverHostname = doc["hostname"] | "attendtrack";
    serverPort = doc["port"] | 3000;
    
    // Khusus untuk CAM, biarkan device code tetap CAM agar dibedakan dengan ESP8266 di backend
    // Tapi kita bisa mengambil pairing key dari ESP8266
    String receivedCode = doc["code"] | "ESP32CAM-MASTER-01";
    // Jika code yang diterima dari ESP8266 adalah ESP8266-MASTER-01, kita ubah jadi ESP32CAM
    if (receivedCode.indexOf("ESP8266") != -1) {
      receivedCode.replace("ESP8266", "ESP32CAM");
    }
    deviceCode = receivedCode;
    pairingKey = doc["key"] | "ROOM-1";
    Serial.println("Config loaded");
  }
  file.close();
}

void saveConfigFromJSON(String jsonStr) {
  StaticJsonDocument<1024> doc;
  DeserializationError error = deserializeJson(doc, jsonStr);
  
  if (error) {
    Serial.println("Failed to parse config JSON from ESP8266");
    return;
  }

  // Save raw json to file
  File file = LittleFS.open("/config.json", "w");
  serializeJson(doc, file);
  file.close();
  
  Serial.println("New config saved from ESP8266! Rebooting...");
  delay(1000);
  ESP.restart();
}

bool connectWiFi() {
  WiFi.mode(WIFI_STA);
  for (int i = 0; i < MAX_WIFI; i++) {
    if (wifiNetworks[i].ssid.length() > 0) {
      Serial.print("Connecting to ");
      Serial.println(wifiNetworks[i].ssid);
      
      WiFi.begin(wifiNetworks[i].ssid.c_str(), wifiNetworks[i].password.c_str());
      int retry = 0;
      bool flashState = false;
      while (WiFi.status() != WL_CONNECTED && retry < 20) {
        // Blink saat koneksi WiFi saja, BUKAN saat mode config/idle
        flashState = !flashState;
        digitalWrite(FLASH_GPIO_NUM, flashState ? HIGH : LOW);
        delay(500);
        Serial.print(".");
        retry++;
      }
      digitalWrite(FLASH_GPIO_NUM, LOW); // turn off
      if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nWiFi Connected!");
        return true;
      }
    }
  }
  Serial.println("\nAll WiFi failed!");
  return false;
}

void resolveBackend() {
  if (!MDNS.begin("attendtrack-esp32cam")) {
    Serial.println("Error setting up MDNS!");
  }
  
  Serial.println("Searching for _attendtrack._tcp service...");
  
  int attempts = 0;
  while (attempts < 5) {
    int n = MDNS.queryService("attendtrack", "tcp");
    if (n > 0) {
      resolvedServerUrl = "http://" + MDNS.IP(0).toString() + ":" + String(MDNS.port(0));
      Serial.println("Server found: " + resolvedServerUrl);
      
      // Solid flash for 2 seconds to indicate readiness
      digitalWrite(FLASH_GPIO_NUM, HIGH);
      delay(2000);
      digitalWrite(FLASH_GPIO_NUM, LOW);
      return;
    }
    delay(1000);
    attempts++;
    Serial.print(".");
  }
  Serial.println("Server not found via mDNS");
}

void initCamera() {
  camera_config_t config;

  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;

  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;

  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;

  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;

  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;

  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if(psramFound()){
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_VGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.println("Camera init failed");
    delay(3000);
    ESP.restart();
  }
}

void sendHeartbeat() {
  if (WiFi.status() != WL_CONNECTED || resolvedServerUrl == "") return;

  HTTPClient http;
  http.begin(resolvedServerUrl + "/api/v1/devices/heartbeat");
  http.setTimeout(3000);
  http.addHeader("Content-Type", "application/json");

  StaticJsonDocument<200> doc;
  doc["deviceCode"] = deviceCode;
  doc["type"] = "ESP32CAM";

  String payload;
  serializeJson(doc, payload);

  int code = http.POST(payload);
  Serial.println("Heartbeat: " + String(code));
  http.end();
}

void captureAndSend(String uid) {
  digitalWrite(FLASH_GPIO_NUM, HIGH);
  delay(800); 

  // Buang frame lama yang ada di buffer (karena fb_count = 2)
  camera_fb_t * dummy_fb = esp_camera_fb_get();
  if (dummy_fb) esp_camera_fb_return(dummy_fb);
  
  // Buang frame kedua
  dummy_fb = esp_camera_fb_get();
  if (dummy_fb) esp_camera_fb_return(dummy_fb);
  
  delay(50); 
  // Ambil frame terbaru yang benar-benar fresh
  camera_fb_t * fb = esp_camera_fb_get();

  digitalWrite(FLASH_GPIO_NUM, LOW);

  if(!fb) {
    Serial.println("Capture failed");
    Serial2.println("RESULT|FAILED");
    return;
  }

  if (WiFi.status() == WL_CONNECTED && resolvedServerUrl != "") {
    HTTPClient http;
    http.begin(resolvedServerUrl + "/api/v1/attendance/face");
    http.setTimeout(20000); 

    http.addHeader("Content-Type", "application/octet-stream");
    http.addHeader("X-UID", uid);
    http.addHeader("X-Device-Code", deviceCode);
    http.addHeader("X-Pairing-Key", pairingKey);

    Serial.println("Sending image for UID: " + uid);
    int httpCode = http.POST(fb->buf, fb->len);

    if (httpCode > 0) {
      Serial.printf("Response: %d\n", httpCode);
      if (httpCode == 200 || httpCode == 201) {
        Serial2.println("RESULT|SUCCESS");
      } else {
        Serial2.println("RESULT|FAILED");
      }
    } else {
      Serial.printf("Error: %s\n", http.errorToString(httpCode).c_str());
      Serial2.println("RESULT|FAILED");
    }
    http.end();
  } else {
    Serial.println("WiFi not connected or Server not resolved");
    Serial2.println("RESULT|FAILED");
  }

  esp_camera_fb_return(fb);
}

void captureAndSendRegistration(String uid) {
  digitalWrite(FLASH_GPIO_NUM, HIGH);
  delay(800); 

  // Buang frame lama yang ada di buffer (karena fb_count = 2)
  camera_fb_t * dummy_fb = esp_camera_fb_get();
  if (dummy_fb) esp_camera_fb_return(dummy_fb);
  
  // Buang frame kedua
  dummy_fb = esp_camera_fb_get();
  if (dummy_fb) esp_camera_fb_return(dummy_fb);
  
  delay(50); 
  // Ambil frame terbaru yang benar-benar fresh
  camera_fb_t * fb = esp_camera_fb_get();

  digitalWrite(FLASH_GPIO_NUM, LOW);

  if(!fb) {
    Serial.println("Registration Capture failed");
    return;
  }

  if (WiFi.status() == WL_CONNECTED && resolvedServerUrl != "") {
    HTTPClient http;
    http.begin(resolvedServerUrl + "/api/v1/attendance/face");
    http.setTimeout(20000); 

    http.addHeader("Content-Type", "application/octet-stream");
    http.addHeader("X-UID", uid);
    http.addHeader("X-Purpose", "registration"); // NEW HEADER
    http.addHeader("X-Device-Code", deviceCode);
    http.addHeader("X-Pairing-Key", pairingKey);

    Serial.println("Sending registration image for UID: " + uid);
    int httpCode = http.POST(fb->buf, fb->len);

    if (httpCode > 0) {
      Serial.printf("Response: %d\n", httpCode);
    } else {
      Serial.printf("Error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  } else {
    Serial.println("WiFi not connected or Server not resolved");
  }

  esp_camera_fb_return(fb);
}

void setup() {
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, RX2_PIN, TX2_PIN);

  pinMode(FLASH_GPIO_NUM, OUTPUT);
  // Pastikan flash mati
  digitalWrite(FLASH_GPIO_NUM, LOW);

  initCamera();
  loadConfig();
  
  bool hasWifi = false;
  for(int i=0; i<MAX_WIFI; i++) if(wifiNetworks[i].ssid.length() > 0) hasWifi = true;
  
  if (!hasWifi || !connectWiFi()) {
    // Mode standby, menunggu kiriman config dari ESP8266 via Serial
    Serial.println("No WiFi or connection failed. Waiting for config from ESP8266...");
    waitingForConfig = true;
  } else {
    resolveBackend();
  }
}

void loop() {
  // Cek Serial dari ESP8266
  if (Serial2.available()) {
    String msg = Serial2.readStringUntil('\n');
    msg.trim();

    if (msg.startsWith("SYNC_JSON|")) {
      String jsonStr = msg.substring(10);
      saveConfigFromJSON(jsonStr);
    }
    else if (msg.startsWith("CAPTURE|") && !waitingForConfig) {
      String uid = msg.substring(8);
      Serial.println("CMD: CAPTURE");
      captureAndSend(uid);
    }
    else if (msg.startsWith("REGISTER_CAPTURE|") && !waitingForConfig) {
      String uid = msg.substring(17);
      Serial.println("CMD: REGISTER_CAPTURE");
      captureAndSendRegistration(uid);
    }
  }

  if (waitingForConfig) {
    // Jangan lakukan apa-apa, tunggu sampai config masuk via Serial
    return;
  }

  if (millis() - lastHeartbeat > 30000) {
    sendHeartbeat();
    lastHeartbeat = millis();
  }

  // Reconnect logic
  if (WiFi.status() != WL_CONNECTED) {
    if(!connectWiFi()) {
       waitingForConfig = true;
       Serial.println("WiFi lost and reconnect failed. Waiting for new config...");
    } else {
       resolveBackend();
    }
  }
}
```

---

### 3. `esp8266.ino` (legacy, 266 lines)

```cpp
/**
 * RFID Scanner Firmware for ESP8266 (MASTER/WIFI MODE)
 * Hardware: ESP8266 + MFRC522 + LCD I2C
 * 
 * Komunikasi: Menggunakan HTTP WiFi untuk menunggu hasil dari Backend,
 *             dan Serial untuk men-trigger ESP32-CAM.
 * 
 * Pinout:
 * MFRC522 | ESP8266 (D-Series labels) | GPIO
 * ------------------------------------------
 * RST     | D4                        | 2
 * SDA(SS) | D8                        | 15
 * MOSI    | D7                        | 13
 * MISO    | D6                        | 12
 * SCK     | D5                        | 14
 * 
 * LCD I2C | ESP8266
 * -----------------
 * SDA     | D2 (GPIO 4)
 * SCL     | D1 (GPIO 5)
 */

#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

// ================= CONFIG WIFI & BACKEND =================
const char* ssid = "Ikannn";
const char* password = "11122233344556";
const char* serverUrl = "http://10.16.199.114:3000";

const char* deviceCode = "ESP8266-MASTER-01";
const char* pairingKey = "ROOM-1";

#define SS_PIN  15
#define RST_PIN 2
#define BUZZER_PIN 0   // D3 (GPIO0)
#define RX_PIN 3       // Pin RX bawaan (GPIO3)

MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Pin 16 (D0) digunakan sebagai TX. Pin 3 (RX) digunakan sebagai RX.
SoftwareSerial linkSerial(RX_PIN, 16); 

unsigned long lastScanAt = 0;
const unsigned long scanCooldownMs = 3000;

void connectWiFi() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connecting WiFi");

  WiFi.begin(ssid, password);
  Serial.print("Connecting WiFi");

  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < 20) {
    delay(500);
    Serial.print(".");
    retry++;
  }

  lcd.clear();
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected!");
    lcd.print("WiFi Connected!");
  } else {
    Serial.println("\nWiFi Failed!");
    lcd.print("WiFi Failed!");
  }
  delay(1000);
}

void beep(int durationMs = 100) {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(durationMs);
  digitalWrite(BUZZER_PIN, LOW);
}

void showIdle() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Ready to Scan");
  lcd.setCursor(0, 1);
  lcd.print("Tempel Kartu...");
}

String readUID() {
  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();
  return uid;
}

void setup() {
  Serial.begin(115200, SERIAL_8N1, SERIAL_TX_ONLY);   // Debug port
  linkSerial.begin(9600); // Komunikasi ke ESP32-CAM

  Wire.begin(4, 5);
  lcd.init();
  lcd.backlight();
  
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  connectWiFi();

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("RFID Initializing");
  
  SPI.begin();
  mfrc522.PCD_Init();
  
  delay(1000);
  showIdle();
}

void loop() {
  if (millis() - lastScanAt < scanCooldownMs) return;

  // Cek koneksi WiFi
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
    showIdle();
  }

  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) return;

  String uid = readUID();

  // Beep deteksi awal
  beep(100);
  
  Serial.println("UID Detected: " + uid);
  lastScanAt = millis();

  // Tampilkan di LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Memproses...");
  lcd.setCursor(0, 1);
  lcd.print("Tunggu sebentar.");

  // Kirim ke API Gateway untuk Cek RFID dulu
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    
    // STEP 1: Cek apakah RFID terdaftar
    http.begin(client, String(serverUrl) + "/api/v1/attendance/check-rfid");
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(5000); // Timeout cepat untuk check

    String payload = "{\"uid\":\"" + uid + "\",\"deviceCode\":\"" + String(deviceCode) + "\",\"pairingKey\":\"" + String(pairingKey) + "\"}";
    Serial.println("Checking RFID: " + payload);
    
    int checkCode = http.POST(payload);
    Serial.printf("Check Response Code: %d\n", checkCode);

    if (checkCode == 200) {
      String responseBody = http.getString();
      Serial.println(responseBody);
      
      StaticJsonDocument<512> doc;
      DeserializationError error = deserializeJson(doc, responseBody);
      
      if (!error && doc["registered"] == false) {
        // STEP 3A: RFID TIDAK TERDAFTAR
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("RFID TIDAK");
        lcd.setCursor(0, 1);
        lcd.print("TERDAFTAR");
        Serial.println("RFID belum terdaftar, membatalkan capture.");
        beep(100); delay(100); beep(100); // Beep error
        http.end();
        
        delay(3000);
        mfrc522.PICC_HaltA();
        mfrc522.PCD_StopCrypto1();
        showIdle();
        return; // Berhenti di sini, tidak men-trigger kamera
      }
    } else {
      // Gagal menghubungi server saat check
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Koneksi Error");
      beep(100); delay(50); beep(100);
      http.end();
      
      delay(3000);
      mfrc522.PICC_HaltA();
      mfrc522.PCD_StopCrypto1();
      showIdle();
      return;
    }
    http.end();

    // STEP 3B: RFID TERDAFTAR
    // Tampilkan pesan dan kirim perintah ke ESP32-CAM
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Mengambil Foto..");
    
    String cmd = "CAPTURE|" + uid;
    linkSerial.println(cmd);
    Serial.println("Triggering ESP32-CAM: " + cmd);

    // STEP 4: Tunggu hasil verifikasi wajah
    http.begin(client, String(serverUrl) + "/api/v1/attendance/rfid");
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(25000); // Timeout lama karena menunggu AI Face Recognition
    
    Serial.println("Waiting for Face Verification...");
    int verifyCode = http.POST(payload);
    Serial.printf("Verify Response Code: %d\n", verifyCode);

    lcd.clear();
    if (verifyCode == 200) {
      lcd.setCursor(0, 0);
      lcd.print("Wajah Cocok!    ");
      lcd.setCursor(0, 1);
      lcd.print("Verified        ");
      Serial.println("Verifikasi Wajah Berhasil");
      beep(500); // Beep sukses (panjang)
    } else if (verifyCode == 400 || verifyCode == 401) { 
      lcd.setCursor(0, 0);
      lcd.print("Wajah Tdk Cocok ");
      lcd.setCursor(0, 1);
      lcd.print("Verifikasi Gagal");
      Serial.println("Verifikasi Wajah Gagal");
      beep(100); delay(50); beep(100); delay(50); beep(100);
    } else {
      lcd.setCursor(0, 0);
      lcd.print("Koneksi Timeout ");
      lcd.setCursor(0, 1);
      lcd.print("Coba Lagi       ");
      Serial.println("Timeout atau Server Error");
      beep(100); delay(50); beep(100); delay(50); beep(100);
    }
    http.end();
  } else {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi Terputus");
    beep(100); delay(50); beep(100); delay(50); beep(100);
  }
  
  delay(3000); // Tahan tampilan hasil selama 3 detik
  
  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  showIdle();
}
```

---

### 4. `python-face-service/main.py` (139 lines)

```python
import base64
import io
import os
from typing import List

import cv2
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from PIL import Image
from deepface import DeepFace

# Disable TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

app = FastAPI(title="Face Recognition Service (DeepFace + Facenet128)")

@app.on_event("startup")
async def startup_event():
    try:
        print("---")
        print("INITIALIZING FACE RECOGNITION SERVICE")
        print("Model: Facenet128")
        print("This may take a minute on first run (downloading weights)...")
        DeepFace.build_model("Facenet")
        print("SERVICE READY: Model loaded successfully.")
        print("---")
    except Exception as e:
        print(f"FATAL ERROR DURING STARTUP: {e}")

class EncodeRequest(BaseModel):
    imageBase64: str

class VerifyRequest(BaseModel):
    imageBase64: str
    referenceDescriptor: List[float]
    threshold: float = 0.40 # Default threshold for Facenet128 Cosine distance

def decode_image_to_cv(value: str) -> np.ndarray:
    if "," in value:
        value = value.split(",", 1)[1]
    
    image_bytes = base64.b64decode(value)
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/encode")
def encode_face(payload: EncodeRequest):
    try:
        image_cv = decode_image_to_cv(payload.imageBase64)
        
        # DeepFace represent returns a list of detections
        # We use 'mediapipe' as detector backend as requested
        results = DeepFace.represent(
            img_path=image_cv,
            model_name="Facenet",
            detector_backend="mediapipe",
            enforce_detection=True,
            align=True
        )
        
        if not results:
            raise HTTPException(status_code=400, detail="No face detected")
            
        # Get embedding from the first detected face
        descriptor = results[0]["embedding"]
        return {"descriptor": descriptor}
    except Exception as e:
        logger_err = str(e)
        if "Face could not be detected" in logger_err:
            raise HTTPException(status_code=400, detail="No face detected")
        raise HTTPException(status_code=500, detail=logger_err)

@app.post("/verify")
def verify_face(payload: VerifyRequest):
    try:
        image_cv = decode_image_to_cv(payload.imageBase64)
        
        # Get embedding for the current face
        results = DeepFace.represent(
            img_path=image_cv,
            model_name="Facenet",
            detector_backend="mediapipe",
            enforce_detection=True,
            align=True
        )
        
        if not results:
            raise HTTPException(status_code=400, detail="No face detected")
            
        descriptor = np.array(results[0]["embedding"])
        reference = np.array(payload.referenceDescriptor)
        
        # Check if reference descriptor length matches Facenet128 (128)
        # If not, it might be an old landmark-based descriptor (1404) or a different model
        if len(reference) != len(descriptor):
            return {
                "isMatch": False,
                "distance": 99.0,
                "confidence": 0.0,
                "error": "Incompatible descriptor length. Please re-register the employee."
            }

        # Compare using Cosine distance (1 - similarity)
        a = np.array(descriptor)
        b = np.array(reference)
        norm_a = np.linalg.norm(a)
        norm_b = np.linalg.norm(b)
        
        if norm_a == 0 or norm_b == 0:
            distance = 1.0
        else:
            similarity = np.dot(a, b) / (norm_a * norm_b)
            distance = float(1.0 - similarity)

        is_match = distance <= payload.threshold
        
        # Confidence calculation for Cosine distance
        # 0.0 distance = 1.0 confidence. distance >= threshold*2 = 0.0 confidence.
        confidence = max(0.0, 1.0 - (distance / max(payload.threshold * 2, 0.01)))
        
        return {
            "isMatch": is_match,
            "distance": distance,
            "confidence": confidence,
        }
    except Exception as e:
        logger_err = str(e)
        if "Face could not be detected" in logger_err:
            raise HTTPException(status_code=400, detail="No face detected")
        raise HTTPException(status_code=500, detail=logger_err)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

### 5. `python-face-service/requirements.txt` (9 lines)

```
fastapi==0.115.12
uvicorn==0.34.2
numpy<2.0.0
Pillow==11.2.1
mediapipe==0.10.20
opencv-python-headless
deepface
tensorflow
tf-keras
```

---

### 6. `src/scripts/seed-admin.ts` (36 lines)

```typescript
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { sqlite, connectSqlite } from "../shared/database/sqlite";
import { logger } from "../shared/logger";

async function main() {
  await connectSqlite();

  const adminEmail = "admin@rfid.com";
  const adminPassword = "password123";
  const adminName = "System Admin";

  const existing = sqlite.get("SELECT id FROM users WHERE email = ?", [adminEmail]);

  if (existing) {
    logger.info("Admin account already exists.");
    return;
  }

  const id = uuid();
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const now = new Date().toISOString();

  await sqlite.run(
    `INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, adminName, adminEmail, passwordHash, "ADMIN", now, now]
  );

  logger.info({ email: adminEmail, password: adminPassword }, "Admin account created successfully");
}

main().catch((error) => {
  console.error("Failed to seed admin:", error);
  process.exit(1);
});
```

---

### 7. `src/scripts/reset-admin.ts` (27 lines)

```typescript
import bcrypt from "bcryptjs";
import { sqlite, connectSqlite } from "../shared/database/sqlite";
import { logger } from "../shared/logger";

async function main() {
  await connectSqlite();

  const adminEmail = "admin@rfid.com";
  const adminPassword = "password123";
  
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const now = new Date().toISOString();

  const existing = sqlite.get("SELECT id FROM users WHERE email = ?", [adminEmail]);

  if (existing) {
    await sqlite.run(
      "UPDATE users SET password_hash = ?, updated_at = ? WHERE email = ?",
      [passwordHash, now, adminEmail]
    );
    logger.info("Admin password reset to password123 successfully.");
  } else {
    logger.error("Admin user not found. Please run seed-admin.ts first.");
  }
}

main().catch(console.error);
```

---

### 8. `src/scripts/seed-dummy-attendance.ts` (76 lines)

```typescript
import { v4 as uuid } from "uuid";
import { sqlite, connectSqlite } from "../shared/database/sqlite";
import { logger } from "../shared/logger";

async function main() {
  await connectSqlite();

  // 1. Create Dummy Employees if none exist
  const existingEmployees = sqlite.all("SELECT id FROM employees LIMIT 1");
  let employeeIds: string[] = [];

  if (existingEmployees.length === 0) {
    logger.info("No employees found. Creating dummy employees...");
    const dummyEmployees = [
      { name: "Budi Santoso", dept: "Produksi", pos: "Operator", rfid: "D1E2F3A4" },
      { name: "Siti Aminah", dept: "HRD", pos: "Staff", rfid: "A1B2C3D4" },
      { name: "Andi Wijaya", dept: "IT", pos: "Developer", rfid: "E5F6G7H8" }
    ];

    for (const emp of dummyEmployees) {
      const id = uuid();
      const now = new Date().toISOString();
      await sqlite.run(
        `INSERT INTO employees (id, full_name, department, position, rfid_uid, is_active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 1, ?, ?)`,
        [id, emp.name, emp.dept, emp.pos, emp.rfid, now, now]
      );
      employeeIds.push(id);
    }
  } else {
    employeeIds = sqlite.all<{ id: string }>("SELECT id FROM employees").map(e => e.id);
  }

  // 2. Create 10 Dummy Attendance Records
  logger.info("Creating 10 dummy attendance records...");
  const statuses = ["VALID", "VALID", "VALID", "VALID", "INVALID", "VALID", "VALID", "INVALID", "VALID", "VALID"];
  
  for (let i = 0; i < 10; i++) {
    const sessionId = uuid();
    const recordId = uuid();
    const employeeId = employeeIds[i % employeeIds.length];
    const employee = sqlite.get<{ rfid_uid: string, full_name: string }>("SELECT rfid_uid, full_name FROM employees WHERE id = ?", [employeeId]);
    
    const now = new Date();
    // Spread across the day (roughly)
    now.setHours(7 + i, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    const timestamp = now.toISOString();
    
    const status = statuses[i];
    const correlationId = `DUMMY-${Date.now()}-${i + 1}`;

    // Create Session
    await sqlite.run(
      `INSERT INTO attendance_sessions (id, correlation_id, rfid_uid, status, started_at, last_event_at, expires_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sessionId, correlationId, employee?.rfid_uid || null, status === "VALID" ? "COMPLETED" : "FAILED", timestamp, timestamp, timestamp, timestamp, timestamp]
    );

    // Create Record
    const category = i % 2 === 0 ? "ENTRY" : "EXIT";
    const punctuality = i % 3 === 0 ? "LATE" : "ON_TIME";

    await sqlite.run(
      `INSERT INTO attendance_records (id, session_id, employee_id, rfid_uid, status, category, punctuality, verified_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [recordId, sessionId, employeeId, employee?.rfid_uid || "UNKNOWN", status, category, punctuality, timestamp, timestamp, timestamp]
    );
  }

  logger.info("10 dummy attendance records created successfully.");
}

main().catch((error) => {
  console.error("Failed to seed dummy attendance:", error);
  process.exit(1);
});
```

---

All 8 files have been returned in full above.
</task_result>
</task>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 11.4s)

_Thinking:_

Now I have all the information I need to create comprehensive documentation. Let me create all the documentation files. I need to create them in the docs/ directory.

Let me start creating all the documentation files now. I'll organize them as specified in the requirements.

Let me now read the existing docs to see what's already there, and also check if there's a docs directory.

Now I have all the source code. Let me create the docs directory and start writing all documentation files.

**Tool: bash**

**Input:**
```json
{
  "command": "Test-Path -LiteralPath \"I:\\rfid_v3\\docs\"",
  "description": "Check if docs directory exists"
}
```

**Output:**
```
True

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 5.2s)

_Thinking:_

Let me check what's already in the docs directory.

**Tool: read**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs"
}
```

**Output:**
```
<path>I:\rfid_v3\docs</path>
<type>directory</type>
<entries>
architecture.md
database_schema.md

(2 entries)
</entries>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 9.1s)

_Thinking:_

Let me read the existing docs to see what's already there, then I'll create the comprehensive documentation.

**Tool: read**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\architecture.md"
}
```

**Output:**
```
<path>I:\rfid_v3\docs\architecture.md</path>
<type>file</type>
<content>
1: # RFID V3 Backend Architecture
2: 
3: ## Components
4: 
5: - Express API Gateway exposes REST endpoints for frontend and IoT devices.
6: - gRPC service layer hosts internal module services for Auth, Student, Attendance, and Device.
7: - SQLite-backed attendance sessions synchronize RFID and face events without Redis.
8: - An in-process retry scheduler retries face verification jobs and recovers pending `READY` sessions at server startup.
9: - SQLite stores users, students, devices, attendance sessions, and attendance history.
10: - Python face service generates face descriptors and verifies captured faces against registered students.
11: 
12: ## Attendance Flow
13: 
14: 1. ESP8266 sends RFID UID to `/api/v1/attendance/rfid`.
15: 2. ESP32CAM sends face photo to `/api/v1/attendance/face`.
16: 3. API Gateway forwards requests to the internal Attendance gRPC service.
17: 4. Attendance service persists session updates in SQLite.
18: 5. Session correlation happens by `correlationId` or `pairingKey`.
19: 6. Retry scheduler loads student by RFID, calls face recognition service, and stores `VALID` or `INVALID`.
20: 
21: ## Clean Architecture Mapping
22: 
23: - `controller`: REST handlers in API Gateway.
24: - `service`: business logic and orchestration.
25: - `repository`: SQLite data access.
26: - `entity`: domain shapes and serializers.
27: - `dto`: request validation and transport contracts.

(End of file - total 27 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\database_schema.md"
}
```

**Output:**
```
<path>I:\rfid_v3\docs\database_schema.md</path>
<type>file</type>
<content>
1: # Dokumentasi Skema Database - RFID Attendance System v3
2: 
3: Dokumen ini berisi struktur tabel database dan Entity Relationship Diagram (ERD) untuk sistem absensi RFID. Struktur ini dirancang untuk mempermudah pemindahan ke Microsoft Word.
4: 
5: ## 1. Entity Relationship Diagram (ERD)
6: 
7: ```mermaid
8: erDiagram
9:     USERS {
10:         text id PK
11:         text name
12:         text email
13:         text password_hash
14:         text role
15:         text created_at
16:         text updated_at
17:     }
18: 
19:     EMPLOYEES {
20:         text id PK
21:         text full_name
22:         text department
23:         text position
24:         text rfid_uid UK
25:         text face_descriptor
26:         text face_image_path
27:         integer is_active
28:         text created_at
29:         text updated_at
30:     }
31: 
32:     DEVICES {
33:         text id PK
34:         text device_code UK
35:         text type
36:         text name
37:         text location
38:         text status
39:         text metadata
40:         text last_seen_at
41:         text created_at
42:         text updated_at
43:     }
44: 
45:     ATTENDANCE_SESSIONS {
46:         text id PK
47:         text correlation_id UK
48:         text pairing_key
49:         text rfid_uid
50:         text rfid_device_code
51:         text face_device_code
52:         text status
53:         text reason
54:         text started_at
55:         text expires_at
56:         text created_at
57:     }
58: 
59:     ATTENDANCE_RECORDS {
60:         text id PK
61:         text session_id FK, UK
62:         text employee_id FK
63:         text rfid_uid
64:         text status
65:         text punctuality
66:         real confidence
67:         text reason
68:         text image_path
69:         text category
70:         text verified_at
71:     }
72: 
73:     SYSTEM_SETTINGS {
74:         text key PK
75:         text value
76:         text updated_at
77:     }
78: 
79:     ATTENDANCE_SESSIONS ||--|| ATTENDANCE_RECORDS : "results in"
80:     EMPLOYEES ||--o{ ATTENDANCE_RECORDS : "has"
81: ```
82: 
83: ---
84: 
85: ## 2. Struktur Tabel
86: 
87: Berikut adalah detail struktur tabel dalam format yang mudah disalin ke Microsoft Word.
88: 
89: ### Tabel: users
90: Digunakan untuk menyimpan data akun administrator dan operator sistem.
91: 
92: | Nama Kolom | Tipe Data | Deskripsi |
93: | :--- | :--- | :--- |
94: | **id** | TEXT | Primary Key (UUID) |
95: | **name** | TEXT | Nama lengkap pengguna |
96: | **email** | TEXT | Alamat email (Unique) |
97: | **password_hash** | TEXT | Hash password keamanan |
98: | **role** | TEXT | Peran (ADMIN / OPERATOR) |
99: | **created_at** | TEXT | Waktu data dibuat |
100: | **updated_at** | TEXT | Waktu data terakhir diubah |
101: 
102: ### Tabel: employees
103: Data induk karyawan yang terdaftar dalam sistem absensi.
104: 
105: | Nama Kolom | Tipe Data | Deskripsi |
106: | :--- | :--- | :--- |
107: | **id** | TEXT | Primary Key (UUID) |
108: | **full_name** | TEXT | Nama lengkap karyawan |
109: | **department** | TEXT | Nama departemen/divisi |
110: | **position** | TEXT | Jabatan karyawan |
111: | **rfid_uid** | TEXT | ID Unik Kartu RFID (Unique) |
112: | **face_descriptor**| TEXT | Data vektor wajah (serialized) |
113: | **face_image_path**| TEXT | Path file foto wajah |
114: | **is_active** | INTEGER | Status aktif (1: Aktif, 0: Nonaktif) |
115: | **created_at** | TEXT | Waktu pendaftaran |
116: | **updated_at** | TEXT | Waktu pembaruan profil |
117: 
118: ### Tabel: devices
119: Daftar perangkat keras (RFID Reader & Face Scanner) yang terhubung.
120: 
121: | Nama Kolom | Tipe Data | Deskripsi |
122: | :--- | :--- | :--- |
123: | **id** | TEXT | Primary Key (UUID) |
124: | **device_code** | TEXT | Kode unik perangkat (Unique) |
125: | **type** | TEXT | Tipe perangkat (RFID_READER / FACE_SCANNER) |
126: | **name** | TEXT | Nama label perangkat |
127: | **location** | TEXT | Lokasi fisik perangkat |
128: | **status** | TEXT | Status koneksi (ONLINE / OFFLINE) |
129: | **last_seen_at** | TEXT | Waktu terakhir perangkat aktif |
130: | **created_at** | TEXT | Waktu pendaftaran perangkat |
131: 
132: ### Tabel: attendance_sessions
133: Tabel sementara untuk sinkronisasi antara pemindaian kartu dan pengenalan wajah.
134: 
135: | Nama Kolom | Tipe Data | Deskripsi |
136: | :--- | :--- | :--- |
137: | **id** | TEXT | Primary Key (UUID) |
138: | **correlation_id** | TEXT | ID untuk tracking antar perangkat |
139: | **pairing_key** | TEXT | Kunci pemasangan RFID & Wajah |
140: | **rfid_uid** | TEXT | UID kartu yang dipindai |
141: | **status** | TEXT | Status sesi (PENDING / SUCCESS / FAILED) |
142: | **started_at** | TEXT | Waktu sesi dimulai |
143: | **expires_at** | TEXT | Waktu sesi kadaluarsa |
144: 
145: ### Tabel: attendance_records
146: Log riwayat absensi final yang sudah diverifikasi.
147: 
148: | Nama Kolom | Tipe Data | Deskripsi |
149: | :--- | :--- | :--- |
150: | **id** | TEXT | Primary Key (UUID) |
151: | **session_id** | TEXT | Foreign Key ke attendance_sessions |
152: | **employee_id** | TEXT | Foreign Key ke employees |
153: | **rfid_uid** | TEXT | UID kartu yang digunakan |
154: | **status** | TEXT | Status absensi (PRESENT / LATE / etc) |
155: | **punctuality** | TEXT | Status ketepatan waktu |
156: | **confidence** | REAL | Skor akurasi wajah (0.0 - 1.0) |
157: | **category** | TEXT | Kategori (ENTRY / EXIT) |
158: | **verified_at** | TEXT | Waktu absensi berhasil diverifikasi |
159: 
160: ### Tabel: system_settings
161: Konfigurasi sistem seperti jam masuk dan jam pulang.
162: 
163: | Nama Kolom | Tipe Data | Deskripsi |
164: | :--- | :--- | :--- |
165: | **key** | TEXT | Nama pengaturan (Primary Key) |
166: | **value** | TEXT | Nilai pengaturan |
167: | **updated_at** | TEXT | Waktu terakhir diubah |

(End of file - total 167 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\README.md"
}
```

**Output:**
```
<path>I:\rfid_v3\README.md</path>
<type>file</type>
<content>
1: # RFID V3 Backend
2: 
3: Backend absensi RFID + face recognition berbasis Node.js dengan:
4: 
5: - Express.js sebagai REST API Gateway
6: - gRPC sebagai komunikasi internal service layer
7: - Clean architecture per module: `Auth`, `Student`, `Attendance`, `Device`
8: - Scheduler lokal berbasis proses untuk sinkronisasi event RFID dan retry verifikasi
9: - SQLite untuk persistence lokal berbasis file
10: - Python FastAPI microservice untuk face recognition
11: 
12: ## Struktur
13: 
14: ```text
15: src/
16:   gateway/           # REST API gateway
17:   grpc/              # gRPC server + handlers
18:   modules/
19:     auth/
20:     student/
21:     attendance/
22:     device/
23:   shared/            # config, logger, db, grpc, utils
24: python-face-service/ # microservice face recognition
25: ```
26: 
27: ## Menjalankan
28: 
29: ### Backend
30: 
31: 1. Copy `.env.example` menjadi `.env`
32: 2. SQLite tidak butuh service tambahan. File database akan dibuat otomatis di `storage/rfid_v3.sqlite`.
33: 
34: 3. Install dependency Node:
35: 
36: ```bash
37: npm install
38: ```
39: 
40: 4. Jalankan service Node:
41: 
42: ```bash
43: npm run dev
44: ```
45: 
46: 5. Jalankan face recognition service:
47: 
48: ```bash
49: cd python-face-service
50: pip install -r requirements.txt
51: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
52: ```
53: 
54: ### Frontend
55: 
56: 1. Masuk ke folder frontend:
57: 
58: ```bash
59: cd frontend
60: ```
61: 
62: 2. Copy `frontend/.env.example` menjadi `frontend/.env`
63: 
64: 3. Jalankan frontend:
65: 
66: ```bash
67: npm install
68: npm run dev
69: ```
70: 
71: ## Endpoint REST
72: 
73: ### Auth
74: 
75: - `POST /api/v1/auth/register`
76: - `POST /api/v1/auth/login`
77: 
78: ### Student
79: 
80: - `POST /api/v1/students`
81: - `PUT /api/v1/students/:id`
82: - `GET /api/v1/students`
83: - `GET /api/v1/students/:id`
84: - `DELETE /api/v1/students/:id`
85: 
86: ### Attendance
87: 
88: - `POST /api/v1/attendance/rfid`
89: - `POST /api/v1/attendance/face`
90: - `GET /api/v1/attendance/history`
91: - `GET /api/v1/attendance/sessions`
92: - `GET /api/v1/attendance/stream`
93: 
94: ### Device
95: 
96: - `POST /api/v1/devices/register`
97: - `POST /api/v1/devices/heartbeat`
98: - `GET /api/v1/devices`
99: 
100: ## Contoh Flow Absensi
101: 
102: 1. Daftarkan siswa dengan `rfidUid` dan foto wajah.
103: 2. ESP8266 kirim RFID ke `/api/v1/attendance/rfid`.
104: 3. ESP32CAM kirim foto ke `/api/v1/attendance/face`.
105: 4. Gunakan `correlationId` atau `pairingKey` yang sama untuk sinkronisasi paling akurat.
106: 5. Scheduler internal akan:
107:    - menggabungkan event RFID + image
108:    - mencari siswa berdasarkan RFID
109:    - memverifikasi wajah
110:    - retry otomatis jika verifikasi gagal sementara
111:    - menyimpan histori dengan status `VALID` atau `INVALID`
112: 
113: ## Catatan Integrasi Device
114: 
115: - `pairingKey` direkomendasikan jika RFID reader dan camera adalah device terpisah.
116: - Jika `correlationId` tidak dikirim, sistem membuat bucket waktu otomatis berdasarkan `ATTENDANCE_MATCH_WINDOW_SECONDS`.
117: - Endpoint face mendukung multipart file (`image`) atau `imageBase64`.
118: - Path database diatur lewat `SQLITE_PATH` pada `.env`.
119: - Frontend React + Vite + Tailwind ada di folder `frontend/`.
120: 
121: ## gRPC Internal
122: 
123: Kontrak ada di [src/proto/platform.proto](/I:/rfid_v3/src/proto/platform.proto).
124: 
125: Service:
126: 
127: - `AuthService`
128: - `StudentService`
129: - `DeviceService`
130: - `AttendanceService`

(End of file - total 130 lines)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 15.3s)

_Thinking:_

Now I have a thorough understanding of the entire project. Let me create all the documentation files. I'll start with the comprehensive ones and work through the list.

Let me create the docs directory files. I'll write them all out comprehensively based on the actual source code I've read.

Let me start writing all the documentation files now. I need to be very thorough and accurate.

Now I'll create all the documentation files. Let me start with the comprehensive ones.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Explore project structure and understand codebase",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Create 01-Project-Overview.md",
      "status": "in_progress"
    },
    {
      "priority": "high",
      "content": "Create 02-System-Architecture.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 03-Backend.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 04-Frontend.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 05-Face-Recognition.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 06-ESP8266.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 07-ESP32CAM.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 08-Database.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 09-API.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 10-SocketIO.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 11-gRPC.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 12-Application-Flow.md",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 13-Feature-Flow.md",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create 14-Sequence-Diagram.md",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create 15-Deployment.md",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create 16-Troubleshooting.md",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create 17-Best-Practices.md",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create README.md",
      "status": "pending"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Explore project structure and understand codebase",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Create 01-Project-Overview.md",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Create 02-System-Architecture.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 03-Backend.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 04-Frontend.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 05-Face-Recognition.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 06-ESP8266.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 07-ESP32CAM.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 08-Database.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 09-API.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 10-SocketIO.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 11-gRPC.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 12-Application-Flow.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 13-Feature-Flow.md",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 14-Sequence-Diagram.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create 15-Deployment.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create 16-Troubleshooting.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create 17-Best-Practices.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create README.md",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 21.0s)

_Thinking:_

Let me start writing all the documentation files. I'll write them one by one, starting with the most critical ones. I'll use parallel writes where possible.

Let me create the comprehensive documentation files now. I need to write them based on the actual code I've analyzed.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\01-Project-Overview.md",
  "content": "# Project Overview — RFID Attendance System v3\n\n## 1.1 Introduction\n\n**AttendTrack** is a complete attendance management system that combines RFID (Radio Frequency Identification) hardware with Face Recognition AI to provide a dual-factor attendance verification system. The system is designed for educational institutions, offices, and manufacturing environments where reliable attendance tracking is critical.\n\nThe system uses a **three-tier microservices architecture**:\n\n| Layer | Technology | Purpose |\n|-------|-----------|---------|\n| API Gateway | Express.js (Node.js) on port 3000 | REST API, Socket.IO, file uploads, device communication |\n| gRPC Service | @grpc/grpc-js on port 50051 | Internal business logic, validation, persistence |\n| Face Recognition | FastAPI (Python) on port 8000 | Face encoding & verification using DeepFace + Facenet128 |\n\n## 1.2 Core Features\n\n- **RFID-based Attendance**: Scan RFID cards via ESP8266 + MFRC522 reader\n- **Face Recognition Verification**: Dual-factor authentication with facial biometrics\n- **Real-time Monitoring**: Live attendance events via Socket.IO\n- **Employee Management**: Full CRUD operations for employee data\n- **Device Management**: Auto-discovery via mDNS, heartbeat monitoring\n- **Attendance Reports**: Daily summaries, punctuality tracking, PDF export\n- **Session-based Correlation**: Correlates RFID + Face events using time-window pairing\n- **Auto-registration**: New RFID cards trigger face registration flow automatically\n\n## 1.3 Hardware Components\n\n| Device | Role | Key Components |\n|--------|------|----------------|\n| **ESP8266** | RFID Master Scanner | MFRC522 RFID Reader, 16x2 I2C LCD, Buzzer, SoftwareSerial |\n| **ESP32-CAM** | Face Capture Camera | OV2640 Camera, Flash LED, PSRAM (optional) |\n| **Backend Server** | Application Server | Any machine running Node.js + Python |\n\n## 1.4 Software Stack\n\n### Backend (Node.js)\n- **Runtime**: Node.js + TypeScript\n- **HTTP Framework**: Express 5\n- **RPC Framework**: @grpc/grpc-js\n- **Database**: SQL.js (SQLite compiled to WebAssembly)\n- **Real-time**: Socket.IO + Server-Sent Events (SSE)\n- **Authentication**: JWT + bcryptjs\n- **Validation**: Zod\n- **Logging**: Pino\n- **File Upload**: Multer\n- **PDF Generation**: PDFMake\n- **Device Discovery**: Bonjour-service (mDNS)\n\n### Frontend (React)\n- **Framework**: React 18 + TypeScript\n- **Build Tool**: Vite 5\n- **Styling**: Tailwind CSS 3 (custom design system)\n- **State Management**: Zustand 5\n- **HTTP Client**: Axios\n- **Real-time**: Socket.IO Client + fetch-event-source (SSE)\n- **Routing**: React Router v6\n- **Animation**: Framer Motion\n- **Icons**: Lucide React\n- **Date Handling**: date-fns v4\n\n### Face Recognition (Python)\n- **Web Framework**: FastAPI\n- **Face Detection**: MediaPipe\n- **Face Embedding**: Facenet128 (via DeepFace)\n- **Image Processing**: OpenCV + Pillow\n- **ASGI Server**: Uvicorn\n\n### IoT Firmware (Arduino)\n- **ESP8266**: Arduino framework with libraries for MFRC522, LCD, WiFi, mDNS, HTTP, JSON, LittleFS\n- **ESP32-CAM**: ESP32 Arduino core with ESP32 camera driver, WiFi, HTTP, LittleFS, mDNS\n\n## 1.5 Communication Architecture\n\n```\n[Frontend Web App]          [ESP8266 RFID] ──Serial──► [ESP32-CAM]\n       │                         │\n       │ HTTP/WS                  │ HTTP/mDNS\n       ▼                         ▼\n[Express Gateway :3000] ◄──────────────────┐\n       │                                   │\n       ├──► [gRPC Service :50051]          │\n       │         │                         │\n       │         ├──► [SQLite DB]          │\n       │         │                         │\n       └──► [Python Face Service :8000]    │\n                                           │\n       ◄────────────────────────────────────┘\n                 mDNS _attendtrack._tcp\n```\n\n## 1.6 Data Flow Summary\n\n1. **ESP8266** detects RFID card → sends UID to Gateway (`POST /api/v1/attendance/check-rfid`)\n2. Gateway checks if RFID is registered via gRPC → returns registered/unregistered\n3. If unregistered with registration mode → ESP8266 triggers **ESP32-CAM** via Serial for capture\n4. If registered → ESP8266 triggers ESP32-CAM for attendance face capture\n5. **ESP32-CAM** captures image → sends to Gateway (`POST /api/v1/attendance/face`)\n6. Gateway correlates RFID + Face events via `pairingKey` or time-window\n7. **Attendance Service** calls **Face Recognition Service** (`POST /verify`) to compare faces\n8. Result stored in SQLite → real-time event emitted via **Socket.IO** to **Frontend**\n\n## 1.7 Key Directories\n\n```\nI:\\rfid_v3\\\n├── src/                       # Backend TypeScript source\n│   ├── config/                # Environment configuration\n│   ├── gateway/               # Express HTTP + Socket.IO gateway\n│   ├── grpc/                  # gRPC server + handlers\n│   ├── modules/               # Feature modules (Clean Architecture)\n│   │   ├── auth/              # Authentication module\n│   │   ├── employee/          # Employee management module\n│   │   ├── device/            # Device management module\n│   │   ├── attendance/        # Attendance core module\n│   │   └── settings/          # System settings module\n│   ├── proto/                 # Protobuf definitions\n│   ├── shared/                # Shared infrastructure\n│   │   ├── clients/           # External service clients\n│   │   ├── database/          # SQLite database layer\n│   │   ├── errors/            # Custom error classes\n│   │   ├── grpc/              # gRPC utilities\n│   │   ├── logger/            # Pino logger\n│   │   ├── middleware/        # Express middleware\n│   │   ├── realtime/          # Event emitter for real-time\n│   │   └── utils/             # Utility functions\n│   └── scripts/               # CLI seed/reset scripts\n├── frontend/                  # React + Vite frontend\n│   └── src/\n│       ├── components/        # UI components\n│       ├── hooks/             # React hooks\n│       ├── pages/             # Page components\n│       ├── services/          # API service layer\n│       ├── state/             # Zustand stores\n│       ├── types/             # TypeScript interfaces\n│       └── utils/             # Utility functions\n├── python-face-service/       # FastAPI face recognition\n│   └── main.py                # Face encoding + verification endpoints\n├── firmware/                  # ESP8266 + ESP32-CAM Arduino firmware\n│   ├── esp8266_rfid_firmware.ino\n│   └── esp32cam_face_firmware.ino\n├── storage/                   # SQLite DB + uploaded images\n└── docs/                      # Documentation\n```\n\n## 1.8 Environment Variables\n\n| Variable | Default | Description |\n|----------|---------|-------------|\n| `PORT` | `3000` | HTTP Gateway port |\n| `GRPC_PORT` | `50051` | gRPC server port |\n| `JWT_SECRET` | `super-secret-jwt` | JWT signing secret |\n| `JWT_EXPIRES_IN` | `1h` | JWT token expiry duration |\n| `SQLITE_PATH` | `storage/rfid_v3.sqlite` | SQLite database file path |\n| `FACE_SERVICE_URL` | `http://localhost:8000` | Face recognition service URL |\n| `FACE_MATCH_THRESHOLD` | `0.45` | Cosine distance threshold for face matching |\n| `ATTENDANCE_MATCH_WINDOW_SECONDS` | `20` | Time window for RFID+Face correlation |\n| `UPLOAD_DIR` | `storage/uploads` | Face image storage directory |\n| `LOG_LEVEL` | `info` | Pino log level |\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 48.6s)

_Thinking:_

Let me now write the next documentation files in parallel.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\02-System-Architecture.md",
  "content": "# System Architecture\n\n## 2.1 High-Level Architecture\n\nThe attendance system uses a **microservices architecture** with three primary services plus two IoT firmware components.\n\n```\n┌─────────────────────────────────────────────────────────────┐\n│                    CLIENT LAYER                              │\n│  ┌──────────────────────┐  ┌──────────────────────────┐     │\n│  │   Web Frontend       │  │   IoT Hardware            │     │\n│  │   (React + Vite)     │  │   ESP8266 + ESP32-CAM     │     │\n│  │   Port 5173           │  │   (Local Network)         │     │\n│  └────────┬─────────────┘  └────────┬─────────────────┘     │\n│           │ HTTP/WebSocket          │ HTTP (mDNS)            │\n├───────────┼─────────────────────────┼────────────────────────┤\n│           │                         │                        │\n│           ▼                         ▼                        │\n│  ┌─────────────────────────────────────────────────────┐    │\n│  │           API GATEWAY LAYER                          │    │\n│  │           Express.js (Port 3000)                     │    │\n│  │  ┌─────────┐  ┌──────────┐  ┌──────────────────┐   │    │\n│  │  │ REST    │  │ Socket.IO│  │ Static/Uploads   │   │    │\n│  │  │ Routes  │  │ Events   │  │ (Multer)         │   │    │\n│  │  └────┬────┘  └──────────┘  └──────────────────┘   │    │\n│  └───────┼─────────────────────────────────────────────┘    │\n│          │                                                  │\n├──────────┼──────────────────────────────────────────────────┤\n│          ▼                                                  │\n│  ┌─────────────────────────────────────────────────────┐    │\n│  │           SERVICE LAYER (gRPC - Port 50051)          │    │\n│  │  ┌──────┐  ┌──────────┐  ┌─────────┐  ┌─────────┐  │    │\n│  │  │Auth  │  │Employee  │  │Device   │  │Attend-  │  │    │\n│  │  │Service│  │Service   │  │Service  │  │ance     │  │    │\n│  │  │       │  │          │  │         │  │Service  │  │    │\n│  │  └───────┘  └──────────┘  └─────────┘  └────┬────┘  │    │\n│  └──────────────────────────────────────────────┼───────┘    │\n│                                                  │           │\n│          ┌───────────────────────────────────────┼──────────┐│\n│          │          DATA LAYER                   │          ││\n│          │  ┌──────────────────┐  ┌──────────────▼────────┐ ││\n│          │  │  SQLite (SQL.js) │  │  Face Recognition     │ ││\n│          │  │  storage/        │  │  Python FastAPI       │ ││\n│          │  │  rfid_v3.sqlite  │  │  Port 8000            │ ││\n│          │  └──────────────────┘  └───────────────────────┘ ││\n│          └──────────────────────────────────────────────────┘│\n└─────────────────────────────────────────────────────────────┘\n```\n\n## 2.2 Layer Breakdown\n\n### 2.2.1 Gateway Layer (`src/gateway/`)\n\nThe Gateway is the single entry point for all external requests. It handles:\n\n- **HTTP REST API** — All CRUD operations for employees, attendance, devices, auth, settings\n- **Socket.IO** — Real-time event streaming to web frontend\n- **File Uploads** — Face images via multipart/form-data (Multer)\n- **Static Files** — Serves uploaded images via `/uploads/` path\n- **CORS** — Cross-origin requests from frontend (port 5173)\n- **Authentication** — JWT token verification middleware\n- **mDNS** — Bonjour service publishing for device auto-discovery\n\nThe Gateway does NOT contain business logic. It delegates all operations to gRPC services.\n\n### 2.2.2 Service Layer (gRPC - `src/grpc/`)\n\nThe gRPC service provides:\n\n- **AuthService** — Login, user creation, JWT generation\n- **EmployeeService** — Employee CRUD, face descriptor management\n- **DeviceService** — Device registration, heartbeat, listing\n- **AttendanceService** — RFID handling, face handling, session management, history, synchronization, verification, retry scheduling\n- **SettingsService** — System settings read/write\n\nEach service follows Clean Architecture:\n```\nHandler (gRPC) → Controller → Service → Repository → SQLite\n```\n\n### 2.2.3 Data Layer\n\n**SQLite (SQL.js)**\n- Single file database: `storage/rfid_v3.sqlite`\n- In-memory with WAL mode for performance\n- Auto-persisted to disk on every write\n- Tables: `users`, `employees`, `devices`, `attendance_sessions`, `attendance_records`, `system_settings`\n\n**Face Recognition Service**\n- Python FastAPI microservice\n- Communicates via HTTP (axios from Node.js)\n- Endpoints: `POST /encode`, `POST /verify`, `GET /health`\n\n### 2.2.4 Frontend Layer\n\nReact Single Page Application with:\n- **Pages**: Login, Dashboard, Monitoring, History, Employees, Simulator, Settings\n- **State**: Zustand stores (auth, attendance)\n- **Real-time**: Socket.IO client + SSE fallback\n- **Routing**: React Router v6 with protected routes\n\n### 2.2.5 IoT Firmware Layer\n\n**ESP8266 (Master)**\n- Connects to WiFi (dual network support)\n- Discovers server via mDNS (`_attendtrack._tcp`)\n- Reads RFID cards via MFRC522 (SPI)\n- Displays status on 16x2 I2C LCD\n- Triggers ESP32-CAM via SoftwareSerial\n- Configuration portal (AP mode) for initial setup\n\n**ESP32-CAM (Slave)**\n- Receives commands from ESP8266 via Hardware Serial2\n- Captures face images with OV2640 camera\n- Sends images to backend via HTTP POST\n- Sends heartbeats every 30 seconds\n- Flash LED for illumination\n\n## 2.3 Communication Protocols\n\n| Protocol | Used Between | Port |\n|----------|-------------|------|\n| HTTP/1.1 | Frontend → Gateway | 3000 |\n| HTTP/1.1 | ESP8266 → Gateway | 3000 |\n| HTTP/1.1 | ESP32-CAM → Gateway | 3000 |\n| HTTP/1.1 | Gateway → Face Service | 8000 |\n| HTTP/2 (gRPC) | Gateway → Service Layer | 50051 |\n| WebSocket | Frontend ↔ Gateway | 3000 (Socket.IO) |\n| Serial (UART) | ESP8266 → ESP32-CAM | 9600 baud |\n| mDNS (Bonjour) | Devices → Gateway | 5353 |\n\n## 2.4 Port Mapping\n\n| Service | Internal Port | External Access | Protocol |\n|---------|--------------|----------------|----------|\n| Express Gateway | 3000 | Yes (LAN) | HTTP + WS |\n| gRPC Server | 50051 | No (internal) | gRPC |\n| Face Recognition | 8000 | No (internal) | HTTP |\n| Frontend (Dev) | 5173 | Yes (LAN) | HTTP |\n| mDNS | 5353 | Yes (LAN) | UDP |\n\n## 2.5 Clean Architecture Mapping\n\nThe backend follows Clean Architecture principles:\n\n```\n┌─────────────────────────────────────────────────────────┐\n│                    CONTROLLERS                           │\n│   HTTP: src/gateway/app.ts (Express routes)              │\n│   gRPC: src/grpc/handlers/*.handler.ts                   │\n│   Role: Parse request, validate input, call service      │\n│   Dependency: → Service layer                            │\n├─────────────────────────────────────────────────────────┤\n│                    SERVICES                              │\n│   src/modules/*/service/*.service.ts                     │\n│   Role: Business logic, orchestration, validation        │\n│   Dependency: → Repository, → External clients           │\n├─────────────────────────────────────────────────────────┤\n│                    REPOSITORIES                          │\n│   src/modules/*/repository/*.repository.ts               │\n│   Role: Data access, query building                      │\n│   Dependency: → SQLite database                          │\n├─────────────────────────────────────────────────────────┤\n│                    ENTITIES                              │\n│   src/modules/*/entity/*.model.ts                        │\n│   Role: Domain models, type definitions                  │\n│   Dependency: None                                       │\n├─────────────────────────────────────────────────────────┤\n│                    DTOs                                  │\n│   src/modules/*/dto/*.dto.ts                             │\n│   Role: Request/response contracts, validation (Zod)     │\n│   Dependency: None                                       │\n└─────────────────────────────────────────────────────────┘\n```\n\n## 2.6 Session Correlation Architecture\n\nThe most critical part of the system is correlating RFID scans with face captures. This is handled by:\n\n### Correlation Methods\n\n1. **Pairing Key (Recommended)**\n   - ESP8266 sends `pairingKey` (e.g., `\"ROOM-1\"`)\n   - ESP32-CAM sends the same `pairingKey` in headers\n   - System matches events within `ATTENDANCE_MATCH_WINDOW_SECONDS` (default: 20s)\n\n2. **Time Window (Fallback)**\n   - If no pairing key, system creates buckets by device code\n   - Events within the time window are correlated\n   - Less reliable than pairing key\n\n### Session State Machine\n\n```\nCREATED → READY → PROCESSING → COMPLETED (VALID/INVALID)\n  │         │\n  └──EXPIRED (if timeout)\n```\n\n- **CREATED**: RFID scanned, waiting for face image\n- **READY**: Both RFID and face received, queued for verification\n- **PROCESSING**: Verification in progress\n- **COMPLETED**: Verification done (VALID or INVALID)\n- **EXPIRED**: Session timed out\n\n### Retry Mechanism\n\nThe `AttendanceRetrySchedulerService` runs on startup to:\n1. Find all `READY` sessions that didn't complete verification\n2. Retry face verification for each\n3. Handle transient errors (e.g., Python service temporarily unavailable)\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\08-Database.md",
  "content": "# Database Documentation\n\n## 8.1 Technology\n\nThe system uses **SQL.js** — a JavaScript implementation of SQLite compiled to WebAssembly. This eliminates the need for external database servers.\n\n**Key Characteristics:**\n- Single file database: `storage/rfid_v3.sqlite`\n- In-memory execution with automatic file persistence\n- WAL (Write-Ahead Logging) mode for concurrent read performance\n- No external dependencies or installation required\n- Auto-created and migrated on first run\n\n## 8.2 Entity Relationship Diagram\n\n```mermaid\nerDiagram\n    USERS {\n        text id PK\n        text name\n        text email UK\n        text password_hash\n        text role\n        text created_at\n        text updated_at\n    }\n\n    EMPLOYEES {\n        text id PK\n        text full_name\n        text department\n        text position\n        text rfid_uid UK\n        text face_descriptor\n        text face_image_path\n        integer is_active\n        text created_at\n        text updated_at\n    }\n\n    DEVICES {\n        text id PK\n        text device_code UK\n        text type\n        text name\n        text location\n        text status\n        text metadata\n        text last_seen_at\n        text created_at\n        text updated_at\n    }\n\n    ATTENDANCE_SESSIONS {\n        text id PK\n        text correlation_id UK\n        text pairing_key\n        text rfid_uid\n        text rfid_device_code\n        text face_device_code\n        text status\n        text reason\n        text started_at\n        text expires_at\n        text created_at\n    }\n\n    ATTENDANCE_RECORDS {\n        text id PK\n        text session_id FK\n        text employee_id FK\n        text rfid_uid\n        text status\n        text punctuality\n        real confidence\n        text reason\n        text image_path\n        text category\n        text verified_at\n    }\n\n    SYSTEM_SETTINGS {\n        text key PK\n        text value\n        text updated_at\n    }\n\n    ATTENDANCE_SESSIONS ||--|| ATTENDANCE_RECORDS : \"results in\"\n    EMPLOYEES ||--o{ ATTENDANCE_RECORDS : \"has\"\n```\n\n## 8.3 Table Definitions\n\n### Table: `users`\n\nStores administrator and operator accounts for system access.\n\n| Column | Type | Constraints | Description |\n|--------|------|-------------|-------------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `name` | TEXT | NOT NULL | Full name of the user |\n| `email` | TEXT | UNIQUE, NOT NULL | Login email |\n| `password_hash` | TEXT | NOT NULL | bcrypt hash of password |\n| `role` | TEXT | NOT NULL, DEFAULT 'ADMIN' | User role: `ADMIN` or `OPERATOR` |\n| `created_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n| `updated_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n\n**Indexes:**\n- `email` — UNIQUE index for fast login lookup\n\n**Relations:**\n- None (standalone table)\n\n---\n\n### Table: `employees`\n\nMaster data for all registered employees/students.\n\n| Column | Type | Constraints | Description |\n|--------|------|-------------|-------------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `full_name` | TEXT | NOT NULL | Employee's full name |\n| `department` | TEXT | NOT NULL | Department or division |\n| `position` | TEXT | NOT NULL | Job title/position |\n| `rfid_uid` | TEXT | UNIQUE | Hex string of RFID card UID (e.g., `A1B2C3D4`) |\n| `face_descriptor` | TEXT | NULLABLE | JSON-serialized array of 128 float values (Facenet128 embedding) |\n| `face_image_path` | TEXT | NULLABLE | Relative path to stored face image (e.g., `uploads/abc-123.jpg`) |\n| `is_active` | INTEGER | NOT NULL, DEFAULT 1 | 1 = Active, 0 = Inactive |\n| `created_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n| `updated_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n\n**Indexes:**\n- `rfid_uid` — UNIQUE index for fast RFID lookup during attendance\n\n**Relations:**\n- One-to-many with `attendance_records` via `employee_id`\n\n---\n\n### Table: `devices`\n\nRegistered IoT hardware devices for monitoring and tracking.\n\n| Column | Type | Constraints | Description |\n|--------|------|-------------|-------------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `device_code` | TEXT | UNIQUE, NOT NULL | Unique device identifier (e.g., `ESP8266-MASTER-01`) |\n| `type` | TEXT | NOT NULL | Device type: `RFID_READER` or `FACE_SCANNER` or `GATEWAY` |\n| `name` | TEXT | NULLABLE | Human-readable label |\n| `location` | TEXT | NULLABLE | Physical location description |\n| `status` | TEXT | NOT NULL, DEFAULT 'OFFLINE' | Connection status: `ONLINE` or `OFFLINE` |\n| `metadata` | TEXT | NULLABLE | JSON object with additional info (IP address, firmware version, etc.) |\n| `last_seen_at` | TEXT | NULLABLE | ISO 8601 timestamp of last heartbeat |\n| `created_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n| `updated_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n\n**Indexes:**\n- `device_code` — UNIQUE index for fast device lookup\n\n**Relations:**\n- None (standalone table)\n\n---\n\n### Table: `attendance_sessions`\n\nTemporary session records correlating RFID scans with face captures. This is the core table for the dual-factor attendance flow.\n\n| Column | Type | Constraints | Description |\n|--------|------|-------------|-------------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `correlation_id` | TEXT | UNIQUE | UUID used to pair RFID + face events |\n| `pairing_key` | TEXT | NULLABLE | Room/device pairing key (e.g., `ROOM-1`) |\n| `rfid_uid` | TEXT | NULLABLE | RFID card UID that triggered this session |\n| `rfid_device_code` | TEXT | NULLABLE | Device code of the RFID reader |\n| `face_device_code` | TEXT | NULLABLE | Device code of the face camera |\n| `status` | TEXT | NOT NULL, DEFAULT 'CREATED' | Session state: `CREATED`, `READY`, `PROCESSING`, `COMPLETED`, `FAILED`, `EXPIRED` |\n| `reason` | TEXT | NULLABLE | Failure reason or notes |\n| `last_event_at` | TEXT | NULLABLE | Timestamp of last event in this session |\n| `started_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n| `expires_at` | TEXT | NOT NULL | ISO 8601 timestamp after which session auto-expires |\n| `created_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n| `updated_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n\n**Indexes:**\n- `correlation_id` — UNIQUE for session lookup\n- `status` — For querying pending/ready sessions\n\n**Relations:**\n- One-to-one with `attendance_records` via `session_id`\n\n**Session States:**\n\n```\nCREATED ──► READY ──► PROCESSING ──► COMPLETED\n  │                                      │\n  └──► EXPIRED                   VALID / INVALID\n```\n\n- **CREATED**: Initial state when RFID is scanned\n- **READY**: Face image received, ready for verification\n- **PROCESSING**: Face verification in progress\n- **COMPLETED**: Verification complete\n- **FAILED**: Verification failed\n- **EXPIRED**: Time window passed without face image\n\n---\n\n### Table: `attendance_records`\n\nFinal attendance records after successful verification.\n\n| Column | Type | Constraints | Description |\n|--------|------|-------------|-------------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `session_id` | TEXT | UNIQUE, FOREIGN KEY | References `attendance_sessions.id` |\n| `employee_id` | TEXT | FOREIGN KEY | References `employees.id` |\n| `rfid_uid` | TEXT | NULLABLE | RFID card UID used |\n| `status` | TEXT | NOT NULL | Attendance status: `VALID` or `INVALID` |\n| `category` | TEXT | NOT NULL | `ENTRY` (check-in) or `EXIT` (check-out) |\n| `punctuality` | TEXT | NULLABLE | `ON_TIME` or `LATE` (based on system settings) |\n| `confidence` | REAL | NULLABLE | Face match confidence score (0.0 - 1.0) |\n| `reason` | TEXT | NULLABLE | Status reason or notes |\n| `image_path` | TEXT | NULLABLE | Path to the captured face image |\n| `verified_at` | TEXT | NOT NULL | ISO 8601 timestamp of verification |\n| `created_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n| `updated_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n\n**Indexes:**\n- `session_id` — UNIQUE (one record per session)\n- `employee_id` — For querying employee attendance history\n- `verified_at` — For date-range queries\n- `status` — For filtering valid/invalid records\n\n**Relations:**\n- Many-to-one with `employees` via `employee_id`\n- One-to-one with `attendance_sessions` via `session_id`\n\n---\n\n### Table: `system_settings`\n\nKey-value store for system configuration.\n\n| Column | Type | Constraints | Description |\n|--------|------|-------------|-------------|\n| `key` | TEXT | PRIMARY KEY | Setting identifier |\n| `value` | TEXT | NOT NULL | Setting value |\n| `updated_at` | TEXT | NOT NULL | ISO 8601 timestamp |\n\n**Known Keys:**\n| Key | Value Type | Description |\n|-----|-----------|-------------|\n| `entry_start_time` | String (HH:mm) | Work entry start time (default: `07:00`) |\n| `entry_end_time` | String (HH:mm) | Work entry end time (default: `09:00`) |\n| `exit_start_time` | String (HH:mm) | Work exit start time (default: `16:00`) |\n| `exit_end_time` | String (HH:mm) | Work exit end time (default: `18:00`) |\n| `late_threshold_minutes` | Number | Minutes after entry_end_time considered late (default: `15`) |\n\n## 8.4 Database Initialization & Migration\n\nDatabase initialization is handled in `src/shared/database/sqlite.ts`:\n\n```typescript\n// On connectSqlite():\n// 1. Open SQLite database from file path (or create if not exists)\n// 2. Enable WAL mode\n// 3. Run CREATE TABLE IF NOT EXISTS for all 6 tables\n// 4. Insert default system settings if settings table is empty\n```\n\n**Migration Strategy:**\n- No formal migration system\n- Schema changes use `CREATE TABLE IF NOT EXISTS` — new columns are added manually\n- The `sqlite.ts` file serves as the schema definition source of truth\n\n## 8.5 Data Flow Patterns\n\n### Attendance Storage Flow\n\n```\n1. ESP8266 POST /api/v1/attendance/rfid\n   → INSERT attendance_sessions (status=CREATED)\n\n2. ESP32-CAM POST /api/v1/attendance/face\n   → UPDATE attendance_sessions (status=READY)\n   → SAVE image file to storage/uploads/\n\n3. Verification Service processes READY sessions\n   → UPDATE attendance_sessions (status=PROCESSING)\n   → CALL Face Recognition Service\n   → INSERT attendance_records (status=VALID|INVALID)\n   → UPDATE attendance_sessions (status=COMPLETED)\n```\n\n### Query Patterns\n\n**Daily Attendance Report:**\n```sql\nSELECT e.full_name, e.department, ar.category, ar.status,\n       ar.punctuality, ar.verified_at, ar.confidence\nFROM attendance_records ar\nJOIN employees e ON e.id = ar.employee_id\nWHERE DATE(ar.verified_at) = ?\nORDER BY ar.verified_at DESC\n```\n\n**Active Sessions (unverified):**\n```sql\nSELECT * FROM attendance_sessions\nWHERE status IN ('CREATED', 'READY', 'PROCESSING')\nAND expires_at > datetime('now')\nORDER BY created_at DESC\n```\n\n**Device Status Overview:**\n```sql\nSELECT device_code, type, status, last_seen_at\nFROM devices\nORDER BY last_seen_at DESC\n```\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 118.3s)

_Thinking:_

Let me continue writing the other documentation files. I'll write several in parallel.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\03-Backend.md",
  "content": "# Backend Documentation\n\n## 3.1 Overview\n\nThe backend is a TypeScript Node.js application structured with **Clean Architecture** principles. It consists of three runtime components:\n\n1. **Express Gateway** (port 3000) — REST API + Socket.IO\n2. **gRPC Server** (port 50051) — Business logic\n3. Both run in the same Node.js process (launched together via `npm run dev`)\n\n## 3.2 Project Structure\n\n```\nsrc/\n├── config/\n│   └── env.ts                    # Environment variable validation with Zod\n├── gateway/\n│   ├── server.ts                 # HTTP server + mDNS + Socket.IO bootstrap\n│   ├── app.ts                    # Express routes & middleware setup\n│   └── realtime.ts               # Socket.IO event handlers & gRPC→Socket bridge\n├── grpc/\n│   ├── server.ts                 # gRPC server bootstrap\n│   └── handlers/                 # gRPC request handlers\n│       ├── auth.handler.ts\n│       ├── employee.handler.ts\n│       ├── device.handler.ts\n│       ├── attendance.handler.ts\n│       └── settings.handler.ts\n├── modules/                      # Feature modules (Clean Architecture)\n│   ├── auth/\n│   │   ├── controller/           # HTTP route handlers\n│   │   ├── dto/                  # Request/response validation schemas\n│   │   ├── entity/               # Domain models\n│   │   ├── repository/           # Data access layer\n│   │   └── service/              # Business logic\n│   ├── employee/                 # Same structure\n│   ├── device/                   # Same structure\n│   ├── attendance/               # Same structure (largest module)\n│   └── settings/                 # Same structure\n├── proto/\n│   └── platform.proto            # Protobuf service definitions (266 lines)\n├── shared/\n│   ├── container.ts              # Dependency Injection container\n│   ├── clients/\n│   │   └── face-recognition.client.ts   # HTTP client for Python service\n│   ├── database/\n│   │   └── sqlite.ts             # SQL.js wrapper, migrations, connection\n│   ├── errors/\n│   │   └── app-error.ts          # Custom AppError class\n│   ├── grpc/\n│   │   ├── proto.ts              # Protobuf loader utility\n│   │   ├── grpc-client.ts        # gRPC client factory with promisify\n│   │   └── grpc-error.ts         # gRPC error mapping\n│   ├── logger/\n│   │   └── index.ts              # Pino logger configuration\n│   ├── middleware/\n│   │   ├── async-handler.ts      # Express async error wrapper\n│   │   ├── authenticate.ts       # JWT verification middleware\n│   │   ├── authorize.ts          # Role-based access control\n│   │   └── error-handler.ts      # Global error handler\n│   ├── realtime/\n│   │   └── realtime-events.ts    # Node.js EventEmitter for SSE/Socket bridge\n│   └── utils/\n│       ├── correlation.ts        # Correlation ID generation\n│       ├── file-storage.ts       # Multer + base64 file persistence\n│       └── pdf-generator.ts      # PDFMake report generation\n└── scripts/\n    ├── seed-admin.ts              # Create initial admin account\n    ├── reset-admin.ts             # Reset admin password\n    └── seed-dummy-attendance.ts   # Generate test attendance data\n```\n\n## 3.3 File-by-File Documentation\n\n### `src/config/env.ts`\n\n**Purpose:** Loads and validates all environment variables using Zod schema validation.\n\n**Location:** `src/config/env.ts`\n\n**Imports:**\n- `zod` from `zod` — Schema validation library\n- `dotenv` from `dotenv` — Loads `.env` file\n- `path` from `path` — Path resolution\n\n**Exports:**\n- `env` — Parsed and validated environment object with TypeScript type inference\n\n**Functionality:**\n1. Calls `dotenv.config()` to load `.env` file\n2. Defines a Zod schema with all expected env vars:\n   - `PORT` — coerced number, default 3000\n   - `GRPC_PORT` — coerced number, default 50051\n   - `JWT_SECRET` — string, required\n   - `JWT_EXPIRES_IN` — string, default \"1h\"\n   - `SQLITE_PATH` — string, default \"storage/rfid_v3.sqlite\"\n   - `FACE_SERVICE_URL` — string, default \"http://localhost:8000\"\n   - `FACE_MATCH_THRESHOLD` — number, default 0.45\n   - `ATTENDANCE_MATCH_WINDOW_SECONDS` — number, default 20\n   - `UPLOAD_DIR` — string, default \"storage/uploads\"\n   - `LOG_LEVEL` — string, default \"info\"\n3. Parses `process.env` against the schema\n4. Exits process with error if validation fails\n\n**Called by:** All modules that need configuration values.\n\n---\n\n### `src/gateway/server.ts`\n\n**Purpose:** Entry point for the HTTP Gateway server. Sets up Express, Socket.IO, mDNS, and starts listening.\n\n**Location:** `src/gateway/server.ts`\n\n**Imports:**\n- `http` from `http` — HTTP server creation\n- `{ Server }` from `socket.io` — Socket.IO server\n- `{ env }` from `../config/env` — Configuration\n- `{ app }` from `./app` — Express application\n- `{ setupRealtime }` from `./realtime` — Socket.IO event handlers\n- `{ registerService }` from `bonjour-service` — mDNS registration\n- `{ logger }` from `../shared/logger` — Logging\n\n**Functionality:**\n1. Creates HTTP server from Express app: `http.createServer(app)`\n2. Creates Socket.IO server attached to the HTTP server\n3. Calls `setupRealtime(io)` to initialize Socket.IO event handlers\n4. Starts listening on `env.PORT`\n5. Registers mDNS (Bonjour) service `_attendtrack._tcp` on port `env.PORT` for device discovery\n6. Logs startup messages\n\n**Called by:** npm scripts (`npm run dev`, `npm run start:gateway`)\n\n---\n\n### `src/gateway/app.ts`\n\n**Purpose:** Express application configuration — middleware, routes, static files, CORS.\n\n**Location:** `src/gateway/app.ts`\n\n**Imports:**\n- `express` from `express` — Express framework\n- `cors` from `cors` — CORS middleware\n- `helmet` from `helmet` — Security headers\n- `path` from `path` — Path resolution\n- Module controllers for all features\n- Error handler middleware\n\n**Exports:**\n- `app` — Configured Express application\n\n**Route Mappings:**\n\n| Method | Path | Handler | Auth |\n|--------|------|---------|------|\n| POST | `/api/v1/auth/login` | `authController.login` | No |\n| POST | `/api/v1/auth/register` | `authController.register` | No |\n| GET | `/api/v1/auth/me` | `authController.me` | JWT |\n| GET/POST/PUT/DELETE | `/api/v1/employees` | `employeeController.*` | JWT |\n| GET/POST/PUT/DELETE | `/api/v1/students` | Aliased to `/api/v1/employees` | JWT |\n| GET | `/api/v1/attendance/history` | `attendanceController.getHistory` | JWT |\n| GET | `/api/v1/attendance/sessions` | `attendanceController.getSessions` | JWT |\n| GET | `/api/v1/attendance/stream` | `attendanceStreamController.stream` | JWT |\n| POST | `/api/v1/attendance/rfid` | `attendanceController.handleRfid` | No |\n| POST | `/api/v1/attendance/face` | `attendanceController.handleFace` | No |\n| POST | `/api/v1/attendance/check-rfid` | `attendanceController.checkRfid` | No |\n| POST | `/api/v1/devices/register` | `deviceController.register` | No |\n| POST | `/api/v1/devices/heartbeat` | `deviceController.heartbeat` | No |\n| GET | `/api/v1/devices` | `deviceController.list` | JWT |\n| GET/POST/DELETE | `/api/v1/settings` | `settingsController.*` | JWT |\n| GET | `/api/v1/export/pdf` | `attendanceController.exportPdf` | JWT |\n| GET | `/uploads/*` | Static files | No |\n\n**Functionality:**\n1. Creates Express app\n2. Applies middleware: `cors()`, `helmet()`, `express.json({ limit: '50mb' })`, `express.urlencoded({ extended: true })`\n3. Serves static files from `storage/uploads/` at `/uploads/`\n4. Registers all API routes with corresponding controllers\n5. Applies global error handler middleware\n\n**Called by:** `server.ts`\n\n---\n\n### `src/gateway/realtime.ts`\n\n**Purpose:** Socket.IO event handling and bridging between gRPC events and WebSocket clients.\n\n**Location:** `src/gateway/realtime.ts`\n\n**Imports:**\n- `{ Server, Socket }` from `socket.io`\n- `{ grpcClient }` from `../shared/grpc/grpc-client`\n- `{ realtimeEvents }` from `../shared/realtime/realtime-events`\n- Various service modules\n\n**Exports:**\n- `setupRealtime(io: Server)` — Initialize Socket.IO\n- `getIO()` — Get Socket.IO server instance\n\n**Functionality:**\n1. Sets up Socket.IO connection handler — authenticates via JWT token in `auth` handshake\n2. Handles client events:\n   - `subscribe:attendance` — Join attendance room\n   - `subscribe:device` — Join device monitoring room\n3. Bridges internal EventEmitter events to Socket.IO:\n   - `attendance:new` → emitted when new attendance record created\n   - `attendance:update` → emitted when session status changes\n   - `rfid:new` → emitted when RFID scanned\n   - `registration:image` → emitted during face registration\n   - `device:status` → emitted when device online/offline\n   - `session:created` → emitted when attendance session created\n\n**Called by:** `server.ts`\n\n---\n\n### `src/grpc/server.ts`\n\n**Purpose:** gRPC server that hosts all business logic services.\n\n**Location:** `src/grpc/server.ts`\n\n**Imports:**\n- gRPC library\n- All handler modules\n- Proto loading utility\n\n**Functionality:**\n1. Loads protobuf definitions from `src/proto/platform.proto`\n2. Creates gRPC server\n3. Registers all services with their handler implementations:\n   - `AuthService`\n   - `EmployeeService`\n   - `DeviceService`\n   - `AttendanceService`\n   - `SettingsService`\n4. Starts server on `env.GRPC_PORT`\n5. Logs startup\n\n**Called by:** npm scripts via `src/grpc/server.ts` as entry point\n\n---\n\n### `src/proto/platform.proto`\n\n**Purpose:** Protobuf service definitions for all gRPC services.\n\n**Location:** `src/proto/platform.proto`\n\n**Services Defined:**\n\n```protobuf\nservice AuthService {\n  rpc Login(LoginRequest) returns (LoginResponse);\n  rpc Register(RegisterRequest) returns (RegisterResponse);\n  rpc ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse);\n}\n\nservice EmployeeService {\n  rpc Create(CreateEmployeeRequest) returns (EmployeeResponse);\n  rpc Update(UpdateEmployeeRequest) returns (EmployeeResponse);\n  rpc FindById(FindByIdRequest) returns (EmployeeResponse);\n  rpc FindAll(FindAllRequest) returns (EmployeeListResponse);\n  rpc Delete(DeleteRequest) returns (DeleteResponse);\n  rpc FindByRfid(FindByRfidRequest) returns (EmployeeResponse);\n}\n\nservice DeviceService {\n  rpc Register(RegisterDeviceRequest) returns (DeviceResponse);\n  rpc Heartbeat(HeartbeatRequest) returns (HeartbeatResponse);\n  rpc FindAll(FindAllDevicesRequest) returns (DeviceListResponse);\n  rpc Update(UpdateDeviceRequest) returns (DeviceResponse);\n}\n\nservice AttendanceService {\n  rpc CheckRfid(CheckRfidRequest) returns (CheckRfidResponse);\n  rpc HandleRfid(HandleRfidRequest) returns (HandleRfidResponse);\n  rpc HandleFace(HandleFaceRequest) returns (HandleFaceResponse);\n  rpc GetHistory(GetHistoryRequest) returns (AttendanceHistoryResponse);\n  rpc GetSessions(GetSessionsRequest) returns (SessionListResponse);\n  rpc GetSummary(GetSummaryRequest) returns (SummaryResponse);\n  rpc ProcessVerification(ProcessVerificationRequest) returns (ProcessVerificationResponse);\n  rpc StreamAttendances(StreamAttendancesRequest) returns (stream AttendanceEvent);\n}\n\nservice SettingsService {\n  rpc Get(GetSettingsRequest) returns (GetSettingsResponse);\n  rpc Upsert(UpsertSettingRequest) returns (UpsertSettingResponse);\n  rpc Reset(ResetSettingsRequest) returns (ResetSettingsResponse);\n}\n```\n\n**Messages Defined:**\n- `LoginRequest/Response` — Email + password auth\n- `RegisterRequest/Response` — User registration\n- `ValidateTokenRequest/Response` — JWT validation\n- `CreateEmployeeRequest/Response` — Employee creation with optional face descriptor\n- `UpdateEmployeeRequest/Response` — Employee update\n- `FindByIdRequest/Response` — Employee lookup by UUID\n- `FindAllRequest/Response` — Employee listing with pagination\n- `DeleteRequest/Response` — Employee deletion\n- `FindByRfidRequest/Response` — Employee lookup by RFID UID\n- `RegisterDeviceRequest/Response` — Device registration\n- `HeartbeatRequest/Response` — Device heartbeat\n- `FindAllDevicesRequest/Response` — Device listing\n- `UpdateDeviceRequest/Response` — Device update\n- `CheckRfidRequest/Response` — RFID validation for devices\n- `HandleRfidRequest/Response` — RFID scan processing\n- `HandleFaceRequest/Response` — Face image processing\n- `GetHistoryRequest/Response` — Attendance history query\n- `GetSessionsRequest/Response` — Active session query\n- `GetSummaryRequest/Response` — Attendance statistics\n- `ProcessVerificationRequest/Response` — Face verification processing\n- `StreamAttendancesRequest/Response` — Server-sent attendance events\n- `GetSettingsRequest/Response` — Settings retrieval\n- `UpsertSettingRequest/Response` — Settings update\n- `ResetSettingsRequest/Response` — Settings reset\n\n---\n\n## 3.4 Module Structure (Clean Architecture)\n\nEach module follows the same pattern:\n\n```\nmodules/{feature}/\n├── controller/     # Parses HTTP request, calls service, formats response\n├── dto/            # Zod schemas for request validation + TypeScript types\n├── entity/         # Domain model interfaces\n├── repository/     # SQL queries (SELECT/INSERT/UPDATE/DELETE)\n└── service/        # Business logic, calls repository, external services\n```\n\n### Auth Module\n\n**Files:**\n- `auth.controller.ts` — Handles `POST /login`, `POST /register`, `GET /me`\n- `auth.dto.ts` — `LoginDto` (email, password), `RegisterDto` (name, email, password, role)\n- `user.model.ts` — `User` interface (id, name, email, password_hash, role, timestamps)\n- `user.repository.ts` — `findByEmail()`, `findById()`, `create()`\n- `auth.service.ts` — `login()` (validates credentials, generates JWT), `register()` (hashes password, creates user), `validateToken()`\n\n**Key Functions:**\n\n| Function | File | Input | Output | Called By |\n|----------|------|-------|--------|-----------|\n| `login` | auth.service.ts | `{ email, password }` | `{ token, user }` | auth.controller |\n| `register` | auth.service.ts | `{ name, email, password, role }` | `{ user }` | auth.controller |\n| `validateToken` | auth.service.ts | `token: string` | `{ valid, user }` | authenticate middleware |\n\n### Employee Module\n\n**Files:**\n- `employee.controller.ts` — CRUD endpoints for employees\n- `employee.dto.ts` — `CreateEmployeeDto`, `UpdateEmployeeDto` with Zod validation\n- `employee.model.ts` — `Employee` interface (id, full_name, department, position, rfid_uid, face_descriptor, face_image_path, is_active)\n- `employee.repository.ts` — `create()`, `update()`, `findById()`, `findAll()`, `delete()`, `findByRfid()`\n- `employee.service.ts` — CRUD logic, face descriptor encoding during registration\n\n**Key Functions:**\n\n| Function | File | Input | Output | Called By |\n|----------|------|-------|--------|-----------|\n| `create` | employee.service.ts | `CreateEmployeeDto` + face image | `Employee` | employee.controller |\n| `update` | employee.service.ts | `id`, `UpdateEmployeeDto` | `Employee` | employee.controller |\n| `findAll` | employee.service.ts | pagination params | `Employee[]` | employee.controller |\n| `findByRfid` | employee.service.ts | `rfidUid: string` | `Employee \\| null` | attendance service |\n\n### Device Module\n\n**Files:**\n- `device.controller.ts` — Register, heartbeat, list, update\n- `device.dto.ts` — Registration and heartbeat DTOs\n- `device.model.ts` — `Device` interface (id, device_code, type, name, location, status, metadata, last_seen_at)\n- `device.repository.ts` — `create()`, `update()`, `findByCode()`, `findAll()`, `upsert()`\n- `device.service.ts` — Device logic, heartbeat processing, status management\n\n**Key Functions:**\n\n| Function | File | Input | Output | Called By |\n|----------|------|-------|--------|-----------|\n| `register` | device.service.ts | device info | `Device` | device.controller |\n| `heartbeat` | device.service.ts | device code, type | updates last_seen_at, status | device.controller |\n| `findAll` | device.service.ts | - | `Device[]` | device.controller |\n\n### Attendance Module\n\n**Files:**\n- `attendance.controller.ts` — RFID check, RFID handle, face handle, history, sessions, summary, PDF export\n- `attendance-stream.controller.ts` — SSE stream endpoint\n- `attendance.dto.ts` — All DTOs for attendance operations\n- `attendance-session.model.ts` — `AttendanceSession` interface\n- `attendance-record.model.ts` — `AttendanceRecord` interface\n- `attendance.repository.ts` — Complex queries for sessions, records, history\n- `attendance.service.ts` — Core attendance orchestration\n- `attendance-sync.service.ts` — RFID-Face event synchronization\n- `attendance-verification.service.ts` — Face verification logic\n- `attendance-retry-scheduler.service.ts` — Retry failed verifications\n\n**Key Functions:**\n\n| Function | File | Input | Output | Called By |\n|----------|------|-------|--------|-----------|\n| `checkRfid` | attendance.service.ts | `{ uid, deviceCode, pairingKey }` | `{ registered, action }` | ESP8266 via controller |\n| `handleRfid` | attendance.service.ts | `{ uid, deviceCode, pairingKey }` | session result | ESP8266 via controller |\n| `handleFace` | attendance.service.ts | `{ uid, purpose, image, headers }` | `{ ready }` | ESP32-CAM via controller |\n| `getHistory` | attendance.service.ts | filters, pagination | `{ records, total }` | Frontend via controller |\n| `getSessions` | attendance.service.ts | status filter | `Session[]` | Frontend via controller |\n| `syncRfidWithFace` | attendance-sync.service.ts | correlationId, pairingKey | session ID | handleFace + handleRfid |\n| `verify` | attendance-verification.service.ts | session ID | `{ status, confidence }` | retry scheduler |\n| `retryPending` | attendance-retry-scheduler.service.ts | - | processed count | startup |\n\n### Settings Module\n\n**Files:**\n- `settings.controller.ts` — GET, POST, DELETE settings\n- `settings.dto.ts` — Settings DTO\n- `settings.repository.ts` — `get()`, `upsert()`, `reset()`\n- `settings.service.ts` — Settings business logic\n\n---\n\n## 3.5 Shared Infrastructure\n\n### `src/shared/database/sqlite.ts`\n\n**Purpose:** SQL.js database wrapper providing connection management, schema initialization, and query execution.\n\n**Functionality:**\n1. Opens SQLite database from file path\n2. Enables WAL mode for concurrent read performance\n3. Runs schema creation (CREATE TABLE IF NOT EXISTS for all 6 tables)\n4. Inserts default system settings\n5. Exports `sqlite` object with: `run()`, `get()`, `all()`, `exec()` methods\n6. Auto-persists database to file after each write operation\n\n### `src/shared/clients/face-recognition.client.ts`\n\n**Purpose:** HTTP client for communicating with the Python Face Recognition service.\n\n**Functionality:**\n- `encodeFace(input)` → Sends base64 image to `/encode`, returns 128-d descriptor array\n- `verifyFace(input)` → Sends base64 image + reference descriptor to `/verify`, returns `{ isMatch, distance, confidence }`\n- Automatic base64 encoding of image files if path provided\n- 15-second timeout\n\n**Called by:** `EmployeeService` (for encoding during registration), `AttendanceVerificationService` (for verification during attendance)\n\n### `src/shared/utils/file-storage.ts`\n\n**Purpose:** File storage utilities for saving uploaded face images.\n\n**Functionality:**\n- `saveBase64Image(base64, filename?)` → Decodes base64, saves to `UPLOAD_DIR`, returns relative path\n- `readFileAsBase64(path)` → Reads file, returns base64 string\n- Uses UUID v4 for unique filenames\n\n### `src/shared/utils/pdf-generator.ts`\n\n**Purpose:** Generates PDF attendance reports using PDFMake.\n\n**Functionality:**\n- `generateAttendanceReport(records, filters)` → Creates structured PDF with:\n  - Title and date range header\n  - Table with columns: No, Name, Department, Date, Time, Category, Punctuality, Status\n  - Indonesian language labels\n  - Roboto font embedding\n\n### `src/shared/utils/correlation.ts`\n\n**Purpose:** Correlation ID generation for pairing RFID and face events.\n\n**Functionality:**\n- `generateCorrelationId(uid, pairingKey)` → Creates deterministic correlation ID from UID + pairingKey\n- Used to match RFID scans with face captures without explicit ID exchange\n\n### `src/shared/realtime/realtime-events.ts`\n\n**Purpose:** Node.js EventEmitter for internal real-time event propagation.\n\n**Events Emitted:**\n- `attendance:new` — New attendance record created\n- `attendance:update` — Session status updated\n- `rfid:new` — RFID card scanned\n- `registration:image` — Registration face image received\n- `device:status` — Device connected/disconnected\n- `session:created` — New session initiated\n\n**Called by:** Services emit events → `realtime.ts` listens and forwards to Socket.IO clients\n\n### `src/shared/middleware/authenticate.ts`\n\n**Purpose:** JWT token verification middleware for Express routes.\n\n**Functionality:**\n1. Extracts Bearer token from `Authorization` header\n2. Calls `authService.validateToken(token)` via gRPC\n3. Attaches user info to `req.user`\n4. Returns 401 if invalid/expired\n\n### `src/shared/middleware/authorize.ts`\n\n**Purpose:** Role-based access control middleware.\n\n**Functionality:**\n- `authorize(...roles)` → Returns middleware that checks `req.user.role` against allowed roles\n- Returns 403 if role not authorized\n\n### `src/shared/middleware/error-handler.ts`\n\n**Purpose:** Global Express error handler.\n\n**Functionality:**\n1. Catches all unhandled errors\n2. Checks if it's an `AppError` (has statusCode)\n3. Logs error details via Pino\n4. Returns structured JSON error response\n\n### `src/shared/middleware/async-handler.ts`\n\n**Purpose:** Wraps async route handlers to catch promise rejections.\n\n**Usage:** `router.get('/path', asyncHandler(myHandler))`\n\n### `src/shared/logger/index.ts`\n\n**Purpose:** Pino logger configuration.\n\n**Functionality:**\n- Creates Pino instance with configured level from env\n- Uses pretty printing in development\n- Logs to stdout\n\n### `src/shared/errors/app-error.ts`\n\n**Purpose:** Custom error class with HTTP status code.\n\n**Usage:** `throw new AppError(400, 'Invalid request')`\n\n### `src/shared/grpc/proto.ts`\n\n**Purpose:** Loads protobuf definitions.\n\n**Functionality:**\n- Reads `platform.proto` file\n- Loads with `@grpc/proto-loader`\n- Returns parsed proto descriptor\n\n### `src/shared/grpc/grpc-client.ts`\n\n**Purpose:** Creates gRPC client instances with promisified methods.\n\n**Functionality:**\n- `createServiceClient(ServiceName)` → Creates gRPC client connected to localhost:GRPC_PORT\n- Promisifies all service methods for async/await usage\n\n### `src/shared/grpc/grpc-error.ts`\n\n**Purpose:** Maps gRPC error codes to HTTP status codes and user-friendly messages.\n\n**Functionality:**\n- Converts gRPC status codes (NOT_FOUND, INVALID_ARGUMENT, etc.) to HTTP equivalents\n- Extracts error details from gRPC error objects\n\n---\n\n## 3.6 Scripts\n\n### `src/scripts/seed-admin.ts`\n\nCreates the default admin account:\n- Email: `admin@rfid.com`\n- Password: `password123`\n- Name: `System Admin`\n- Role: `ADMIN`\n\nSkips if admin already exists.\n\n### `src/scripts/reset-admin.ts`\n\nResets admin password to `password123`.\n\n### `src/scripts/seed-dummy-attendance.ts`\n\nGenerates 10 dummy attendance records for testing, creating dummy employees if none exist.\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\04-Frontend.md",
  "content": "# Frontend Documentation\n\n## 4.1 Overview\n\nThe frontend is a **React 18** single-page application built with **Vite 5** and **TypeScript**. It provides a modern, responsive dashboard for managing the attendance system.\n\n**Tech Stack:**\n- **UI Framework:** React 18 + TypeScript\n- **Build Tool:** Vite 5\n- **Styling:** Tailwind CSS 3 (custom design system)\n- **State Management:** Zustand 5\n- **HTTP Client:** Axios\n- **Real-time:** Socket.IO Client + SSE (EventSource)\n- **Routing:** React Router v6\n- **Animation:** Framer Motion\n- **Icons:** Lucide React\n- **Date Handling:** date-fns v4\n\n## 4.2 Project Structure\n\n```\nfrontend/\n├── index.html                    # HTML entry point\n├── package.json                  # Dependencies\n├── vite.config.ts                # Vite configuration\n├── tailwind.config.ts            # Tailwind theme customization\n├── postcss.config.cjs            # PostCSS config\n├── tsconfig.json                 # TypeScript config\n├── tsconfig.app.json             # App-specific TS config\n├── tsconfig.node.json            # Node-specific TS config\n├── .env                          # Environment variables\n├── .env.example                  # Environment example\n└── src/\n    ├── main.tsx                  # React entry point\n    ├── app.tsx                   # Root component + routing\n    ├── styles.css                # Global styles + Tailwind directives\n    ├── types/\n    │   └── domain.ts             # TypeScript interfaces & enums\n    ├── state/\n    │   ├── auth-store.ts         # Zustand auth state\n    │   └── attendance-store.ts   # Zustand attendance state\n    ├── services/\n    │   ├── http.ts               # Axios instance with interceptor\n    │   ├── auth.service.ts       # Auth API calls\n    │   ├── attendance.service.ts # Attendance API calls\n    │   ├── employee.service.ts   # Employee API calls\n    │   ├── settings.service.ts   # Settings API calls\n    │   └── realtime.service.ts   # Socket.IO + SSE client\n    ├── hooks/\n    │   ├── use-auth-hydrate.ts   # Auth hydration hook\n    │   ├── use-bootstrap-data.ts # Initial data loading hook\n    │   └── use-realtime-attendance.ts  # Realtime event hook\n    ├── pages/\n    │   ├── login-page.tsx        # Login page\n    │   ├── dashboard-page.tsx    # Main dashboard\n    │   ├── monitoring-page.tsx   # Session monitoring\n    │   ├── history-page.tsx      # Attendance history\n    │   ├── employees-page.tsx    # Employee management\n    │   ├── simulator-page.tsx    # Device simulator\n    │   ├── settings-page.tsx     # System settings\n    │   └── not-found-page.tsx    # 404 page\n    ├── components/\n    │   ├── layout/\n    │   │   ├── app-shell.tsx     # Main layout shell\n    │   │   ├── app-sidebar.tsx   # Navigation sidebar\n    │   │   └── topbar.tsx        # Top navigation bar\n    │   ├── dashboard/\n    │   │   ├── summary-strip.tsx  # Summary statistic cards\n    │   │   ├── summary-card.tsx   # Individual stat card\n    │   │   ├── live-feed.tsx     # Live attendance feed\n    │   │   └── device-overview.tsx # Device status overview\n    │   ├── common/\n    │   │   ├── status-badge.tsx   # Reusable status badge\n    │   │   └── toast-viewport.tsx # Toast notification container\n    │   ├── monitoring/\n    │   │   └── session-monitor.tsx # Session monitoring cards\n    │   └── history/\n    │       ├── history-filters.tsx # Attendance history filters\n    │       └── history-table.tsx   # Attendance history table\n    └── utils/\n        ├── api-base.ts            # API base URL constant\n        ├── image.ts               # Image URL resolver\n        └── format.ts              # Date formatting utilities\n```\n\n## 4.3 File-by-File Documentation\n\n### Entry Points\n\n#### `src/main.tsx`\n\n**Purpose:** Application entry point. Renders the React app inside a BrowserRouter.\n\n```tsx\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <BrowserRouter>\n    <App />\n  </BrowserRouter>\n)\n```\n\n**Imports:** React, ReactDOM, BrowserRouter, App\n\n---\n\n#### `src/app.tsx`\n\n**Purpose:** Root component defining all routes and authentication guards.\n\n**Structure:**\n1. Public route: `/login` → `LoginPage`\n2. Protected routes (wrapped in `ProtectedRoutes`):\n   - `/` → `DashboardPage`\n   - `/monitoring` → `MonitoringPage`\n   - `/history` → `HistoryPage`\n   - `/employees` → `EmployeesPage`\n   - `/simulator` → `SimulatorPage`\n   - `/settings` → `SettingsPage`\n   - `*` → `NotFoundPage`\n3. Protected routes use `AppShell` layout (sidebar + topbar + content)\n4. Hooks executed in protected routes:\n   - `useBootstrapData()` — loads initial employees, devices, sessions, history\n   - `useRealtimeAttendance()` — connects Socket.IO for live updates\n\n**Authentication Flow:**\n- Check if token exists in localStorage\n- If no token, redirect to `/login`\n- If token exists, hydrate auth state\n- Protected routes render only after hydration completes\n\n---\n\n### State Management\n\n#### `src/state/auth-store.ts`\n\n**Purpose:** Authentication state management with Zustand.\n\n**State:**\n```typescript\n{\n  token: string | null,      // JWT token\n  user: AuthUser | null,     // Current user info\n  isLoading: boolean,        // Loading state\n  isHydrated: boolean,       // Whether state has been restored from localStorage\n  error: string | null       // Error message\n}\n```\n\n**Actions:**\n| Action | Description |\n|--------|-------------|\n| `login(email, password)` | Calls authService.login, stores token + user, persists to localStorage |\n| `logout()` | Clears token, user, removes from localStorage |\n| `hydrate()` | Restores auth state from localStorage (called on app mount) |\n| `clearError()` | Clears error state |\n\n**Persistence:** Token and user are stored in `localStorage(\"rfid-v3-auth\")`\n\n---\n\n#### `src/state/attendance-store.ts`\n\n**Purpose:** Central store for all attendance-related data.\n\n**State:**\n```typescript\n{\n  employees: Employee[],           // All employees\n  devices: Device[],               // All devices\n  sessions: AttendanceSession[],   // Active sessions\n  history: AttendanceRecord[],     // Attendance history\n  events: RealtimeMessage[],       // Recent realtime events\n  toasts: ToastMessage[],          // Toast notifications\n  // Filters\n  statusFilter: string,\n  deptFilter: string,\n  dateFilter: string,\n  monthFilter: string,\n  employeeFilter: string,\n  // Pagination\n  page: number,\n  pageSize: number,\n  total: number,\n  // UI\n  view: 'log' | 'report',\n  isLoading: boolean,\n  isStreaming: boolean\n}\n```\n\n**Key Actions:**\n| Action | Description |\n|--------|-------------|\n| `refreshAll()` | Fetches employees, devices, sessions, history in parallel |\n| `fetchHistory(params)` | Paginated history fetch with filters |\n| `pushRealtimeEvent(event)` | Handles incoming Socket.IO events, creates toasts |\n| `summary()` | Computes daily statistics from history |\n| `setFilter(name, value)` | Updates filter values |\n| `setPage(page)` | Pagination control |\n| `setView(view)` | Toggle between log and report view |\n\n---\n\n### Services\n\n#### `src/services/http.ts`\n\n**Purpose:** Configured Axios instance with auth interceptor.\n\n```typescript\nconst http = axios.create({ baseURL: VITE_API_BASE_URL });\n\nhttp.interceptors.request.use((config) => {\n  const token = useAuthStore.getState().token;\n  if (token) config.headers.Authorization = `Bearer ${token}`;\n  return config;\n});\n```\n\n**Used by:** All service modules\n\n---\n\n#### `src/services/auth.service.ts`\n\n**Purpose:** Authentication API calls.\n\n| Function | Endpoint | Method | Request |\n|----------|----------|--------|---------|\n| `login(email, password)` | `/api/v1/auth/login` | POST | `{ email, password }` |\n\n**Response:** `{ token, user }`\n\n---\n\n#### `src/services/attendance.service.ts`\n\n**Purpose:** Attendance data API calls.\n\n| Function | Endpoint | Method | Parameters |\n|----------|----------|--------|-----------|\n| `getHistory(params)` | `/api/v1/attendance/history` | GET | `status`, `category`, `date`, `month`, `employeeId`, `page`, `pageSize` |\n| `getSessions()` | `/api/v1/attendance/sessions` | GET | — |\n| `getDevices()` | `/api/v1/devices` | GET | — |\n| `getEmployees()` | `/api/v1/employees` | GET | — |\n| `exportPdf(params)` | `/api/v1/export/pdf` | GET | `month`, `year`, `status`, `employeeId` |\n\n**Response Types:**\n- `getHistory` → `{ records: AttendanceRecord[], total: number, page: number, pageSize: number }`\n- `getSessions` → `AttendanceSession[]`\n- `getDevices` → `Device[]`\n- `getEmployees` → `Employee[]`\n- `exportPdf` → ArrayBuffer (PDF)\n\n---\n\n#### `src/services/employee.service.ts`\n\n**Purpose:** Employee CRUD API calls.\n\n| Function | Endpoint | Method | Request |\n|----------|----------|--------|---------|\n| `getAll()` | `/api/v1/employees` | GET | — |\n| `create(data)` | `/api/v1/employees` | POST | `FormData` (name, department, position, rfidUid, faceImage) |\n| `update(id, data)` | `/api/v1/employees/:id` | PUT | `FormData` |\n| `remove(id)` | `/api/v1/employees/:id` | DELETE | — |\n\n---\n\n#### `src/services/settings.service.ts`\n\n**Purpose:** System settings API calls.\n\n| Function | Endpoint | Method | Request |\n|----------|----------|--------|---------|\n| `get()` | `/api/v1/settings` | GET | — |\n| `update(data)` | `/api/v1/settings` | POST | `{ key: value, ... }` |\n| `reset()` | `/api/v1/settings/reset` | DELETE | — |\n\n---\n\n#### `src/services/realtime.service.ts`\n\n**Purpose:** Real-time communication service with Socket.IO and SSE fallback.\n\n**Socket.IO Connection:**\n- Connects to `VITE_API_BASE_URL` with auth token\n- Reconnection with exponential backoff\n\n**Methods:**\n| Method | Description |\n|--------|-------------|\n| `subscribeAttendance(handler)` | Listen for attendance events |\n| `subscribeDeviceStatus(handler)` | Listen for device status events |\n| `unsubscribeAttendance()` | Remove attendance listeners |\n| `unsubscribeDeviceStatus()` | Remove device listeners |\n| `disconnect()` | Close socket connection |\n\n**Events Listened:**\n- `attendance:new` — New attendance record\n- `attendance:update` — Session update\n- `rfid:new` — RFID card scan event\n- `registration:image` — Registration image received\n- `device:status` — Device status change\n\n**SSE Fallback:**\nUses `@microsoft/fetch-event-source` for Server-Sent Events at `/api/v1/attendance/stream`\n\n---\n\n### Hooks\n\n#### `src/hooks/use-auth-hydrate.ts`\n\n**Purpose:** Calls `authStore.hydrate()` on component mount to restore auth state from localStorage.\n\n**Called by:** App component (before rendering protected routes)\n\n---\n\n#### `src/hooks/use-bootstrap-data.ts`\n\n**Purpose:** Loads initial data (employees, devices, sessions, history) when user is authenticated.\n\n**Called by:** Protected routes in `app.tsx`\n\n**Flow:**\n1. Check if token exists in auth store\n2. Call `attendanceStore.refreshAll()`\n3. Data loaded in parallel via `Promise.all`\n\n---\n\n#### `src/hooks/use-realtime-attendance.ts`\n\n**Purpose:** Connects to Socket.IO and handles realtime attendance events.\n\n**Called by:** Protected routes in `app.tsx`\n\n**Flow:**\n1. Subscribe to attendance and device events\n2. On `attendance:new` → push to store, show toast\n3. On `attendance:update` → update session in store\n4. On `rfid:new` → show scan notification\n5. On `device:status` → update device status\n6. Cleanup on unmount\n\n---\n\n### Pages\n\n#### `src/pages/login-page.tsx`\n\n**Purpose:** User authentication page.\n\n**Features:**\n- Dual-panel layout: decorative left panel + login form on right\n- Email and password input fields\n- Form validation\n- Error display\n- Redirect to dashboard on successful login\n- Redirect to dashboard if already authenticated\n\n**State:** Uses `authStore.login()`\n\n**API Calls:** `authService.login()`\n\n**Routing:** Navigates to `/` on success\n\n---\n\n#### `src/pages/dashboard-page.tsx`\n\n**Purpose:** Main dashboard showing attendance summary and live data.\n\n**Composition:**\n```\nDashboardPage\n├── SummaryStrip (4 stat cards)\n│   ├── SummaryCard (Valid Today)\n│   ├── SummaryCard (Invalid Scans)\n│   ├── SummaryCard (Total Scans)\n│   └── SummaryCard (Devices Online)\n├── LiveFeed (attendance feed table)\n└── DeviceOverview (device status cards)\n```\n\n**Data:** Reads from `attendanceStore`\n\n---\n\n#### `src/pages/monitoring-page.tsx`\n\n**Purpose:** Real-time session monitoring view.\n\n**Composition:**\n```\nMonitoringPage\n├── Header\n└── SessionMonitor (cards for active sessions)\n```\n\n**Data:** Reads active sessions from `attendanceStore.sessions`\n\n---\n\n#### `src/pages/history-page.tsx`\n\n**Purpose:** Attendance history with filters and pagination.\n\n**Composition:**\n```\nHistoryPage\n├── HistoryFilters\n│   ├── Employee dropdown\n│   ├── Month picker\n│   ├── Date picker\n│   ├── Status filter\n│   ├── Department filter\n│   └── Export PDF button\n└── HistoryTable\n    ├── Table header\n    ├── Attendance rows\n    └── Pagination controls\n```\n\n**Data:** Reads from `attendanceStore.history`\n\n**API Calls:** `attendanceService.getHistory()` on filter change\n\n---\n\n#### `src/pages/employees-page.tsx`\n\n**Purpose:** Employee management with CRUD operations.\n\n**Features:**\n- Search/filter employees\n- Employee table\n- Add employee modal (EmployeeForm)\n- Edit employee modal\n- Delete employee confirmation\n- RFID scan simulation during registration\n- Face capture via webcam during registration\n\n**EmployeeForm includes:**\n- Name, department, position fields\n- RFID UID input (manual or scan-simulated)\n- Face capture via webcam\n- Preview captured image\n\n**API Calls:**\n- `employeeService.getAll()`, `.create()`, `.update()`, `.remove()`\n- `attendanceService.getEmployees()` for refresh\n\n**Socket.IO Usage:**\n- Listens for `registration:image` during face capture\n- Listens for `rfid:new` during RFID scan\n\n---\n\n#### `src/pages/simulator-page.tsx`\n\n**Purpose:** Device simulator for testing without physical hardware.\n\n**Features:**\n- Webcam preview (getUserMedia)\n- Manual RFID UID entry\n- Device code configuration\n- Pairing key configuration\n- Capture face image from webcam\n- Send to attendance endpoint\n- Visual feedback and logs\n\n**API Calls:**\n- `POST /api/v1/attendance/face` (multipart form)\n\n---\n\n#### `src/pages/settings-page.tsx`\n\n**Purpose:** System configuration management.\n\n**Features:**\n- Entry time settings (start/end)\n- Exit time settings (start/end)\n- Late threshold configuration\n- Danger Zone: Reset all data (with confirmation)\n\n**API Calls:**\n- `settingsService.get()`, `.update()`, `.reset()`\n\n---\n\n### Components\n\n#### Layout Components\n\n**`app-shell.tsx`**\nCSS Grid layout: sidebar on left, content area with topbar and `<Outlet>` on right, toast container overlay.\n\n**`app-sidebar.tsx`**\nNavigation sidebar with:\n- Logo/brand area\n- Nav links: Ringkasan (Dashboard), Karyawan (Employees), Log Presensi (History), Monitor (Monitoring), Pengaturan (Settings)\n- User info section with logout button\n- Streaming indicator (pulsing dot when connected)\n\n**`topbar.tsx`**\nTop bar with:\n- Page title (derived from current route)\n- Search bar\n- Date display\n- Notification/help icons\n\n#### Dashboard Components\n\n**`summary-strip.tsx`**\nGrid of 4 summary cards showing:\n- Valid today count (green)\n- Invalid scans count (red)\n- Total scans count\n- IoT devices online (blue)\n\nComputed from `attendanceStore.history` using `attendanceStore.summary()`\n\n**`summary-card.tsx`**\nReusable card with icon, label, value, and color theme.\n\n**`live-feed.tsx`**\nTable showing latest 5 attendance records with:\n- Employee photo (from `imageUtils.resolveCaptureUrl`)\n- Name and department\n- Category (ENTRY/EXIT) badge\n- Punctuality badge (ON_TIME/LATE)\n- Status (VALID/INVALID)\n- Timestamp\n\n**`device-overview.tsx`**\nDevice status display with:\n- Device type icon\n- Device name and code\n- Online/offline indicator\n- IP address (from metadata)\n- Last seen timestamp\n\n#### Common Components\n\n**`status-badge.tsx`**\nColor-coded badge component:\n- `VALID` → green (`Sah`)\n- `INVALID` → red (`Tidak Sah`)\n- `ONLINE` → green (`Daring`)\n- `OFFLINE` → gray (`Luring`)\n- `READY` → blue (`Siap`)\n- `ON_TIME` → green (`Tepat Waktu`)\n- `LATE` → yellow (`Terlambat`)\n- `ENTRY` → blue (`Masuk`)\n- `EXIT` → orange (`Pulang`)\n\n**`toast-viewport.tsx`**\nToast notification container positioned top-right:\n- Auto-dismiss after 5 seconds\n- Types: success (green), error (red), info (blue), warning (yellow)\n- Close button\n- Framer Motion animations\n\n#### Monitoring Components\n\n**`session-monitor.tsx`**\nCards for each active attendance session showing:\n- Face image from capture\n- RFID UID\n- Session status with color coding\n- Entry/exit badge\n- Timestamp\n- Verification status\n\n#### History Components\n\n**`history-filters.tsx`**\nFilter bar with:\n- Employee dropdown (populated from store)\n- Month picker\n- Date picker\n- Status dropdown (VALID/INVALID/ALL)\n- Department dropdown\n- Export PDF button with success modal\n\n**`history-table.tsx`**\nAttendance history table with:\n- Day name and date\n- Time (HH:mm)\n- Category (Masuk/Pulang) badge\n- Punctuality badge (Tepat Waktu/Terlambat)\n- Status badge\n- Reason/notes\n- Pagination: Previous/Next + page info\n\n---\n\n### Types\n\n#### `src/types/domain.ts`\n\n**Interfaces:**\n```typescript\nAuthUser { id, name, email, role }\nEmployee { id, full_name, department, position, rfid_uid, face_image_path, is_active, created_at, updated_at }\nDevice { id, device_code, type, name, location, status, metadata, last_seen_at }\nAttendanceRecord { id, employee_id, employee_name, department, rfid_uid, status, category, punctuality, confidence, image_path, verified_at }\nAttendanceSession { id, correlation_id, rfid_uid, status, reason, started_at, expires_at }\nRealtimeMessage { type, payload, timestamp }\nAttendanceSummary { validToday, invalidToday, totalToday, devicesOnline }\nToastMessage { id, type, title, message }\n```\n\n**Enums:**\n```typescript\nAttendanceStatus { VALID, INVALID }\nSessionStatus { CREATED, READY, PROCESSING, COMPLETED, FAILED, EXPIRED }\n```\n\n---\n\n### Utilities\n\n#### `src/utils/api-base.ts`\nExports `VITE_API_BASE_URL` constant.\n\n#### `src/utils/image.ts`\n`resolveCaptureUrl(imagePath: string): string` — Handles relative vs absolute image URLs for employee photos.\n\n#### `src/utils/format.ts`\nDate formatting functions:\n- `formatDateTime(iso)` → Indonesian date-time format\n- `formatClock(iso)` → HH:mm format\n- `formatShortDate(iso)` → DD/MM/YYYY format\n\nUses `date-fns` with `id` locale.\n\n---\n\n### Styling\n\n#### `src/styles.css`\n- Google Fonts import (Manrope, IBM Plex Mono)\n- Tailwind directives (`@tailwind base/components/utilities`)\n- Custom component classes:\n  - `.app-shell` — Main grid layout\n  - `.panel` — Card container styling\n  - `.panel-muted` — Muted card variant\n\n#### `tailwind.config.ts`\nCustom theme:\n- Colors: ink, mist, pine, ember, blush, cloud (custom palette)\n- Fonts: Manrope (headings), IBM Plex Mono (monospace)\n- Box shadow: `.shadow-soft` utility\n- Animation: `pulseLine` keyframes for streaming indicator\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\05-Face-Recognition.md",
  "content": "# Face Recognition Documentation\n\n## 5.1 Overview\n\nThe Face Recognition service is a **Python FastAPI** microservice that provides face encoding and verification capabilities. It uses **DeepFace** (a deep learning facial recognition framework) with the **Facenet128** model and **MediaPipe** for face detection.\n\n**Role in System:** The face recognition service is the third microservice in the architecture, alongside the Express Gateway and gRPC Service Layer. It is called by the Node.js backend to:\n1. Encode face images into 128-dimensional vectors (during employee registration)\n2. Verify whether a captured face matches a registered employee (during attendance)\n\n## 5.2 Technology Stack\n\n| Component | Technology | Version |\n|-----------|-----------|---------|\n| Web Framework | FastAPI | 0.115.12 |\n| ASGI Server | Uvicorn | 0.34.2 |\n| Face Detection | MediaPipe | 0.10.20 |\n| Face Embedding | Facenet128 (via DeepFace) | latest |\n| Image Processing | OpenCV (headless) | latest |\n| Image Loading | Pillow | 11.2.1 |\n| Numerical Computing | NumPy | <2.0.0 |\n| Deep Learning | TensorFlow | latest |\n| Keras | tf-keras | latest |\n\n## 5.3 Architecture\n\n```\n┌─────────────────────────────────────────────────────────┐\n│                 Python Face Service                       │\n│                 FastAPI on port 8000                      │\n│                                                          │\n│  ┌────────────┐  ┌──────────────┐  ┌────────────────┐  │\n│  │  /encode   │  │   /verify    │  │   /health      │  │\n│  │  Endpoint  │  │   Endpoint   │  │   Endpoint     │  │\n│  └─────┬──────┘  └──────┬───────┘  └────────────────┘  │\n│        │                │                                │\n│        ▼                ▼                                │\n│  ┌──────────────────────────────────────────────────┐   │\n│  │           DeepFace Pipeline                       │   │\n│  │                                                    │   │\n│  │  1. Decode Base64 → OpenCV Image (BGR)            │   │\n│  │  2. Face Detection (MediaPipe)                     │   │\n│  │  3. Face Alignment + Normalization                 │   │\n│  │  4. Embedding Extraction (Facenet128)              │   │\n│  │  5. Cosine Distance Comparison (verify only)       │   │\n│  └──────────────────────────────────────────────────┘   │\n│                                                          │\n│  ┌──────────────────────────────────────────────────┐   │\n│  │           Model Cache (~/.deepface/weights/)      │   │\n│  │           Facenet128 weights (~90MB)              │   │\n│  └──────────────────────────────────────────────────┘   │\n└─────────────────────────────────────────────────────────┘\n```\n\n## 5.4 File-by-File Documentation\n\n### `python-face-service/main.py`\n\n**Location:** `I:\\rfid_v3\\python-face-service\\main.py`\n\n**Purpose:** Main FastAPI application with face encoding and verification endpoints.\n\n**Imports:**\n```python\nimport base64              # Base64 decoding\nimport io                  # BytesIO for image handling\nimport os                  # Environment configuration\nfrom typing import List    # Type hints\nimport cv2                 # OpenCV (image processing)\nimport numpy as np         # Numerical operations\nfrom fastapi import FastAPI, HTTPException  # Web framework\nfrom pydantic import BaseModel              # Request validation\nfrom PIL import Image      # Image loading\nfrom deepface import DeepFace  # Face recognition framework\n```\n\n**Global Configuration:**\n```python\nos.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow debug logs\n```\n\n#### Pydantic Models\n\n**`EncodeRequest`:**\n```python\nclass EncodeRequest(BaseModel):\n    imageBase64: str  # Base64-encoded JPEG/PNG image\n```\n\n**`VerifyRequest`:**\n```python\nclass VerifyRequest(BaseModel):\n    imageBase64: str           # Base64-encoded face image\n    referenceDescriptor: List[float]  # 128-d embedding from enrolled employee\n    threshold: float = 0.40    # Cosine distance threshold (overridden by backend)\n```\n\n#### Startup Event\n\n```python\n@app.on_event(\"startup\")\nasync def startup_event():\n    DeepFace.build_model(\"Facenet\")  # Downloads weights on first run (~90MB)\n```\n\n**Purpose:** Pre-loads the Facenet model into memory at startup to avoid cold-start latency on the first request. On first run, this downloads model weights from the DeepFace repository to `~/.deepface/weights/`.\n\n---\n\n#### Core Function: `decode_image_to_cv()`\n\n```python\ndef decode_image_to_cv(value: str) -> np.ndarray:\n    if \",\" in value:\n        value = value.split(\",\", 1)[1]  # Strip data URL prefix\n    image_bytes = base64.b64decode(value)\n    image = Image.open(io.BytesIO(image_bytes)).convert(\"RGB\")\n    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)\n```\n\n**Input:** Base64 string (possibly with `data:image/...` prefix)\n**Output:** OpenCV BGR image (`numpy.ndarray`)\n**Process:**\n1. Strips data URL prefix if present (e.g., `data:image/jpeg;base64,`)\n2. Decodes base64 to bytes\n3. Opens with Pillow as RGB\n4. Converts to OpenCV BGR format\n\n---\n\n#### Endpoint: `GET /health`\n\n```python\n@app.get(\"/health\")\ndef health():\n    return {\"status\": \"ok\"}\n```\n\n**Purpose:** Health check for monitoring and load balancers.\n**Response:** `{ \"status\": \"ok\" }`\n\n---\n\n#### Endpoint: `POST /encode`\n\n```python\n@app.post(\"/encode\")\ndef encode_face(payload: EncodeRequest):\n    image_cv = decode_image_to_cv(payload.imageBase64)\n    results = DeepFace.represent(\n        img_path=image_cv,\n        model_name=\"Facenet\",         # Use Facenet128 model\n        detector_backend=\"mediapipe\",  # MediaPipe face detector\n        enforce_detection=True,        # Fail if no face found\n        align=True                     # Align face before encoding\n    )\n    if not results:\n        raise HTTPException(400, \"No face detected\")\n    descriptor = results[0][\"embedding\"]\n    return {\"descriptor\": descriptor}\n```\n\n**Purpose:** Generates a 128-dimensional face embedding (descriptor) from an image.\n\n**Input:** `{ \"imageBase64\": \"base64_string\" }`\n\n**Output:**\n```json\n{\n  \"descriptor\": [0.0123, -0.0456, ..., 0.0789]  // 128 float values\n}\n```\n\n**Pipeline:**\n1. Decode base64 to OpenCV image\n2. Detect face using MediaPipe\n3. Align face (rotate/scale for standardization)\n4. Run through Facenet128 model → 128-d embedding\n5. Return the embedding vector\n\n**Error Responses:**\n- `400` — \"No face detected\" (no face in image or detection failed)\n- `500` — Internal error (model failure, etc.)\n\n**Called by:** `EmployeeService.create/update` → `FaceRecognitionClient.encodeFace()`\n\n---\n\n#### Endpoint: `POST /verify`\n\n```python\n@app.post(\"/verify\")\ndef verify_face(payload: VerifyRequest):\n    image_cv = decode_image_to_cv(payload.imageBase64)\n    results = DeepFace.represent(\n        img_path=image_cv,\n        model_name=\"Facenet\",\n        detector_backend=\"mediapipe\",\n        enforce_detection=True,\n        align=True\n    )\n    if not results:\n        raise HTTPException(400, \"No face detected\")\n    \n    descriptor = np.array(results[0][\"embedding\"])\n    reference = np.array(payload.referenceDescriptor)\n    \n    # Compatibility check for descriptor length\n    if len(reference) != len(descriptor):\n        return {\n            \"isMatch\": False,\n            \"distance\": 99.0,\n            \"confidence\": 0.0,\n            \"error\": \"Incompatible descriptor length. Please re-register the employee.\"\n        }\n    \n    # Cosine distance calculation\n    a, b = np.array(descriptor), np.array(reference)\n    norm_a, norm_b = np.linalg.norm(a), np.linalg.norm(b)\n    if norm_a == 0 or norm_b == 0:\n        distance = 1.0\n    else:\n        similarity = np.dot(a, b) / (norm_a * norm_b)\n        distance = float(1.0 - similarity)\n    \n    is_match = distance <= payload.threshold\n    \n    # Confidence: linear ramp from 1.0 (distance=0) to 0.0 (distance=threshold*2)\n    confidence = max(0.0, 1.0 - (distance / max(payload.threshold * 2, 0.01)))\n    \n    return {\n        \"isMatch\": is_match,\n        \"distance\": distance,\n        \"confidence\": confidence,\n    }\n```\n\n**Purpose:** Verifies whether a captured face matches a registered employee's face descriptor.\n\n**Input:**\n```json\n{\n  \"imageBase64\": \"base64_string\",\n  \"referenceDescriptor\": [0.0123, ...],  // 128 floats\n  \"threshold\": 0.45                       // from env FACE_MATCH_THRESHOLD\n}\n```\n\n**Output (match):**\n```json\n{\n  \"isMatch\": true,\n  \"distance\": 0.23,\n  \"confidence\": 0.74\n}\n```\n\n**Output (no match):**\n```json\n{\n  \"isMatch\": false,\n  \"distance\": 0.67,\n  \"confidence\": 0.26\n}\n```\n\n**Output (incompatible):**\n```json\n{\n  \"isMatch\": false,\n  \"distance\": 99.0,\n  \"confidence\": 0.0,\n  \"error\": \"Incompatible descriptor length. Please re-register the employee.\"\n}\n```\n\n**Verification Pipeline:**\n1. Decode base64 to OpenCV image\n2. Detect face using MediaPipe\n3. Extract embedding using Facenet128\n4. Check descriptor length compatibility (must be 128)\n5. Calculate **Cosine distance** between current and reference descriptors:\n   - `similarity = dot(descriptor, reference) / (norm(descriptor) * norm(reference))`\n   - `distance = 1.0 - similarity`\n6. Compare distance against threshold\n7. Calculate confidence score\n\n**Threshold:** `0.40` (Python default) — overridden to `0.45` by backend's `FACE_MATCH_THRESHOLD` env var\n\n**Error Responses:**\n- `400` — \"No face detected\"\n- `500` — Internal error\n\n**Called by:** `AttendanceVerificationService.verify()` → `FaceRecognitionClient.verifyFace()`\n\n---\n\n## 5.5 Face Recognition Pipeline (Detailed)\n\n### Step 1: Image Acquisition\n- Image arrives as Base64 string (from ESP32-CAM or webcam)\n- Can include `data:image/jpeg;base64,` prefix\n- Decoded to OpenCV BGR format via Pillow intermediary\n\n### Step 2: Face Detection (MediaPipe)\n- **Detector Backend:** MediaPipe\n- Detects face bounding box and landmarks\n- `enforce_detection=True` — raises error if no face found\n- `align=True` — applies affine transformation to align face\n\n### Step 3: Face Embedding (Facenet128)\n- **Model:** Facenet128 (Inception-ResNet v1 architecture)\n- Input: Aligned face image (160x160 pixels)\n- Output: 128-dimensional embedding vector\n- **Weight storage:** ~90MB, cached at `~/.deepface/weights/facenet_weights.h5`\n\n### Step 4: Distance Calculation\n- **Metric:** Cosine distance\n- Formula: `distance = 1.0 - cos(θ)` where `cos(θ) = (A·B) / (||A|| * ||B||)`\n- Range: 0.0 (identical) to 2.0 (opposite), typically 0.0–1.0 for faces\n\n### Step 5: Match Decision\n- `isMatch = distance <= threshold`\n- Default threshold: 0.40 (Python) → 0.45 (Production via env)\n- Lower threshold = stricter matching\n\n### Step 6: Confidence Score\n- Linear ramp function\n- `confidence = max(0.0, 1.0 - distance / (threshold * 2))`\n- At `distance = 0` → confidence = 1.0\n- At `distance = threshold` → confidence = 0.5\n- At `distance = threshold * 2` → confidence = 0.0\n\n## 5.6 Integration with Backend\n\n### `src/shared/clients/face-recognition.client.ts`\n\n**Purpose:** TypeScript HTTP client that communicates with the Python service.\n\n**Configuration:**\n```typescript\nthis.http = axios.create({\n  baseURL: env.FACE_SERVICE_URL,   // Default: http://localhost:8000\n  timeout: 15000                    // 15 second timeout\n});\n```\n\n**Methods:**\n\n#### `encodeFace(input)`\n```typescript\nasync encodeFace(input: { imageBase64?: string; imagePath?: string }): Promise<number[]>\n```\n- Accepts either base64 string or file path\n- If path provided, reads file and converts to base64 using `readFileAsBase64()`\n- Returns 128-d descriptor array\n\n**Called by:**\n- `EmployeeService.create()` — when creating employee with face image\n- `EmployeeService.update()` — when updating employee face image\n\n#### `verifyFace(input)`\n```typescript\nasync verifyFace(input: {\n  imageBase64?: string;\n  imagePath?: string;\n  referenceDescriptor: number[];\n}): Promise<{ isMatch: boolean; distance: number; confidence: number }>\n```\n- Accepts captured face image + stored reference descriptor\n- Sends threshold from `env.FACE_MATCH_THRESHOLD`\n- Returns match result with distance and confidence\n\n**Called by:**\n- `AttendanceVerificationService.verify()` — during attendance face verification\n\n## 5.7 Performance Characteristics\n\n| Metric | Value |\n|--------|-------|\n| Model Size | ~90MB (Facenet128 weights) |\n| First-load Time | ~30-60s (downloads weights) |\n| Subsequent Load | ~3-5s (from disk cache) |\n| Encode Latency | ~500-1500ms per image |\n| Verify Latency | ~800-2000ms per comparison |\n| Max Image Size | 50MB (configured in Express) |\n| Supported Formats | JPEG, PNG (via Pillow) |\n\n## 5.8 Error Handling\n\n| Scenario | HTTP Code | Response |\n|----------|-----------|----------|\n| No face in image | 400 | `\"No face detected\"` |\n| Multiple faces | 200 | Uses first detected face |\n| Corrupted image | 500 | Error detail message |\n| Descriptor mismatch | 200 (isMatch=false) | `\"Incompatible descriptor length\"` |\n| Model not loaded | 500 | Error detail message |\n| Timeout | N/A | 15s timeout in HTTP client |\n\n## 5.9 Requirements\n\n```\nfastapi==0.115.12\nuvicorn==0.34.2\nnumpy<2.0.0\nPillow==11.2.1\nmediapipe==0.10.20\nopencv-python-headless\ndeepface\ntensorflow\ntf-keras\n```\n\n## 5.10 Running\n\n```bash\ncd python-face-service\nuvicorn main:app --host 0.0.0.0 --port 8000\n```\n\nOr use the batch script:\n```bash\nrun_ai.bat\n```\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 81.4s)

_Thinking:_

Good progress. Let me continue with the remaining documentation files. Let me write the ESP8266, ESP32CAM, API, SocketIO, gRPC docs, and the application flow/feature flow docs.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\06-ESP8266.md",
  "content": "# ESP8266 Firmware Documentation\n\n## 6.1 Overview\n\nThe ESP8266 firmware runs on the **ESP8266** microcontroller and serves as the **Master RFID Scanner**. It reads RFID cards, communicates with the backend server, and controls the ESP32-CAM via serial connection.\n\n**Hardware Components:**\n- **MCU:** ESP8266\n- **RFID Reader:** MFRC522 (SPI interface)\n- **Display:** 16x2 LCD with I2C interface (address 0x27)\n- **Buzzer:** Active buzzer on GPIO0 (active-low)\n- **Serial:** SoftwareSerial for ESP32-CAM communication\n\n**Pin Mapping:**\n\n| Component | Pin | GPIO |\n|-----------|-----|------|\n| MFRC522 SDA(SS) | D8 | GPIO15 |\n| MFRC522 RST | D4 | GPIO2 |\n| MFRC522 MOSI | D7 | GPIO13 |\n| MFRC522 MISO | D6 | GPIO12 |\n| MFRC522 SCK | D5 | GPIO14 |\n| LCD I2C SDA | D2 | GPIO4 |\n| LCD I2C SCL | D1 | GPIO5 |\n| Buzzer | D3 | GPIO0 |\n| SoftwareSerial RX | RX | GPIO3 |\n| SoftwareSerial TX | D0 | GPIO16 |\n\n## 6.2 File: `firmware/esp8266_rfid_firmware.ino`\n\n**Location:** `I:\\rfid_v3\\firmware\\esp8266_rfid_firmware.ino`\n**Lines:** 451\n\n**Purpose:** Main firmware for the ESP8266 RFID scanner with configuration portal, mDNS service discovery, WiFi connectivity, RFID reading, LCD display, buzzer feedback, and serial communication with ESP32-CAM.\n\n### 6.2.1 Libraries Used\n\n| Library | Purpose |\n|---------|---------|\n| `SPI` | SPI bus for MFRC522 |\n| `MFRC522` | RFID reader driver |\n| `Wire` | I2C bus for LCD |\n| `LiquidCrystal_I2C` | 16x2 LCD display driver |\n| `SoftwareSerial` | Serial communication with ESP32-CAM |\n| `ESP8266WiFi` | WiFi connectivity |\n| `ESP8266HTTPClient` | HTTP requests to backend |\n| `WiFiClient` | TCP client for HTTP |\n| `ArduinoJson` | JSON serialization/deserialization |\n| `LittleFS` | File system for config storage |\n| `ESP8266WebServer` | Configuration portal web server |\n| `ESP8266mDNS` | mDNS service discovery |\n\n### 6.2.2 Constants & Definitions\n\n```cpp\n#define SS_PIN  15     // MFRC522 SS pin\n#define RST_PIN 2      // MFRC522 RST pin\n#define BUZZER_PIN 0   // Buzzer (active-low)\n#define RX_PIN 3       // SoftwareSerial RX\n#define MAX_WIFI 2     // Maximum WiFi networks to store\n```\n\n### 6.2.3 Global Variables\n\n| Variable | Type | Purpose |\n|----------|------|---------|\n| `mfrc522` | `MFRC522` | RFID reader instance |\n| `lcd` | `LiquidCrystal_I2C` | LCD display instance (16x2, addr 0x27) |\n| `linkSerial` | `SoftwareSerial` | Serial link to ESP32-CAM (9600 baud) |\n| `wifiNetworks[2]` | `WiFiNetwork[]` | Array of up to 2 saved WiFi credentials |\n| `serverHostname` | `String` | mDNS hostname (default: \"attendtrack\") |\n| `serverPort` | `int` | Backend server port (default: 3000) |\n| `deviceCode` | `String` | Device identifier (default: \"ESP8266-MASTER-01\") |\n| `pairingKey` | `String` | Room/location pairing key (default: \"ROOM-1\") |\n| `resolvedServerUrl` | `String` | Full URL after mDNS resolution |\n| `inConfigMode` | `bool` | Whether device is in AP config mode |\n| `server` | `ESP8266WebServer` | Configuration portal web server |\n| `lastScanAt` | `unsigned long` | Timestamp of last RFID scan |\n| `scanCooldownMs` | `const unsigned long` | Minimum interval between scans (3000ms) |\n\n### 6.2.4 Data Structures\n\n```cpp\nstruct WiFiNetwork {\n  String ssid;\n  String password;\n};\n```\n\n### 6.2.5 Configuration Portal HTML\n\nThe captive portal HTML template is stored in PROGMEM with placeholder tokens (`%SSID0%`, `%PASS0%`, `%HOSTNAME%`, etc.) replaced at runtime.\n\n**Portal Fields:**\n- WiFi 1 SSID & Password\n- WiFi 2 SSID & Password (fallback)\n- Server Hostname (default: \"attendtrack\")\n- Server Port (default: 3000)\n- Device Code (default: \"ESP8266-MASTER-01\")\n- Pairing Key (default: \"ROOM-1\")\n\n### 6.2.6 Functions\n\n#### `void beep(int durationMs)`\n\n**Purpose:** Activates buzzer for specified duration.\n\n**Input:** `durationMs` — milliseconds to sound buzzer (default: 100ms)\n\n**Behavior:**\n- Sets BUZZER_PIN HIGH (active-low buzzer)\n- Waits for duration\n- Sets BUZZER_PIN LOW\n\n**Called by:** Card detected, errors, success notifications\n\n---\n\n#### `void loadConfig()`\n\n**Purpose:** Loads device configuration from LittleFS `/config.json`.\n\n**Flow:**\n1. Mount LittleFS filesystem (format if mount fails)\n2. Check if `/config.json` exists\n3. If exists, read and parse JSON\n4. Populate: `wifiNetworks[]`, `serverHostname`, `serverPort`, `deviceCode`, `pairingKey`\n5. If not exists or error, use default values\n\n**Called by:** `setup()`\n\n---\n\n#### `void saveConfig()`\n\n**Purpose:** Saves current device configuration to LittleFS `/config.json`.\n\n**Flow:**\n1. Create JSON document with all config values\n2. Open `/config.json` for writing\n3. Serialize JSON to file\n4. Close file\n\n**Called by:** `handleSave()`\n\n---\n\n#### `void handleRoot()`\n\n**Purpose:** Serves the configuration portal HTML page.\n\n**Flow:**\n1. Load HTML template from PROGMEM\n2. Replace all placeholder tokens with current values\n3. Send HTML response (200)\n\n**Called by:** ESP8266WebServer when client requests `/`\n\n---\n\n#### `void handleSave()`\n\n**Purpose:** Processes configuration form submission.\n\n**Flow:**\n1. Read all form fields from POST data\n2. Update `wifiNetworks[]`, `serverHostname`, `serverPort`, `deviceCode`, `pairingKey`\n3. Clean hostname (remove `.local` suffix if present)\n4. Call `saveConfig()`\n5. Send config sync JSON to ESP32-CAM via Serial: `\"SYNC_JSON|{...}\"`\n6. Send success HTML response\n7. Wait 2 seconds\n8. Reboot ESP8266 (`ESP.restart()`)\n\n**Called by:** ESP8266WebServer when client POSTs to `/save`\n\n**to ESP32-CAM:** Sends configuration via serial in format `SYNC_JSON|{wifi:[...],hostname,port,code,key}`\n\n---\n\n#### `void startConfigPortal()`\n\n**Purpose:** Starts WiFi Access Point mode for device configuration.\n\n**Flow:**\n1. Set `inConfigMode = true`\n2. Set WiFi mode to AP\n3. Start AP with SSID `\"AttendTrack-Setup\"`, password `\"12345678\"`\n4. Display AP IP (`192.168.4.1`) on LCD\n5. Register web server routes (`/` and `/save`)\n6. Start web server\n7. Enter infinite loop handling web client requests\n\n**LCD Display:** \"CONFIG MODE\" / \"192.168.4.1\"\n\n**Called by:** `setup()` when no WiFi configured or all connections fail\n\n---\n\n#### `bool connectWiFi()`\n\n**Purpose:** Attempts to connect to configured WiFi networks.\n\n**Flow:**\n1. Set WiFi mode to STA\n2. Iterate through `wifiNetworks[]`\n3. For each configured network:\n   - Display connecting message on LCD\n   - Call `WiFi.begin(ssid, password)`\n   - Wait up to 10 seconds (20 × 500ms attempts)\n   - If connected, return `true`\n4. If all networks fail, return `false`\n\n**Returns:** `true` if connected to any network, `false` otherwise\n\n**LCD Display:** \"CONNECTING WiFi\" / network name\n\n**Called by:** `setup()`, `loop()` (reconnection)\n\n---\n\n#### `void resolveBackend()`\n\n**Purpose:** Discovers backend server using mDNS (Bonjour).\n\n**Flow:**\n1. Initialize mDNS responder\n2. Query for `_attendtrack._tcp` service\n3. Try up to 5 times (1 second interval)\n4. If found: save `resolvedServerUrl = \"http://\" + IP + \":\" + port`\n5. Display result on LCD\n6. If not found: display \"SERVER OFFLINE\"\n\n**LCD Display:** \"SEARCHING SERVER\" → \"SERVER FOUND\" / \"SERVER OFFLINE\"\n\n**Called by:** `setup()`, `loop()` (re-discovery after reconnection)\n\n---\n\n#### `void showIdle()`\n\n**Purpose:** Displays the idle/ready message on LCD.\n\n**LCD Display:**\n- Line 1: \"Ready to Scan\"\n- Line 2: \"Tempel Kartu...\"\n\n**Called by:** `setup()`, `loop()` (after scan completes)\n\n---\n\n#### `String readUID()`\n\n**Purpose:** Reads the RFID card UID from MFRC522.\n\n**Returns:** Hex string of UID (e.g., \"A1B2C3D4\"), uppercase\n\n**Flow:**\n1. Iterate through `mfrc522.uid.uidByte[]`\n2. Convert each byte to 2-character hex string\n3. Concatenate and convert to uppercase\n\n**Called by:** `loop()` when card detected\n\n---\n\n#### `void setup()`\n\n**Purpose:** Initializes all hardware and connects to network.\n\n**Flow:**\n1. Initialize Serial (115200 baud) and linkSerial (9600 baud)\n2. Initialize I2C and LCD\n3. Turn on LCD backlight\n4. Configure buzzer pin as OUTPUT (LOW = off)\n5. Display splash screen \"AttendTrack V2\"\n6. Load configuration from LittleFS\n7. Check if any WiFi configured\n8. If no WiFi or connection fails → start config portal\n9. Resolve backend via mDNS\n10. Initialize SPI bus and MFRC522\n11. Show idle screen\n\n---\n\n#### `void loop()`\n\n**Purpose:** Main program loop — checks RFID, communicates with backend.\n\n**Flow:**\n```\n1. Skip if inConfigMode\n2. Check scan cooldown (3000ms)\n3. Check WiFi status → reconnect if needed\n4. Check for new RFID card\n   a. If no card → return\n   b. If card detected:\n5. Read UID\n6. Beep (100ms)\n7. Update lastScanAt\n8. Display \"Memproses...\" on LCD\n9. Resolve backend if not resolved\n10. If server offline → error beep, wait, show idle\n11. POST to /api/v1/attendance/check-rfid\n    a. If 200 OK:\n       - Parse response\n       - If \"registered\": false:\n         - If \"action\": \"REGISTER_CAPTURE\" → send \"REGISTER_CAPTURE|UID\" to ESP32-CAM\n         - Else → display \"RFID TIDAK TERDAFTAR\"\n       - If \"registered\": true → continue\n    b. If not 200 → display \"Koneksi Error\"\n12. Send \"CAPTURE|UID\" to ESP32-CAM via Serial\n13. POST to /api/v1/attendance/rfid (25s timeout)\n    a. 200 → \"Wajah Cocok! Verified\" + long beep\n    b. 400/401 → \"Wajah Tdk Cocok\" + error beeps\n    c. Other → \"Koneksi Timeout\" + error beeps\n14. Wait 3 seconds\n15. Halt RFID card\n16. Show idle screen\n```\n\n## 6.3 V2 Firmware Improvements (vs Legacy `esp8266.ino`)\n\n| Feature | Legacy | V2 |\n|---------|--------|-----|\n| WiFi Configuration | Hardcoded in source | Config portal (AP mode) |\n| Multi-WiFi | No (single network) | Up to 2 networks |\n| Server Discovery | Hardcoded IP | mDNS (`_attendtrack._tcp`) |\n| Config Storage | None | LittleFS `/config.json` |\n| ESP32-CAM Registration | Not supported | `REGISTER_CAPTURE` flow |\n| Error Handling | Basic | Cooldown + reconnection |\n| User Setup | Requires recompile | Web-based configuration |\n\n## 6.4 HTTP Endpoints Called\n\n| Endpoint | Method | Purpose | Timeout |\n|----------|--------|---------|---------|\n| `/api/v1/attendance/check-rfid` | POST | Check if RFID is registered | 5s |\n| `/api/v1/attendance/rfid` | POST | Verify RFID + face match | 25s |\n\n## 6.5 Serial Protocol (to ESP32-CAM)\n\nCommands sent via SoftwareSerial (9600 baud):\n\n| Command | Format | Purpose |\n|---------|--------|---------|\n| CAPTURE | `CAPTURE|{UID}` | Take attendance face photo |\n| REGISTER_CAPTURE | `REGISTER_CAPTURE|{UID}` | Take registration face photo |\n| SYNC_JSON | `SYNC_JSON|{json}` | Sync configuration |\n\nMessages end with `\\n` (newline).\n\n## 6.6 Error Handling & Recovery\n\n- **WiFi Disconnect:** `loop()` checks `WiFi.status()` and reconnects\n- **All WiFi Failed:** Falls back to config portal\n- **Server Not Found:** Displays \"SERVER OFFLINE\", retries on next scan\n- **HTTP Timeout:** `check-rfid` = 5s, `rfid` = 25s (longer due to face verification)\n- **Scan Cooldown:** 3000ms between scans to prevent RFID spam\n- **Buzzer Feedback:** Different beep patterns for success (500ms) vs error (3 × 100ms)\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\07-ESP32CAM.md",
  "content": "# ESP32-CAM Firmware Documentation\n\n## 7.1 Overview\n\nThe ESP32-CAM firmware runs on the **ESP32-CAM** module and serves as the **Face Capture Camera**. It receives commands from the ESP8266 via serial connection, captures face images, and sends them to the backend server via HTTP.\n\n**Hardware Components:**\n- **MCU:** ESP32 (ESP32-CAM module)\n- **Camera:** OV2640 (2MP)\n- **Flash LED:** GPIO4\n- **PSRAM:** Optional (2MB if available)\n- **Serial:** Hardware Serial2 for ESP8266 communication\n\n**Pin Mapping (OV2640 Camera):**\n\n| Signal | GPIO | Signal | GPIO |\n|--------|------|--------|------|\n| PWDN | 32 | Y2 | 5 |\n| RESET | -1 (NC) | Y3 | 18 |\n| XCLK | 0 | Y4 | 19 |\n| SIOD | 26 | Y5 | 21 |\n| SIOC | 27 | Y6 | 36 |\n| Y9 | 35 | Y7 | 39 |\n| Y8 | 34 | Y8 | 34 |\n| VSYNC | 25 | PCLK | 22 |\n| HREF | 23 | FLASH | 4 |\n\n## 7.2 File: `firmware/esp32cam_face_firmware.ino`\n\n**Location:** `I:\\rfid_v3\\firmware\\esp32cam_face_firmware.ino`\n**Lines:** 398\n\n**Purpose:** Main firmware for the ESP32-CAM face capture module with HTTP streaming to backend, heartbeat monitoring, flash control, and serial command processing from ESP8266.\n\n### 7.2.1 Libraries Used\n\n| Library | Purpose |\n|---------|---------|\n| `esp_camera.h` | ESP32 camera driver |\n| `WiFi.h` | WiFi connectivity |\n| `HTTPClient.h` | HTTP requests to backend |\n| `ArduinoJson.h` | JSON serialization/deserialization |\n| `LittleFS.h` | File system for config storage |\n| `ESPmDNS.h` | mDNS service discovery |\n\n### 7.2.2 Constants & Definitions\n\n```cpp\n#define FLASH_GPIO_NUM 4      // Flash LED\n#define RX2_PIN 13             // Serial2 RX (from ESP8266)\n#define TX2_PIN 12             // Serial2 TX (to ESP8266)\n#define MAX_WIFI 2             // Maximum WiFi networks\n```\n\n### 7.2.3 Global Variables\n\n| Variable | Type | Purpose |\n|----------|------|---------|\n| `wifiNetworks[2]` | `WiFiNetwork[]` | Array of WiFi credentials |\n| `serverHostname` | `String` | mDNS hostname (default: \"attendtrack\") |\n| `serverPort` | `int` | Backend server port (default: 3000) |\n| `deviceCode` | `String` | Device identifier (default: \"ESP32CAM-MASTER-01\") |\n| `pairingKey` | `String` | Room/location pairing key |\n| `resolvedServerUrl` | `String` | Full URL after mDNS resolution |\n| `waitingForConfig` | `bool` | Whether waiting for config from ESP8266 |\n| `lastHeartbeat` | `unsigned long` | Timestamp of last heartbeat |\n\n### 7.2.4 Functions\n\n---\n\n#### `void loadConfig()`\n\n**Purpose:** Loads device configuration from LittleFS `/config.json`.\n\n**Flow:**\n1. Mount LittleFS (format on failure)\n2. Check if `/config.json` exists\n3. If exists, parse JSON and populate:\n   - `wifiNetworks[]`\n   - `serverHostname`, `serverPort`\n   - `deviceCode` — auto-converts ESP8266 prefix to ESP32CAM (e.g., \"ESP8266-MASTER-01\" → \"ESP32CAM-MASTER-01\")\n   - `pairingKey`\n4. If not found, use defaults\n\n**Called by:** `setup()`\n\n---\n\n#### `void saveConfigFromJSON(String jsonStr)`\n\n**Purpose:** Saves configuration received from ESP8266 via serial.\n\n**Input:** JSON string from ESP8266 (sent as `SYNC_JSON|{json}`)\n\n**Flow:**\n1. Parse JSON\n2. Save raw JSON to LittleFS `/config.json`\n3. Print \"New config saved from ESP8266! Rebooting...\"\n4. Wait 1 second\n5. Reboot ESP32 (`ESP.restart()`)\n\n**Called by:** `loop()` when `SYNC_JSON|` command received\n\n---\n\n#### `bool connectWiFi()`\n\n**Purpose:** Attempts to connect to configured WiFi networks.\n\n**Flow:**\n1. Set WiFi mode to STA\n2. Iterate through `wifiNetworks[]`\n3. For each network:\n   - Call `WiFi.begin()`\n   - Blink flash LED during connection attempt\n   - Wait up to 10 seconds\n   - If connected, turn off flash, return `true`\n4. Return `false` if all fail\n\n**Blink Pattern:** Flash LED toggles every 500ms during connection\n\n**Called by:** `setup()`, `loop()` (reconnection)\n\n---\n\n#### `void resolveBackend()`\n\n**Purpose:** Discovers backend server using mDNS.\n\n**Flow:**\n1. Initialize mDNS responder\n2. Query for `_attendtrack._tcp` service (up to 5 attempts)\n3. If found:\n   - Save `resolvedServerUrl`\n   - Flash LED solid for 2 seconds (readiness indicator)\n4. If not found: continue with empty URL\n\n**Called by:** `setup()`, `loop()` (re-discovery)\n\n---\n\n#### `void initCamera()`\n\n**Purpose:** Initializes the OV2640 camera with optimal settings.\n\n**Camera Configuration:**\n\n```cpp\nconfig.xclk_freq_hz = 20000000;     // 20MHz clock\nconfig.pixel_format = PIXFORMAT_JPEG;  // JPEG output\n\nif (psramFound()) {\n    config.frame_size = FRAMESIZE_SVGA;   // 800×600\n    config.jpeg_quality = 10;              // High quality\n    config.fb_count = 2;                   // Double buffer\n} else {\n    config.frame_size = FRAMESIZE_VGA;    // 640×480\n    config.jpeg_quality = 12;              // Standard quality\n    config.fb_count = 1;                   // Single buffer\n}\n```\n\n**Quality Tuning:**\n- With PSRAM: SVGA (800×600), quality 10, double buffer\n- Without PSRAM: VGA (640×480), quality 12, single buffer\n\n**Error Handling:** If camera init fails, waits 3 seconds and reboots.\n\n**Called by:** `setup()`\n\n---\n\n#### `void sendHeartbeat()`\n\n**Purpose:** Sends periodic heartbeat to backend to indicate device is online.\n\n**Flow:**\n1. Check WiFi and server URL\n2. POST to `/api/v1/devices/heartbeat`\n3. Payload: `{ \"deviceCode\": \"...\", \"type\": \"ESP32CAM\" }`\n4. Log response code\n\n**Headers:** `Content-Type: application/json`\n**Timeout:** 3 seconds\n**Interval:** 30 seconds\n\n**Called by:** `loop()` every 30 seconds\n\n---\n\n#### `void captureAndSend(String uid)`\n\n**Purpose:** Captures a face image and sends it to the backend for attendance verification.\n\n**Input:** `uid` — RFID UID associated with this capture\n\n**Flow:**\n```\n1. Turn on flash LED\n2. Wait 800ms (illumination stabilization)\n3. Flush old frame buffer:\n   a. Get and discard dummy frame 1\n   b. Get and discard dummy frame 2\n   c. Wait 50ms\n4. Capture fresh frame: camera_fb_t *fb = esp_camera_fb_get()\n5. Turn off flash LED\n6. If capture failed:\n   - Send \"RESULT|FAILED\" to ESP8266 via Serial2\n   - Return\n7. If WiFi connected and server resolved:\n   a. POST to /api/v1/attendance/face\n   b. Headers:\n      - Content-Type: application/octet-stream\n      - X-UID: {uid}\n      - X-Device-Code: {deviceCode}\n      - X-Pairing-Key: {pairingKey}\n   c. Body: raw JPEG bytes (fb->buf, fb->len)\n   d. Timeout: 20 seconds\n   e. If success (200/201) → Send \"RESULT|SUCCESS\" to ESP8266\n   f. If failure → Send \"RESULT|FAILED\" to ESP8266\n8. Return frame buffer\n```\n\n**Image Quality:** JPEG with quality setting from `initCamera()` (10 or 12)\n\n**Called by:** `loop()` when `CAPTURE|UID` command received from ESP8266\n\n---\n\n#### `void captureAndSendRegistration(String uid)`\n\n**Purpose:** Captures a face image for NEW employee registration (no existing face enrolled).\n\n**Input:** `uid` — RFID UID for the new employee\n\n**Flow:** Same as `captureAndSend()` but with different headers:\n\n**Headers:**\n- `Content-Type: application/octet-stream`\n- `X-UID: {uid}`\n- `X-Purpose: registration`  ← **Differentiates from attendance capture**\n- `X-Device-Code: {deviceCode}`\n- `X-Pairing-Key: {pairingKey}`\n\n**Key Differences from `captureAndSend()`:**\n- Sends `X-Purpose: registration` header\n- Backend knows to create employee record instead of verifying attendance\n- No `RESULT` message sent back to ESP8266\n\n**Called by:** `loop()` when `REGISTER_CAPTURE|UID` command received\n\n---\n\n#### `void setup()`\n\n**Purpose:** Initializes all hardware and connectivity.\n\n**Flow:**\n```\n1. Initialize Serial (115200 debug) and Serial2 (9600, ESP8266 comm)\n2. Configure flash LED pin as OUTPUT, turn OFF\n3. initCamera()\n4. loadConfig()\n5. Check if any WiFi configured\n6. If WiFi configured and connection succeeds:\n   - resolveBackend()\n7. If no WiFi or connection fails:\n   - Set waitingForConfig = true\n   - Print \"Waiting for config from ESP8266...\"\n```\n\n---\n\n#### `void loop()`\n\n**Purpose:** Main program loop — processes serial commands, handles heartbeats, manages connectivity.\n\n**Flow:**\n```\n1. Check Serial2 for commands from ESP8266:\n   a. If \"SYNC_JSON|{json}\" → saveConfigFromJSON(json)\n   b. If \"CAPTURE|{uid}\" and NOT waitingForConfig → captureAndSend(uid)\n   c. If \"REGISTER_CAPTURE|{uid}\" and NOT waitingForConfig → captureAndSendRegistration(uid)\n   \n2. If waitingForConfig:\n   - Return immediately (do nothing, wait for ESP8266 config)\n   \n3. Every 30 seconds (millis() - lastHeartbeat > 30000):\n   - sendHeartbeat()\n   - Update lastHeartbeat\n   \n4. Check WiFi connectivity:\n   - If disconnected:\n     - Try connectWiFi()\n     - If fails again → waitingForConfig = true\n     - If succeeds → resolveBackend()\n```\n\n## 7.3 Camera Configuration Details\n\n### Resolution Settings\n\n| PSRAM | Resolution | Quality | Buffer | Approx. Size |\n|-------|-----------|---------|--------|-------------|\n| Available | SVGA (800×600) | 10 | 2 frames | ~30-50KB per JPEG |\n| Not Available | VGA (640×480) | 12 | 1 frame | ~20-40KB per JPEG |\n\n### Frame Buffer Flushing\n\nThe double-buffer is flushed before capture to ensure fresh images:\n```cpp\ncamera_fb_t *dummy_fb = esp_camera_fb_get();\nif (dummy_fb) esp_camera_fb_return(dummy_fb);\n// Repeat for second buffer (if fb_count = 2)\n```\n\nThis prevents stale frames from being sent when the ESP32-CAM has been idle.\n\n## 7.4 Serial Protocol (from ESP8266)\n\nCommands received via Hardware Serial2 (9600 baud):\n\n| Command | Format | Handler |\n|---------|--------|---------|\n| CAPTURE | `CAPTURE|{UID}\\n` | `captureAndSend(uid)` |\n| REGISTER_CAPTURE | `REGISTER_CAPTURE|{UID}\\n` | `captureAndSendRegistration(uid)` |\n| SYNC_JSON | `SYNC_JSON|{json}\\n` | `saveConfigFromJSON(json)` |\n\nResponses sent back:\n| Response | Condition |\n|----------|-----------|\n| `RESULT|SUCCESS\\n` | HTTP upload returned 200/201 |\n| `RESULT|FAILED\\n` | HTTP upload failed or capture failed |\n\n## 7.5 HTTP Endpoints Called\n\n| Endpoint | Method | Purpose | Timeout |\n|----------|--------|---------|---------|\n| `/api/v1/attendance/face` | POST | Send face image for processing | 20s |\n| `/api/v1/devices/heartbeat` | POST | Device keepalive | 3s |\n\n## 7.6 Error Recovery\n\n| Scenario | Behavior |\n|----------|----------|\n| Camera Init Failed | Reboot after 3 seconds |\n| Capture Failed | Send `RESULT|FAILED` to ESP8266, discard frame |\n| HTTP Upload Failed | Send `RESULT|FAILED` to ESP8266 |\n| WiFi Disconnected | Try reconnection, fall back to config waiting mode |\n| All WiFi Failed | `waitingForConfig = true`, wait for ESP8266 config |\n| Flash LED | Blinks during WiFi connection, solid 2s when connected |\n\n## 7.7 Key Differences Between V2 and Legacy\n\nThe V2 ESP32-CAM firmware adds:\n- mDNS server discovery (no hardcoded IPs)\n- Dual WiFi network support\n- Auto device code naming (ESP8266 → ESP32CAM replacement)\n- Registration capture support (`X-Purpose: registration`)\n- Flash LED feedback during connection\n- Config sync from ESP8266 via serial\n- Graceful fallback to config waiting mode\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\09-API.md",
  "content": "# API Documentation\n\n## 9.1 Overview\n\nAll API endpoints are served by the Express Gateway on port 3000. Endpoints are prefixed with `/api/v1/`.\n\n**Base URL:** `http://{server-ip}:3000/api/v1`\n\n**Authentication:** Most endpoints require a JWT Bearer token in the `Authorization` header.\n\n## 9.2 Authentication Endpoints\n\n### POST `/api/v1/auth/login`\n\n**Purpose:** Authenticate user and receive JWT token.\n\n**Authentication:** None (public)\n\n**Request:**\n```json\n{\n  \"email\": \"admin@rfid.com\",\n  \"password\": \"password123\"\n}\n```\n\n**Response (200):**\n```json\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIs...\",\n  \"user\": {\n    \"id\": \"uuid\",\n    \"name\": \"System Admin\",\n    \"email\": \"admin@rfid.com\",\n    \"role\": \"ADMIN\"\n  }\n}\n```\n\n**Error Responses:**\n| Status | Body |\n|--------|------|\n| 401 | `{ \"error\": \"Invalid email or password\" }` |\n| 400 | `{ \"error\": \"Email and password are required\" }` |\n\n---\n\n### POST `/api/v1/auth/register`\n\n**Purpose:** Create a new user account.\n\n**Authentication:** None (public — for initial setup)\n\n**Request:**\n```json\n{\n  \"name\": \"Operator Name\",\n  \"email\": \"operator@rfid.com\",\n  \"password\": \"securepass123\",\n  \"role\": \"OPERATOR\"\n}\n```\n\n**Response (201):**\n```json\n{\n  \"id\": \"uuid\",\n  \"name\": \"Operator Name\",\n  \"email\": \"operator@rfid.com\",\n  \"role\": \"OPERATOR\"\n}\n```\n\n**Error Responses:**\n| Status | Body |\n|--------|------|\n| 400 | `{ \"error\": \"Email already exists\" }` |\n| 400 | `{ \"error\": \"Validation error details\" }` |\n\n---\n\n### GET `/api/v1/auth/me`\n\n**Purpose:** Get current authenticated user's profile.\n\n**Authentication:** JWT Required\n\n**Headers:** `Authorization: Bearer {token}`\n\n**Response (200):**\n```json\n{\n  \"id\": \"uuid\",\n  \"name\": \"System Admin\",\n  \"email\": \"admin@rfid.com\",\n  \"role\": \"ADMIN\"\n}\n```\n\n---\n\n## 9.3 Employee Endpoints\n\n### GET `/api/v1/employees` (Alias: `/api/v1/students`)\n\n**Purpose:** List all employees (optionally filtered).\n\n**Authentication:** JWT Required\n\n**Query Parameters:**\n| Parameter | Type | Description |\n|-----------|------|-------------|\n| `search` | string | Search by name or department |\n| `department` | string | Filter by department |\n| `active` | boolean | Filter by active status |\n| `page` | number | Page number (default: 1) |\n| `pageSize` | number | Items per page (default: 50) |\n\n**Response (200):**\n```json\n{\n  \"employees\": [\n    {\n      \"id\": \"uuid\",\n      \"full_name\": \"Budi Santoso\",\n      \"department\": \"Produksi\",\n      \"position\": \"Operator\",\n      \"rfid_uid\": \"A1B2C3D4\",\n      \"face_image_path\": \"uploads/abc-123.jpg\",\n      \"is_active\": 1,\n      \"created_at\": \"2024-01-01T00:00:00.000Z\",\n      \"updated_at\": \"2024-01-01T00:00:00.000Z\"\n    }\n  ],\n  \"total\": 50,\n  \"page\": 1,\n  \"pageSize\": 50\n}\n```\n\n---\n\n### POST `/api/v1/employees` (Alias: `/api/v1/students`)\n\n**Purpose:** Create a new employee with optional face registration.\n\n**Authentication:** JWT Required\n\n**Content-Type:** `multipart/form-data`\n\n**Form Fields:**\n| Field | Type | Required | Description |\n|-------|------|----------|-------------|\n| `full_name` | string | Yes | Employee full name |\n| `department` | string | Yes | Department/division |\n| `position` | string | Yes | Job position |\n| `rfid_uid` | string | Yes | RFID card UID (hex) |\n| `faceImage` | file | No | Face photo file (JPEG) |\n| `faceDescriptor` | string | No | JSON array of 128 floats (alternative to faceImage) |\n\n**Response (201):**\n```json\n{\n  \"id\": \"uuid\",\n  \"full_name\": \"Budi Santoso\",\n  \"department\": \"Produksi\",\n  \"position\": \"Operator\",\n  \"rfid_uid\": \"A1B2C3D4\",\n  \"is_active\": 1,\n  \"created_at\": \"2024-01-01T00:00:00.000Z\"\n}\n```\n\n**Processing:**\n1. If `faceImage` provided → saves file → sends to Python service for encoding → stores descriptor\n2. If `faceDescriptor` provided → stores directly (used by ESP32-CAM registration flow)\n\n**Error Responses:**\n| Status | Body |\n|--------|------|\n| 400 | `{ \"error\": \"RFID UID already exists\" }` |\n| 400 | `{ \"error\": \"No face detected in uploaded image\" }` |\n\n---\n\n### PUT `/api/v1/employees/:id` (Alias: `/api/v1/students/:id`)\n\n**Purpose:** Update an existing employee.\n\n**Authentication:** JWT Required\n\n**Content-Type:** `multipart/form-data`\n\n**Form Fields:**\n| Field | Type | Required | Description |\n|-------|------|----------|-------------|\n| `full_name` | string | No | Employee full name |\n| `department` | string | No | Department/division |\n| `position` | string | No | Job position |\n| `rfid_uid` | string | No | RFID card UID |\n| `is_active` | number | No | 1 = Active, 0 = Inactive |\n| `faceImage` | file | No | New face photo |\n\n**Response (200):** Updated employee object\n\n---\n\n### DELETE `/api/v1/employees/:id` (Alias: `/api/v1/students/:id`)\n\n**Purpose:** Delete an employee.\n\n**Authentication:** JWT Required\n\n**Response (200):**\n```json\n{\n  \"message\": \"Employee deleted successfully\"\n}\n```\n\n---\n\n### GET `/api/v1/employees/:id`\n\n**Purpose:** Get employee by ID.\n\n**Authentication:** JWT Required\n\n**Response (200):** Employee object (same as list)\n\n---\n\n## 9.4 Attendance Endpoints\n\n### POST `/api/v1/attendance/check-rfid`\n\n**Purpose:** Check if an RFID UID is registered. Used by ESP8266 before triggering face capture.\n\n**Authentication:** None (IoT devices)\n\n**Request:**\n```json\n{\n  \"uid\": \"A1B2C3D4\",\n  \"deviceCode\": \"ESP8266-MASTER-01\",\n  \"pairingKey\": \"ROOM-1\"\n}\n```\n\n**Response (200) — Registered:**\n```json\n{\n  \"registered\": true\n}\n```\n\n**Response (200) — Not Registered with Registration Mode:**\n```json\n{\n  \"registered\": false,\n  \"action\": \"REGISTER_CAPTURE\"\n}\n```\n\n**Response (200) — Not Registered (Standard):**\n```json\n{\n  \"registered\": false,\n  \"action\": null\n}\n```\n\n**Error Responses:**\n| Status | Body |\n|--------|------|\n| 400 | `{ \"error\": \"UID is required\" }` |\n\n**Called by:** ESP8266 firmware\n\n---\n\n### POST `/api/v1/attendance/rfid`\n\n**Purpose:** Process RFID scan — creates attendance session, waits for face correlation.\n\n**Authentication:** None (IoT devices)\n\n**Request:**\n```json\n{\n  \"uid\": \"A1B2C3D4\",\n  \"deviceCode\": \"ESP8266-MASTER-01\",\n  \"pairingKey\": \"ROOM-1\"\n}\n```\n\n**Processing:**\n1. Creates attendance session with status `CREATED`\n2. Finds employee by RFID UID\n3. If face descriptor exists, waits for face image from ESP32-CAM\n4. Once face received (via `POST /face`), triggers verification\n5. Verification result returned in response\n\n**Response (200) — Success:**\n```json\n{\n  \"status\": \"VALID\",\n  \"confidence\": 0.87,\n  \"category\": \"ENTRY\",\n  \"punctuality\": \"ON_TIME\",\n  \"message\": \"Attendance recorded\"\n}\n```\n\n**Response (401) — Face Mismatch:**\n```json\n{\n  \"status\": \"INVALID\",\n  \"message\": \"Face does not match\"\n}\n```\n\n**Response (202) — Processing:**\n```json\n{\n  \"status\": \"PROCESSING\",\n  \"message\": \"Waiting for face verification\"\n}\n```\n\n---\n\n### POST `/api/v1/attendance/face`\n\n**Purpose:** Receive face image from ESP32-CAM or frontend simulator.\n\n**Authentication:** None (IoT devices) or JWT (web)\n\n**Content-Type:** `application/octet-stream` (from ESP32-CAM) or `multipart/form-data` (from frontend)\n\n**Headers (ESP32-CAM):**\n| Header | Value |\n|--------|-------|\n| `Content-Type` | `application/octet-stream` |\n| `X-UID` | RFID UID |\n| `X-Purpose` | `attendance` or `registration` |\n| `X-Device-Code` | Device identifier |\n| `X-Pairing-Key` | Room pairing key |\n\n**Request (multipart, for frontend):**\n| Field | Type | Description |\n|-------|------|-------------|\n| `image` | file | JPEG face image |\n| `uid` | string | RFID UID |\n| `deviceCode` | string | Device code |\n| `pairingKey` | string | Pairing key |\n| `purpose` | string | `attendance` or `registration` |\n\n**Processing (`attendance` purpose):**\n1. Receive image bytes\n2. Save image to `storage/uploads/`\n3. Look up matching session by `pairingKey` or time window\n4. Update session status to `READY`\n5. Trigger verification process (async)\n6. Emit realtime events\n\n**Processing (`registration` purpose):**\n1. Receive image bytes\n2. Save image to `storage/uploads/`\n3. Create employee record with UID\n4. Send image to Python service for encoding\n5. Store face descriptor on employee record\n6. Emit `registration:image` event via Socket.IO\n\n**Response (200):**\n```json\n{\n  \"status\": \"received\",\n  \"sessionId\": \"uuid\",\n  \"ready\": true\n}\n```\n\n---\n\n### GET `/api/v1/attendance/history`\n\n**Purpose:** Get paginated attendance history with filters.\n\n**Authentication:** JWT Required\n\n**Query Parameters:**\n| Parameter | Type | Description |\n|-----------|------|-------------|\n| `page` | number | Page number (default: 1) |\n| `pageSize` | number | Items per page (default: 20) |\n| `status` | string | Filter: `VALID`, `INVALID`, or empty |\n| `category` | string | Filter: `ENTRY`, `EXIT`, or empty |\n| `date` | string | Filter by date (ISO format) |\n| `month` | string | Filter by month (YYYY-MM) |\n| `employeeId` | string | Filter by employee |\n\n**Response (200):**\n```json\n{\n  \"records\": [\n    {\n      \"id\": \"uuid\",\n      \"employee_id\": \"uuid\",\n      \"employee_name\": \"Budi Santoso\",\n      \"department\": \"Produksi\",\n      \"rfid_uid\": \"A1B2C3D4\",\n      \"status\": \"VALID\",\n      \"category\": \"ENTRY\",\n      \"punctuality\": \"ON_TIME\",\n      \"confidence\": 0.87,\n      \"image_path\": \"uploads/abc-123.jpg\",\n      \"verified_at\": \"2024-01-01T07:30:00.000Z\"\n    }\n  ],\n  \"total\": 150,\n  \"page\": 1,\n  \"pageSize\": 20\n}\n```\n\n---\n\n### GET `/api/v1/attendance/sessions`\n\n**Purpose:** Get current active attendance sessions.\n\n**Authentication:** JWT Required\n\n**Query Parameters:**\n| Parameter | Type | Description |\n|-----------|------|-------------|\n| `status` | string | Filter by status (e.g., `READY`, `PROCESSING`) |\n\n**Response (200):**\n```json\n{\n  \"sessions\": [\n    {\n      \"id\": \"uuid\",\n      \"correlation_id\": \"uuid\",\n      \"rfid_uid\": \"A1B2C3D4\",\n      \"status\": \"READY\",\n      \"pairing_key\": \"ROOM-1\",\n      \"started_at\": \"2024-01-01T07:30:00.000Z\",\n      \"expires_at\": \"2024-01-01T07:30:20.000Z\"\n    }\n  ]\n}\n```\n\n---\n\n### GET `/api/v1/attendance/stream`\n\n**Purpose:** Server-Sent Events (SSE) stream for real-time attendance updates.\n\n**Authentication:** JWT Required\n\n**Response:** SSE stream with `text/event-stream` content type\n\n**Events:**\n```\nevent: attendance:new\ndata: { \"id\": \"uuid\", \"employee_name\": \"...\", \"status\": \"VALID\", ... }\n\nevent: attendance:update\ndata: { \"id\": \"uuid\", \"status\": \"COMPLETED\", ... }\n\nevent: rfid:new\ndata: { \"uid\": \"A1B2C3D4\", \"deviceCode\": \"ESP8266-MASTER-01\", ... }\n\nevent: device:status\ndata: { \"deviceCode\": \"...\", \"status\": \"ONLINE\", ... }\n```\n\n---\n\n### GET `/api/v1/export/pdf`\n\n**Purpose:** Export attendance report as PDF.\n\n**Authentication:** JWT Required\n\n**Query Parameters:**\n| Parameter | Type | Description |\n|-----------|------|-------------|\n| `month` | number | Month (1-12) |\n| `year` | number | Year |\n| `status` | string | Filter by status |\n| `employeeId` | string | Filter by employee |\n\n**Response (200):** `application/pdf` binary\n\n---\n\n## 9.5 Device Endpoints\n\n### POST `/api/v1/devices/register`\n\n**Purpose:** Register a new IoT device (auto-registered on first heartbeat if not exists).\n\n**Authentication:** None (IoT devices)\n\n**Request:**\n```json\n{\n  \"deviceCode\": \"ESP8266-MASTER-01\",\n  \"type\": \"RFID_READER\"\n}\n```\n\n**Response (201):**\n```json\n{\n  \"id\": \"uuid\",\n  \"device_code\": \"ESP8266-MASTER-01\",\n  \"type\": \"RFID_READER\",\n  \"status\": \"ONLINE\",\n  \"last_seen_at\": \"2024-01-01T00:00:00.000Z\"\n}\n```\n\n---\n\n### POST `/api/v1/devices/heartbeat`\n\n**Purpose:** Device keepalive — updates last_seen_at and status.\n\n**Authentication:** None (IoT devices)\n\n**Request:**\n```json\n{\n  \"deviceCode\": \"ESP32CAM-MASTER-01\",\n  \"type\": \"FACE_SCANNER\"\n}\n```\n\n**Response (200):**\n```json\n{\n  \"status\": \"ok\",\n  \"deviceCode\": \"ESP32CAM-MASTER-01\"\n}\n```\n\n---\n\n### GET `/api/v1/devices`\n\n**Purpose:** List all registered devices.\n\n**Authentication:** JWT Required\n\n**Response (200):**\n```json\n{\n  \"devices\": [\n    {\n      \"id\": \"uuid\",\n      \"device_code\": \"ESP8266-MASTER-01\",\n      \"type\": \"RFID_READER\",\n      \"name\": \"ESP8266-MASTER-01\",\n      \"location\": null,\n      \"status\": \"ONLINE\",\n      \"metadata\": null,\n      \"last_seen_at\": \"2024-01-01T00:00:00.000Z\"\n    }\n  ]\n}\n```\n\n---\n\n## 9.6 Settings Endpoints\n\n### GET `/api/v1/settings`\n\n**Purpose:** Get all system settings.\n\n**Authentication:** JWT Required\n\n**Response (200):**\n```json\n{\n  \"entry_start_time\": \"07:00\",\n  \"entry_end_time\": \"09:00\",\n  \"exit_start_time\": \"16:00\",\n  \"exit_end_time\": \"18:00\",\n  \"late_threshold_minutes\": \"15\"\n}\n```\n\n---\n\n### POST `/api/v1/settings`\n\n**Purpose:** Update system settings.\n\n**Authentication:** JWT Required\n\n**Request:**\n```json\n{\n  \"entry_start_time\": \"07:00\",\n  \"entry_end_time\": \"09:00\",\n  \"late_threshold_minutes\": \"15\"\n}\n```\n\n**Response (200):**\n```json\n{\n  \"status\": \"saved\"\n}\n```\n\n---\n\n### DELETE `/api/v1/settings/reset`\n\n**Purpose:** Reset all settings to defaults.\n\n**Authentication:** JWT Required\n\n**Response (200):**\n```json\n{\n  \"message\": \"Settings reset to defaults\"\n}\n```\n\n---\n\n## 9.7 Health Check\n\n### GET `/health`\n\n**Purpose:** Simple health check for load balancers/monitoring.\n\n**Authentication:** None\n\n**Response (200):**\n```json\n{\n  \"status\": \"ok\",\n  \"timestamp\": \"2024-01-01T00:00:00.000Z\"\n}\n```\n\n---\n\n## 9.8 Error Response Format\n\nAll API errors follow this structure:\n\n```json\n{\n  \"error\": \"Human-readable error message\",\n  \"statusCode\": 400\n}\n```\n\n**HTTP Status Codes Used:**\n| Code | Meaning |\n|------|---------|\n| 200 | Success |\n| 201 | Created |\n| 202 | Accepted (processing) |\n| 400 | Bad Request |\n| 401 | Unauthorized |\n| 403 | Forbidden |\n| 404 | Not Found |\n| 500 | Internal Server Error |\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 74.1s)

_Thinking:_

Good progress. Let me write the remaining files: SocketIO, gRPC, Application Flow, Feature Flow, Sequence Diagram, Deployment, Troubleshooting, Best Practices.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\10-SocketIO.md",
  "content": "# Socket.IO Documentation\n\n## 10.1 Overview\n\nSocket.IO provides **real-time, bidirectional communication** between the backend server and the frontend web application. It is used for live attendance updates, device status changes, and registration events.\n\n**Transport:** WebSocket with HTTP long-polling fallback\n**Port:** Same as Express Gateway (3000)\n**Path:** `/socket.io/` (default)\n\n## 10.2 Architecture\n\n```\n┌──────────────────┐         ┌────────────────────┐         ┌──────────────┐\n│   Frontend React │ ◄─────► │  Socket.IO Server  │ ◄────── │  gRPC Events │\n│   (Socket.IO     │         │  (Express Gateway) │         │  (Internal   │\n│    Client)       │         │                    │         │   EventBus)  │\n└──────────────────┘         └────────────────────┘         └──────────────┘\n\nEvents flow:\n  Services emit → EventEmitter → Socket.IO Server → WebSocket → Frontend\n                                                                      │\n  Device POST → Controller → EventEmitter → Socket.IO → Frontend ◄────┘\n```\n\n## 10.3 Connection Setup\n\n**Server-side** (`src/gateway/realtime.ts`):\n```typescript\nconst io = new Server(httpServer, {\n  cors: { origin: \"*\" },       // Allow all origins\n  // No authentication required for connection\n});\n\nio.on(\"connection\", (socket) => {\n  // Validate JWT token from handshake auth\n  const token = socket.handshake.auth.token;\n  if (token) {\n    const user = validateToken(token);\n    socket.data.user = user;\n  }\n});\n```\n\n**Client-side** (`src/services/realtime.service.ts`):\n```typescript\nconst socket = io(VITE_API_BASE_URL, {\n  auth: { token },             // Send JWT on connection\n  reconnection: true,          // Auto-reconnect\n  reconnectionDelay: 1000,     // 1 second initial delay\n  reconnectionAttempts: Infinity\n});\n```\n\n## 10.4 Client-to-Server Events\n\n### `subscribe:attendance`\n\n**Purpose:** Subscribe to attendance-related real-time events.\n\n**Payload:** (none)\n\n**Server Action:** Joins socket to `attendance` room\n\n**Called by:** Frontend on mount (in `useRealtimeAttendance` hook)\n\n---\n\n### `subscribe:device`\n\n**Purpose:** Subscribe to device status events.\n\n**Payload:** (none)\n\n**Server Action:** Joins socket to `device` room\n\n---\n\n## 10.5 Server-to-Client Events\n\n### `attendance:new`\n\n**Purpose:** Notifies frontend when a new attendance record is created.\n\n**Emitter:** `AttendanceService` after successful verification\n\n**Payload:**\n```json\n{\n  \"id\": \"uuid\",\n  \"employee_id\": \"uuid\",\n  \"employee_name\": \"Budi Santoso\",\n  \"department\": \"Produksi\",\n  \"rfid_uid\": \"A1B2C3D4\",\n  \"status\": \"VALID\",\n  \"category\": \"ENTRY\",\n  \"punctuality\": \"ON_TIME\",\n  \"confidence\": 0.87,\n  \"image_path\": \"uploads/abc-123.jpg\",\n  \"verified_at\": \"2024-01-01T07:30:00.000Z\"\n}\n```\n\n**Trigger:** Attendance verification completes with status VALID or INVALID\n\n**Frontend Handler:**\n- `attendanceStore.pushRealtimeEvent(event)`\n- Creates toast notification\n- Refreshes history if on history page\n- Updates dashboard summary\n\n---\n\n### `attendance:update`\n\n**Purpose:** Notifies when an attendance session status changes.\n\n**Payload:**\n```json\n{\n  \"sessionId\": \"uuid\",\n  \"status\": \"COMPLETED\",\n  \"previousStatus\": \"PROCESSING\"\n}\n```\n\n**Trigger:** Session transitions between states (CREATED → READY → PROCESSING → COMPLETED)\n\n**Frontend Handler:**\n- Updates session in `attendanceStore.sessions`\n- Updates monitoring page UI\n\n---\n\n### `rfid:new`\n\n**Purpose:** Notifies when an RFID card is scanned.\n\n**Payload:**\n```json\n{\n  \"uid\": \"A1B2C3D4\",\n  \"deviceCode\": \"ESP8266-MASTER-01\",\n  \"registered\": true,\n  \"employee_name\": \"Budi Santoso\",\n  \"timestamp\": \"2024-01-01T07:30:00.000Z\"\n}\n```\n\n**Trigger:** ESP8266 sends POST to `/api/v1/attendance/rfid`\n\n**Frontend Handler:**\n- Shows toast notification \"RFID card detected\"\n- Updates live feed if applicable\n\n---\n\n### `registration:image`\n\n**Purpose:** Notifies frontend when a registration face image is received from ESP32-CAM.\n\n**Payload:**\n```json\n{\n  \"uid\": \"A1B2C3D4\",\n  \"imagePath\": \"uploads/reg-abc-123.jpg\",\n  \"timestamp\": \"2024-01-01T07:30:00.000Z\"\n}\n```\n\n**Trigger:** ESP32-CAM sends face image with `X-Purpose: registration` header\n\n**Frontend Handler:**\n- Employee registration page shows captured image preview\n- Updates registration form state\n\n---\n\n### `device:status`\n\n**Purpose:** Notifies when a device goes online or offline.\n\n**Payload:**\n```json\n{\n  \"deviceCode\": \"ESP32CAM-MASTER-01\",\n  \"type\": \"FACE_SCANNER\",\n  \"status\": \"ONLINE\",\n  \"lastSeenAt\": \"2024-01-01T07:30:00.000Z\"\n}\n```\n\n**Trigger:** Device heartbeat received, or device not seen for >60 seconds\n\n**Frontend Handler:**\n- Updates device status in `attendanceStore.devices`\n- Updates DeviceOverview component\n- Shows toast if device goes offline\n\n---\n\n### `session:created`\n\n**Purpose:** Notifies when a new attendance session is created.\n\n**Payload:**\n```json\n{\n  \"sessionId\": \"uuid\",\n  \"rfid_uid\": \"A1B2C3D4\",\n  \"pairingKey\": \"ROOM-1\",\n  \"status\": \"CREATED\"\n}\n```\n\n**Trigger:** RFID scan creates new attendance session\n\n---\n\n## 10.6 Event Flow Diagrams\n\n### Attendance Creation Flow\n\n```\n1. ESP8266 POSTs RFID → Gateway\n2. Gateway creates session → emits `session:created` via EventEmitter\n3. EventEmitter → Socket.IO → Frontend\n4. ESP32-CAM POSTs face → Gateway\n5. Gateway adds face to session → emits `attendance:update` (status=READY)\n6. Verification processes → emits `attendance:update` (status=PROCESSING)\n7. Verification complete → emits `attendance:new` with full record\n8. Frontend receives `attendance:new` → adds to history, shows toast\n\nTime: ~1-5 seconds total\n```\n\n### Device Status Flow\n\n```\n1. ESP32-CAM POSTs heartbeat every 30s → Gateway\n2. Gateway updates device status → emits `device:status` via EventEmitter\n3. EventEmitter → Socket.IO → Frontend\n4. Frontend updates DeviceOverview component\n\nIf no heartbeat for >60s:\n5. System marks device as OFFLINE\n6. Gateway emits `device:status` (status=OFFLINE)\n7. Frontend shows toast \"Device offline\"\n```\n\n## 10.7 Server-Sent Events (SSE) Fallback\n\nIn addition to Socket.IO, the system supports SSE via the `/api/v1/attendance/stream` endpoint.\n\n**URL:** `GET /api/v1/attendance/stream`\n**Auth:** JWT required (query param or header)\n**Content-Type:** `text/event-stream`\n\n**Client:** `@microsoft/fetch-event-source` library\n\n**Events:** Same event types as Socket.IO\n\n**Purpose:** Fallback when WebSocket connections are restricted (e.g., corporate proxies)\n\n## 10.8 EventEmitter Bridge (`src/shared/realtime/realtime-events.ts`)\n\nThe backend uses a Node.js `EventEmitter` as an internal message bus:\n\n```typescript\nconst realtimeEvents = new EventEmitter();\n// Events: attendance:new, attendance:update, rfid:new, \n//         registration:image, device:status, session:created\n```\n\n**Flow:**\n1. Service layer emits events on `realtimeEvents` EventEmitter\n2. Gateway's `realtime.ts` listens to EventEmitter and forwards to Socket.IO\n3. Both gRPC handler and HTTP controller can emit events\n\n## 10.9 Socket.IO Event Summary\n\n| Event | Direction | Triggered By | Received By | Payload Contains |\n|-------|-----------|--------------|-------------|-----------------|\n| `attendance:new` | Server → Client | Verification complete | Frontend | Full attendance record |\n| `attendance:update` | Server → Client | Session state change | Frontend | sessionId, status |\n| `rfid:new` | Server → Client | RFID scan | Frontend | uid, deviceCode, employee |\n| `registration:image` | Server → Client | Registration capture | Frontend | uid, imagePath |\n| `device:status` | Server → Client | Heartbeat/timeout | Frontend | deviceCode, status |\n| `session:created` | Server → Client | New session | Frontend | sessionId, status |\n| `subscribe:attendance` | Client → Server | Frontend mount | Server | — |\n| `subscribe:device` | Client → Server | Frontend mount | Server | — |\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\11-gRPC.md",
  "content": "# gRPC Documentation\n\n## 11.1 Overview\n\ngRPC is used for **internal service-to-service communication** between the Express Gateway and the business logic layer. It provides strongly-typed contracts via Protocol Buffers.\n\n**Server:** `@grpc/grpc-js` on port 50051\n**Protocol:** HTTP/2\n**Serialization:** Protocol Buffers (protobuf)\n**Service Definition:** `src/proto/platform.proto` (266 lines)\n\n## 11.2 Architecture\n\n```\n┌────────────────────────┐         ┌────────────────────────────┐\n│   Express Gateway      │  gRPC   │   gRPC Server (port 50051) │\n│   (Port 3000)          │ ◄─────► │                            │\n│                        │         │  ┌──────────────────────┐  │\n│  ┌──────────────────┐  │         │  │  AuthService         │  │\n│  │ grpc-client.ts   │──┼─────────┼─►│  EmployeeService     │  │\n│  │ (Promisified)    │  │         │  │  DeviceService       │  │\n│  └──────────────────┘  │         │  │  AttendanceService   │  │\n│                        │         │  │  SettingsService     │  │\n│  HTTP routes call      │         │  └──────────────────────┘  │\n│  gRPC client methods   │         │                            │\n└────────────────────────┘         └────────────────────────────┘\n```\n\n## 11.3 Service Definitions\n\n### AuthService\n\n**RPCs:**\n\n#### `Login(LoginRequest) returns (LoginResponse)`\n- **Purpose:** Authenticate user and return JWT\n- **Request:** `{ email, password }`\n- **Response:** `{ token, user }`\n\n#### `Register(RegisterRequest) returns (RegisterResponse)`\n- **Purpose:** Create new user\n- **Request:** `{ name, email, password, role }`\n- **Response:** `{ id, name, email, role }`\n\n#### `ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse)`\n- **Purpose:** Verify JWT token validity\n- **Request:** `{ token }`\n- **Response:** `{ valid, user }`\n\n---\n\n### EmployeeService\n\n**RPCs:**\n\n#### `Create(CreateEmployeeRequest) returns (EmployeeResponse)`\n- **Purpose:** Create new employee with optional face data\n- **Request:** `{ full_name, department, position, rfid_uid, face_descriptor, face_image_path }`\n- **Response:** Full employee object\n\n#### `Update(UpdateEmployeeRequest) returns (EmployeeResponse)`\n- **Purpose:** Update existing employee\n- **Request:** `{ id, full_name?, department?, position?, rfid_uid?, face_descriptor?, face_image_path?, is_active? }`\n- **Response:** Updated employee object\n\n#### `FindById(FindByIdRequest) returns (EmployeeResponse)`\n- **Purpose:** Get employee by UUID\n- **Request:** `{ id }`\n- **Response:** Employee object\n\n#### `FindAll(FindAllRequest) returns (EmployeeListResponse)`\n- **Purpose:** List employees with pagination\n- **Request:** `{ page?, pageSize?, search?, department?, active? }`\n- **Response:** `{ employees[], total, page, pageSize }`\n\n#### `Delete(DeleteRequest) returns (DeleteResponse)`\n- **Purpose:** Delete employee\n- **Request:** `{ id }`\n- **Response:** `{ success }`\n\n#### `FindByRfid(FindByRfidRequest) returns (EmployeeResponse)`\n- **Purpose:** Find employee by RFID UID\n- **Request:** `{ rfid_uid }`\n- **Response:** Employee object\n\n---\n\n### DeviceService\n\n**RPCs:**\n\n#### `Register(RegisterDeviceRequest) returns (DeviceResponse)`\n- **Purpose:** Register new IoT device\n- **Request:** `{ device_code, type, name? }`\n- **Response:** Full device object\n\n#### `Heartbeat(HeartbeatRequest) returns (HeartbeatResponse)`\n- **Purpose:** Update device last seen timestamp\n- **Request:** `{ device_code, type }`\n- **Response:** `{ status, device_code }`\n\n#### `FindAll(FindAllDevicesRequest) returns (DeviceListResponse)`\n- **Purpose:** List all devices\n- **Request:** `{}`\n- **Response:** `{ devices[] }`\n\n#### `Update(UpdateDeviceRequest) returns (DeviceResponse)`\n- **Purpose:** Update device info\n- **Request:** `{ id, name?, location?, status? }`\n- **Response:** Updated device object\n\n---\n\n### AttendanceService\n\n**RPCs:**\n\n#### `CheckRfid(CheckRfidRequest) returns (CheckRfidResponse)`\n- **Purpose:** Check if RFID UID is registered (for ESP8266)\n- **Request:** `{ uid, device_code, pairing_key }`\n- **Response:** `{ registered, action? }`\n\n#### `HandleRfid(HandleRfidRequest) returns (HandleRfidResponse)`\n- **Purpose:** Process RFID scan and create session\n- **Request:** `{ uid, device_code, pairing_key }`\n- **Response:** `{ status, session_id, message }`\n\n#### `HandleFace(HandleFaceRequest) returns (HandleFaceResponse)`\n- **Purpose:** Process face image and correlate with session\n- **Request:** `{ image_base64, uid, device_code, pairing_key, purpose? }`\n- **Response:** `{ status, session_id, ready }`\n\n#### `GetHistory(GetHistoryRequest) returns (AttendanceHistoryResponse)`\n- **Purpose:** Get paginated attendance history\n- **Request:** `{ page, page_size, status?, category?, date?, month?, employee_id?, pairing_key? }`\n- **Response:** `{ records[], total, page, page_size }`\n\n#### `GetSessions(GetSessionsRequest) returns (SessionListResponse)`\n- **Purpose:** Get active sessions\n- **Request:** `{ status? }`\n- **Response:** `{ sessions[] }`\n\n#### `GetSummary(GetSummaryRequest) returns (SummaryResponse)`\n- **Purpose:** Get attendance summary statistics\n- **Request:** `{ date? }`\n- **Response:** `{ total, valid, invalid, devices_online }`\n\n#### `ProcessVerification(ProcessVerificationRequest) returns (ProcessVerificationResponse)`\n- **Purpose:** Trigger face verification for a session\n- **Request:** `{ session_id }`\n- **Response:** `{ status, confidence? }`\n\n#### `StreamAttendances(StreamAttendancesRequest) returns (stream AttendanceEvent)`\n- **Purpose:** Server-streaming endpoint for real-time attendance events\n- **Request:** `{}`\n- **Response:** Stream of `AttendanceEvent` messages\n\n---\n\n### SettingsService\n\n**RPCs:**\n\n#### `Get(GetSettingsRequest) returns (GetSettingsResponse)`\n- **Purpose:** Get all system settings\n- **Request:** `{}`\n- **Response:** `{ settings: { key: value } }`\n\n#### `Upsert(UpsertSettingRequest) returns (UpsertSettingResponse)`\n- **Purpose:** Create or update a setting\n- **Request:** `{ key, value }`\n- **Response:** `{ success }`\n\n#### `Reset(ResetSettingsRequest) returns (ResetSettingsResponse)`\n- **Purpose:** Reset all settings to defaults\n- **Request:** `{}`\n- **Response:** `{ success }`\n\n## 11.4 Proto File Structure\n\n**Location:** `src/proto/platform.proto`\n\n```protobuf\nsyntax = \"proto3\";\npackage attendtrack;\n\n// === Services ===\nservice AuthService { ... }\nservice EmployeeService { ... }\nservice DeviceService { ... }\nservice AttendanceService { ... }\nservice SettingsService { ... }\n\n// === Messages ===\n// Request/Response messages for each RPC\n// See 11.3 for details\n```\n\n## 11.5 gRPC Client (`src/shared/grpc/grpc-client.ts`)\n\n**Purpose:** Creates promisified gRPC clients for the Gateway to call services.\n\n```typescript\nconst grpcClient = {\n  auth: promisifyClient(new proto.attendtrack.AuthService(...)),\n  employee: promisifyClient(new proto.attendtrack.EmployeeService(...)),\n  device: promisifyClient(new proto.attendtrack.DeviceService(...)),\n  attendance: promisifyClient(new proto.attendtrack.AttendanceService(...)),\n  settings: promisifyClient(new proto.attendtrack.SettingsService(...))\n};\n```\n\n**Promisification:** Wraps gRPC callback-style methods to return Promises for use with async/await.\n\n## 11.6 gRPC Server (`src/grpc/server.ts`)\n\n**Purpose:** Starts gRPC server and registers all service handlers.\n\n```typescript\nfunction startGrpcServer() {\n  const server = new grpc.Server();\n  server.addService(AuthService, authHandler);\n  server.addService(EmployeeService, employeeHandler);\n  server.addService(DeviceService, deviceHandler);\n  server.addService(AttendanceService, attendanceHandler);\n  server.addService(SettingsService, settingsHandler);\n  server.bindAsync(`0.0.0.0:${env.GRPC_PORT}`, ...);\n}\n```\n\n## 11.7 gRPC Handlers\n\nEach handler is a module that implements the gRPC service interface:\n\n| File | Implements | Lines |\n|------|-----------|-------|\n| `auth.handler.ts` | AuthService | 21 |\n| `employee.handler.ts` | EmployeeService | 59 |\n| `device.handler.ts` | DeviceService | 62 |\n| `attendance.handler.ts` | AttendanceService | 139 |\n| `settings.handler.ts` | SettingsService | 59 |\n\n**Handler Pattern:**\n```typescript\nconst handler = {\n  async login(call, callback) {\n    try {\n      const result = await authService.login(call.request);\n      callback(null, result);\n    } catch (error) {\n      callback(grpcErrorMapper(error), null);\n    }\n  },\n  // ... more methods\n};\n```\n\n## 11.8 gRPC Error Mapping (`src/shared/grpc/grpc-error.ts`)\n\n**Purpose:** Converts application errors to gRPC status codes.\n\n| HTTP Status | gRPC Code |\n|-------------|-----------|\n| 400 | `INVALID_ARGUMENT` |\n| 401 | `UNAUTHENTICATED` |\n| 403 | `PERMISSION_DENIED` |\n| 404 | `NOT_FOUND` |\n| 409 | `ALREADY_EXISTS` |\n| 500 | `INTERNAL` |\n\n## 11.9 Proto Loading (`src/shared/grpc/proto.ts`)\n\n**Purpose:** Loads and parses the `.proto` file.\n\n```typescript\nimport path from 'path';\nimport grpc from '@grpc/grpc-js';\nimport protoLoader from '@grpc/proto-loader';\n\nconst PROTO_PATH = path.join(__dirname, '../../proto/platform.proto');\n\nconst packageDefinition = protoLoader.loadSync(PROTO_PATH, {\n  keepCase: true,\n  longs: String,\n  enums: String,\n  defaults: true,\n  oneofs: true\n});\n\nexport const proto = grpc.loadPackageDefinition(packageDefinition) as any;\n```\n\n## 11.10 Communication Flow\n\n```\nHTTP Request (from Frontend/Device)\n  │\n  ▼\nExpress Route Handler (gateway/app.ts)\n  │\n  ▼\nModule Controller (e.g., attendance.controller.ts)\n  │\n  ▼\ngRPC Client Call (grpc-client.ts)\n  │\n  ▼  (gRPC over HTTP/2, localhost:50051)\ngRPC Handler (e.g., attendance.handler.ts)\n  │\n  ▼\nModule Service (e.g., attendance.service.ts)\n  │\n  ▼\nModule Repository (e.g., attendance.repository.ts)\n  │\n  ▼\nSQLite Database\n```\n\nBenefits of this architecture:\n- **Separation of concerns**: HTTP layer doesn't know about database\n- **Contract-driven**: Proto file defines all interfaces\n- **Type safety**: TypeScript types generated from proto\n- **Internal security**: gRPC port (50051) not exposed externally\n- **Streaming support**: `StreamAttendances` uses gRPC server streaming\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\12-Application-Flow.md",
  "content": "# Application Flow Documentation\n\n## 12.1 Complete User Journey\n\nThis document describes the end-to-end flow of a user interacting with the system, from opening the application to viewing attendance reports.\n\n---\n\n## 12.2 Login Flow\n\n```\n1. User opens browser → navigates to http://{server-ip}:5173\n2. React app loads → main.tsx renders App inside BrowserRouter\n3. App.tsx checks for existing auth token in localStorage\n4. If NO token → redirect to /login\n5. LoginPage renders with email/password form\n6. User enters credentials → clicks Login\n7. Frontend calls POST /api/v1/auth/login\n   → Gateway receives request\n   → Gateway calls AuthService.Login via gRPC\n   → AuthService validates credentials (bcrypt compare)\n   → AuthService generates JWT token\n   → Returns { token, user }\n8. Frontend stores token + user in authStore (Zustand)\n9. authStore persists to localStorage(\"rfid-v3-auth\")\n10. React Router navigates to / (Dashboard)\n11. App.tsx renders AppShell with Sidebar + Topbar\n12. useBootstrapData() hook fires:\n    - Fetches employees, devices, sessions, history in parallel\n    - Populates attendanceStore\n13. useRealtimeAttendance() hook fires:\n    - Connects Socket.IO to backend\n    - Subscribes to attendance:new, device:status events\n14. DashboardPage renders SummaryStrip + LiveFeed + DeviceOverview\n```\n\n---\n\n## 12.3 Dashboard View Flow\n\n```\nDashboardPage\n│\n├── SummaryStrip\n│   ├── Computes from attendanceStore.summary()\n│   ├── Shows: Valid Today, Invalid Scans, Total Scans, IoT Devices Online\n│   └── Updates reactively when attendanceStore changes\n│\n├── LiveFeed\n│   ├── Shows 5 most recent attendance records\n│   ├── Columns: Photo, Name, Department, Time, Category, Punctuality, Status\n│   └── Auto-updates via Socket.IO events\n│\n└── DeviceOverview\n    ├── Lists all registered devices\n    ├── Shows online/offline status\n    ├── Shows IP address from metadata\n    └── Updates via device:status Socket.IO events\n```\n\n---\n\n## 12.4 RFID Attendance Flow (Core Flow)\n\nThis is the most critical flow in the system:\n\n```\n1. HARDWARE: User taps RFID card on MFRC522 reader\n2. ESP8266 detects card → reads UID (e.g., \"A1B2C3D4\")\n3. ESP8266 beeps (100ms) → displays \"Memproses...\" on LCD\n4. ESP8266 POSTs to /api/v1/attendance/check-rfid\n   Body: { \"uid\": \"A1B2C3D4\", \"deviceCode\": \"ESP8266-MASTER-01\", \"pairingKey\": \"ROOM-1\" }\n5. GATEWAY receives request\n   → Calls AttendanceService.CheckRfid via gRPC\n   → EmployeeRepository.findByRfid(\"A1B2C3D4\")\n   \n   CASE A: RFID NOT REGISTERED\n   ├── Response: { \"registered\": false, \"action\": \"REGISTER_CAPTURE\" }\n   ├── ESP8266 sees \"REGISTER_CAPTURE\" action\n   ├── Sends \"REGISTER_CAPTURE|A1B2C3D4\" to ESP32-CAM via Serial\n   ├── ESP32-CAM receives command\n   ├── Turns on flash LED → waits 800ms\n   ├── Captures photo → saves to buffer\n   ├── POSTs to /api/v1/attendance/face\n   │   Headers: X-Purpose: registration, X-UID: A1B2C3D4, ...\n   │   Body: raw JPEG bytes\n   ├── Gateway receives image\n   │   → Saves image to storage/uploads/\n   │   → Emits \"registration:image\" via Socket.IO\n   │   → Creates attendance session with status REGISTRATION\n   │   → Calls EmployeeService with face descriptor\n   │   → Employee created with RFID + face descriptor\n   └── Frontend shows new employee registration notification\n   \n   CASE B: RFID REGISTERED (NORMAL FLOW)\n   ├── Response: { \"registered\": true }\n   ├── ESP8266 displays \"Mengambil Foto..\" on LCD\n   ├── Sends \"CAPTURE|A1B2C3D4\" to ESP32-CAM via Serial\n   ├── ESP32-CAM:\n   │   - Turns on flash LED\n   │   - Flushes frame buffers (2 frames)\n   │   - Captures fresh frame\n   │   - Turns off flash LED\n   │   - POSTs to /api/v1/attendance/face\n   │     Headers: X-UID: A1B2C3D4, X-Purpose: attendance\n   │     Body: raw JPEG bytes\n   │\n   ├── GATEWAY receives face image\n   │   - Saves image to storage/uploads/{uuid}.jpg\n   │   - Creates attendance session record (status: CREATED)\n   │   - Finds matching session by pairingKey + time window\n   │   - Updates session status to READY\n   │   - Emits session:created via Socket.IO\n   │\n   ├── ESP8266 POSTs to /api/v1/attendance/rfid (25s timeout)\n   │   Body: { \"uid\": \"A1B2C3D4\", ... }\n   │\n   ├── GATEWAY processes RFID for verification\n   │   - Finds session by pairingKey\n   │   - Looks up employee by RFID UID\n   │   - Retrieves stored face descriptor\n   │   - Calls FaceRecognitionClient.verifyFace()\n   │     → POST to Python service /verify\n   │     → Payload: captured image + reference descriptor\n   │     → Python: detect face → embed → cosine distance\n   │     → Returns: { isMatch, distance, confidence }\n   │\n   ├── If MATCH (distance <= 0.45):\n   │   - Session status: COMPLETED\n   │   - Attendance record: VALID\n   │   - Punctuality calculated from system settings\n   │   - Category determined (ENTRY/EXIT by time)\n   │   - Emits attendance:new via Socket.IO\n   │   - Response 200 to ESP8266: \"Wajah Cocok! Verified\"\n   │   - LCD: \"Wajah Cocok!\" + long beep (500ms)\n   │\n   └── If NO MATCH (distance > 0.45):\n       - Session status: FAILED\n       - Attendance record: INVALID\n       - Emits attendance:new via Socket.IO\n       - Response 400 to ESP8266: \"Wajah Tdk Cocok\"\n       - LCD: \"Wajah Tdk Cocok\" + 3 error beeps\n\n6. After 3 seconds → ESP8266 returns to idle screen\n7. RFID card halted → ready for next scan\n```\n\n---\n\n## 12.5 Real-time Update to Frontend\n\n```\nHOOK: useRealtimeAttendance()\n│\n├── Socket.IO connects to backend\n├── Subscribes to:\n│   ├── attendance:new\n│   ├── attendance:update\n│   ├── rfid:new\n│   ├── registration:image\n│   └── device:status\n│\n├── On attendance:new:\n│   ├── attendanceStore.pushRealtimeEvent(event)\n│   ├── Creates toast notification (top-right, 5s auto-dismiss)\n│   ├── Updates history if on history page\n│   └── Updates dashboard summary\n│\n├── On device:status:\n│   ├── Updates device in attendanceStore.devices\n│   ├── If OFFLINE → shows warning toast\n│   └── Updates DeviceOverview component\n│\n└── On registration:image:\n    ├── Updates employees page with new image\n    └── Shows success notification\n```\n\n---\n\n## 12.6 Attendance Report View Flow\n\n```\n1. User clicks \"Log Presensi\" in sidebar\n2. Frontend navigates to /history\n3. HistoryPage renders HistoryFilters + HistoryTable\n4. HistoryFilters initializes:\n   - Employee dropdown from attendanceStore.employees\n   - Month picker set to current month\n   - Status filter: ALL\n5. attendanceStore.fetchHistory() called:\n   - GET /api/v1/attendance/history?page=1&pageSize=20&month=2024-01\n   - Gateway → gRPC → AttendanceRepository queries SQLite\n   - Returns paginated records with employee join\n6. HistoryTable renders rows with:\n   - Day name (Indonesian)\n   - Date\n   - Time\n   - Category badge (Masuk/Pulang)\n   - Punctuality badge (Tepat Waktu/Terlambat)\n   - Status badge (Sah/Tidak Sah)\n7. User can filter by employee, month, date, status\n   - Each filter change triggers new API call\n8. User clicks \"Export PDF\":\n   - GET /api/v1/export/pdf?month=1&year=2024\n   - Backend generates PDF using PDFMake\n   - Response: application/pdf binary\n   - Browser downloads the file\n```\n\n---\n\n## 12.7 Employee Management Flow\n\n```\n1. User clicks \"Karyawan\" in sidebar\n2. Frontend navigates to /employees\n3. EmployeesPage renders:\n   - Search bar\n   - Employee table (name, department, position, RFID, status)\n   - \"Tambah Karyawan\" button\n4. Adding new employee:\n   a. Click \"Tambah Karyawan\" → modal form opens\n   b. Fill: Name, Department, Position\n   c. Type or scan RFID UID\n   d. Capture face via webcam (getUserMedia)\n   e. Click \"Simpan\"\n   f. POST /api/v1/employees (multipart/form-data)\n   g. Backend:\n      - Saves image file\n      - Sends to Python service /encode\n      - Stores employee with face descriptor\n   h. Modal closes → table refreshes\n5. Editing employee:\n   a. Click edit icon → modal opens with existing data\n   b. Modify fields\n   c. Optionally recapture face\n   d. PUT /api/v1/employees/:id\n6. Deleting employee:\n   a. Click delete icon → confirmation dialog\n   b. DELETE /api/v1/employees/:id\n```\n\n---\n\n## 12.8 Settings Management Flow\n\n```\n1. User clicks \"Pengaturan\" in sidebar\n2. SettingsPage renders:\n   - Entry Time: start (07:00), end (09:00)\n   - Exit Time: start (16:00), end (18:00)\n   - Late Threshold: minutes\n   - Danger Zone: Reset All Data\n3. Changing setting:\n   a. User modifies value\n   b. POST /api/v1/settings\n   c. Gateway → SettingsService → SQLite\n   d. Response: { \"status\": \"saved\" }\n4. Resetting data:\n   a. User clicks \"Reset All Data\" → confirmation\n   b. DELETE /api/v1/settings/reset\n   c. Clears attendance_records, attendance_sessions\n   d. Resets settings to defaults\n```\n\n---\n\n## 12.9 Device Monitoring Flow\n\n```\n1. User clicks \"Monitor\" in sidebar\n2. MonitoringPage renders SessionMonitor\n3. SessionMonitor fetches active sessions\n   GET /api/v1/attendance/sessions?status=READY\n4. Each session card shows:\n   - Face image (if captured)\n   - RFID UID\n   - Status (CREATED → READY → PROCESSING → COMPLETED)\n   - Timer (time since creation)\n5. Updates in real-time via Socket.IO\n6. When session completes → card updates status\n   - If VALID: green border, check icon\n   - If INVALID: red border, X icon\n   - If EXPIRED: gray border, clock icon\n```\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 36.9s)

_Thinking:_

Good progress. Let me continue with the remaining files.

**Tool: write**

**Input:**
```json
{}
```

**Error:**
```
Tool execution aborted
```

---

## User

ulangi kembali mulai todo list dari create 01-project overview dan semuanya harus dalam bahasa indonesia

---

## Assistant (Build · DeepSeek V4 Flash Free · 10.5s)

_Thinking:_

The user wants me to restart and create all documentation in Indonesian language. Let me redo everything from the beginning, but this time all in Indonesian.

Let me first clean up what I've already written and start fresh with Indonesian documentation.

Actually, I should just overwrite the existing files with Indonesian versions. Let me start from scratch.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Explore project structure and understand codebase",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Create 01-Project-Overview.md (Bahasa Indonesia)",
      "status": "in_progress"
    },
    {
      "priority": "high",
      "content": "Create 02-System-Architecture.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 03-Backend.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 04-Frontend.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 05-Face-Recognition.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 06-ESP8266.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 07-ESP32CAM.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 08-Database.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 09-API.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 10-SocketIO.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 11-gRPC.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 12-Application-Flow.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Create 13-Feature-Flow.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create 14-Sequence-Diagram.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create 15-Deployment.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create 16-Troubleshooting.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create 17-Best-Practices.md (Bahasa Indonesia)",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Create README.md (Bahasa Indonesia)",
      "status": "pending"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Explore project structure and understand codebase",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Create 01-Project-Overview.md (Bahasa Indonesia)",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Create 02-System-Architecture.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 03-Backend.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 04-Frontend.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 05-Face-Recognition.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 06-ESP8266.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 07-ESP32CAM.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 08-Database.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 09-API.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 10-SocketIO.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 11-gRPC.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 12-Application-Flow.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 13-Feature-Flow.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create 14-Sequence-Diagram.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create 15-Deployment.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create 16-Troubleshooting.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create 17-Best-Practices.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create README.md (Bahasa Indonesia)",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 37.7s)

_Thinking:_

Let me start writing all files in Indonesian. I'll write them in batches.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\01-Project-Overview.md",
  "content": "# Gambaran Umum Proyek — Sistem Absensi RFID v3\n\n## 1.1 Pendahuluan\n\n**AttendTrack** adalah sistem manajemen absensi lengkap yang menggabungkan teknologi RFID (Radio Frequency Identification) dengan Kecerdasan Buatan Pengenalan Wajah (Face Recognition AI) untuk memberikan verifikasi absensi dua faktor. Sistem ini dirancang untuk institusi pendidikan, perkantoran, dan lingkungan manufaktur yang membutuhkan pencatatan absensi yang andal.\n\nSistem menggunakan **arsitektur three-tier microservices**:\n\n| Lapisan | Teknologi | Tujuan |\n|---------|-----------|--------|\n| API Gateway | Express.js (Node.js) port 3000 | REST API, Socket.IO, upload file, komunikasi perangkat |\n| gRPC Service | @grpc/grpc-js port 50051 | Logika bisnis internal, validasi, penyimpanan data |\n| Face Recognition | FastAPI (Python) port 8000 | Enkoding wajah & verifikasi menggunakan DeepFace + Facenet128 |\n\n## 1.2 Fitur Utama\n\n- **Absensi berbasis RFID**: Memindai kartu RFID melalui ESP8266 + pembaca MFRC522\n- **Verifikasi Pengenalan Wajah**: Autentikasi dua faktor dengan biometric wajah\n- **Monitoring Real-time**: Event absensi langsung melalui Socket.IO\n- **Manajemen Karyawan**: Operasi CRUD lengkap untuk data karyawan\n- **Manajemen Perangkat**: Penemuan otomatis via mDNS, monitoring heartbeat\n- **Laporan Absensi**: Ringkasan harian, pelacakan ketepatan waktu, ekspor PDF\n- **Korelasi Sesi**: Menghubungkan event RFID + Wajah menggunakan jendela waktu\n- **Pendaftaran Otomatis**: Kartu RFID baru memicu alur pengambilan wajah secara otomatis\n\n## 1.3 Komponen Hardware\n\n| Perangkat | Peran | Komponen Utama |\n|-----------|-------|----------------|\n| **ESP8266** | Pemindai RFID Master | Pembaca MFRC522 RFID, LCD 16x2 I2C, Buzzer, SoftwareSerial |\n| **ESP32-CAM** | Kamera Pengambil Wajah | Kamera OV2640, LED Flash, PSRAM (opsional) |\n| **Server Backend** | Server Aplikasi | Mesin apa pun yang menjalankan Node.js + Python |\n\n## 1.4 Tumpukan Software\n\n### Backend (Node.js)\n- **Runtime**: Node.js + TypeScript\n- **HTTP Framework**: Express 5\n- **RPC Framework**: @grpc/grpc-js\n- **Database**: SQL.js (SQLite dikompilasi ke WebAssembly)\n- **Real-time**: Socket.IO + Server-Sent Events (SSE)\n- **Autentikasi**: JWT + bcryptjs\n- **Validasi**: Zod\n- **Logging**: Pino\n- **Upload File**: Multer\n- **Generate PDF**: PDFMake\n- **Penemuan Perangkat**: Bonjour-service (mDNS)\n\n### Frontend (React)\n- **Framework**: React 18 + TypeScript\n- **Build Tool**: Vite 5\n- **Styling**: Tailwind CSS 3 (sistem desain kustom)\n- **State Management**: Zustand 5\n- **HTTP Client**: Axios\n- **Real-time**: Socket.IO Client + fetch-event-source (SSE)\n- **Routing**: React Router v6\n- **Animasi**: Framer Motion\n- **Ikon**: Lucide React\n- **Tanggal**: date-fns v4\n\n### Face Recognition (Python)\n- **Web Framework**: FastAPI\n- **Deteksi Wajah**: MediaPipe\n- **Embedding Wajah**: Facenet128 (via DeepFace)\n- **Pengolahan Citra**: OpenCV + Pillow\n- **ASGI Server**: Uvicorn\n\n### Firmware IoT (Arduino)\n- **ESP8266**: Framework Arduino dengan library untuk MFRC522, LCD, WiFi, mDNS, HTTP, JSON, LittleFS\n- **ESP32-CAM**: Core ESP32 Arduino dengan driver kamera ESP32, WiFi, HTTP, LittleFS, mDNS\n\n## 1.5 Arsitektur Komunikasi\n\n```\n[Aplikasi Web Frontend]        [ESP8266 RFID] ──Serial──► [ESP32-CAM]\n       │                            │\n       │ HTTP/WS                     │ HTTP/mDNS\n       ▼                            ▼\n[Express Gateway :3000] ◄───────────────────────┐\n       │                                        │\n       ├──► [gRPC Service :50051]              │\n       │         │                              │\n       │         ├──► [SQLite DB]               │\n       │         │                              │\n       └──► [Python Face Service :8000]         │\n                                                │\n       ◄────────────────────────────────────────┘\n                  mDNS _attendtrack._tcp\n```\n\n## 1.6 Alur Data Ringkas\n\n1. **ESP8266** mendeteksi kartu RFID → mengirim UID ke Gateway (`POST /api/v1/attendance/check-rfid`)\n2. Gateway memeriksa apakah RFID terdaftar melalui gRPC → mengembalikan terdaftar/tidak\n3. Jika tidak terdaftar dengan mode registrasi → ESP8266 memicu **ESP32-CAM** via Serial untuk pengambilan gambar\n4. Jika terdaftar → ESP8266 memicu ESP32-CAM untuk pengambilan wajah absensi\n5. **ESP32-CAM** mengambil gambar → mengirim ke Gateway (`POST /api/v1/attendance/face`)\n6. Gateway menghubungkan event RFID + Wajah melalui `pairingKey` atau jendela waktu\n7. **Attendance Service** memanggil **Face Recognition Service** (`POST /verify`) untuk membandingkan wajah\n8. Hasil disimpan di SQLite → event real-time dikirim melalui **Socket.IO** ke **Frontend**\n\n## 1.7 Direktori Utama\n\n```\nI:\\rfid_v3\\\n├── src/                       # Sumber TypeScript Backend\n│   ├── config/                # Konfigurasi environment\n│   ├── gateway/               # Gateway Express HTTP + Socket.IO\n│   ├── grpc/                  # Server gRPC + handler\n│   ├── modules/               # Modul fitur (Clean Architecture)\n│   │   ├── auth/              # Modul autentikasi\n│   │   ├── employee/          # Modul manajemen karyawan\n│   │   ├── device/            # Modul manajemen perangkat\n│   │   ├── attendance/        # Modul absensi inti\n│   │   └── settings/          # Modul pengaturan sistem\n│   ├── proto/                 # Definisi Protobuf\n│   ├── shared/                # Infrastruktur bersama\n│   │   ├── clients/           # Klien layanan eksternal\n│   │   ├── database/          # Lapisan database SQLite\n│   │   ├── errors/            # Kelas error kustom\n│   │   ├── grpc/              # Utilitas gRPC\n│   │   ├── logger/            # Logger Pino\n│   │   ├── middleware/        # Middleware Express\n│   │   ├── realtime/          # Event emitter untuk real-time\n│   │   └── utils/             # Fungsi utilitas\n│   └── scripts/               # Script CLI seed/reset\n├── frontend/                  # Frontend React + Vite\n│   └── src/\n│       ├── components/        # Komponen UI\n│       ├── hooks/             # React hooks\n│       ├── pages/             # Komponen halaman\n│       ├── services/          # Lapisan service API\n│       ├── state/             # State management Zustand\n│       ├── types/             # Interface TypeScript\n│       └── utils/             # Fungsi utilitas\n├── python-face-service/       # Face recognition FastAPI\n│   └── main.py                # Endpoint enkoding + verifikasi wajah\n├── firmware/                  # Firmware Arduino ESP8266 + ESP32-CAM\n│   ├── esp8266_rfid_firmware.ino\n│   └── esp32cam_face_firmware.ino\n├── storage/                   # Database SQLite + gambar terupload\n└── docs/                      # Dokumentasi\n```\n\n## 1.8 Variabel Environment\n\n| Variable | Default | Deskripsi |\n|----------|---------|-----------|\n| `PORT` | `3000` | Port Gateway HTTP |\n| `GRPC_PORT` | `50051` | Port server gRPC |\n| `JWT_SECRET` | `super-secret-jwt` | Rahasia penandatanganan JWT |\n| `JWT_EXPIRES_IN` | `1h` | Durasi kedaluwarsa token JWT |\n| `SQLITE_PATH` | `storage/rfid_v3.sqlite` | Path file database SQLite |\n| `FACE_SERVICE_URL` | `http://localhost:8000` | URL layanan face recognition |\n| `FACE_MATCH_THRESHOLD` | `0.45` | Ambang jarak cosine untuk pencocokan wajah |\n| `ATTENDANCE_MATCH_WINDOW_SECONDS` | `20` | Jendela waktu untuk korelasi RFID + Wajah |\n| `UPLOAD_DIR` | `storage/uploads` | Direktori penyimpanan gambar wajah |\n| `LOG_LEVEL` | `info` | Level log Pino |\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\02-System-Architecture.md",
  "content": "# Arsitektur Sistem\n\n## 2.1 Arsitektur Level Tinggi\n\nSistem absensi menggunakan **arsitektur microservices** dengan tiga layanan utama dan dua komponen firmware IoT.\n\n```\n┌─────────────────────────────────────────────────────────────┐\n│                   LAPISAN KLIEN                              │\n│  ┌──────────────────────┐  ┌──────────────────────────┐     │\n│  │   Web Frontend       │  │   Hardware IoT            │     │\n│  │   (React + Vite)     │  │   ESP8266 + ESP32-CAM     │     │\n│  │   Port 5173           │  │   (Jaringan Lokal)        │     │\n│  └────────┬─────────────┘  └────────┬─────────────────┘     │\n│           │ HTTP/WebSocket          │ HTTP (mDNS)            │\n├───────────┼─────────────────────────┼────────────────────────┤\n│           │                         │                        │\n│           ▼                         ▼                        │\n│  ┌─────────────────────────────────────────────────────┐    │\n│  │           LAPISAN API GATEWAY                        │    │\n│  │           Express.js (Port 3000)                     │    │\n│  │  ┌─────────┐  ┌──────────┐  ┌──────────────────┐   │    │\n│  │  │ REST    │  │ Socket.IO│  │ Static/Uploads   │   │    │\n│  │  │ Routes  │  │ Events   │  │ (Multer)         │   │    │\n│  │  └────┬────┘  └──────────┘  └──────────────────┘   │    │\n│  └───────┼─────────────────────────────────────────────┘    │\n│          │                                                  │\n├──────────┼──────────────────────────────────────────────────┤\n│          ▼                                                  │\n│  ┌─────────────────────────────────────────────────────┐    │\n│  │           LAPISAN SERVICE (gRPC - Port 50051)        │    │\n│  │  ┌──────┐  ┌──────────┐  ┌─────────┐  ┌─────────┐  │    │\n│  │  │Auth  │  │Employee  │  │Device   │  │Attend-  │  │    │\n│  │  │Service│  │Service   │  │Service  │  │ance     │  │    │\n│  │  │       │  │          │  │         │  │Service  │  │    │\n│  │  └───────┘  └──────────┘  └─────────┘  └────┬────┘  │    │\n│  └──────────────────────────────────────────────┼───────┘    │\n│                                                  │           │\n│          ┌───────────────────────────────────────┼──────────┐│\n│          │          LAPISAN DATA                 │          ││\n│          │  ┌──────────────────┐  ┌──────────────▼────────┐ ││\n│          │  │  SQLite (SQL.js) │  │  Face Recognition     │ ││\n│          │  │  storage/        │  │  Python FastAPI       │ ││\n│          │  │  rfid_v3.sqlite  │  │  Port 8000            │ ││\n│          │  └──────────────────┘  └───────────────────────┘ ││\n│          └──────────────────────────────────────────────────┘│\n└─────────────────────────────────────────────────────────────┘\n```\n\n## 2.2 Penjelasan Lapisan\n\n### 2.2.1 Gateway Layer (`src/gateway/`)\n\nGateway adalah satu-satunya titik masuk untuk semua permintaan eksternal. Menangani:\n\n- **HTTP REST API** — Semua operasi CRUD untuk karyawan, absensi, perangkat, auth, pengaturan\n- **Socket.IO** — Streaming event real-time ke frontend web\n- **Upload File** — Gambar wajah melalui multipart/form-data (Multer)\n- **File Statis** — Melayani gambar terupload melalui path `/uploads/`\n- **CORS** — Permintaan lintas asal dari frontend (port 5173)\n- **Autentikasi** — Middleware verifikasi token JWT\n- **mDNS** — Publikasi layanan Bonjour untuk penemuan perangkat otomatis\n\nGateway TIDAK mengandung logika bisnis. Semua operasi didelegasikan ke layanan gRPC.\n\n### 2.2.2 Service Layer (gRPC - `src/grpc/`)\n\nLayanan gRPC menyediakan:\n\n- **AuthService** — Login, pembuatan pengguna, generate JWT\n- **EmployeeService** — CRUD karyawan, manajemen deskriptor wajah\n- **DeviceService** — Pendaftaran perangkat, heartbeat, daftar perangkat\n- **AttendanceService** — Penanganan RFID, penanganan wajah, manajemen sesi, riwayat, sinkronisasi, verifikasi, penjadwalan ulang\n- **SettingsService** — Baca/tulis pengaturan sistem\n\nSetiap service mengikuti Clean Architecture:\n```\nHandler (gRPC) → Controller → Service → Repository → SQLite\n```\n\n### 2.2.3 Lapisan Data\n\n**SQLite (SQL.js)**\n- File database tunggal: `storage/rfid_v3.sqlite`\n- In-memory dengan mode WAL untuk performa\n- Otomatis dipersist ke disk setelah setiap operasi tulis\n- Tabel: `users`, `employees`, `devices`, `attendance_sessions`, `attendance_records`, `system_settings`\n\n**Face Recognition Service**\n- Microservice Python FastAPI\n- Berkomunikasi via HTTP (axios dari Node.js)\n- Endpoint: `POST /encode`, `POST /verify`, `GET /health`\n\n### 2.2.4 Frontend Layer\n\nSingle Page Application React dengan:\n- **Halaman**: Login, Dashboard, Monitoring, History, Employees, Simulator, Settings\n- **State**: Zustand stores (auth, attendance)\n- **Real-time**: Socket.IO client + SSE fallback\n- **Routing**: React Router v6 dengan protected routes\n\n### 2.2.5 IoT Firmware Layer\n\n**ESP8266 (Master)**\n- Terhubung ke WiFi (dukungan dual network)\n- Menemukan server via mDNS (`_attendtrack._tcp`)\n- Membaca kartu RFID via MFRC522 (SPI)\n- Menampilkan status di LCD 16x2 I2C\n- Memicu ESP32-CAM via SoftwareSerial\n- Portal konfigurasi (mode AP) untuk pengaturan awal\n\n**ESP32-CAM (Slave)**\n- Menerima perintah dari ESP8266 via Hardware Serial2\n- Mengambil gambar wajah dengan kamera OV2640\n- Mengirim gambar ke backend via HTTP POST\n- Mengirim heartbeat setiap 30 detik\n- LED Flash untuk penerangan\n\n## 2.3 Protokol Komunikasi\n\n| Protokol | Digunakan Antara | Port |\n|----------|-----------------|------|\n| HTTP/1.1 | Frontend → Gateway | 3000 |\n| HTTP/1.1 | ESP8266 → Gateway | 3000 |\n| HTTP/1.1 | ESP32-CAM → Gateway | 3000 |\n| HTTP/1.1 | Gateway → Face Service | 8000 |\n| HTTP/2 (gRPC) | Gateway → Service Layer | 50051 |\n| WebSocket | Frontend ↔ Gateway | 3000 (Socket.IO) |\n| Serial (UART) | ESP8266 → ESP32-CAM | 9600 baud |\n| mDNS (Bonjour) | Perangkat → Gateway | 5353 |\n\n## 2.4 Pemetaan Port\n\n| Service | Port Internal | Akses Eksternal | Protokol |\n|---------|--------------|-----------------|----------|\n| Express Gateway | 3000 | Ya (LAN) | HTTP + WS |\n| gRPC Server | 50051 | Tidak (internal) | gRPC |\n| Face Recognition | 8000 | Tidak (internal) | HTTP |\n| Frontend (Dev) | 5173 | Ya (LAN) | HTTP |\n| mDNS | 5353 | Ya (LAN) | UDP |\n\n## 2.5 Pemetaan Clean Architecture\n\nBackend mengikuti prinsip Clean Architecture:\n\n```\n┌─────────────────────────────────────────────────────────┐\n│                    CONTROLLER                            │\n│   HTTP: src/gateway/app.ts (Express routes)              │\n│   gRPC: src/grpc/handlers/*.handler.ts                   │\n│   Peran: Parse request, validasi input, panggil service  │\n│   Dependency: → Service layer                            │\n├─────────────────────────────────────────────────────────┤\n│                    SERVICE                               │\n│   src/modules/*/service/*.service.ts                     │\n│   Peran: Logika bisnis, orkestrasi, validasi             │\n│   Dependency: → Repository, → External clients           │\n├─────────────────────────────────────────────────────────┤\n│                    REPOSITORY                            │\n│   src/modules/*/repository/*.repository.ts               │\n│   Peran: Akses data, pembuatan query                     │\n│   Dependency: → Database SQLite                          │\n├─────────────────────────────────────────────────────────┤\n│                    ENTITY                                │\n│   src/modules/*/entity/*.model.ts                        │\n│   Peran: Model domain, definisi tipe                     │\n│   Dependency: Tidak ada                                  │\n├─────────────────────────────────────────────────────────┤\n│                    DTO                                   │\n│   src/modules/*/dto/*.dto.ts                             │\n│   Peran: Kontrak request/response, validasi (Zod)        │\n│   Dependency: Tidak ada                                  │\n└─────────────────────────────────────────────────────────┘\n```\n\n## 2.6 Arsitektur Korelasi Sesi\n\nBagian paling kritis dari sistem adalah menghubungkan pemindaian RFID dengan pengambilan wajah. Ini ditangani oleh:\n\n### Metode Korelasi\n\n1. **Pairing Key (Direkomendasikan)**\n   - ESP8266 mengirim `pairingKey` (misal: `\"ROOM-1\"`)\n   - ESP32-CAM mengirim `pairingKey` yang sama di header\n   - Sistem mencocokkan event dalam `ATTENDANCE_MATCH_WINDOW_SECONDS` (default: 20s)\n\n2. **Jendela Waktu (Fallback)**\n   - Jika tidak ada pairing key, sistem membuat bucket berdasarkan kode perangkat\n   - Event dalam jendela waktu yang sama dikorelasikan\n   - Kurang andal dibanding pairing key\n\n### State Machine Sesi\n\n```\nCREATED → READY → PROCESSING → COMPLETED (VALID/INVALID)\n  │         │\n  └──EXPIRED (jika timeout)\n```\n\n- **CREATED**: RFID dipindai, menunggu gambar wajah\n- **READY**: RFID dan wajah diterima, antri untuk verifikasi\n- **PROCESSING**: Verifikasi sedang berlangsung\n- **COMPLETED**: Verifikasi selesai (VALID atau INVALID)\n- **EXPIRED**: Sesi timeout\n\n### Mekanisme Retry\n\n`AttendanceRetrySchedulerService` berjalan saat startup untuk:\n1. Menemukan semua sesi `READY` yang belum selesai diverifikasi\n2. Mengulangi verifikasi wajah untuk masing-masing\n3. Menangani error sementara (misal: Python service tidak tersedia sementara)\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 59.2s)

_Thinking:_

Good, writing the next batch. Let me write the Backend, Frontend, and Face Recognition docs in Indonesian.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\03-Backend.md",
  "content": "# Dokumentasi Backend\n\n## 3.1 Gambaran Umum\n\nBackend adalah aplikasi TypeScript Node.js yang terstruktur dengan prinsip **Clean Architecture**. Terdiri dari dua komponen runtime:\n\n1. **Express Gateway** (port 3000) — REST API + Socket.IO\n2. **gRPC Server** (port 50051) — Logika bisnis\n\nKeduanya berjalan dalam proses Node.js yang sama (dijalankan bersama via `npm run dev`).\n\n## 3.2 Struktur Proyek\n\n```\nsrc/\n├── config/\n│   └── env.ts                    # Validasi environment variable dengan Zod\n├── gateway/\n│   ├── server.ts                 # Bootstrap HTTP server + mDNS + Socket.IO\n│   ├── app.ts                    # Setup Express routes & middleware\n│   └── realtime.ts               # Handler event Socket.IO & jembatan gRPC→Socket\n├── grpc/\n│   ├── server.ts                 # Bootstrap server gRPC\n│   └── handlers/                 # Handler request gRPC\n│       ├── auth.handler.ts\n│       ├── employee.handler.ts\n│       ├── device.handler.ts\n│       ├── attendance.handler.ts\n│       └── settings.handler.ts\n├── modules/                      # Modul fitur (Clean Architecture)\n│   ├── auth/\n│   │   ├── controller/           # Handler route HTTP\n│   │   ├── dto/                  # Schema validasi request/response\n│   │   ├── entity/               # Model domain\n│   │   ├── repository/           # Lapisan akses data\n│   │   └── service/              # Logika bisnis\n│   ├── employee/                 # Struktur sama\n│   ├── device/                   # Struktur sama\n│   ├── attendance/               # Struktur sama (modul terbesar)\n│   └── settings/                 # Struktur sama\n├── proto/\n│   └── platform.proto            # Definisi service protobuf (266 baris)\n├── shared/\n│   ├── container.ts              # Dependency Injection container\n│   ├── clients/\n│   │   └── face-recognition.client.ts   # HTTP client untuk service Python\n│   ├── database/\n│   │   └── sqlite.ts             # Wrapper SQL.js, migrasi, koneksi\n│   ├── errors/\n│   │   └── app-error.ts          # Kelas error kustom AppError\n│   ├── grpc/\n│   │   ├── proto.ts              # Utility pemuat Protobuf\n│   │   ├── grpc-client.ts        # Factory client gRPC dengan promisify\n│   │   └── grpc-error.ts         # Pemetaan error gRPC\n│   ├── logger/\n│   │   └── index.ts              # Konfigurasi logger Pino\n│   ├── middleware/\n│   │   ├── async-handler.ts      # Wrapper async error Express\n│   │   ├── authenticate.ts       # Middleware verifikasi JWT\n│   │   ├── authorize.ts          # Kontrol akses berbasis peran\n│   │   └── error-handler.ts      # Global error handler\n│   ├── realtime/\n│   │   └── realtime-events.ts    # EventEmitter Node.js untuk jembatan SSE/Socket\n│   └── utils/\n│       ├── correlation.ts        # Generate correlation ID\n│       ├── file-storage.ts       # Multer + penyimpanan file base64\n│       └── pdf-generator.ts      # Generate laporan PDF dengan PDFMake\n└── scripts/\n    ├── seed-admin.ts              # Membuat akun admin awal\n    ├── reset-admin.ts             # Reset password admin\n    └── seed-dummy-attendance.ts   # Generate data absensi uji coba\n```\n\n## 3.3 Dokumentasi File per File\n\n### `src/config/env.ts`\n\n**Tujuan:** Memuat dan memvalidasi semua environment variable menggunakan schema validasi Zod.\n\n**Lokasi:** `src/config/env.ts`\n\n**Import:**\n- `zod` dari `zod` — Library validasi schema\n- `dotenv` dari `dotenv` — Memuat file `.env`\n- `path` dari `path` — Resolusi path\n\n**Ekspor:**\n- `env` — Objek environment yang sudah diparse dan divalidasi dengan type inference TypeScript\n\n**Fungsionalitas:**\n1. Memanggil `dotenv.config()` untuk memuat file `.env`\n2. Mendefinisikan schema Zod dengan semua env var yang diharapkan:\n   - `PORT` — coerced number, default 3000\n   - `GRPC_PORT` — coerced number, default 50051\n   - `JWT_SECRET` — string, required\n   - `JWT_EXPIRES_IN` — string, default \"1h\"\n   - `SQLITE_PATH` — string, default \"storage/rfid_v3.sqlite\"\n   - `FACE_SERVICE_URL` — string, default \"http://localhost:8000\"\n   - `FACE_MATCH_THRESHOLD` — number, default 0.45\n   - `ATTENDANCE_MATCH_WINDOW_SECONDS` — number, default 20\n   - `UPLOAD_DIR` — string, default \"storage/uploads\"\n   - `LOG_LEVEL` — string, default \"info\"\n3. Memparse `process.env` terhadap schema\n4. Keluar dari proses dengan error jika validasi gagal\n\n**Dipanggil oleh:** Semua modul yang membutuhkan nilai konfigurasi.\n\n---\n\n### `src/gateway/server.ts`\n\n**Tujuan:** Entry point untuk server HTTP Gateway. Mengatur Express, Socket.IO, mDNS, dan mulai mendengarkan.\n\n**Lokasi:** `src/gateway/server.ts`\n\n**Import:**\n- `http` dari `http` — Pembuatan server HTTP\n- `{ Server }` dari `socket.io` — Server Socket.IO\n- `{ env }` dari `../config/env` — Konfigurasi\n- `{ app }` dari `./app` — Aplikasi Express\n- `{ setupRealtime }` dari `./realtime` — Handler event Socket.IO\n- `{ registerService }` dari `bonjour-service` — Registrasi mDNS\n- `{ logger }` dari `../shared/logger` — Logging\n\n**Fungsionalitas:**\n1. Membuat server HTTP dari Express app: `http.createServer(app)`\n2. Membuat server Socket.IO yang terikat ke server HTTP\n3. Memanggil `setupRealtime(io)` untuk menginisialisasi handler Socket.IO\n4. Mulai mendengarkan di `env.PORT`\n5. Mendaftarkan layanan mDNS (Bonjour) `_attendtrack._tcp` pada port `env.PORT` untuk penemuan perangkat\n6. Mencetak pesan startup\n\n**Dipanggil oleh:** Script npm (`npm run dev`, `npm run start:gateway`)\n\n---\n\n### `src/gateway/app.ts`\n\n**Tujuan:** Konfigurasi aplikasi Express — middleware, routes, file statis, CORS.\n\n**Lokasi:** `src/gateway/app.ts`\n\n**Import:**\n- `express` dari `express` — Framework Express\n- `cors` dari `cors` — Middleware CORS\n- `helmet` dari `helmet` — Security headers\n- `path` dari `path` — Resolusi path\n- Controller modul untuk semua fitur\n- Middleware error handler\n\n**Ekspor:**\n- `app` — Aplikasi Express yang sudah dikonfigurasi\n\n**Pemetaan Route:**\n\n| Method | Path | Handler | Auth |\n|--------|------|---------|------|\n| POST | `/api/v1/auth/login` | `authController.login` | Tidak |\n| POST | `/api/v1/auth/register` | `authController.register` | Tidak |\n| GET | `/api/v1/auth/me` | `authController.me` | JWT |\n| GET/POST/PUT/DELETE | `/api/v1/employees` | `employeeController.*` | JWT |\n| GET/POST/PUT/DELETE | `/api/v1/students` | Alias ke `/api/v1/employees` | JWT |\n| GET | `/api/v1/attendance/history` | `attendanceController.getHistory` | JWT |\n| GET | `/api/v1/attendance/sessions` | `attendanceController.getSessions` | JWT |\n| GET | `/api/v1/attendance/stream` | `attendanceStreamController.stream` | JWT |\n| POST | `/api/v1/attendance/rfid` | `attendanceController.handleRfid` | Tidak |\n| POST | `/api/v1/attendance/face` | `attendanceController.handleFace` | Tidak |\n| POST | `/api/v1/attendance/check-rfid` | `attendanceController.checkRfid` | Tidak |\n| POST | `/api/v1/devices/register` | `deviceController.register` | Tidak |\n| POST | `/api/v1/devices/heartbeat` | `deviceController.heartbeat` | Tidak |\n| GET | `/api/v1/devices` | `deviceController.list` | JWT |\n| GET/POST/DELETE | `/api/v1/settings` | `settingsController.*` | JWT |\n| GET | `/api/v1/export/pdf` | `attendanceController.exportPdf` | JWT |\n| GET | `/uploads/*` | File statis | Tidak |\n\n**Fungsionalitas:**\n1. Membuat Express app\n2. Menerapkan middleware: `cors()`, `helmet()`, `express.json({ limit: '50mb' })`, `express.urlencoded({ extended: true })`\n3. Melayani file statis dari `storage/uploads/` di path `/uploads/`\n4. Mendaftarkan semua route API dengan controller yang sesuai\n5. Menerapkan global error handler middleware\n\n**Dipanggil oleh:** `server.ts`\n\n---\n\n### `src/gateway/realtime.ts`\n\n**Tujuan:** Penanganan event Socket.IO dan jembatan antara event gRPC dan klien WebSocket.\n\n**Lokasi:** `src/gateway/realtime.ts`\n\n**Import:**\n- `{ Server, Socket }` dari `socket.io`\n- `{ grpcClient }` dari `../shared/grpc/grpc-client`\n- `{ realtimeEvents }` dari `../shared/realtime/realtime-events`\n- Berbagai modul service\n\n**Ekspor:**\n- `setupRealtime(io: Server)` — Inisialisasi Socket.IO\n- `getIO()` — Mendapatkan instance server Socket.IO\n\n**Fungsionalitas:**\n1. Mengatur handler koneksi Socket.IO — autentikasi via token JWT di handshake `auth`\n2. Menangani event klien:\n   - `subscribe:attendance` — Bergabung ke room attendance\n   - `subscribe:device` — Bergabung ke room monitoring perangkat\n3. Menjembatani event EventEmitter internal ke Socket.IO:\n   - `attendance:new` — dikirim saat record absensi baru dibuat\n   - `attendance:update` — dikirim saat status sesi berubah\n   - `rfid:new` — dikirim saat RFID dipindai\n   - `registration:image` — dikirim saat registrasi wajah\n   - `device:status` — dikirim saat perangkat online/offline\n   - `session:created` — dikirim saat sesi absensi dibuat\n\n**Dipanggil oleh:** `server.ts`\n\n---\n\n### `src/grpc/server.ts`\n\n**Tujuan:** Server gRPC yang menjadi host semua service logika bisnis.\n\n**Lokasi:** `src/grpc/server.ts`\n\n**Import:**\n- Library gRPC\n- Semua modul handler\n- Utility pemuatan proto\n\n**Fungsionalitas:**\n1. Memuat definisi protobuf dari `src/proto/platform.proto`\n2. Membuat server gRPC\n3. Mendaftarkan semua service dengan implementasi handler:\n   - `AuthService`\n   - `EmployeeService`\n   - `DeviceService`\n   - `AttendanceService`\n   - `SettingsService`\n4. Memulai server di `env.GRPC_PORT`\n5. Mencetak startup\n\n**Dipanggil oleh:** Script npm via `src/grpc/server.ts` sebagai entry point\n\n---\n\n### `src/proto/platform.proto`\n\n**Tujuan:** Definisi service Protobuf untuk semua layanan gRPC.\n\n**Lokasi:** `src/proto/platform.proto`\n\n**Service yang Didefinisikan:**\n\n```protobuf\nservice AuthService {\n  rpc Login(LoginRequest) returns (LoginResponse);\n  rpc Register(RegisterRequest) returns (RegisterResponse);\n  rpc ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse);\n}\n\nservice EmployeeService {\n  rpc Create(CreateEmployeeRequest) returns (EmployeeResponse);\n  rpc Update(UpdateEmployeeRequest) returns (EmployeeResponse);\n  rpc FindById(FindByIdRequest) returns (EmployeeResponse);\n  rpc FindAll(FindAllRequest) returns (EmployeeListResponse);\n  rpc Delete(DeleteRequest) returns (DeleteResponse);\n  rpc FindByRfid(FindByRfidRequest) returns (EmployeeResponse);\n}\n\nservice DeviceService {\n  rpc Register(RegisterDeviceRequest) returns (DeviceResponse);\n  rpc Heartbeat(HeartbeatRequest) returns (HeartbeatResponse);\n  rpc FindAll(FindAllDevicesRequest) returns (DeviceListResponse);\n  rpc Update(UpdateDeviceRequest) returns (DeviceResponse);\n}\n\nservice AttendanceService {\n  rpc CheckRfid(CheckRfidRequest) returns (CheckRfidResponse);\n  rpc HandleRfid(HandleRfidRequest) returns (HandleRfidResponse);\n  rpc HandleFace(HandleFaceRequest) returns (HandleFaceResponse);\n  rpc GetHistory(GetHistoryRequest) returns (AttendanceHistoryResponse);\n  rpc GetSessions(GetSessionsRequest) returns (SessionListResponse);\n  rpc GetSummary(GetSummaryRequest) returns (SummaryResponse);\n  rpc ProcessVerification(ProcessVerificationRequest) returns (ProcessVerificationResponse);\n  rpc StreamAttendances(StreamAttendancesRequest) returns (stream AttendanceEvent);\n}\n\nservice SettingsService {\n  rpc Get(GetSettingsRequest) returns (GetSettingsResponse);\n  rpc Upsert(UpsertSettingRequest) returns (UpsertSettingResponse);\n  rpc Reset(ResetSettingsRequest) returns (ResetSettingsResponse);\n}\n```\n\n---\n\n## 3.4 Struktur Modul (Clean Architecture)\n\nSetiap modul mengikuti pola yang sama:\n\n```\nmodules/{fitur}/\n├── controller/     # Parse request HTTP, panggil service, format response\n├── dto/            # Schema Zod untuk validasi request + tipe TypeScript\n├── entity/         # Interface model domain\n├── repository/     # Query SQL (SELECT/INSERT/UPDATE/DELETE)\n└── service/        # Logika bisnis, panggil repository, service eksternal\n```\n\n### Modul Auth\n\n**File:**\n- `auth.controller.ts` — Menangani `POST /login`, `POST /register`, `GET /me`\n- `auth.dto.ts` — `LoginDto` (email, password), `RegisterDto` (name, email, password, role)\n- `user.model.ts` — Interface `User` (id, name, email, password_hash, role, timestamps)\n- `user.repository.ts` — `findByEmail()`, `findById()`, `create()`\n- `auth.service.ts` — `login()` (validasi kredensial, generate JWT), `register()` (hash password, create user), `validateToken()`\n\n### Modul Employee\n\n**File:**\n- `employee.controller.ts` — Endpoint CRUD untuk karyawan\n- `employee.dto.ts` — `CreateEmployeeDto`, `UpdateEmployeeDto` dengan validasi Zod\n- `employee.model.ts` — Interface `Employee` (id, full_name, department, position, rfid_uid, face_descriptor, face_image_path, is_active)\n- `employee.repository.ts` — `create()`, `update()`, `findById()`, `findAll()`, `delete()`, `findByRfid()`\n- `employee.service.ts` — Logika CRUD, enkoding deskriptor wajah saat registrasi\n\n### Modul Device\n\n**File:**\n- `device.controller.ts` — Register, heartbeat, list, update\n- `device.dto.ts` — DTO registrasi dan heartbeat\n- `device.model.ts` — Interface `Device` (id, device_code, type, name, location, status, metadata, last_seen_at)\n- `device.repository.ts` — `create()`, `update()`, `findByCode()`, `findAll()`, `upsert()`\n- `device.service.ts` — Logika perangkat, pemrosesan heartbeat, manajemen status\n\n### Modul Attendance\n\n**File:**\n- `attendance.controller.ts` — Check RFID, handle RFID, handle face, history, sessions, summary, export PDF\n- `attendance-stream.controller.ts` — Endpoint SSE stream\n- `attendance.dto.ts` — Semua DTO untuk operasi absensi\n- `attendance-session.model.ts` — Interface `AttendanceSession`\n- `attendance-record.model.ts` — Interface `AttendanceRecord`\n- `attendance.repository.ts` — Query kompleks untuk session, records, history\n- `attendance.service.ts` — Orkestrasi absensi inti\n- `attendance-sync.service.ts` — Sinkronisasi event RFID-Face\n- `attendance-verification.service.ts` — Logika verifikasi wajah\n- `attendance-retry-scheduler.service.ts` — Mengulang verifikasi yang gagal\n\n### Modul Settings\n\n**File:**\n- `settings.controller.ts` — GET, POST, DELETE settings\n- `settings.dto.ts` — DTO settings\n- `settings.repository.ts` — `get()`, `upsert()`, `reset()`\n- `settings.service.ts` — Logika bisnis settings\n\n---\n\n## 3.5 Infrastruktur Bersama\n\n### `src/shared/database/sqlite.ts`\n\n**Tujuan:** Wrapper database SQL.js yang menyediakan manajemen koneksi, inisialisasi schema, dan eksekusi query.\n\n**Fungsionalitas:**\n1. Membuka database SQLite dari path file\n2. Mengaktifkan mode WAL untuk performa baca konkuren\n3. Menjalankan pembuatan schema (CREATE TABLE IF NOT EXISTS untuk 6 tabel)\n4. Menyisipkan pengaturan sistem default\n5. Mengekspor objek `sqlite` dengan method: `run()`, `get()`, `all()`, `exec()`\n6. Otomatis mempersist database ke file setelah setiap operasi tulis\n\n### `src/shared/clients/face-recognition.client.ts`\n\n**Tujuan:** HTTP client untuk berkomunikasi dengan service Face Recognition Python.\n\n**Fungsionalitas:**\n- `encodeFace(input)` → Mengirim gambar base64 ke `/encode`, mengembalikan array deskriptor 128-d\n- `verifyFace(input)` → Mengirim gambar base64 + reference descriptor ke `/verify`, mengembalikan `{ isMatch, distance, confidence }`\n- Enkoding otomatis file gambar ke base64 jika path diberikan\n- Timeout 15 detik\n\n**Dipanggil oleh:** `EmployeeService` (untuk enkoding saat registrasi), `AttendanceVerificationService` (untuk verifikasi saat absensi)\n\n### `src/shared/utils/file-storage.ts`\n\n**Tujuan:** Utilitas penyimpanan file untuk menyimpan gambar wajah yang diupload.\n\n**Fungsionalitas:**\n- `saveBase64Image(base64, filename?)` → Decode base64, simpan ke `UPLOAD_DIR`, kembalikan path relatif\n- `readFileAsBase64(path)` → Baca file, kembalikan string base64\n- Menggunakan UUID v4 untuk nama file unik\n\n### `src/shared/utils/pdf-generator.ts`\n\n**Tujuan:** Menghasilkan laporan PDF absensi menggunakan PDFMake.\n\n**Fungsionalitas:**\n- `generateAttendanceReport(records, filters)` → Membuat PDF terstruktur dengan:\n  - Judul dan header rentang tanggal\n  - Tabel dengan kolom: No, Nama, Departemen, Tanggal, Waktu, Kategori, Ketepatan, Status\n  - Label bahasa Indonesia\n  - Font Roboto\n\n### `src/shared/utils/correlation.ts`\n\n**Tujuan:** Pembuatan Correlation ID untuk memasangkan event RFID dan wajah.\n\n**Fungsionalitas:**\n- `generateCorrelationId(uid, pairingKey)` → Membuat correlation ID deterministik dari UID + pairingKey\n- Digunakan untuk mencocokkan pemindaian RFID dengan pengambilan wajah tanpa pertukaran ID eksplisit\n\n### `src/shared/realtime/realtime-events.ts`\n\n**Tujuan:** EventEmitter Node.js untuk propagasi event real-time internal.\n\n**Event yang Dikirim:**\n- `attendance:new` — Record absensi baru dibuat\n- `attendance:update` — Status sesi diperbarui\n- `rfid:new` — Kartu RFID dipindai\n- `registration:image` — Gambar registrasi wajah diterima\n- `device:status` — Perangkat terhubung/terputus\n- `session:created` — Sesi baru dimulai\n\n### Middleware\n\n**`authenticate.ts`:** Verifikasi token JWT. Mengekstrak Bearer token dari header `Authorization`, memvalidasi via gRPC, melampirkan user ke `req.user`.\n\n**`authorize.ts`:** Kontrol akses berbasis peran. `authorize(...roles)` mengembalikan middleware yang memeriksa `req.user.role`.\n\n**`error-handler.ts`:** Global error handler. Menangkap error, memeriksa apakah `AppError`, mencatat detail, mengembalikan response JSON terstruktur.\n\n**`async-handler.ts`:** Membungkus handler route async untuk menangkap rejection promise.\n\n---\n\n## 3.6 Script CLI\n\n### `src/scripts/seed-admin.ts`\nMembuat akun admin default:\n- Email: `admin@rfid.com`\n- Password: `password123`\n- Nama: `System Admin`\n- Role: `ADMIN`\n\n### `src/scripts/reset-admin.ts`\nMereset password admin menjadi `password123`.\n\n### `src/scripts/seed-dummy-attendance.ts`\nMenghasilkan 10 record absensi dummy untuk pengujian, membuat karyawan dummy jika belum ada.\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\04-Frontend.md",
  "content": "# Dokumentasi Frontend\n\n## 4.1 Gambaran Umum\n\nFrontend adalah aplikasi **React 18** single-page yang dibangun dengan **Vite 5** dan **TypeScript**. Menyediakan dashboard modern dan responsif untuk mengelola sistem absensi.\n\n**Tumpukan Teknologi:**\n- **UI Framework:** React 18 + TypeScript\n- **Build Tool:** Vite 5\n- **Styling:** Tailwind CSS 3 (sistem desain kustom)\n- **State Management:** Zustand 5\n- **HTTP Client:** Axios\n- **Real-time:** Socket.IO Client + SSE (EventSource)\n- **Routing:** React Router v6\n- **Animasi:** Framer Motion\n- **Ikon:** Lucide React\n- **Tanggal:** date-fns v4\n\n## 4.2 Struktur Proyek\n\n```\nfrontend/\n├── index.html                    # Entry point HTML\n├── package.json                  # Dependensi\n├── vite.config.ts                # Konfigurasi Vite\n├── tailwind.config.ts            # Kustomisasi tema Tailwind\n├── postcss.config.cjs            # Konfigurasi PostCSS\n├── tsconfig.json                 # Konfigurasi TypeScript\n├── tsconfig.app.json             # Konfigurasi TS spesifik aplikasi\n├── tsconfig.node.json            # Konfigurasi TS spesifik Node\n├── .env                          # Variabel environment\n├── .env.example                  # Contoh environment\n└── src/\n    ├── main.tsx                  # Entry point React\n    ├── app.tsx                   # Komponen root + routing\n    ├── styles.css                # Style global + direktif Tailwind\n    ├── types/\n    │   └── domain.ts             # Interface & enum TypeScript\n    ├── state/\n    │   ├── auth-store.ts         # State auth Zustand\n    │   └── attendance-store.ts   # State absensi Zustand\n    ├── services/\n    │   ├── http.ts               # Instance Axios dengan interceptor\n    │   ├── auth.service.ts       # Panggilan API auth\n    │   ├── attendance.service.ts # Panggilan API absensi\n    │   ├── employee.service.ts   # Panggilan API karyawan\n    │   ├── settings.service.ts   # Panggilan API pengaturan\n    │   └── realtime.service.ts   # Klien Socket.IO + SSE\n    ├── hooks/\n    │   ├── use-auth-hydrate.ts   # Hook hidrasi auth\n    │   ├── use-bootstrap-data.ts # Hook pemuatan data awal\n    │   └── use-realtime-attendance.ts  # Hook event real-time\n    ├── pages/\n    │   ├── login-page.tsx        # Halaman login\n    │   ├── dashboard-page.tsx    # Dashboard utama\n    │   ├── monitoring-page.tsx   # Monitoring sesi\n    │   ├── history-page.tsx      # Riwayat absensi\n    │   ├── employees-page.tsx    # Manajemen karyawan\n    │   ├── simulator-page.tsx    # Simulator perangkat\n    │   ├── settings-page.tsx     # Pengaturan sistem\n    │   └── not-found-page.tsx    # Halaman 404\n    ├── components/\n    │   ├── layout/\n    │   │   ├── app-shell.tsx     # Layout utama\n    │   │   ├── app-sidebar.tsx   # Sidebar navigasi\n    │   │   └── topbar.tsx        # Navigation bar atas\n    │   ├── dashboard/\n    │   │   ├── summary-strip.tsx  # Kartu statistik ringkasan\n    │   │   ├── summary-card.tsx   # Kartu statistik individu\n    │   │   ├── live-feed.tsx     # Umpan absensi langsung\n    │   │   └── device-overview.tsx # Status perangkat\n    │   ├── common/\n    │   │   ├── status-badge.tsx   # Badge status reusable\n    │   │   └── toast-viewport.tsx # Kontainer notifikasi toast\n    │   ├── monitoring/\n    │   │   └── session-monitor.tsx # Kartu monitoring sesi\n    │   └── history/\n    │       ├── history-filters.tsx # Filter riwayat absensi\n    │       └── history-table.tsx   # Tabel riwayat absensi\n    └── utils/\n        ├── api-base.ts            # Konstanta base URL API\n        ├── image.ts               # Resolver URL gambar\n        └── format.ts              # Utilitas format tanggal\n```\n\n## 4.3 Dokumentasi File per File\n\n### Entry Points\n\n#### `src/main.tsx`\n\n**Tujuan:** Entry point aplikasi. Me-render aplikasi React di dalam BrowserRouter.\n\n```tsx\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <BrowserRouter>\n    <App />\n  </BrowserRouter>\n)\n```\n\n**Import:** React, ReactDOM, BrowserRouter, App\n\n---\n\n#### `src/app.tsx`\n\n**Tujuan:** Komponen root yang mendefinisikan semua route dan guard autentikasi.\n\n**Struktur:**\n1. Route publik: `/login` → `LoginPage`\n2. Route terproteksi (dibungkus `ProtectedRoutes`):\n   - `/` → `DashboardPage`\n   - `/monitoring` → `MonitoringPage`\n   - `/history` → `HistoryPage`\n   - `/employees` → `EmployeesPage`\n   - `/simulator` → `SimulatorPage`\n   - `/settings` → `SettingsPage`\n   - `*` → `NotFoundPage`\n3. Route terproteksi menggunakan `AppShell` (sidebar + topbar + konten)\n4. Hook yang dijalankan di route terproteksi:\n   - `useBootstrapData()` — memuat data awal\n   - `useRealtimeAttendance()` — menghubungkan Socket.IO\n\n**Alur Autentikasi:**\n- Cek apakah token ada di localStorage\n- Jika tidak ada token, redirect ke `/login`\n- Jika ada token, hidrasi state auth\n- Route terproteksi di-render hanya setelah hidrasi selesai\n\n---\n\n### State Management\n\n#### `src/state/auth-store.ts`\n\n**Tujuan:** State management autentikasi dengan Zustand.\n\n**State:**\n```typescript\n{\n  token: string | null,      // Token JWT\n  user: AuthUser | null,     // Info user saat ini\n  isLoading: boolean,        // State loading\n  isHydrated: boolean,       // Apakah state sudah dipulihkan dari localStorage\n  error: string | null       // Pesan error\n}\n```\n\n**Aksi:**\n| Aksi | Deskripsi |\n|------|-----------|\n| `login(email, password)` | Memanggil authService.login, menyimpan token + user, persist ke localStorage |\n| `logout()` | Menghapus token, user, hapus dari localStorage |\n| `hydrate()` | Memulihkan state auth dari localStorage |\n| `clearError()` | Menghapus state error |\n\n**Persistensi:** Token dan user disimpan di `localStorage(\"rfid-v3-auth\")`\n\n---\n\n#### `src/state/attendance-store.ts`\n\n**Tujuan:** State terpusat untuk semua data terkait absensi.\n\n**State:**\n```typescript\n{\n  employees: Employee[],\n  devices: Device[],\n  sessions: AttendanceSession[],\n  history: AttendanceRecord[],\n  events: RealtimeMessage[],\n  toasts: ToastMessage[],\n  statusFilter, deptFilter, dateFilter, monthFilter, employeeFilter: string,\n  page, pageSize, total: number,\n  view: 'log' | 'report',\n  isLoading, isStreaming: boolean\n}\n```\n\n**Aksi Utama:**\n| Aksi | Deskripsi |\n|------|-----------|\n| `refreshAll()` | Mengambil data employees, devices, sessions, history secara paralel |\n| `fetchHistory(params)` | Fetch history dengan pagination dan filter |\n| `pushRealtimeEvent(event)` | Menangani event Socket.IO, membuat toast |\n| `summary()` | Menghitung statistik harian dari history |\n\n---\n\n### Services\n\n#### `src/services/http.ts`\n\n**Tujuan:** Instance Axios yang dikonfigurasi dengan interceptor auth.\n\n```typescript\nconst http = axios.create({ baseURL: VITE_API_BASE_URL });\nhttp.interceptors.request.use((config) => {\n  const token = useAuthStore.getState().token;\n  if (token) config.headers.Authorization = `Bearer ${token}`;\n  return config;\n});\n```\n\n**Digunakan oleh:** Semua modul service\n\n---\n\n#### `src/services/auth.service.ts`\n\n**Tujuan:** Panggilan API autentikasi.\n\n| Fungsi | Endpoint | Method |\n|--------|----------|--------|\n| `login(email, password)` | `/api/v1/auth/login` | POST |\n\n**Response:** `{ token, user }`\n\n---\n\n#### `src/services/attendance.service.ts`\n\n**Tujuan:** Panggilan API data absensi.\n\n| Fungsi | Endpoint | Method |\n|--------|----------|--------|\n| `getHistory(params)` | `/api/v1/attendance/history` | GET |\n| `getSessions()` | `/api/v1/attendance/sessions` | GET |\n| `getDevices()` | `/api/v1/devices` | GET |\n| `getEmployees()` | `/api/v1/employees` | GET |\n| `exportPdf(params)` | `/api/v1/export/pdf` | GET |\n\n---\n\n#### `src/services/employee.service.ts`\n\n**Tujuan:** Panggilan API CRUD karyawan.\n\n| Fungsi | Endpoint | Method |\n|--------|----------|--------|\n| `getAll()` | `/api/v1/employees` | GET |\n| `create(data)` | `/api/v1/employees` | POST (FormData) |\n| `update(id, data)` | `/api/v1/employees/:id` | PUT (FormData) |\n| `remove(id)` | `/api/v1/employees/:id` | DELETE |\n\n---\n\n#### `src/services/settings.service.ts`\n\n**Tujuan:** Panggilan API pengaturan sistem.\n\n| Fungsi | Endpoint | Method |\n|--------|----------|--------|\n| `get()` | `/api/v1/settings` | GET |\n| `update(data)` | `/api/v1/settings` | POST |\n| `reset()` | `/api/v1/settings/reset` | DELETE |\n\n---\n\n#### `src/services/realtime.service.ts`\n\n**Tujuan:** Service komunikasi real-time dengan Socket.IO dan fallback SSE.\n\n**Koneksi Socket.IO:**\n- Terhubung ke `VITE_API_BASE_URL` dengan token auth\n- Reconnection dengan exponential backoff\n\n**Method:**\n| Method | Deskripsi |\n|--------|-----------|\n| `subscribeAttendance(handler)` | Mendengarkan event absensi |\n| `subscribeDeviceStatus(handler)` | Mendengarkan event status perangkat |\n| `unsubscribeAttendance()` | Menghapus listener absensi |\n| `unsubscribeDeviceStatus()` | Menghapus listener perangkat |\n| `disconnect()` | Menutup koneksi socket |\n\n**Event yang Didengarkan:**\n- `attendance:new` — Record absensi baru\n- `attendance:update` — Update sesi\n- `rfid:new` — Pemindaian kartu RFID\n- `registration:image` — Gambar registrasi diterima\n- `device:status` — Perubahan status perangkat\n\n---\n\n### Hooks\n\n#### `src/hooks/use-auth-hydrate.ts`\nMemanggil `authStore.hydrate()` untuk memulihkan state auth dari localStorage.\n\n#### `src/hooks/use-bootstrap-data.ts`\nMemuat data awal (employees, devices, sessions, history) saat user terautentikasi.\n\n#### `src/hooks/use-realtime-attendance.ts`\nMenghubungkan Socket.IO dan menangani event absensi real-time.\n\n---\n\n### Halaman (Pages)\n\n#### `src/pages/login-page.tsx`\n**Tujuan:** Halaman autentikasi user.\n**Fitur:** Layout dual-panel, form email/password, validasi, redirect ke dashboard.\n\n#### `src/pages/dashboard-page.tsx`\n**Tujuan:** Dashboard utama menampilkan ringkasan absensi.\n**Komposisi:** SummaryStrip + LiveFeed + DeviceOverview\n\n#### `src/pages/monitoring-page.tsx`\n**Tujuan:** Monitoring sesi real-time.\n**Komposisi:** Header + SessionMonitor\n\n#### `src/pages/history-page.tsx`\n**Tujuan:** Riwayat absensi dengan filter dan pagination.\n**Komposisi:** HistoryFilters + HistoryTable\n\n#### `src/pages/employees-page.tsx`\n**Tujuan:** Manajemen karyawan dengan operasi CRUD.\n**Fitur:** Search, tabel, modal tambah/edit, webcam capture, RFID scan simulation.\n\n#### `src/pages/simulator-page.tsx`\n**Tujuan:** Simulator perangkat untuk pengujian tanpa hardware fisik.\n**Fitur:** Webcam preview, input UID manual, konfigurasi perangkat, capture + send.\n\n#### `src/pages/settings-page.tsx`\n**Tujuan:** Pengaturan konfigurasi sistem.\n**Fitur:** Jam masuk/keluar, threshold keterlambatan, Danger Zone (reset data).\n\n#### `src/pages/not-found-page.tsx`\n**Tujuan:** Halaman 404 sederhana.\n\n---\n\n### Komponen\n\n#### Layout\n- **`app-shell.tsx`** — Grid CSS: sidebar kiri, konten + topbar kanan, overlay toast\n- **`app-sidebar.tsx`** — Navigasi: Ringkasan, Karyawan, Log Presensi, Monitor, Pengaturan + logout + indikator streaming\n- **`topbar.tsx`** — Judul halaman, search bar, tanggal, ikon notifikasi/help\n\n#### Dashboard\n- **`summary-strip.tsx`** — 4 kartu ringkasan (valid hari ini, invalid, total, perangkat online)\n- **`summary-card.tsx`** — Kartu reusable dengan ikon, label, nilai, tema warna\n- **`live-feed.tsx`** — Tabel 5 record absensi terbaru dengan foto, kategori, ketepatan, status\n- **`device-overview.tsx`** — Daftar status perangkat dengan indikator online/offline\n\n#### Common\n- **`status-badge.tsx`** — Badge warna: SAH (hijau), TIDAK SAH (merah), DARING (hijau), LURING (abu)\n- **`toast-viewport.tsx`** — Notifikasi toast pojok kanan atas, auto-dismiss 5 detik\n\n#### Monitoring\n- **`session-monitor.tsx`** — Kartu sesi aktif dengan gambar wajah, RFID, status, timer\n\n#### History\n- **`history-filters.tsx`** — Dropdown karyawan, bulan, tanggal, status, departemen + tombol Export PDF\n- **`history-table.tsx`** — Tabel riwayat dengan nama hari, tanggal, waktu, kategori, ketepatan, status, pagination\n\n---\n\n### Tipe\n\n#### `src/types/domain.ts`\n```typescript\nAuthUser { id, name, email, role }\nEmployee { id, full_name, department, position, rfid_uid, face_image_path, is_active, ... }\nDevice { id, device_code, type, name, location, status, metadata, last_seen_at }\nAttendanceRecord { id, employee_id, employee_name, department, status, category, punctuality, ... }\nAttendanceSession { id, correlation_id, rfid_uid, status, reason, started_at, expires_at }\nAttendanceSummary { validToday, invalidToday, totalToday, devicesOnline }\nToastMessage { id, type, title, message }\n```\n\n### Utilitas\n- **`api-base.ts`** — `export const apiBaseUrl = VITE_API_BASE_URL`\n- **`image.ts`** — `resolveCaptureUrl(path)` — menangani URL absolut/relatif\n- **`format.ts`** — `formatDateTime`, `formatClock`, `formatShortDate` dengan date-fns locale `id`\n\n### Styling\n- **`styles.css`** — Google Fonts (Manrope, IBM Plex Mono), direktif Tailwind, class kustom (`.app-shell`, `.panel`)\n- **`tailwind.config.ts`** — Tema kustom: warna ink/mist/pine/ember/blush/cloud, font, shadow, animasi pulseLine\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 68.0s)

_Thinking:_

Let me continue with more files - Face Recognition, ESP8266, ESP32CAM, Database, API, SocketIO, gRPC docs.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\05-Face-Recognition.md",
  "content": "# Dokumentasi Face Recognition\n\n## 5.1 Gambaran Umum\n\nService Face Recognition adalah microservice **Python FastAPI** yang menyediakan kemampuan enkoding dan verifikasi wajah. Menggunakan **DeepFace** (framework pengenalan wajah deep learning) dengan model **Facenet128** dan **MediaPipe** untuk deteksi wajah.\n\n**Peran dalam Sistem:** Service face recognition adalah microservice ketiga dalam arsitektur, bersama Express Gateway dan gRPC Service Layer. Dipanggil oleh backend Node.js untuk:\n1. Enkoding gambar wajah menjadi vektor 128-dimensi (saat registrasi karyawan)\n2. Memverifikasi apakah wajah yang diambil cocok dengan karyawan terdaftar (saat absensi)\n\n## 5.2 Tumpukan Teknologi\n\n| Komponen | Teknologi | Versi |\n|----------|-----------|-------|\n| Web Framework | FastAPI | 0.115.12 |\n| ASGI Server | Uvicorn | 0.34.2 |\n| Deteksi Wajah | MediaPipe | 0.10.20 |\n| Embedding Wajah | Facenet128 (via DeepFace) | latest |\n| Pengolahan Citra | OpenCV (headless) | latest |\n| Loading Gambar | Pillow | 11.2.1 |\n| Komputasi Numerik | NumPy | <2.0.0 |\n| Deep Learning | TensorFlow | latest |\n| Keras | tf-keras | latest |\n\n## 5.3 Arsitektur\n\n```\n┌─────────────────────────────────────────────────────────┐\n│               Python Face Service                        │\n│               FastAPI port 8000                          │\n│                                                          │\n│  ┌────────────┐  ┌──────────────┐  ┌────────────────┐  │\n│  │  /encode   │  │   /verify    │  │   /health      │  │\n│  │  Endpoint  │  │   Endpoint   │  │   Endpoint     │  │\n│  └─────┬──────┘  └──────┬───────┘  └────────────────┘  │\n│        │                │                                │\n│        ▼                ▼                                │\n│  ┌──────────────────────────────────────────────────┐   │\n│  │           Pipeline DeepFace                       │   │\n│  │                                                    │   │\n│  │  1. Decode Base64 → OpenCV Image (BGR)            │   │\n│  2. Deteksi Wajah (MediaPipe)                        │   │\n│  3. Alignment + Normalisasi Wajah                    │   │\n│  4. Ekstraksi Embedding (Facenet128)                 │   │\n│  5. Cosine Distance (verify only)                    │   │\n│  └──────────────────────────────────────────────────┘   │\n│                                                          │\n│  ┌──────────────────────────────────────────────────┐   │\n│  │           Cache Model (~/.deepface/weights/)      │   │\n│  │           Facenet128 weights (~90MB)              │   │\n│  └──────────────────────────────────────────────────┘   │\n└─────────────────────────────────────────────────────────┘\n```\n\n## 5.4 File: `python-face-service/main.py`\n\n**Lokasi:** `I:\\rfid_v3\\python-face-service\\main.py`\n**Jumlah Baris:** 139\n\n**Tujuan:** Aplikasi FastAPI utama dengan endpoint enkoding dan verifikasi wajah.\n\n### Import\n\n```python\nimport base64              # Decoding Base64\nimport io                  # BytesIO untuk penanganan gambar\nimport os                  # Konfigurasi environment\nfrom typing import List    # Type hints\nimport cv2                 # OpenCV (pengolahan citra)\nimport numpy as np         # Operasi numerik\nfrom fastapi import FastAPI, HTTPException  # Web framework\nfrom pydantic import BaseModel              # Validasi request\nfrom PIL import Image      # Loading gambar\nfrom deepface import DeepFace  # Framework pengenalan wajah\n```\n\n### Model Pydantic\n\n**`EncodeRequest`:**\n```python\nclass EncodeRequest(BaseModel):\n    imageBase64: str  # Gambar yang dienkode Base64 (JPEG/PNG)\n```\n\n**`VerifyRequest`:**\n```python\nclass VerifyRequest(BaseModel):\n    imageBase64: str           # Gambar wajah yang dienkode Base64\n    referenceDescriptor: List[float]  # Embedding 128-d dari karyawan terdaftar\n    threshold: float = 0.40    # Ambang jarak Cosine (di-override oleh backend)\n```\n\n### Event Startup\n\n```python\n@app.on_event(\"startup\")\nasync def startup_event():\n    DeepFace.build_model(\"Facenet\")  # Download weights pada first run (~90MB)\n```\n\n**Tujuan:** Pre-load model Facenet ke memory saat startup untuk menghindari cold-start latency. Pada first run, mendownload model weights ke `~/.deepface/weights/`.\n\n### Fungsi Inti: `decode_image_to_cv()`\n\n```python\ndef decode_image_to_cv(value: str) -> np.ndarray:\n    if \",\" in value:\n        value = value.split(\",\", 1)[1]  # Hapus prefix data URL\n    image_bytes = base64.b64decode(value)\n    image = Image.open(io.BytesIO(image_bytes)).convert(\"RGB\")\n    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)\n```\n\n**Input:** String Base64 (mungkin dengan prefix `data:image/...`)\n**Output:** OpenCV BGR image (`numpy.ndarray`)\n**Proses:**\n1. Hapus prefix data URL jika ada\n2. Decode base64 ke bytes\n3. Buka dengan Pillow sebagai RGB\n4. Konversi ke format OpenCV BGR\n\n### Endpoint: `GET /health`\n\n```python\n@app.get(\"/health\")\ndef health():\n    return {\"status\": \"ok\"}\n```\n\n**Tujuan:** Health check untuk monitoring.\n**Response:** `{ \"status\": \"ok\" }`\n\n### Endpoint: `POST /encode`\n\n```python\n@app.post(\"/encode\")\ndef encode_face(payload: EncodeRequest):\n    image_cv = decode_image_to_cv(payload.imageBase64)\n    results = DeepFace.represent(\n        img_path=image_cv,\n        model_name=\"Facenet\",\n        detector_backend=\"mediapipe\",\n        enforce_detection=True,\n        align=True\n    )\n    if not results:\n        raise HTTPException(400, \"No face detected\")\n    descriptor = results[0][\"embedding\"]\n    return {\"descriptor\": descriptor}\n```\n\n**Tujuan:** Menghasilkan embedding wajah 128-dimensi (deskriptor) dari gambar.\n\n**Input:** `{ \"imageBase64\": \"base64_string\" }`\n\n**Output:**\n```json\n{\n  \"descriptor\": [0.0123, -0.0456, ..., 0.0789]  // 128 nilai float\n}\n```\n\n**Pipeline:**\n1. Decode base64 ke OpenCV image\n2. Deteksi wajah menggunakan MediaPipe\n3. Align wajah (rotasi/scale untuk standardisasi)\n4. Proses melalui model Facenet128 → embedding 128-d\n5. Kembalikan vektor embedding\n\n**Error Response:**\n- `400` — \"No face detected\"\n- `500` — Internal error\n\n**Dipanggil oleh:** `EmployeeService.create/update` → `FaceRecognitionClient.encodeFace()`\n\n### Endpoint: `POST /verify`\n\n```python\n@app.post(\"/verify\")\ndef verify_face(payload: VerifyRequest):\n    image_cv = decode_image_to_cv(payload.imageBase64)\n    results = DeepFace.represent(\n        img_path=image_cv,\n        model_name=\"Facenet\",\n        detector_backend=\"mediapipe\",\n        enforce_detection=True,\n        align=True\n    )\n    if not results:\n        raise HTTPException(400, \"No face detected\")\n    \n    descriptor = np.array(results[0][\"embedding\"])\n    reference = np.array(payload.referenceDescriptor)\n    \n    # Cek kompatibilitas panjang deskriptor\n    if len(reference) != len(descriptor):\n        return {\n            \"isMatch\": False,\n            \"distance\": 99.0,\n            \"confidence\": 0.0,\n            \"error\": \"Panjang deskriptor tidak kompatibel. Harap daftarkan ulang karyawan.\"\n        }\n    \n    # Perhitungan Cosine distance\n    a, b = np.array(descriptor), np.array(reference)\n    norm_a, norm_b = np.linalg.norm(a), np.linalg.norm(b)\n    if norm_a == 0 or norm_b == 0:\n        distance = 1.0\n    else:\n        similarity = np.dot(a, b) / (norm_a * norm_b)\n        distance = float(1.0 - similarity)\n    \n    is_match = distance <= payload.threshold\n    \n    # Confidence: linear ramp dari 1.0 (distance=0) ke 0.0 (distance=threshold*2)\n    confidence = max(0.0, 1.0 - (distance / max(payload.threshold * 2, 0.01)))\n    \n    return {\n        \"isMatch\": is_match,\n        \"distance\": distance,\n        \"confidence\": confidence,\n    }\n```\n\n**Tujuan:** Memverifikasi apakah wajah yang diambil cocok dengan deskriptor wajah karyawan terdaftar.\n\n**Input:**\n```json\n{\n  \"imageBase64\": \"base64_string\",\n  \"referenceDescriptor\": [0.0123, ...],\n  \"threshold\": 0.45\n}\n```\n\n**Output (cocok):**\n```json\n{\n  \"isMatch\": true,\n  \"distance\": 0.23,\n  \"confidence\": 0.74\n}\n```\n\n**Output (tidak cocok):**\n```json\n{\n  \"isMatch\": false,\n  \"distance\": 0.67,\n  \"confidence\": 0.26\n}\n```\n\n**Pipeline Verifikasi:**\n1. Decode base64 ke OpenCV image\n2. Deteksi wajah menggunakan MediaPipe\n3. Ekstrak embedding menggunakan Facenet128\n4. Cek kompatibilitas panjang deskriptor (harus 128)\n5. Hitung **Cosine distance** antara deskriptor saat ini dan referensi\n6. Bandingkan jarak dengan threshold\n7. Hitung confidence score\n\n**Threshold:** `0.40` (default Python) — di-override ke `0.45` oleh `FACE_MATCH_THRESHOLD` di backend\n\n## 5.5 Pipeline Face Recognition (Detail)\n\n### Langkah 1: Akuisisi Gambar\n- Gambar tiba sebagai string Base64 (dari ESP32-CAM atau webcam)\n- Bisa menyertakan prefix `data:image/jpeg;base64,`\n- Didecode ke format OpenCV BGR melalui perantara Pillow\n\n### Langkah 2: Deteksi Wajah (MediaPipe)\n- **Detector Backend:** MediaPipe\n- Mendeteksi bounding box dan landmark wajah\n- `enforce_detection=True` — error jika tidak ada wajah\n- `align=True` — transformasi affine untuk align wajah\n\n### Langkah 3: Embedding Wajah (Facenet128)\n- **Model:** Facenet128 (arsitektur Inception-ResNet v1)\n- **Input:** Gambar wajah yang sudah di-align (160x160 pixels)\n- **Output:** Vektor embedding 128-dimensi\n- **Penyimpanan weights:** ~90MB, cache di `~/.deepface/weights/facenet_weights.h5`\n\n### Langkah 4: Perhitungan Jarak\n- **Metric:** Cosine distance\n- Formula: `distance = 1.0 - cos(θ)` dimana `cos(θ) = (A·B) / (||A|| * ||B||)`\n- Range: 0.0 (identik) hingga 2.0 (berlawanan)\n\n### Langkah 5: Keputusan Pencocokan\n- `isMatch = distance <= threshold`\n- Default threshold: 0.40 (Python) → 0.45 (Produksi via env)\n- Threshold lebih rendah = pencocokan lebih ketat\n\n### Langkah 6: Confidence Score\n- Fungsi linear ramp\n- `confidence = max(0.0, 1.0 - distance / (threshold * 2))`\n- Pada `distance = 0` → confidence = 1.0\n- Pada `distance = threshold` → confidence = 0.5\n- Pada `distance = threshold * 2` → confidence = 0.0\n\n## 5.6 Integrasi dengan Backend\n\n### `src/shared/clients/face-recognition.client.ts`\n\n**Tujuan:** HTTP client TypeScript yang berkomunikasi dengan service Python.\n\n**Konfigurasi:**\n```typescript\nthis.http = axios.create({\n  baseURL: env.FACE_SERVICE_URL,   // Default: http://localhost:8000\n  timeout: 15000                    // Timeout 15 detik\n});\n```\n\n**Method:**\n\n| Method | Deskripsi | Dipanggil Oleh |\n|--------|-----------|----------------|\n| `encodeFace(input)` | Mengirim gambar ke `/encode`, mengembalikan array deskriptor 128-d | `EmployeeService.create/update` |\n| `verifyFace(input)` | Mengirim gambar + reference descriptor ke `/verify`, mengembalikan hasil cocok/tidak | `AttendanceVerificationService.verify()` |\n\n## 5.7 Karakteristik Performa\n\n| Metrik | Nilai |\n|--------|-------|\n| Ukuran Model | ~90MB (weights Facenet128) |\n| First-load Time | ~30-60s (download weights) |\n| Subsequent Load | ~3-5s (dari disk cache) |\n| Encode Latency | ~500-1500ms per gambar |\n| Verify Latency | ~800-2000ms per perbandingan |\n| Max Ukuran Gambar | 50MB (dikonfigurasi di Express) |\n| Format Didukung | JPEG, PNG (via Pillow) |\n\n## 5.8 Penanganan Error\n\n| Skenario | Kode HTTP | Response |\n|----------|-----------|----------|\n| Tidak ada wajah di gambar | 400 | `\"No face detected\"` |\n| Banyak wajah | 200 | Menggunakan wajah pertama |\n| Gambar korup | 500 | Detail pesan error |\n| Ketidakcocokan deskriptor | 200 (isMatch=false) | `\"Incompatible descriptor length\"` |\n| Model tidak terload | 500 | Detail pesan error |\n| Timeout | N/A | Timeout 15s di HTTP client |\n\n## 5.9 Requirements\n\n```\nfastapi==0.115.12\nuvicorn==0.34.2\nnumpy<2.0.0\nPillow==11.2.1\nmediapipe==0.10.20\nopencv-python-headless\ndeepface\ntensorflow\ntf-keras\n```\n\n## 5.10 Menjalankan\n\n```bash\ncd python-face-service\npython -m venv .venv\n.venv\\Scripts\\activate\npip install -r requirements.txt\nuvicorn main:app --host 0.0.0.0 --port 8000\n```\n\nAtau gunakan batch script:\n```bash\nrun_ai.bat\n```\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\06-ESP8266.md",
  "content": "# Dokumentasi Firmware ESP8266\n\n## 6.1 Gambaran Umum\n\nFirmware ESP8266 berjalan di mikrokontroler **ESP8266** dan berfungsi sebagai **Pemindai RFID Master**. Membaca kartu RFID, berkomunikasi dengan server backend, dan mengontrol ESP32-CAM melalui koneksi serial.\n\n**Komponen Hardware:**\n- **MCU:** ESP8266\n- **RFID Reader:** MFRC522 (interface SPI)\n- **Display:** LCD 16x2 dengan interface I2C (address 0x27)\n- **Buzzer:** Buzzer aktif di GPIO0 (active-low)\n- **Serial:** SoftwareSerial untuk komunikasi ESP32-CAM\n\n**Pemetaan Pin:**\n\n| Komponen | Pin | GPIO |\n|----------|-----|------|\n| MFRC522 SDA(SS) | D8 | GPIO15 |\n| MFRC522 RST | D4 | GPIO2 |\n| MFRC522 MOSI | D7 | GPIO13 |\n| MFRC522 MISO | D6 | GPIO12 |\n| MFRC522 SCK | D5 | GPIO14 |\n| LCD I2C SDA | D2 | GPIO4 |\n| LCD I2C SCL | D1 | GPIO5 |\n| Buzzer | D3 | GPIO0 |\n| SoftwareSerial RX | RX | GPIO3 |\n| SoftwareSerial TX | D0 | GPIO16 |\n\n## 6.2 File: `firmware/esp8266_rfid_firmware.ino`\n\n**Lokasi:** `I:\\rfid_v3\\firmware\\esp8266_rfid_firmware.ino`\n**Jumlah Baris:** 451\n\n**Tujuan:** Firmware utama untuk pemindai RFID ESP8266 dengan portal konfigurasi, penemuan layanan mDNS, konektivitas WiFi, pembacaan RFID, tampilan LCD, feedback buzzer, dan komunikasi serial dengan ESP32-CAM.\n\n### 6.2.1 Library yang Digunakan\n\n| Library | Tujuan |\n|---------|--------|\n| `SPI` | Bus SPI untuk MFRC522 |\n| `MFRC522` | Driver RFID reader |\n| `Wire` | Bus I2C untuk LCD |\n| `LiquidCrystal_I2C` | Driver LCD 16x2 |\n| `SoftwareSerial` | Komunikasi serial dengan ESP32-CAM |\n| `ESP8266WiFi` | Konektivitas WiFi |\n| `ESP8266HTTPClient` | Request HTTP ke backend |\n| `WiFiClient` | TCP client untuk HTTP |\n| `ArduinoJson` | Serialisasi/deserialisasi JSON |\n| `LittleFS` | Filesystem untuk penyimpanan konfigurasi |\n| `ESP8266WebServer` | Web server portal konfigurasi |\n| `ESP8266mDNS` | Penemuan layanan mDNS |\n\n### 6.2.2 Konstanta & Definisi\n\n```cpp\n#define SS_PIN  15     // MFRC522 SS pin\n#define RST_PIN 2      // MFRC522 RST pin\n#define BUZZER_PIN 0   // Buzzer (active-low)\n#define RX_PIN 3       // SoftwareSerial RX\n#define MAX_WIFI 2     // Maksimal jaringan WiFi yang disimpan\n```\n\n### 6.2.3 Variabel Global\n\n| Variabel | Tipe | Tujuan |\n|----------|------|--------|\n| `mfrc522` | `MFRC522` | Instance RFID reader |\n| `lcd` | `LiquidCrystal_I2C` | Instance LCD display (16x2, addr 0x27) |\n| `linkSerial` | `SoftwareSerial` | Link serial ke ESP32-CAM (9600 baud) |\n| `wifiNetworks[2]` | `WiFiNetwork[]` | Array hingga 2 kredensial WiFi |\n| `serverHostname` | `String` | Hostname mDNS (default: \"attendtrack\") |\n| `serverPort` | `int` | Port server backend (default: 3000) |\n| `deviceCode` | `String` | Identitas perangkat (default: \"ESP8266-MASTER-01\") |\n| `pairingKey` | `String` | Kunci pemasangan ruangan/lokasi (default: \"ROOM-1\") |\n| `resolvedServerUrl` | `String` | URL lengkap setelah resolusi mDNS |\n| `inConfigMode` | `bool` | Apakah perangkat dalam mode AP config |\n| `server` | `ESP8266WebServer` | Web server portal konfigurasi |\n| `lastScanAt` | `unsigned long` | Timestamp pemindaian RFID terakhir |\n| `scanCooldownMs` | `const unsigned long` | Interval minimum antar scan (3000ms) |\n\n### 6.2.4 Fungsi\n\n#### `void beep(int durationMs)`\n\n**Tujuan:** Mengaktifkan buzzer selama durasi tertentu.\n\n**Input:** `durationMs` — milidetik buzzer berbunyi (default: 100ms)\n\n**Perilaku:**\n- SET BUZZER_PIN HIGH (buzzer active-low)\n- Tunggu selama durasi\n- SET BUZZER_PIN LOW\n\n**Dipanggil oleh:** Deteksi kartu, error, notifikasi sukses\n\n---\n\n#### `void loadConfig()`\n\n**Tujuan:** Memuat konfigurasi perangkat dari LittleFS `/config.json`.\n\n**Alur:**\n1. Mount filesystem LittleFS (format jika mount gagal)\n2. Cek apakah `/config.json` ada\n3. Jika ada, baca dan parse JSON\n4. Populasi: `wifiNetworks[]`, `serverHostname`, `serverPort`, `deviceCode`, `pairingKey`\n5. Jika tidak ada atau error, gunakan nilai default\n\n**Dipanggil oleh:** `setup()`\n\n---\n\n#### `void saveConfig()`\n\n**Tujuan:** Menyimpan konfigurasi perangkat saat ini ke LittleFS `/config.json`.\n\n**Alur:**\n1. Buat dokumen JSON dengan semua nilai konfigurasi\n2. Buka `/config.json` untuk menulis\n3. Serialisasi JSON ke file\n4. Tutup file\n\n**Dipanggil oleh:** `handleSave()`\n\n---\n\n#### `void handleRoot()`\n\n**Tujuan:** Menyajikan halaman HTML portal konfigurasi.\n\n**Alur:**\n1. Muat template HTML dari PROGMEM\n2. Ganti semua placeholder token dengan nilai saat ini\n3. Kirim response HTML (200)\n\n**Dipanggil oleh:** ESP8266WebServer saat klien meminta `/`\n\n---\n\n#### `void handleSave()`\n\n**Tujuan:** Memproses submit form konfigurasi.\n\n**Alur:**\n1. Baca semua field form dari data POST\n2. Update `wifiNetworks[]`, `serverHostname`, `serverPort`, `deviceCode`, `pairingKey`\n3. Bersihkan hostname (hapus suffix `.local` jika ada)\n4. Panggil `saveConfig()`\n5. Kirim konfigurasi sync JSON ke ESP32-CAM via Serial: `\"SYNC_JSON|{...}\"`\n6. Kirim response HTML sukses\n7. Tunggu 2 detik\n8. Reboot ESP8266 (`ESP.restart()`)\n\n**Dipanggil oleh:** ESP8266WebServer saat klien POST ke `/save`\n\n---\n\n#### `void startConfigPortal()`\n\n**Tujuan:** Memulai mode Access Point WiFi untuk konfigurasi perangkat.\n\n**Alur:**\n1. Set `inConfigMode = true`\n2. Set mode WiFi ke AP\n3. Mulai AP dengan SSID `\"AttendTrack-Setup\"`, password `\"12345678\"`\n4. Tampilkan IP AP (`192.168.4.1`) di LCD\n5. Daftarkan route web server (`/` dan `/save`)\n6. Mulai web server\n7. Masuk ke infinite loop menangani request klien\n\n**Tampilan LCD:** \"CONFIG MODE\" / \"192.168.4.1\"\n\n**Dipanggil oleh:** `setup()` saat tidak ada WiFi dikonfigurasi atau semua koneksi gagal\n\n---\n\n#### `bool connectWiFi()`\n\n**Tujuan:** Mencoba terhubung ke jaringan WiFi yang dikonfigurasi.\n\n**Alur:**\n1. Set mode WiFi ke STA\n2. Iterasi melalui `wifiNetworks[]`\n3. Untuk setiap jaringan:\n   - Tampilkan pesan koneksi di LCD\n   - Panggil `WiFi.begin(ssid, password)`\n   - Tunggu hingga 10 detik (20 × 500ms attempts)\n   - Jika terhubung, return `true`\n4. Jika semua jaringan gagal, return `false`\n\n**Returns:** `true` jika terhubung, `false` jika gagal\n\n**Dipanggil oleh:** `setup()`, `loop()` (reconnection)\n\n---\n\n#### `void resolveBackend()`\n\n**Tujuan:** Menemukan server backend menggunakan mDNS (Bonjour).\n\n**Alur:**\n1. Inisialisasi mDNS responder\n2. Query untuk service `_attendtrack._tcp`\n3. Coba hingga 5 kali (interval 1 detik)\n4. Jika ditemukan: simpan `resolvedServerUrl = \"http://\" + IP + \":\" + port`\n5. Tampilkan hasil di LCD\n6. Jika tidak ditemukan: tampilkan \"SERVER OFFLINE\"\n\n**Dipanggil oleh:** `setup()`, `loop()` (re-discovery setelah reconnect)\n\n---\n\n#### `void showIdle()`\n\n**Tujuan:** Menampilkan pesan idle/siap di LCD.\n\n**Tampilan LCD:**\n- Baris 1: \"Ready to Scan\"\n- Baris 2: \"Tempel Kartu...\"\n\n**Dipanggil oleh:** `setup()`, `loop()` (setelah scan selesai)\n\n---\n\n#### `String readUID()`\n\n**Tujuan:** Membaca UID kartu RFID dari MFRC522.\n\n**Returns:** String hex UID (contoh: \"A1B2C3D4\"), huruf besar\n\n**Alur:**\n1. Iterasi melalui `mfrc522.uid.uidByte[]`\n2. Konversi setiap byte ke string hex 2 karakter\n3. Gabungkan dan konversi ke huruf besar\n\n**Dipanggil oleh:** `loop()` saat kartu terdeteksi\n\n---\n\n#### `void setup()`\n\n**Tujuan:** Inisialisasi semua hardware dan koneksi jaringan.\n\n**Alur:**\n1. Inisialisasi Serial (115200 baud) dan linkSerial (9600 baud)\n2. Inisialisasi I2C dan LCD\n3. Nyalakan LCD backlight\n4. Konfigurasi pin buzzer sebagai OUTPUT (LOW = mati)\n5. Tampilkan splash screen \"AttendTrack V2\"\n6. Muat konfigurasi dari LittleFS\n7. Cek apakah ada WiFi dikonfigurasi\n8. Jika tidak ada WiFi atau koneksi gagal → mulai config portal\n9. Resolve backend via mDNS\n10. Inisialisasi bus SPI dan MFRC522\n11. Tampilkan idle screen\n\n---\n\n#### `void loop()`\n\n**Tujuan:** Loop utama program — memeriksa RFID, berkomunikasi dengan backend.\n\n**Alur:**\n```\n1. Skip jika inConfigMode\n2. Cek scan cooldown (3000ms)\n3. Cek status WiFi → reconnect jika perlu\n4. Cek kartu RFID baru\n   a. Jika tidak ada kartu → return\n   b. Jika kartu terdeteksi:\n5. Baca UID\n6. Beep (100ms)\n7. Update lastScanAt\n8. Tampilkan \"Memproses...\" di LCD\n9. Resolve backend jika belum di-resolve\n10. Jika server offline → beep error, tunggu, show idle\n11. POST ke /api/v1/attendance/check-rfid\n    a. Jika 200 OK:\n       - Parse response\n       - Jika \"registered\": false:\n         - Jika \"action\": \"REGISTER_CAPTURE\" → kirim \"REGISTER_CAPTURE|UID\" ke ESP32-CAM\n         - Lainnya → tampilkan \"RFID TIDAK TERDAFTAR\"\n       - Jika \"registered\": true → lanjutkan\n    b. Jika tidak 200 → tampilkan \"Koneksi Error\"\n12. Kirim \"CAPTURE|UID\" ke ESP32-CAM via Serial\n13. POST ke /api/v1/attendance/rfid (timeout 25s)\n    a. 200 → \"Wajah Cocok! Verified\" + beep panjang\n    b. 400/401 → \"Wajah Tdk Cocok\" + beep error\n    c. Lainnya → \"Koneksi Timeout\" + beep error\n14. Tunggu 3 detik\n15. Halt kartu RFID\n16. Tampilkan idle screen\n```\n\n## 6.3 Protokol Serial (ke ESP32-CAM)\n\nPerintah dikirim via SoftwareSerial (9600 baud):\n\n| Perintah | Format | Tujuan |\n|----------|--------|--------|\n| CAPTURE | `CAPTURE|{UID}\\n` | Ambil foto wajah untuk absensi |\n| REGISTER_CAPTURE | `REGISTER_CAPTURE|{UID}\\n` | Ambil foto wajah untuk registrasi |\n| SYNC_JSON | `SYNC_JSON|{json}\\n` | Sinkronisasi konfigurasi |\n\n## 6.4 Endpoint HTTP yang Dipanggil\n\n| Endpoint | Method | Tujuan | Timeout |\n|----------|--------|--------|---------|\n| `/api/v1/attendance/check-rfid` | POST | Cek apakah RFID terdaftar | 5s |\n| `/api/v1/attendance/rfid` | POST | Verifikasi RFID + wajah | 25s |\n\n## 6.5 Penanganan Error & Recovery\n\n- **WiFi Disconnect:** `loop()` memeriksa `WiFi.status()` dan reconnect\n- **Semua WiFi Gagal:** Fallback ke config portal\n- **Server Tidak Ditemukan:** Tampilkan \"SERVER OFFLINE\", retry pada scan berikutnya\n- **HTTP Timeout:** `check-rfid` = 5s, `rfid` = 25s (lebih lama karena menunggu verifikasi wajah)\n- **Scan Cooldown:** 3000ms antar scan untuk mencegah spam RFID\n- **Buzzer Feedback:** Pola beep berbeda untuk sukses (500ms) vs error (3 × 100ms)\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\07-ESP32CAM.md",
  "content": "# Dokumentasi Firmware ESP32-CAM\n\n## 7.1 Gambaran Umum\n\nFirmware ESP32-CAM berjalan di modul **ESP32-CAM** dan berfungsi sebagai **Kamera Pengambil Wajah**. Menerima perintah dari ESP8266 melalui koneksi serial, mengambil gambar wajah, dan mengirimnya ke server backend via HTTP.\n\n**Komponen Hardware:**\n- **MCU:** ESP32 (ESP32-CAM module)\n- **Kamera:** OV2640 (2MP)\n- **LED Flash:** GPIO4\n- **PSRAM:** Opsional (2MB jika tersedia)\n- **Serial:** Hardware Serial2 untuk komunikasi ESP8266\n\n**Pemetaan Pin (Kamera OV2640):**\n\n| Sinyal | GPIO | Sinyal | GPIO |\n|--------|------|--------|------|\n| PWDN | 32 | Y2 | 5 |\n| RESET | -1 (NC) | Y3 | 18 |\n| XCLK | 0 | Y4 | 19 |\n| SIOD | 26 | Y5 | 21 |\n| SIOC | 27 | Y6 | 36 |\n| Y9 | 35 | Y7 | 39 |\n| Y8 | 34 | Y8 | 34 |\n| VSYNC | 25 | PCLK | 22 |\n| HREF | 23 | FLASH | 4 |\n\n## 7.2 File: `firmware/esp32cam_face_firmware.ino`\n\n**Lokasi:** `I:\\rfid_v3\\firmware\\esp32cam_face_firmware.ino`\n**Jumlah Baris:** 398\n\n**Tujuan:** Firmware utama untuk modul pengambil wajah ESP32-CAM dengan streaming HTTP ke backend, monitoring heartbeat, kontrol flash, dan pemrosesan perintah serial dari ESP8266.\n\n### 7.2.1 Library yang Digunakan\n\n| Library | Tujuan |\n|---------|--------|\n| `esp_camera.h` | Driver kamera ESP32 |\n| `WiFi.h` | Konektivitas WiFi |\n| `HTTPClient.h` | Request HTTP ke backend |\n| `ArduinoJson.h` | Serialisasi/deserialisasi JSON |\n| `LittleFS.h` | Filesystem untuk penyimpanan konfigurasi |\n| `ESPmDNS.h` | Penemuan layanan mDNS |\n\n### 7.2.2 Konstanta & Definisi\n\n```cpp\n#define FLASH_GPIO_NUM 4      // LED Flash\n#define RX2_PIN 13             // Serial2 RX (dari ESP8266)\n#define TX2_PIN 12             // Serial2 TX (ke ESP8266)\n#define MAX_WIFI 2             // Maksimal jaringan WiFi\n```\n\n### 7.2.3 Variabel Global\n\n| Variabel | Tipe | Tujuan |\n|----------|------|--------|\n| `wifiNetworks[2]` | `WiFiNetwork[]` | Array kredensial WiFi |\n| `serverHostname` | `String` | Hostname mDNS (default: \"attendtrack\") |\n| `serverPort` | `int` | Port server backend (default: 3000) |\n| `deviceCode` | `String` | Identitas perangkat |\n| `pairingKey` | `String` | Kunci pemasangan ruangan |\n| `resolvedServerUrl` | `String` | URL lengkap setelah resolusi mDNS |\n| `waitingForConfig` | `bool` | Apakah menunggu konfigurasi dari ESP8266 |\n| `lastHeartbeat` | `unsigned long` | Timestamp heartbeat terakhir |\n\n### 7.2.4 Fungsi\n\n#### `void loadConfig()`\n\n**Tujuan:** Memuat konfigurasi perangkat dari LittleFS `/config.json`.\n\n**Alur:**\n1. Mount LittleFS (format jika gagal)\n2. Cek apakah `/config.json` ada\n3. Jika ada, parse JSON dan populasi:\n   - `wifiNetworks[]`\n   - `serverHostname`, `serverPort`\n   - `deviceCode` — auto-konversi prefix ESP8266 ke ESP32CAM (contoh: \"ESP8266-MASTER-01\" → \"ESP32CAM-MASTER-01\")\n   - `pairingKey`\n4. Jika tidak ditemukan, gunakan default\n\n**Dipanggil oleh:** `setup()`\n\n---\n\n#### `void saveConfigFromJSON(String jsonStr)`\n\n**Tujuan:** Menyimpan konfigurasi yang diterima dari ESP8266 via serial.\n\n**Input:** String JSON dari ESP8266 (dikirim sebagai `SYNC_JSON|{json}`)\n\n**Alur:**\n1. Parse JSON\n2. Simpan JSON mentah ke LittleFS `/config.json`\n3. Cetak \"New config saved from ESP8266! Rebooting...\"\n4. Tunggu 1 detik\n5. Reboot ESP32 (`ESP.restart()`)\n\n**Dipanggil oleh:** `loop()` saat perintah `SYNC_JSON|` diterima\n\n---\n\n#### `bool connectWiFi()`\n\n**Tujuan:** Mencoba terhubung ke jaringan WiFi yang dikonfigurasi.\n\n**Alur:**\n1. Set mode WiFi ke STA\n2. Iterasi melalui `wifiNetworks[]`\n3. Untuk setiap jaringan:\n   - Panggil `WiFi.begin()`\n   - Kedipkan LED flash selama koneksi\n   - Tunggu hingga 10 detik\n   - Jika terhubung, matikan flash, return `true`\n4. Return `false` jika semua gagal\n\n**Pola Kedip:** LED flash toggle setiap 500ms selama koneksi\n\n**Dipanggil oleh:** `setup()`, `loop()` (reconnection)\n\n---\n\n#### `void resolveBackend()`\n\n**Tujuan:** Menemukan server backend menggunakan mDNS.\n\n**Alur:**\n1. Inisialisasi mDNS responder\n2. Query untuk service `_attendtrack._tcp` (hingga 5 attempts)\n3. Jika ditemukan:\n   - Simpan `resolvedServerUrl`\n   - Nyalakan LED flash solid selama 2 detik (indikator siap)\n4. Jika tidak ditemukan: lanjutkan dengan URL kosong\n\n**Dipanggil oleh:** `setup()`, `loop()` (re-discovery)\n\n---\n\n#### `void initCamera()`\n\n**Tujuan:** Inisialisasi kamera OV2640 dengan pengaturan optimal.\n\n**Konfigurasi Kamera:**\n```cpp\nconfig.xclk_freq_hz = 20000000;     // Clock 20MHz\nconfig.pixel_format = PIXFORMAT_JPEG;  // Output JPEG\n\nif (psramFound()) {\n    config.frame_size = FRAMESIZE_SVGA;   // 800×600\n    config.jpeg_quality = 10;              // Kualitas tinggi\n    config.fb_count = 2;                   // Double buffer\n} else {\n    config.frame_size = FRAMESIZE_VGA;    // 640×480\n    config.jpeg_quality = 12;              // Kualitas standar\n    config.fb_count = 1;                   // Single buffer\n}\n```\n\n**Penyesuaian Kualitas:**\n- Dengan PSRAM: SVGA (800×600), quality 10, double buffer\n- Tanpa PSRAM: VGA (640×480), quality 12, single buffer\n\n**Penanganan Error:** Jika inisialisasi kamera gagal, tunggu 3 detik dan reboot.\n\n**Dipanggil oleh:** `setup()`\n\n---\n\n#### `void sendHeartbeat()`\n\n**Tujuan:** Mengirim heartbeat periodik ke backend untuk menunjukkan perangkat online.\n\n**Alur:**\n1. Cek WiFi dan server URL\n2. POST ke `/api/v1/devices/heartbeat`\n3. Payload: `{ \"deviceCode\": \"...\", \"type\": \"ESP32CAM\" }`\n4. Log kode response\n\n**Headers:** `Content-Type: application/json`\n**Timeout:** 3 detik\n**Interval:** 30 detik\n\n**Dipanggil oleh:** `loop()` setiap 30 detik\n\n---\n\n#### `void captureAndSend(String uid)`\n\n**Tujuan:** Mengambil gambar wajah dan mengirim ke backend untuk verifikasi absensi.\n\n**Input:** `uid` — UID RFID yang terkait dengan pengambilan ini\n\n**Alur:**\n```\n1. Nyalakan LED flash\n2. Tunggu 800ms (stabilisasi pencahayaan)\n3. Flush frame buffer lama:\n   a. Ambil dan discard dummy frame 1\n   b. Ambil dan discard dummy frame 2\n   c. Tunggu 50ms\n4. Capture frame baru: camera_fb_t *fb = esp_camera_fb_get()\n5. Matikan LED flash\n6. Jika capture gagal:\n   - Kirim \"RESULT|FAILED\" ke ESP8266 via Serial2\n   - Return\n7. Jika WiFi terhubung dan server ter-resolve:\n   a. POST ke /api/v1/attendance/face\n   b. Headers:\n      - Content-Type: application/octet-stream\n      - X-UID: {uid}\n      - X-Device-Code: {deviceCode}\n      - X-Pairing-Key: {pairingKey}\n   c. Body: byte JPEG mentah (fb->buf, fb->len)\n   d. Timeout: 20 detik\n   e. Jika sukses (200/201) → Kirim \"RESULT|SUCCESS\" ke ESP8266\n   f. Jika gagal → Kirim \"RESULT|FAILED\" ke ESP8266\n8. Kembalikan frame buffer\n```\n\n**Kualitas Gambar:** JPEG dengan pengaturan kualitas dari `initCamera()` (10 atau 12)\n\n**Dipanggil oleh:** `loop()` saat perintah `CAPTURE|UID` diterima dari ESP8266\n\n---\n\n#### `void captureAndSendRegistration(String uid)`\n\n**Tujuan:** Mengambil gambar wajah untuk pendaftaran karyawan BARU (belum ada wajah terdaftar).\n\n**Input:** `uid` — UID RFID untuk karyawan baru\n\n**Alur:** Sama dengan `captureAndSend()` tetapi dengan header berbeda:\n\n**Headers:**\n- `Content-Type: application/octet-stream`\n- `X-UID: {uid}`\n- `X-Purpose: registration`  ← **Membedakan dari capture absensi**\n- `X-Device-Code: {deviceCode}`\n- `X-Pairing-Key: {pairingKey}`\n\n**Perbedaan Utama dari `captureAndSend()`:**\n- Mengirim header `X-Purpose: registration`\n- Backend tahu untuk membuat record karyawan, bukan verifikasi absensi\n- Tidak ada pesan `RESULT` yang dikirim kembali ke ESP8266\n\n**Dipanggil oleh:** `loop()` saat perintah `REGISTER_CAPTURE|UID` diterima\n\n---\n\n#### `void setup()`\n\n**Tujuan:** Inisialisasi semua hardware dan konektivitas.\n\n**Alur:**\n```\n1. Inisialisasi Serial (115200 debug) dan Serial2 (9600, komunikasi ESP8266)\n2. Konfigurasi pin LED flash sebagai OUTPUT, matikan\n3. initCamera()\n4. loadConfig()\n5. Cek apakah ada WiFi dikonfigurasi\n6. Jika WiFi dikonfigurasi dan koneksi berhasil:\n   - resolveBackend()\n7. Jika tidak ada WiFi atau koneksi gagal:\n   - Set waitingForConfig = true\n   - Cetak \"Waiting for config from ESP8266...\"\n```\n\n---\n\n#### `void loop()`\n\n**Tujuan:** Loop utama program — memproses perintah serial, menangani heartbeat, mengelola konektivitas.\n\n**Alur:**\n```\n1. Cek Serial2 untuk perintah dari ESP8266:\n   a. Jika \"SYNC_JSON|{json}\" → saveConfigFromJSON(json)\n   b. Jika \"CAPTURE|{uid}\" dan NOT waitingForConfig → captureAndSend(uid)\n   c. Jika \"REGISTER_CAPTURE|{uid}\" dan NOT waitingForConfig → captureAndSendRegistration(uid)\n   \n2. Jika waitingForConfig:\n   - Return segera (tidak melakukan apa-apa, tunggu config dari ESP8266)\n   \n3. Setiap 30 detik (millis() - lastHeartbeat > 30000):\n   - sendHeartbeat()\n   - Update lastHeartbeat\n   \n4. Cek konektivitas WiFi:\n   - Jika terputus:\n     - Coba connectWiFi()\n     - Jika gagal lagi → waitingForConfig = true\n     - Jika berhasil → resolveBackend()\n```\n\n## 7.3 Konfigurasi Kamera Detail\n\n### Pengaturan Resolusi\n\n| PSRAM | Resolusi | Kualitas | Buffer | Perkiraan Ukuran |\n|-------|----------|----------|--------|-----------------|\n| Tersedia | SVGA (800×600) | 10 | 2 frame | ~30-50KB per JPEG |\n| Tidak Tersedia | VGA (640×480) | 12 | 1 frame | ~20-40KB per JPEG |\n\n### Flushing Frame Buffer\n\nDouble-buffer di-flush sebelum capture untuk memastikan gambar segar:\n```cpp\ncamera_fb_t *dummy_fb = esp_camera_fb_get();\nif (dummy_fb) esp_camera_fb_return(dummy_fb);\n// Ulangi untuk buffer kedua (jika fb_count = 2)\n```\n\nIni mencegah frame basi terkirim saat ESP32-CAM telah idle.\n\n## 7.4 Protokol Serial (dari ESP8266)\n\nPerintah diterima via Hardware Serial2 (9600 baud):\n\n| Perintah | Format | Handler |\n|----------|--------|---------|\n| CAPTURE | `CAPTURE|{UID}\\n` | `captureAndSend(uid)` |\n| REGISTER_CAPTURE | `REGISTER_CAPTURE|{UID}\\n` | `captureAndSendRegistration(uid)` |\n| SYNC_JSON | `SYNC_JSON|{json}\\n` | `saveConfigFromJSON(json)` |\n\nResponse yang dikirim kembali:\n| Response | Kondisi |\n|----------|---------|\n| `RESULT|SUCCESS\\n` | HTTP upload mengembalikan 200/201 |\n| `RESULT|FAILED\\n` | HTTP upload gagal atau capture gagal |\n\n## 7.5 Endpoint HTTP yang Dipanggil\n\n| Endpoint | Method | Tujuan | Timeout |\n|----------|--------|--------|---------|\n| `/api/v1/attendance/face` | POST | Kirim gambar wajah untuk diproses | 20s |\n| `/api/v1/devices/heartbeat` | POST | Keepalive perangkat | 3s |\n\n## 7.6 Pemulihan Error\n\n| Skenario | Perilaku |\n|----------|----------|\n| Inisialisasi Kamera Gagal | Reboot setelah 3 detik |\n| Capture Gagal | Kirim `RESULT|FAILED` ke ESP8266 |\n| HTTP Upload Gagal | Kirim `RESULT|FAILED` ke ESP8266 |\n| WiFi Terputus | Coba reconnect, fallback ke mode tunggu config |\n| Semua WiFi Gagal | `waitingForConfig = true`, tunggu config dari ESP8266 |\n| LED Flash | Kedip selama koneksi WiFi, solid 2s saat terhubung |\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 49.8s)

_Thinking:_

Now let me continue with Database, API, SocketIO, gRPC docs.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\08-Database.md",
  "content": "# Dokumentasi Database\n\n## 8.1 Teknologi\n\nSistem menggunakan **SQL.js** — implementasi JavaScript dari SQLite yang dikompilasi ke WebAssembly. Ini menghilangkan kebutuhan akan server database eksternal.\n\n**Karakteristik Utama:**\n- File database tunggal: `storage/rfid_v3.sqlite`\n- Eksekusi in-memory dengan persistensi file otomatis\n- Mode WAL (Write-Ahead Logging) untuk performa baca konkuren\n- Tidak ada dependensi eksternal atau instalasi yang diperlukan\n- Otomatis dibuat dan dimigrasi pada first run\n\n## 8.2 Entity Relationship Diagram\n\n```mermaid\nerDiagram\n    USERS {\n        text id PK\n        text name\n        text email UK\n        text password_hash\n        text role\n        text created_at\n        text updated_at\n    }\n\n    EMPLOYEES {\n        text id PK\n        text full_name\n        text department\n        text position\n        text rfid_uid UK\n        text face_descriptor\n        text face_image_path\n        integer is_active\n        text created_at\n        text updated_at\n    }\n\n    DEVICES {\n        text id PK\n        text device_code UK\n        text type\n        text name\n        text location\n        text status\n        text metadata\n        text last_seen_at\n        text created_at\n        text updated_at\n    }\n\n    ATTENDANCE_SESSIONS {\n        text id PK\n        text correlation_id UK\n        text pairing_key\n        text rfid_uid\n        text rfid_device_code\n        text face_device_code\n        text status\n        text reason\n        text started_at\n        text expires_at\n        text created_at\n    }\n\n    ATTENDANCE_RECORDS {\n        text id PK\n        text session_id FK\n        text employee_id FK\n        text rfid_uid\n        text status\n        text punctuality\n        real confidence\n        text reason\n        text image_path\n        text category\n        text verified_at\n    }\n\n    SYSTEM_SETTINGS {\n        text key PK\n        text value\n        text updated_at\n    }\n\n    ATTENDANCE_SESSIONS ||--|| ATTENDANCE_RECORDS : \"menghasilkan\"\n    EMPLOYEES ||--o{ ATTENDANCE_RECORDS : \"memiliki\"\n```\n\n## 8.3 Definisi Tabel\n\n### Tabel: `users`\n\nMenyimpan akun administrator dan operator untuk akses sistem.\n\n| Kolom | Tipe | Constraint | Deskripsi |\n|-------|------|------------|-----------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `name` | TEXT | NOT NULL | Nama lengkap pengguna |\n| `email` | TEXT | UNIQUE, NOT NULL | Email untuk login |\n| `password_hash` | TEXT | NOT NULL | Hash bcrypt dari password |\n| `role` | TEXT | NOT NULL, DEFAULT 'ADMIN' | Peran: `ADMIN` atau `OPERATOR` |\n| `created_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n| `updated_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n\n**Index:**\n- `email` — UNIQUE index untuk lookup login cepat\n\n**Relasi:** Tidak ada (tabel standalone)\n\n---\n\n### Tabel: `employees`\n\nData master semua karyawan yang terdaftar dalam sistem absensi.\n\n| Kolom | Tipe | Constraint | Deskripsi |\n|-------|------|------------|-----------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `full_name` | TEXT | NOT NULL | Nama lengkap karyawan |\n| `department` | TEXT | NOT NULL | Departemen/divisi |\n| `position` | TEXT | NOT NULL | Jabatan/posisi |\n| `rfid_uid` | TEXT | UNIQUE | String hex UID kartu RFID (contoh: `A1B2C3D4`) |\n| `face_descriptor` | TEXT | NULLABLE | Array 128 float serialized JSON (embedding Facenet128) |\n| `face_image_path` | TEXT | NULLABLE | Path relatif ke foto wajah (contoh: `uploads/abc-123.jpg`) |\n| `is_active` | INTEGER | NOT NULL, DEFAULT 1 | 1 = Aktif, 0 = Nonaktif |\n| `created_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n| `updated_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n\n**Index:**\n- `rfid_uid` — UNIQUE index untuk lookup RFID cepat\n\n**Relasi:**\n- One-to-many dengan `attendance_records` via `employee_id`\n\n---\n\n### Tabel: `devices`\n\nPerangkat keras IoT yang terdaftar untuk monitoring dan pelacakan.\n\n| Kolom | Tipe | Constraint | Deskripsi |\n|-------|------|------------|-----------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `device_code` | TEXT | UNIQUE, NOT NULL | Identitas unik perangkat |\n| `type` | TEXT | NOT NULL | Tipe: `RFID_READER` / `FACE_SCANNER` / `GATEWAY` |\n| `name` | TEXT | NULLABLE | Label perangkat |\n| `location` | TEXT | NULLABLE | Lokasi fisik |\n| `status` | TEXT | NOT NULL, DEFAULT 'OFFLINE' | Status: `ONLINE` / `OFFLINE` |\n| `metadata` | TEXT | NULLABLE | Object JSON (IP address, firmware version, dll) |\n| `last_seen_at` | TEXT | NULLABLE | Timestamp ISO 8601 heartbeat terakhir |\n| `created_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n| `updated_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n\n**Index:**\n- `device_code` — UNIQUE index untuk lookup perangkat cepat\n\n**Relasi:** Tidak ada (tabel standalone)\n\n---\n\n### Tabel: `attendance_sessions`\n\nSesi sementara yang menghubungkan pemindaian RFID dengan pengambilan wajah. Ini adalah tabel inti untuk alur absensi dua faktor.\n\n| Kolom | Tipe | Constraint | Deskripsi |\n|-------|------|------------|-----------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `correlation_id` | TEXT | UNIQUE | UUID untuk memasangkan event RFID + Face |\n| `pairing_key` | TEXT | NULLABLE | Kunci pemasangan (contoh: `ROOM-1`) |\n| `rfid_uid` | TEXT | NULLABLE | UID kartu RFID yang memicu sesi |\n| `rfid_device_code` | TEXT | NULLABLE | Kode perangkat RFID reader |\n| `face_device_code` | TEXT | NULLABLE | Kode perangkat kamera wajah |\n| `status` | TEXT | NOT NULL, DEFAULT 'CREATED' | State: `CREATED`, `READY`, `PROCESSING`, `COMPLETED`, `FAILED`, `EXPIRED` |\n| `reason` | TEXT | NULLABLE | Alasan kegagalan atau catatan |\n| `last_event_at` | TEXT | NULLABLE | Timestamp event terakhir |\n| `started_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n| `expires_at` | TEXT | NOT NULL | Timestamp ISO 8601, sesi auto-expire |\n| `created_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n| `updated_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n\n**Index:**\n- `correlation_id` — UNIQUE untuk lookup sesi\n- `status` — Untuk query sesi pending/ready\n\n**Relasi:**\n- One-to-one dengan `attendance_records` via `session_id`\n\n**State Machine Sesi:**\n\n```\nCREATED ──► READY ──► PROCESSING ──► COMPLETED\n  │                                      │\n  └──► EXPIRED                   VALID / INVALID\n```\n\n- **CREATED**: State awal saat RFID dipindai\n- **READY**: Gambar wajah diterima, siap diverifikasi\n- **PROCESSING**: Verifikasi wajah sedang berlangsung\n- **COMPLETED**: Verifikasi selesai\n- **FAILED**: Verifikasi gagal\n- **EXPIRED**: Jendela waktu habis tanpa gambar wajah\n\n---\n\n### Tabel: `attendance_records`\n\nRecord absensi final setelah verifikasi berhasil.\n\n| Kolom | Tipe | Constraint | Deskripsi |\n|-------|------|------------|-----------|\n| `id` | TEXT | PRIMARY KEY | UUID v4 |\n| `session_id` | TEXT | UNIQUE, FOREIGN KEY | Referensi ke `attendance_sessions.id` |\n| `employee_id` | TEXT | FOREIGN KEY | Referensi ke `employees.id` |\n| `rfid_uid` | TEXT | NULLABLE | UID kartu RFID yang digunakan |\n| `status` | TEXT | NOT NULL | Status absensi: `VALID` / `INVALID` |\n| `category` | TEXT | NOT NULL | `ENTRY` (masuk) / `EXIT` (pulang) |\n| `punctuality` | TEXT | NULLABLE | `ON_TIME` (tepat) / `LATE` (terlambat) |\n| `confidence` | REAL | NULLABLE | Skor kepercayaan cocok wajah (0.0 - 1.0) |\n| `reason` | TEXT | NULLABLE | Alasan status atau catatan |\n| `image_path` | TEXT | NULLABLE | Path ke gambar wajah yang di-capture |\n| `verified_at` | TEXT | NOT NULL | Timestamp ISO 8601 verifikasi |\n| `created_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n| `updated_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n\n**Index:**\n- `session_id` — UNIQUE (satu record per sesi)\n- `employee_id` — Untuk query riwayat absensi karyawan\n- `verified_at` — Untuk query rentang tanggal\n- `status` — Untuk filter valid/invalid\n\n**Relasi:**\n- Many-to-one dengan `employees` via `employee_id`\n- One-to-one dengan `attendance_sessions` via `session_id`\n\n---\n\n### Tabel: `system_settings`\n\nKey-value store untuk konfigurasi sistem.\n\n| Kolom | Tipe | Constraint | Deskripsi |\n|-------|------|------------|-----------|\n| `key` | TEXT | PRIMARY KEY | Identitas pengaturan |\n| `value` | TEXT | NOT NULL | Nilai pengaturan |\n| `updated_at` | TEXT | NOT NULL | Timestamp ISO 8601 |\n\n**Key yang Dikenal:**\n| Key | Tipe Nilai | Deskripsi |\n|-----|-----------|-----------|\n| `entry_start_time` | String (HH:mm) | Waktu mulai masuk (default: `07:00`) |\n| `entry_end_time` | String (HH:mm) | Waktu akhir masuk (default: `09:00`) |\n| `exit_start_time` | String (HH:mm) | Waktu mulai pulang (default: `16:00`) |\n| `exit_end_time` | String (HH:mm) | Waktu akhir pulang (default: `18:00`) |\n| `late_threshold_minutes` | Number | Menit setelah entry_end_time dianggap terlambat (default: `15`) |\n\n## 8.4 Inisialisasi & Migrasi Database\n\nInisialisasi database ditangani di `src/shared/database/sqlite.ts`:\n\n```typescript\n// Pada connectSqlite():\n// 1. Buka database SQLite dari path file (atau buat jika belum ada)\n// 2. Aktifkan mode WAL\n// 3. Jalankan CREATE TABLE IF NOT EXISTS untuk 6 tabel\n// 4. Sisipkan pengaturan sistem default jika tabel settings kosong\n```\n\n**Strategi Migrasi:**\n- Tidak ada sistem migrasi formal\n- Perubahan schema menggunakan `CREATE TABLE IF NOT EXISTS`\n- File `sqlite.ts` berfungsi sebagai source of truth definisi schema\n\n## 8.5 Pola Alur Data\n\n### Alur Penyimpanan Absensi\n\n```\n1. ESP8266 POST /api/v1/attendance/rfid\n   → INSERT attendance_sessions (status=CREATED)\n\n2. ESP32-CAM POST /api/v1/attendance/face\n   → UPDATE attendance_sessions (status=READY)\n   → SIMPAN file gambar ke storage/uploads/\n\n3. Verification Service memproses sesi READY\n   → UPDATE attendance_sessions (status=PROCESSING)\n   → CALL Face Recognition Service\n   → INSERT attendance_records (status=VALID|INVALID)\n   → UPDATE attendance_sessions (status=COMPLETED)\n```\n\n### Pola Query\n\n**Laporan Absensi Harian:**\n```sql\nSELECT e.full_name, e.department, ar.category, ar.status,\n       ar.punctuality, ar.verified_at, ar.confidence\nFROM attendance_records ar\nJOIN employees e ON e.id = ar.employee_id\nWHERE DATE(ar.verified_at) = ?\nORDER BY ar.verified_at DESC\n```\n\n**Sesi Aktif (belum diverifikasi):**\n```sql\nSELECT * FROM attendance_sessions\nWHERE status IN ('CREATED', 'READY', 'PROCESSING')\nAND expires_at > datetime('now')\nORDER BY created_at DESC\n```\n\n**Ringkasan Status Perangkat:**\n```sql\nSELECT device_code, type, status, last_seen_at\nFROM devices\nORDER BY last_seen_at DESC\n```\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\09-API.md",
  "content": "# Dokumentasi API\n\n## 9.1 Gambaran Umum\n\nSemua endpoint API dilayani oleh Express Gateway pada port 3000. Endpoint diawali dengan `/api/v1/`.\n\n**Base URL:** `http://{server-ip}:3000/api/v1`\n\n**Autentikasi:** Sebagian besar endpoint memerlukan token JWT Bearer di header `Authorization`.\n\n## 9.2 Endpoint Autentikasi\n\n### POST `/api/v1/auth/login`\n\n**Tujuan:** Mengautentikasi user dan menerima token JWT.\n\n**Autentikasi:** Tidak (publik)\n\n**Request:**\n```json\n{\n  \"email\": \"admin@rfid.com\",\n  \"password\": \"password123\"\n}\n```\n\n**Response (200):**\n```json\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIs...\",\n  \"user\": {\n    \"id\": \"uuid\",\n    \"name\": \"System Admin\",\n    \"email\": \"admin@rfid.com\",\n    \"role\": \"ADMIN\"\n  }\n}\n```\n\n**Error:**\n| Status | Body |\n|--------|------|\n| 401 | `{ \"error\": \"Email atau password salah\" }` |\n| 400 | `{ \"error\": \"Email dan password harus diisi\" }` |\n\n---\n\n### POST `/api/v1/auth/register`\n\n**Tujuan:** Membuat akun user baru.\n\n**Autentikasi:** Tidak (publik)\n\n**Request:**\n```json\n{\n  \"name\": \"Operator Name\",\n  \"email\": \"operator@rfid.com\",\n  \"password\": \"securepass123\",\n  \"role\": \"OPERATOR\"\n}\n```\n\n**Response (201):** `{ \"id\": \"uuid\", \"name\": \"...\", \"email\": \"...\", \"role\": \"...\" }`\n\n---\n\n### GET `/api/v1/auth/me`\n\n**Tujuan:** Mendapatkan profil user yang sedang terautentikasi.\n\n**Autentikasi:** JWT Required\n\n**Headers:** `Authorization: Bearer {token}`\n\n**Response (200):** `{ \"id\": \"uuid\", \"name\": \"...\", \"email\": \"...\", \"role\": \"...\" }`\n\n---\n\n## 9.3 Endpoint Karyawan\n\n### GET `/api/v1/employees` (Alias: `/api/v1/students`)\n\n**Tujuan:** Mendaftar semua karyawan.\n\n**Autentikasi:** JWT Required\n\n**Parameter Query:**\n| Parameter | Tipe | Deskripsi |\n|-----------|------|-----------|\n| `search` | string | Cari berdasarkan nama/departemen |\n| `department` | string | Filter departemen |\n| `active` | boolean | Filter status aktif |\n| `page` | number | Halaman (default: 1) |\n| `pageSize` | number | Item per halaman (default: 50) |\n\n**Response (200):** `{ \"employees\": [...], \"total\": 50, \"page\": 1, \"pageSize\": 50 }`\n\n---\n\n### POST `/api/v1/employees` (Alias: `/api/v1/students`)\n\n**Tujuan:** Membuat karyawan baru dengan foto wajah opsional.\n\n**Autentikasi:** JWT Required\n\n**Content-Type:** `multipart/form-data`\n\n**Field Form:**\n| Field | Tipe | Wajib | Deskripsi |\n|-------|------|-------|-----------|\n| `full_name` | string | Ya | Nama lengkap |\n| `department` | string | Ya | Departemen |\n| `position` | string | Ya | Jabatan |\n| `rfid_uid` | string | Ya | UID kartu RFID |\n| `faceImage` | file | Tidak | Foto wajah (JPEG) |\n\n**Response (201):** Object karyawan\n\n**Error:**\n| Status | Body |\n|--------|------|\n| 400 | `{ \"error\": \"RFID UID sudah terdaftar\" }` |\n| 400 | `{ \"error\": \"Tidak ada wajah terdeteksi\" }` |\n\n---\n\n### PUT `/api/v1/employees/:id`\n\n**Tujuan:** Mengupdate karyawan yang ada.\n\n**Autentikasi:** JWT Required\n\n**Content-Type:** `multipart/form-data`\n\n**Response (200):** Object karyawan yang diupdate\n\n---\n\n### DELETE `/api/v1/employees/:id`\n\n**Tujuan:** Menghapus karyawan.\n\n**Autentikasi:** JWT Required\n\n**Response (200):** `{ \"message\": \"Karyawan berhasil dihapus\" }`\n\n---\n\n## 9.4 Endpoint Absensi\n\n### POST `/api/v1/attendance/check-rfid`\n\n**Tujuan:** Memeriksa apakah UID RFID terdaftar. Digunakan oleh ESP8266 sebelum memicu pengambilan wajah.\n\n**Autentikasi:** Tidak (perangkat IoT)\n\n**Request:**\n```json\n{\n  \"uid\": \"A1B2C3D4\",\n  \"deviceCode\": \"ESP8266-MASTER-01\",\n  \"pairingKey\": \"ROOM-1\"\n}\n```\n\n**Response (200) — Terdaftar:**\n```json\n{ \"registered\": true }\n```\n\n**Response (200) — Tidak Terdaftar (Mode Registrasi):**\n```json\n{ \"registered\": false, \"action\": \"REGISTER_CAPTURE\" }\n```\n\n**Response (200) — Tidak Terdaftar:**\n```json\n{ \"registered\": false }\n```\n\n---\n\n### POST `/api/v1/attendance/rfid`\n\n**Tujuan:** Memproses pemindaian RFID — membuat sesi absensi, menunggu korelasi wajah.\n\n**Autentikasi:** Tidak (perangkat IoT)\n\n**Request:**\n```json\n{\n  \"uid\": \"A1B2C3D4\",\n  \"deviceCode\": \"ESP8266-MASTER-01\",\n  \"pairingKey\": \"ROOM-1\"\n}\n```\n\n**Response (200) — Sukses:**\n```json\n{\n  \"status\": \"VALID\",\n  \"confidence\": 0.87,\n  \"category\": \"ENTRY\",\n  \"punctuality\": \"ON_TIME\",\n  \"message\": \"Absensi tercatat\"\n}\n```\n\n**Response (401) — Wajah Tidak Cocok:**\n```json\n{\n  \"status\": \"INVALID\",\n  \"message\": \"Wajah tidak cocok\"\n}\n```\n\n**Response (202) — Diproses:**\n```json\n{\n  \"status\": \"PROCESSING\",\n  \"message\": \"Menunggu verifikasi wajah\"\n}\n```\n\n---\n\n### POST `/api/v1/attendance/face`\n\n**Tujuan:** Menerima gambar wajah dari ESP32-CAM atau simulator frontend.\n\n**Autentikasi:** Tidak (IoT) atau JWT (web)\n\n**Headers (ESP32-CAM):**\n| Header | Nilai |\n|--------|-------|\n| `Content-Type` | `application/octet-stream` |\n| `X-UID` | UID RFID |\n| `X-Purpose` | `attendance` / `registration` |\n| `X-Device-Code` | Kode perangkat |\n| `X-Pairing-Key` | Kunci pemasangan |\n\n**Response (200):**\n```json\n{\n  \"status\": \"received\",\n  \"sessionId\": \"uuid\",\n  \"ready\": true\n}\n```\n\n---\n\n### GET `/api/v1/attendance/history`\n\n**Tujuan:** Mendapatkan riwayat absensi dengan pagination dan filter.\n\n**Autentikasi:** JWT Required\n\n**Parameter Query:**\n| Parameter | Tipe | Deskripsi |\n|-----------|------|-----------|\n| `page` | number | Halaman (default: 1) |\n| `pageSize` | number | Item per halaman (default: 20) |\n| `status` | string | Filter: `VALID`, `INVALID`, atau kosong |\n| `category` | string | Filter: `ENTRY`, `EXIT` |\n| `date` | string | Filter tanggal (ISO) |\n| `month` | string | Filter bulan (YYYY-MM) |\n| `employeeId` | string | Filter karyawan |\n\n**Response (200):**\n```json\n{\n  \"records\": [...],\n  \"total\": 150,\n  \"page\": 1,\n  \"pageSize\": 20\n}\n```\n\n---\n\n### GET `/api/v1/attendance/sessions`\n\n**Tujuan:** Mendapatkan sesi absensi aktif.\n\n**Autentikasi:** JWT Required\n\n**Response (200):** `{ \"sessions\": [...] }`\n\n---\n\n### GET `/api/v1/attendance/stream`\n\n**Tujuan:** SSE stream untuk update absensi real-time.\n\n**Autentikasi:** JWT Required\n\n**Response:** SSE stream `text/event-stream`\n\n---\n\n### GET `/api/v1/export/pdf`\n\n**Tujuan:** Export laporan absensi sebagai PDF.\n\n**Autentikasi:** JWT Required\n\n**Parameter Query:** `month`, `year`, `status`, `employeeId`\n\n**Response (200):** `application/pdf` binary\n\n---\n\n## 9.5 Endpoint Perangkat\n\n### POST `/api/v1/devices/register`\n\n**Tujuan:** Mendaftarkan perangkat IoT baru (auto-register pada heartbeat pertama).\n\n**Autentikasi:** Tidak (IoT)\n\n**Request:**\n```json\n{ \"deviceCode\": \"ESP8266-MASTER-01\", \"type\": \"RFID_READER\" }\n```\n\n**Response (201):** Object device\n\n---\n\n### POST `/api/v1/devices/heartbeat`\n\n**Tujuan:** Keepalive perangkat.\n\n**Autentikasi:** Tidak (IoT)\n\n**Request:**\n```json\n{ \"deviceCode\": \"ESP32CAM-MASTER-01\", \"type\": \"FACE_SCANNER\" }\n```\n\n**Response (200):** `{ \"status\": \"ok\", \"deviceCode\": \"...\" }`\n\n---\n\n### GET `/api/v1/devices`\n\n**Tujuan:** Mendaftar semua perangkat.\n\n**Autentikasi:** JWT Required\n\n**Response (200):** `{ \"devices\": [...] }`\n\n---\n\n## 9.6 Endpoint Pengaturan\n\n### GET `/api/v1/settings`\n\n**Tujuan:** Mendapatkan semua pengaturan sistem.\n\n**Autentikasi:** JWT Required\n\n**Response (200):**\n```json\n{\n  \"entry_start_time\": \"07:00\",\n  \"entry_end_time\": \"09:00\",\n  \"exit_start_time\": \"16:00\",\n  \"exit_end_time\": \"18:00\",\n  \"late_threshold_minutes\": \"15\"\n}\n```\n\n---\n\n### POST `/api/v1/settings`\n\n**Tujuan:** Mengupdate pengaturan sistem.\n\n**Autentikasi:** JWT Required\n\n**Response (200):** `{ \"status\": \"saved\" }`\n\n---\n\n### DELETE `/api/v1/settings/reset`\n\n**Tujuan:** Mereset semua pengaturan ke default.\n\n**Autentikasi:** JWT Required\n\n**Response (200):** `{ \"message\": \"Pengaturan direset ke default\" }`\n\n---\n\n## 9.7 Format Error Response\n\nSemua error API mengikuti struktur ini:\n\n```json\n{\n  \"error\": \"Pesan error yang bisa dibaca\",\n  \"statusCode\": 400\n}\n```\n\n**Kode Status HTTP yang Digunakan:**\n| Kode | Arti |\n|------|------|\n| 200 | Sukses |\n| 201 | Dibuat |\n| 202 | Diterima (diproses) |\n| 400 | Bad Request |\n| 401 | Tidak Terautentikasi |\n| 403 | Dilarang |\n| 404 | Tidak Ditemukan |\n| 500 | Internal Server Error |\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\10-SocketIO.md",
  "content": "# Dokumentasi Socket.IO\n\n## 10.1 Gambaran Umum\n\nSocket.IO menyediakan **komunikasi real-time bidirectional** antara server backend dan aplikasi frontend web. Digunakan untuk update absensi langsung, perubahan status perangkat, dan event registrasi.\n\n**Transport:** WebSocket dengan fallback HTTP long-polling\n**Port:** Sama dengan Express Gateway (3000)\n**Path:** `/socket.io/` (default)\n\n## 10.2 Arsitektur\n\n```\n┌──────────────────┐         ┌────────────────────┐         ┌──────────────┐\n│   Frontend React │ ◄─────► │  Socket.IO Server  │ ◄────── │  Event gRPC  │\n│   (Socket.IO     │         │  (Express Gateway) │         │  (Internal   │\n│    Client)       │         │                    │         │   EventBus)  │\n└──────────────────┘         └────────────────────┘         └──────────────┘\n\nAlur event:\n  Services emit → EventEmitter → Socket.IO Server → WebSocket → Frontend\n                                                                      │\n  Device POST → Controller → EventEmitter → Socket.IO → Frontend ◄────┘\n```\n\n## 10.3 Setup Koneksi\n\n**Server-side** (`src/gateway/realtime.ts`):\n```typescript\nconst io = new Server(httpServer, {\n  cors: { origin: \"*\" },\n});\n\nio.on(\"connection\", (socket) => {\n  const token = socket.handshake.auth.token;\n  if (token) {\n    const user = validateToken(token);\n    socket.data.user = user;\n  }\n});\n```\n\n**Client-side** (`src/services/realtime.service.ts`):\n```typescript\nconst socket = io(VITE_API_BASE_URL, {\n  auth: { token },\n  reconnection: true,\n  reconnectionDelay: 1000,\n  reconnectionAttempts: Infinity\n});\n```\n\n## 10.4 Event Client → Server\n\n### `subscribe:attendance`\n\n**Tujuan:** Berlangganan event absensi real-time.\n\n**Payload:** (tidak ada)\n\n**Aksi Server:** Join socket ke room `attendance`\n\n**Dipanggil oleh:** Frontend saat mount (di hook `useRealtimeAttendance`)\n\n---\n\n### `subscribe:device`\n\n**Tujuan:** Berlangganan event status perangkat.\n\n**Payload:** (tidak ada)\n\n**Aksi Server:** Join socket ke room `device`\n\n---\n\n## 10.5 Event Server → Client\n\n### `attendance:new`\n\n**Tujuan:** Memberi tahu frontend saat record absensi baru dibuat.\n\n**Pengirim:** `AttendanceService` setelah verifikasi sukses\n\n**Payload:**\n```json\n{\n  \"id\": \"uuid\",\n  \"employee_id\": \"uuid\",\n  \"employee_name\": \"Budi Santoso\",\n  \"department\": \"Produksi\",\n  \"rfid_uid\": \"A1B2C3D4\",\n  \"status\": \"VALID\",\n  \"category\": \"ENTRY\",\n  \"punctuality\": \"ON_TIME\",\n  \"confidence\": 0.87,\n  \"image_path\": \"uploads/abc-123.jpg\",\n  \"verified_at\": \"2024-01-01T07:30:00.000Z\"\n}\n```\n\n**Trigger:** Verifikasi absensi selesai dengan status VALID atau INVALID\n\n**Handler Frontend:**\n- `attendanceStore.pushRealtimeEvent(event)`\n- Membuat notifikasi toast\n- Merefresh history jika di halaman history\n- Mengupdate ringkasan dashboard\n\n---\n\n### `attendance:update`\n\n**Tujuan:** Memberi tahu saat status sesi absensi berubah.\n\n**Payload:**\n```json\n{\n  \"sessionId\": \"uuid\",\n  \"status\": \"COMPLETED\",\n  \"previousStatus\": \"PROCESSING\"\n}\n```\n\n**Trigger:** Sesi bertransisi antar state (CREATED → READY → PROCESSING → COMPLETED)\n\n---\n\n### `rfid:new`\n\n**Tujuan:** Memberi tahu saat kartu RFID dipindai.\n\n**Payload:**\n```json\n{\n  \"uid\": \"A1B2C3D4\",\n  \"deviceCode\": \"ESP8266-MASTER-01\",\n  \"registered\": true,\n  \"employee_name\": \"Budi Santoso\",\n  \"timestamp\": \"2024-01-01T07:30:00.000Z\"\n}\n```\n\n**Trigger:** ESP8266 mengirim POST ke `/api/v1/attendance/rfid`\n\n---\n\n### `registration:image`\n\n**Tujuan:** Memberi tahu frontend saat gambar registrasi wajah diterima dari ESP32-CAM.\n\n**Payload:**\n```json\n{\n  \"uid\": \"A1B2C3D4\",\n  \"imagePath\": \"uploads/reg-abc-123.jpg\",\n  \"timestamp\": \"2024-01-01T07:30:00.000Z\"\n}\n```\n\n**Trigger:** ESP32-CAM mengirim gambar dengan header `X-Purpose: registration`\n\n---\n\n### `device:status`\n\n**Tujuan:** Memberi tahu saat perangkat online atau offline.\n\n**Payload:**\n```json\n{\n  \"deviceCode\": \"ESP32CAM-MASTER-01\",\n  \"type\": \"FACE_SCANNER\",\n  \"status\": \"ONLINE\",\n  \"lastSeenAt\": \"2024-01-01T07:30:00.000Z\"\n}\n```\n\n**Trigger:** Heartbeat perangkat diterima, atau perangkat tidak terlihat >60 detik\n\n---\n\n### `session:created`\n\n**Tujuan:** Memberi tahu saat sesi absensi baru dibuat.\n\n**Payload:**\n```json\n{\n  \"sessionId\": \"uuid\",\n  \"rfid_uid\": \"A1B2C3D4\",\n  \"pairingKey\": \"ROOM-1\",\n  \"status\": \"CREATED\"\n}\n```\n\n---\n\n## 10.6 Alur Event\n\n### Alur Pembuatan Absensi\n\n```\n1. ESP8266 POST RFID → Gateway\n2. Gateway buat sesi → emit `session:created` via EventEmitter\n3. EventEmitter → Socket.IO → Frontend\n4. ESP32-CAM POST wajah → Gateway\n5. Gateway tambah wajah ke sesi → emit `attendance:update` (status=READY)\n6. Verifikasi proses → emit `attendance:update` (status=PROCESSING)\n7. Verifikasi selesai → emit `attendance:new` dengan record lengkap\n8. Frontend terima `attendance:new` → tambah ke history, tampilkan toast\n```\n\n### Alur Status Perangkat\n\n```\n1. ESP32-CAM POST heartbeat setiap 30s → Gateway\n2. Gateway update status → emit `device:status` via EventEmitter\n3. EventEmitter → Socket.IO → Frontend\n4. Frontend update DeviceOverview component\n\nJika tidak ada heartbeat >60s:\n5. Sistem tandai perangkat sebagai OFFLINE\n6. Gateway emit `device:status` (status=OFFLINE)\n7. Frontend tampilkan toast \"Perangkat offline\"\n```\n\n## 10.7 SSE Fallback\n\nSelain Socket.IO, sistem mendukung SSE via endpoint `/api/v1/attendance/stream`.\n\n**URL:** `GET /api/v1/attendance/stream`\n**Auth:** JWT required\n**Content-Type:** `text/event-stream`\n\n**Client:** Library `@microsoft/fetch-event-source`\n\n**Tujuan:** Fallback saat koneksi WebSocket dibatasi (misal: proxy korporat)\n\n## 10.8 Jembatan EventEmitter (`src/shared/realtime/realtime-events.ts`)\n\nBackend menggunakan Node.js `EventEmitter` sebagai message bus internal:\n\n```typescript\nconst realtimeEvents = new EventEmitter();\n// Event: attendance:new, attendance:update, rfid:new,\n//        registration:image, device:status, session:created\n```\n\n**Alur:**\n1. Service layer emit event pada `realtimeEvents` EventEmitter\n2. Gateway `realtime.ts` mendengarkan EventEmitter dan meneruskan ke Socket.IO\n3. Baik gRPC handler maupun HTTP controller bisa emit event\n\n## 10.9 Ringkasan Event Socket.IO\n\n| Event | Arah | Dipicu Oleh | Diterima Oleh | Isi Payload |\n|-------|------|-------------|---------------|-------------|\n| `attendance:new` | Server → Client | Verifikasi selesai | Frontend | Record absensi lengkap |\n| `attendance:update` | Server → Client | Perubahan state sesi | Frontend | sessionId, status |\n| `rfid:new` | Server → Client | Pemindaian RFID | Frontend | uid, deviceCode, karyawan |\n| `registration:image` | Server → Client | Capture registrasi | Frontend | uid, imagePath |\n| `device:status` | Server → Client | Heartbeat/timeout | Frontend | deviceCode, status |\n| `session:created` | Server → Client | Sesi baru | Frontend | sessionId, status |\n| `subscribe:attendance` | Client → Server | Frontend mount | Server | — |\n| `subscribe:device` | Client → Server | Frontend mount | Server | — |\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 233.4s)

_Thinking:_

Good progress. Let me write the remaining files: gRPC, Application Flow, Feature Flow, Sequence Diagram, Deployment, Troubleshooting, Best Practices.

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\11-gRPC.md",
  "content": "# Dokumentasi gRPC\n\n## 11.1 Gambaran Umum\n\ngRPC digunakan untuk **komunikasi internal service-to-service** antara Express Gateway dan lapisan logika bisnis. Menyediakan kontrak yang strongly-typed melalui Protocol Buffers.\n\n**Server:** `@grpc/grpc-js` port 50051\n**Protokol:** HTTP/2\n**Serialisasi:** Protocol Buffers (protobuf)\n**Definisi Service:** `src/proto/platform.proto` (266 baris)\n\n## 11.2 Arsitektur\n\n```\n┌────────────────────────┐         ┌────────────────────────────┐\n│   Express Gateway      │  gRPC   │   gRPC Server (port 50051) │\n│   (Port 3000)          │ ◄─────► │                            │\n│                        │         │  ┌──────────────────────┐  │\n│  ┌──────────────────┐  │         │  │  AuthService         │  │\n│  │ grpc-client.ts   │──┼─────────┼─►│  EmployeeService     │  │\n│  │ (Promisified)    │  │         │  │  DeviceService       │  │\n│  └──────────────────┘  │         │  │  AttendanceService   │  │\n│                        │         │  │  SettingsService     │  │\n│  HTTP routes call      │         │  └──────────────────────┘  │\n│  gRPC client methods   │         │                            │\n└────────────────────────┘         └────────────────────────────┘\n```\n\n## 11.3 Definisi Service\n\n### AuthService\n\n**Login(LoginRequest) returns (LoginResponse)**\n- Autentikasi user dan mengembalikan JWT\n- Request: `{ email, password }`\n- Response: `{ token, user }`\n\n**Register(RegisterRequest) returns (RegisterResponse)**\n- Membuat user baru\n- Request: `{ name, email, password, role }`\n- Response: `{ id, name, email, role }`\n\n**ValidateToken(ValidateTokenRequest) returns (ValidateTokenResponse)**\n- Memverifikasi validitas token JWT\n- Request: `{ token }`\n- Response: `{ valid, user }`\n\n### EmployeeService\n\n**Create(CreateEmployeeRequest) returns (EmployeeResponse)**\n- Membuat karyawan baru dengan data wajah opsional\n- Request: `{ full_name, department, position, rfid_uid, face_descriptor?, face_image_path? }`\n- Response: Employee object\n\n**Update(UpdateEmployeeRequest) returns (EmployeeResponse)**\n- Mengupdate karyawan yang ada\n- Request: `{ id, full_name?, department?, position?, rfid_uid?, face_descriptor?, face_image_path?, is_active? }`\n\n**FindById(FindByIdRequest) returns (EmployeeResponse)**\n- Mendapatkan karyawan berdasarkan UUID\n\n**FindAll(FindAllRequest) returns (EmployeeListResponse)**\n- Mendaftar karyawan dengan pagination\n- Response: `{ employees[], total, page, pageSize }`\n\n**Delete(DeleteRequest) returns (DeleteResponse)**\n- Menghapus karyawan\n\n**FindByRfid(FindByRfidRequest) returns (EmployeeResponse)**\n- Mencari karyawan berdasarkan UID RFID\n\n### DeviceService\n\n**Register(RegisterDeviceRequest) returns (DeviceResponse)**\n- Mendaftarkan perangkat IoT baru\n\n**Heartbeat(HeartbeatRequest) returns (HeartbeatResponse)**\n- Mengupdate timestamp last_seen perangkat\n\n**FindAll(FindAllDevicesRequest) returns (DeviceListResponse)**\n- Mendaftar semua perangkat\n\n**Update(UpdateDeviceRequest) returns (DeviceResponse)**\n- Mengupdate info perangkat\n\n### AttendanceService\n\n**CheckRfid(CheckRfidRequest) returns (CheckRfidResponse)**\n- Memeriksa apakah UID RFID terdaftar (untuk ESP8266)\n- Response: `{ registered, action? }`\n\n**HandleRfid(HandleRfidRequest) returns (HandleRfidResponse)**\n- Memproses pemindaian RFID dan membuat sesi\n\n**HandleFace(HandleFaceRequest) returns (HandleFaceResponse)**\n- Memproses gambar wajah dan menghubungkan dengan sesi\n\n**GetHistory(GetHistoryRequest) returns (AttendanceHistoryResponse)**\n- Mendapatkan riwayat absensi dengan pagination\n\n**GetSessions(GetSessionsRequest) returns (SessionListResponse)**\n- Mendapatkan sesi aktif\n\n**GetSummary(GetSummaryRequest) returns (SummaryResponse)**\n- Mendapatkan statistik ringkasan absensi\n\n**ProcessVerification(ProcessVerificationRequest) returns (ProcessVerificationResponse)**\n- Memicu verifikasi wajah untuk suatu sesi\n\n**StreamAttendances(StreamAttendancesRequest) returns (stream AttendanceEvent)**\n- Streaming endpoint untuk event absensi real-time\n\n### SettingsService\n\n**Get(GetSettingsRequest) returns (GetSettingsResponse)**\n- Mendapatkan semua pengaturan sistem\n\n**Upsert(UpsertSettingRequest) returns (UpsertSettingResponse)**\n- Membuat atau mengupdate pengaturan\n\n**Reset(ResetSettingsRequest) returns (ResetSettingsResponse)**\n- Mereset semua pengaturan ke default\n\n## 11.4 Client gRPC (`src/shared/grpc/grpc-client.ts`)\n\n**Tujuan:** Membuat client gRPC yang di-promisify untuk Gateway memanggil service.\n\n```typescript\nconst grpcClient = {\n  auth: promisifyClient(new proto.attendtrack.AuthService(...)),\n  employee: promisifyClient(new proto.attendtrack.EmployeeService(...)),\n  device: promisifyClient(new proto.attendtrack.DeviceService(...)),\n  attendance: promisifyClient(new proto.attendtrack.AttendanceService(...)),\n  settings: promisifyClient(new proto.attendtrack.SettingsService(...))\n};\n```\n\n## 11.5 Server gRPC (`src/grpc/server.ts`)\n\nMemulai server gRPC dan mendaftarkan semua handler service.\n\n## 11.6 Handler gRPC\n\n| File | Implementasi | Baris |\n|------|-------------|-------|\n| `auth.handler.ts` | AuthService | 21 |\n| `employee.handler.ts` | EmployeeService | 59 |\n| `device.handler.ts` | DeviceService | 62 |\n| `attendance.handler.ts` | AttendanceService | 139 |\n| `settings.handler.ts` | SettingsService | 59 |\n\n## 11.7 Pemetaan Error gRPC (`src/shared/grpc/grpc-error.ts`)\n\n| HTTP Status | kode gRPC |\n|-------------|-----------|\n| 400 | `INVALID_ARGUMENT` |\n| 401 | `UNAUTHENTICATED` |\n| 403 | `PERMISSION_DENIED` |\n| 404 | `NOT_FOUND` |\n| 409 | `ALREADY_EXISTS` |\n| 500 | `INTERNAL` |\n\n## 11.8 Alur Komunikasi\n\n```\nHTTP Request (dari Frontend/Device)\n  │\n  ▼\nExpress Route Handler (gateway/app.ts)\n  │\n  ▼\nModule Controller (e.g., attendance.controller.ts)\n  │\n  ▼\ngRPC Client Call (grpc-client.ts)\n  │\n  ▼  (gRPC over HTTP/2, localhost:50051)\ngRPC Handler (e.g., attendance.handler.ts)\n  │\n  ▼\nModule Service (e.g., attendance.service.ts)\n  │\n  ▼\nModule Repository (e.g., attendance.repository.ts)\n  │\n  ▼\nSQLite Database\n```\n\nKeuntungan arsitektur ini:\n- **Pemisahan concern**: Lapisan HTTP tidak tahu tentang database\n- **Contract-driven**: File proto mendefinisikan semua interface\n- **Type safety**: TypeScript types dari proto\n- **Keamanan internal**: Port gRPC (50051) tidak diekspos secara eksternal\n- **Dukungan streaming**: `StreamAttendances` menggunakan gRPC server streaming\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\12-Application-Flow.md",
  "content": "# Alur Aplikasi Lengkap\n\n## 12.1 Alur Login\n\n```\n1. User buka browser → navigasi ke http://{server-ip}:5173\n2. React app load → main.tsx render App di dalam BrowserRouter\n3. App.tsx cek token auth yang ada di localStorage\n4. Jika TIDAK ada token → redirect ke /login\n5. LoginPage render dengan form email/password\n6. User masukkan kredensial → klik Login\n7. Frontend panggil POST /api/v1/auth/login\n   → Gateway terima request\n   → Gateway panggil AuthService.Login via gRPC\n   → AuthService validasi kredensial (bcrypt compare)\n   → AuthService generate token JWT\n   → Kembalikan { token, user }\n8. Frontend simpan token + user di authStore (Zustand)\n9. authStore persist ke localStorage(\"rfid-v3-auth\")\n10. React Router navigasi ke / (Dashboard)\n11. App.tsx render AppShell dengan Sidebar + Topbar\n12. Hook useBootstrapData() jalan:\n    - Fetch employees, devices, sessions, history secara paralel\n    - Populasi attendanceStore\n13. Hook useRealtimeAttendance() jalan:\n    - Konek Socket.IO ke backend\n    - Subscribe ke event attendance:new, device:status\n14. DashboardPage render SummaryStrip + LiveFeed + DeviceOverview\n```\n\n## 12.2 Alur Absensi RFID (Alur Inti)\n\nIni adalah alur paling kritis dalam sistem:\n\n```\n1. HARDWARE: User tap kartu RFID di MFRC522 reader\n2. ESP8266 deteksi kartu → baca UID (misal: \"A1B2C3D4\")\n3. ESP8266 beep (100ms) → tampilkan \"Memproses...\" di LCD\n4. ESP8266 POST ke /api/v1/attendance/check-rfid\n   Body: { \"uid\": \"A1B2C3D4\", \"deviceCode\": \"ESP8266-MASTER-01\", \"pairingKey\": \"ROOM-1\" }\n5. GATEWAY terima request\n   → Panggil AttendanceService.CheckRfid via gRPC\n   → EmployeeRepository.findByRfid(\"A1B2C3D4\")\n   \n   KASUS A: RFID TIDAK TERDAFTAR\n   ├── Response: { \"registered\": false, \"action\": \"REGISTER_CAPTURE\" }\n   ├── ESP8266 lihat action \"REGISTER_CAPTURE\"\n   ├── Kirim \"REGISTER_CAPTURE|A1B2C3D4\" ke ESP32-CAM via Serial\n   ├── ESP32-CAM:\n   │   - Nyalakan flash LED\n   │   - Tunggu 800ms\n   │   - Flush frame buffer\n   │   - Capture foto\n   │   - POST ke /api/v1/attendance/face\n   │     Headers: X-Purpose: registration, X-UID: A1B2C3D4\n   │     Body: byte JPEG mentah\n   ├── Gateway:\n   │   - Simpan gambar ke storage/uploads/\n   │   - Emit \"registration:image\" via Socket.IO\n   │   - Panggil FaceRecognitionClient.encodeFace()\n   │   - Buat employee dengan RFID + face descriptor\n   └── Frontend tampilkan notifikasi registrasi karyawan baru\n   \n   KASUS B: RFID TERDAFTAR (ALUR NORMAL)\n   ├── Response: { \"registered\": true }\n   ├── ESP8266 tampilkan \"Mengambil Foto..\" di LCD\n   ├── Kirim \"CAPTURE|A1B2C3D4\" ke ESP32-CAM via Serial\n   ├── ESP32-CAM:\n   │   - Nyalakan flash LED\n   │   - Flush frame buffer (2 frame)\n   │   - Capture frame baru\n   │   - Matikan flash LED\n   │   - POST ke /api/v1/attendance/face\n   │     Headers: X-UID: A1B2C3D4, X-Purpose: attendance\n   │\n   ├── GATEWAY terima gambar wajah\n   │   - Simpan gambar ke storage/uploads/{uuid}.jpg\n   │   - Buat sesi absensi (status: CREATED)\n   │   - Cari sesi cocok berdasarkan pairingKey + time window\n   │   - Update sesi status ke READY\n   │   - Emit session:created via Socket.IO\n   │\n   ├── ESP8266 POST ke /api/v1/attendance/rfid (timeout 25s)\n   │   Body: { \"uid\": \"A1B2C3D4\", ... }\n   │\n   ├── GATEWAY proses RFID untuk verifikasi\n   │   - Cari sesi berdasarkan pairingKey\n   │   - Cari karyawan berdasarkan UID RFID\n   │   - Ambil face descriptor tersimpan\n   │   - Panggil FaceRecognitionClient.verifyFace()\n   │     → POST ke Python service /verify\n   │     → Payload: captured image + reference descriptor\n   │     → Python: detect face → embed → cosine distance\n   │     → Return: { isMatch, distance, confidence }\n   │\n   ├── Jika COCOK (distance <= 0.45):\n   │   - Sesi status: COMPLETED\n   │   - Record absensi: VALID\n   │   - Hitung punctuality dari system settings\n   │   - Tentukan kategori (ENTRY/EXIT by time)\n   │   - Emit attendance:new via Socket.IO\n   │   - Response 200 ke ESP8266: \"Wajah Cocok! Verified\"\n   │   - LCD: \"Wajah Cocok!\" + beep panjang (500ms)\n   │\n   └── Jika TIDAK COCOK (distance > 0.45):\n       - Sesi status: FAILED\n       - Record absensi: INVALID\n       - Emit attendance:new via Socket.IO\n       - Response 400 ke ESP8266: \"Wajah Tdk Cocok\"\n       - LCD: \"Wajah Tdk Cocok\" + 3 beep error\n\n6. Setelah 3 detik → ESP8266 kembali ke idle screen\n7. Kartu RFID di-halt → siap untuk scan berikutnya\n```\n\n## 12.3 Alur Dashboard\n\n```\nDashboardPage\n│\n├── SummaryStrip\n│   ├── Hitung dari attendanceStore.summary()\n│   ├── Tampilkan: Valid Hari Ini, Invalid, Total Scan, Perangkat Online\n│   └── Update reaktif saat attendanceStore berubah\n│\n├── LiveFeed\n│   ├── Tampilkan 5 record absensi terbaru\n│   ├── Kolom: Foto, Nama, Departemen, Waktu, Kategori, Ketepatan, Status\n│   └── Auto-update via event Socket.IO\n│\n└── DeviceOverview\n    ├── Daftar semua perangkat terdaftar\n    ├── Tampilkan status online/offline\n    ├── Tampilkan alamat IP dari metadata\n    └── Update via event device:status Socket.IO\n```\n\n## 12.4 Alur Riwayat Absensi\n\n```\n1. User klik \"Log Presensi\" di sidebar\n2. Frontend navigasi ke /history\n3. HistoryPage render HistoryFilters + HistoryTable\n4. HistoryFilters inisialisasi:\n   - Dropdown karyawan dari attendanceStore.employees\n   - Month picker set ke bulan berjalan\n   - Filter status: ALL\n5. attendanceStore.fetchHistory() dipanggil:\n   - GET /api/v1/attendance/history?page=1&pageSize=20&month=2024-01\n   - Gateway → gRPC → AttendanceRepository query SQLite\n   - Return paginated records dengan join employee\n6. HistoryTable render baris dengan:\n   - Nama hari (Indonesia)\n   - Tanggal\n   - Waktu\n   - Badge kategori (Masuk/Pulang)\n   - Badge ketepatan (Tepat Waktu/Terlambat)\n   - Badge status (Sah/Tidak Sah)\n7. User bisa filter berdasarkan karyawan, bulan, tanggal, status\n   - Setiap perubahan filter trigger API call baru\n8. User klik \"Export PDF\":\n   - GET /api/v1/export/pdf?month=1&year=2024\n   - Backend generate PDF menggunakan PDFMake\n   - Response: application/pdf binary\n   - Browser download file\n```\n\n## 12.5 Alur Manajemen Karyawan\n\n```\n1. User klik \"Karyawan\" di sidebar\n2. Frontend navigasi ke /employees\n3. EmployeesPage render:\n   - Search bar\n   - Tabel karyawan (nama, departemen, jabatan, RFID, status)\n   - Tombol \"Tambah Karyawan\"\n4. Menambah karyawan baru:\n   a. Klik \"Tambah Karyawan\" → modal form terbuka\n   b. Isi: Nama, Departemen, Jabatan\n   c. Ketik atau scan UID RFID\n   d. Capture wajah via webcam (getUserMedia)\n   e. Klik \"Simpan\"\n   f. POST /api/v1/employees (multipart/form-data)\n   g. Backend:\n      - Simpan file gambar\n      - Kirim ke Python service /encode\n      - Simpan employee dengan face descriptor\n   h. Modal tutup → tabel refresh\n5. Edit karyawan:\n   a. Klik ikon edit → modal terbuka dengan data existing\n   b. Ubah field\n   c. Opsional recapture wajah\n   d. PUT /api/v1/employees/:id\n6. Hapus karyawan:\n   a. Klik ikon hapus → dialog konfirmasi\n   b. DELETE /api/v1/employees/:id\n```\n\n## 12.6 Alur Update Real-time ke Frontend\n\n```\nHOOK: useRealtimeAttendance()\n│\n├── Socket.IO konek ke backend\n├── Subscribe ke:\n│   ├── attendance:new\n│   ├── attendance:update\n│   ├── rfid:new\n│   ├── registration:image\n│   └── device:status\n│\n├── On attendance:new:\n│   ├── attendanceStore.pushRealtimeEvent(event)\n│   ├── Buat toast notification (pojok kanan atas, 5s auto-dismiss)\n│   ├── Update history jika di halaman history\n│   └── Update ringkasan dashboard\n│\n├── On device:status:\n│   ├── Update device di attendanceStore.devices\n│   ├── Jika OFFLINE → tampilkan warning toast\n│   └── Update DeviceOverview component\n│\n└── On registration:image:\n    ├── Update halaman employees dengan gambar baru\n    └── Tampilkan notifikasi sukses\n```\n\n## 12.7 Alur Monitoring Perangkat\n\n```\n1. User klik \"Monitor\" di sidebar\n2. MonitoringPage render SessionMonitor\n3. SessionMonitor fetch sesi aktif\n   GET /api/v1/attendance/sessions?status=READY\n4. Setiap kartu sesi tampilkan:\n   - Gambar wajah (jika sudah di-capture)\n   - UID RFID\n   - Status (CREATED → READY → PROCESSING → COMPLETED)\n   - Timer (waktu sejak pembuatan)\n5. Update real-time via Socket.IO\n6. Saat sesi selesai → kartu update status\n   - Jika VALID: border hijau, icon check\n   - Jika INVALID: border merah, icon X\n   - Jika EXPIRED: border abu, icon jam\n```\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "I:\\rfid_v3\\docs\\13-Feature-Flow.md",
  "content": "# Alur Fitur Lengkap\n\n## 13.1 Fitur Login\n\n**Tujuan:** Mengautentikasi pengguna untuk mengakses sistem.\n\n**Langkah-langkah:**\n1. Pengguna membuka aplikasi di browser\n2. Sistem memeriksa token JWT di localStorage\n3. Jika tidak ada token, arahkan ke halaman login\n4. Pengguna memasukkan email dan password\n5. Frontend mengirim `POST /api/v1/auth/login`\n6. Gateway meneruskan ke gRPC AuthService.Login\n7. AuthService mencari user berdasarkan email di tabel `users`\n8. Membandingkan password dengan bcrypt\n9. Jika cocok, generate JWT dengan payload `{ id, email, role }`\n10. Kembalikan `{ token, user }` ke frontend\n11. Frontend menyimpan token di localStorage dan state\n12. Redirect ke halaman dashboard\n13. Memuat data awal (karyawan, perangkat, sesi, riwayat)\n14. Menghubungkan Socket.IO untuk update real-time\n\n**Error Handling:**\n- Email tidak ditemukan → 401 \"Email atau password salah\"\n- Password salah → 401 \"Email atau password salah\"\n- Token expired → redirect ke login\n\n**Komponen Terlibat:**\n- Frontend: `login-page.tsx`, `auth-store.ts`, `auth.service.ts`\n- Backend: `auth.controller.ts`, `auth.service.ts`, `user.repository.ts`\n- gRPC: `auth.handler.ts`, `AuthService.Login`\n\n---\n\n## 13.2 Fitur Dashboard\n\n**Tujuan:** Menampilkan ringkasan absensi dan status sistem secara real-time.\n\n**Langkah-langkah:**\n1. Setelah login, sistem navigasi ke `/`\n2. `useBootstrapData()` memuat data paralel:\n   - `GET /api/v1/employees` → daftar karyawan\n   - `GET /api/v1/devices` → daftar perangkat\n   - `GET /api/v1/attendance/sessions` → sesi aktif\n   - `GET /api/v1/attendance/history?page=1&pageSize=50` → riwayat terkini\n3. `useRealtimeAttendance()` menghubungkan Socket.IO\n4. `SummaryStrip` menghitung statistik dari data riwayat\n5. `LiveFeed` menampilkan 5 record terbaru\n6. `DeviceOverview` menampilkan status perangkat\n7. Semua komponen merespon perubahan state secara reaktif\n\n**Update Real-time:**\n- Record absensi baru → `attendance:new` → update ringkasan + feed\n- Perubahan status perangkat → `device:status` → update overview\n\n---\n\n## 13.3 Fitur Manajemen Karyawan\n\n**Tujuan:** CRUD data karyawan dengan pendaftaran wajah dan RFID.\n\n**Langkah-langkah (Tambah Karyawan):**\n1. Buka halaman `/employees`\n2. Klik \"Tambah Karyawan\"\n3. Isi form: Nama, Departemen, Jabatan\n4. Masukkan UID RFID (manual atau scan simulasi)\n5. Capture wajah via webcam:\n   - Browser minta izin kamera (getUserMedia)\n   - Tampilkan preview webcam\n   - Klik \"Capture\" → ambil frame dari video\n   - Tampilkan pratinjau hasil capture\n6. Klik \"Simpan\":\n   - Frontend buat FormData dengan field + file gambar\n   - POST `/api/v1/employees` (multipart)\n7. Backend:\n   - Simpan data karyawan ke tabel `employees`\n   - Simpan file gambar ke `storage/uploads/`\n   - Kirim gambar ke Python service `POST /encode`\n   - Simpan face descriptor (128 float) di kolom `face_descriptor`\n8. Kembalikan response sukses\n9. Frontend refresh tabel karyawan\n\n**Langkah-langkah (Edit Karyawan):**\n1. Klik ikon edit pada baris karyawan\n2. Modal terbuka dengan data yang ada\n3. Ubah field yang diperlukan\n4. Opsional: recapture wajah\n5. PUT `/api/v1/employees/:id`\n6. Backend update data + face descriptor jika ada gambar baru\n\n**Langkah-langkah (Hapus Karyawan):**\n1. Klik ikon hapus\n2. Dialog konfirmasi\n3. DELETE `/api/v1/employees/:id`\n4. Hapus dari database\n5. Refresh tabel\n\n**Validasi:**\n- RFID UID harus unik\n- Nama, departemen, jabatan wajib diisi\n- Wajah harus terdeteksi jika upload foto\n\n---\n\n## 13.4 Fitur Absensi RFID\n\n**Tujuan:** Memproses absensi melalui kartu RFID dengan verifikasi wajah.\n\n**Langkah-langkah Detail:**\n1. ESP8266 membaca kartu RFID via MFRC522\n2. ESP8266 mengirim `POST /api/v1/attendance/check-rfid`\n3. Gateway memeriksa apakah UID terdaftar di tabel `employees`\n4. Jika TERDAFTAR:\n   a. ESP8266 mengirim perintah `CAPTURE|UID` ke ESP32-CAM via Serial\n   b. ESP32-CAM mengambil foto wajah\n   c. ESP32-CAM mengirim `POST /api/v1/attendance/face` dengan header `X-Purpose: attendance`\n   d. Gateway membuat sesi absensi (status: CREATED)\n   e. Gateway menyimpan gambar dan update sesi (status: READY)\n   f. ESP8266 mengirim `POST /api/v1/attendance/rfid`\n   g. Gateway melakukan verifikasi wajah:\n      - Cari karyawan berdasarkan RFID UID\n      - Ambil face descriptor tersimpan\n      - Panggil Python service `POST /verify`\n      - Bandingkan captured face dengan reference descriptor\n   h. Jika cocok:\n      - Simpan record absensi (VALID)\n      - Tentukan kategori ENTRY/EXIT\n      - Hitung punctuality\n      - Kirim response 200 ke ESP8266\n      - Emit `attendance:new` via Socket.IO\n   i. Jika tidak cocok:\n      - Simpan record absensi (INVALID)\n      - Kirim response 400 ke ESP8266\n5. Jika TIDAK TERDAFTAR:\n   - Jika mode `REGISTER_CAPTURE`:\n     - ESP8266 kirim `REGISTER_CAPTURE|UID` ke ESP32-CAM\n     - ESP32-CAM capture foto dengan header `X-Purpose: registration`\n     - Gateway buat karyawan baru dengan foto + encode face\n   - Jika tidak: ESP8266 tampilkan \"RFID TIDAK TERDAFTAR\"\n\n---\n\n## 13.5 Fitur Pengenalan Wajah\n\n**Tujuan:** Memverifikasi identitas karyawan melalui pencocokan wajah.\n\n**Langkah-langkah Enkoding (Registrasi):**\n1. Backend menerima gambar wajah dari frontend atau ESP32-CAM\n2. File gambar disimpan ke `storage/uploads/`\n3. Gambar di-convert ke base64\n4. HTTP POST ke Python service `POST /encode`\n5. Python: decode base64 → detect face (MediaPipe) → embed (Facenet128)\n6. Kembalikan array 128 float\n7. Backend simpan array sebagai JSON string di kolom `face_descriptor`\n\n**Langkah-langkah Verifikasi (Absensi):**\n1. Backend memiliki captured face image + reference descriptor\n2. HTTP POST ke Python service `POST /verify`\n3. Python: decode base64 → detect face → embed → cosine distance\n4. Bandingkan distance dengan threshold (0.45)\n5. Kembalikan `{ isMatch, distance, confidence }`\n6. Backend tentukan VALID/INVALID berdasarkan hasil\n\n**Threshold:**\n- `FACE_MATCH_THRESHOLD = 0.45` (dari .env)\n- Distance <= 0.45 → MATCH\n- Distance > 0.45 → NO MATCH\n\n---\n\n## 13.6 Fitur Pendaftaran RFID\n\n**Tujuan:** Mendaftarkan kartu RFID baru ke sistem.\n\n**Langkah-langkah:**\n1. Kartu RFID baru di-tap ke reader\n2. Backend mendeteksi UID tidak terdaftar\n3. Response: `{ registered: false, action: \"REGISTER_CAPTURE\" }`\n4. ESP8266 trigger ESP32-CAM untuk mengambil foto\n5. ESP32-CAM kirim foto dengan header `X-Purpose: registration`\n6. Gateway:\n   - Simpan gambar\n   - Emit `registration:image` via Socket.IO\n   - Encode face via Python service\n   - Buat record employee sementara\n7. Frontend menerima event → tampilkan notifikasi\n8. Admin melengkapi data karyawan (nama, departemen, jabatan)\n\n---\n\n## 13.7 Fitur Log Absensi\n\n**Tujuan:** Menampilkan riwayat absensi dengan filter dan pagination.\n\n**Langkah-langkah:**\n1. Buka halaman `/history`\n2. Filter default: bulan berjalan\n3. `GET /api/v1/attendance/history` dengan parameter filter\n4. Backend query `attendance_records` JOIN `employees`\n5. Kembalikan data ter-paginate\n6. Tabel menampilkan:\n   - Nama hari (Senin, Selasa, ...)\n   - Tanggal\n   - Waktu\n   - Kategori badge (Masuk/Pulang)\n   - Ketepatan badge (Tepat Waktu/Terlambat)\n   - Status badge (Sah/Tidak Sah)\n7. Pagination: Previous/Next\n8. Filter: ganti bulan, tanggal, status, karyawan\n\n---\n\n## 13.8 Fitur Laporan Absensi\n\n**Tujuan:** Export laporan absensi sebagai PDF.\n\n**Langkah-langkah:**\n1. Atur filter (bulan, tahun, status, karyawan)\n2. Klik \"Export PDF\"\n3. `GET /api/v1/export/pdf` dengan parameter\n4. Backend query data absensi dengan filter\n5. Generate PDF menggunakan PDFMake:\n   - Header: judul + periode\n   - Tabel: No, Nama, Departemen, Tanggal, Jam Masuk, Jam Pulang, Status\n   - Footer: total karyawan, ringkasan\n6. Kembalikan file PDF (application/pdf)\n7. Browser download file\n\n---\n\n## 13.9 Fitur Monitoring Perangkat\n\n**Tujuan:** Memonitor status perangkat IoT secara real-time.\n\n**Langkah-langkah:**\n1. Setiap 30 detik, ESP32-CAM mengirim heartbeat\n   `POST /api/v1/devices/heartbeat`\n2. Backend update `last_seen_at` dan `status = ONLINE`\n3. Backend emit `device:status` via Socket.IO\n4. Jika tidak ada heartbeat > 60 detik:\n   - Backend set `status = OFFLINE`\n   - Emit `device:status` dengan status OFFLINE\n5. Frontend:\n   - Update status di `DeviceOverview`\n   - Tampilkan toast jika perangkat offline\n6. Halaman `/monitoring`:\n   - Tampilkan sesi absensi aktif\n   - Update real-time saat sesi berubah status\n\n---\n\n## 13.10 Fitur Simulator Perangkat\n\n**Tujuan:** Menguji alur absensi tanpa hardware fisik.\n\n**Langkah-langkah:**\n1. Buka halaman `/simulator`\n2. Konfigurasi device code dan pairing key\n3. Masukkan UID RFID manual\n4. Capture wajah dari webcam browser\n5. Klik \"Send Attendance\"\n6. Frontend kirim `POST /api/v1/attendance/face` (multipart)\n7. Sama seperti alur dari ESP32-CAM\n8. Tampilkan response dari backend\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 693.8s)

---

