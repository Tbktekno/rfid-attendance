# Panduan Deployment

## 15.1 Persyaratan Sistem

### Server Backend
| Komponen | Persyaratan |
|----------|-------------|
| OS | Windows 10+, Linux (Ubuntu 20.04+), macOS |
| Node.js | v18.x atau lebih baru |
| Python | 3.10 atau lebih baru |
| RAM | Minimal 4GB (8GB direkomendasikan untuk Face Recognition) |
| Storage | Minimal 1GB free |
| Jaringan | Koneksi LAN untuk komunikasi dengan ESP8266/ESP32-CAM |

### Hardware IoT
| Perangkat | Persyaratan |
|-----------|-------------|
| ESP8266 | NodeMCU atau board ESP8266 dengan minimal 4MB flash |
| ESP32-CAM | AI-Thinker ESP32-CAM atau kompatibel |
| RFID Reader | MFRC522 dengan koneksi SPI |
| LCD | LCD 16x2 dengan modul I2C (alamat 0x27) |
| Buzzer | Active buzzer 5V |
| Catu Daya | 5V/2A untuk ESP8266 + ESP32-CAM |

## 15.2 Deployment Backend

### Langkah 1: Clone Repository
```bash
git clone <repository-url> rfid-v3
cd rfid-v3
```

### Langkah 2: Install Dependensi Node.js
```bash
npm install
```

### Langkah 3: Konfigurasi Environment
Buat file `.env` di root proyek:
```env
PORT=3000
GRPC_PORT=50051
JWT_SECRET=your-secret-key-ganti-ini
JWT_EXPIRES_IN=8h
SQLITE_PATH=storage/rfid_v3.sqlite
FACE_SERVICE_URL=http://localhost:8000
FACE_MATCH_THRESHOLD=0.45
ATTENDANCE_MATCH_WINDOW_SECONDS=20
UPLOAD_DIR=storage/uploads
LOG_LEVEL=info
```

### Langkah 4: Install & Jalankan Face Recognition Service
```bash
cd python-face-service
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python main.py
```

### Langkah 5: Jalankan Backend
```bash
# Terminal terpisah dari root proyek
npm run dev
```

Backend akan:
1. Membuat file SQLite database (`storage/rfid_v3.sqlite`) secara otomatis
2. Mendaftarkan layanan mDNS sebagai `_attendtrack._tcp`
3. Mendengarkan di port 3000 (HTTP) dan 50051 (gRPC)

### Langkah 6: Verifikasi
```bash
# Cek health endpoint
curl http://localhost:3000/api/v1/attendance/sessions

# Seharusnya kembali array kosong atau data sesi
```

## 15.3 Deployment Frontend

### Mode Development
```bash
cd frontend
npm install
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`.

### Mode Production
```bash
cd frontend
npm run build
# Hasil build di frontend/dist/
# Deploy ke web server (Nginx, Apache, dll)
```

### Konfigurasi Nginx (Production)
```nginx
server {
    listen 80;
    server_name attendtrack.local;

    root /var/www/attendtrack/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /uploads/ {
        proxy_pass http://localhost:3000;
    }
}
```

## 15.4 Deployment Firmware ESP8266

### Alat yang Diperlukan
- Arduino IDE (1.8.x atau 2.x)
- Board Manager URL: `http://arduino.esp8266.com/stable/package_esp8266com_index.json`
- Library (install via Library Manager):
  - `MFRC522` by GitHubCommunity
  - `LiquidCrystal_I2C` by Marco Schwartz
  - `ArduinoJson` by Benoit Blanchon
  - `ESP8266WebServer`
  - `ESP8266mDNS`

### Langkah-langkah
1. Buka `firmware/esp8266_rfid_firmware.ino` di Arduino IDE
2. Pilih board: `NodeMCU 1.0 (ESP-12E Module)`
3. Set port COM yang sesuai
4. Upload firmware
5. Setelah upload, ESP8266 akan membuat WiFi AP "RFID-Config"
6. Hubungkan ke AP "RFID-Config" (password: `config123`)
7. Buka browser ke `http://192.168.4.1`
8. Konfigurasi:
   - WiFi SSID & Password jaringan lokal
   - Pairing Key (misal: "ROOM-1")
   - Device Code (misal: "ESP8266-MASTER-01")
9. Klik Save & Restart

## 15.5 Deployment Firmware ESP32-CAM

### Alat yang Diperlukan
- Arduino IDE (1.8.x atau 2.x)
- Board Manager URL: `https://espressif.github.io/arduino-esp32/package_esp32_index.json`
- Library (install via Library Manager):
  - `ESP32 ESP32-Camera` by Espressif
  - `ArduinoJson` by Benoit Blanchon
  - `ESPmDNS`

### Langkah-langkah
1. Buka `firmware/esp32cam_face_firmware.ino` di Arduino IDE
2. Pilih board: `AI Thinker ESP32-CAM`
3. Set partition scheme: `Huge APP (3MB No OTA)`
4. Set port COM yang sesuai
5. Hubungkan GPIO0 ke GND untuk flashing mode
6. Upload firmware
7. Lepaskan GPIO0 dari GND, tekan RESET
8. ESP32-CAM akan mencari dan terhubung ke server backend via mDNS

## 15.6 Deployment Production (Seluruh Sistem)

### Topologi Jaringan
```
┌──────────────────┐      ┌──────────────────┐
│   Frontend       │      │   ESP8266        │
│   (Browser)      │      │   (RFID Scanner) │
└────────┬─────────┘      └────────┬─────────┘
         │ HTTP/WS                │ HTTP (mDNS)
         ▼                        ▼
┌──────────────────────────────────────────────┐
│           Server Backend                      │
│   Windows/Linux Server                        │
│   ┌─────────────────┐  ┌──────────────────┐  │
│   │ Node.js (3000)  │  │ gRPC (50051)     │  │
│   │ + Socket.IO     │  │                  │  │
│   └─────────────────┘  └──────────────────┘  │
│   ┌──────────────────────────────────────┐   │
│   │ Python Face Service (8000)           │   │
│   │ DeepFace + Facenet128               │   │
│   └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
                        ▲
                        │ Serial (SoftwareSerial)
               ┌────────┴─────────┐
               │   ESP32-CAM      │
               │   (Face Capture) │
               └──────────────────┘
```

### Checklist Deployment Production
- [ ] Ganti `JWT_SECRET` dengan nilai acak yang aman
- [ ] Set `LOG_LEVEL=warn` untuk production
- [ ] Konfigurasi firewall (buka port 3000, 50051, 8000 hanya untuk jaringan internal)
- [ ] Setup static IP untuk server backend
- [ ] Backup file SQLite secara berkala
- [ ] Monitor resource usage (RAM CPU untuk Python Face Service)
- [ ] Setup reverse proxy Nginx jika diperlukan
- [ ] Konfigurasi SSL/TLS jika akses dari luar jaringan

## 15.7 Systemd Service (Linux)

### `/etc/systemd/system/attendtrack-backend.service`
```ini
[Unit]
Description=AttendTrack Backend Server
After=network.target

[Service]
Type=simple
User=attendtrack
WorkingDirectory=/opt/attendtrack
ExecStart=/usr/bin/node dist/gateway/server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### `/etc/systemd/system/attendtrack-face.service`
```ini
[Unit]
Description=AttendTrack Face Recognition Service
After=network.target

[Service]
Type=simple
User=attendtrack
WorkingDirectory=/opt/attendtrack/python-face-service
ExecStart=/opt/attendtrack/python-face-service/.venv/bin/python main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## 15.8 Docker Deployment

### Dockerfile untuk Backend
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000 50051
CMD ["node", "dist/gateway/server.js"]
```

### Dockerfile untuk Face Service
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "main.py"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "3000:3000"
      - "50051:50051"
    volumes:
      - ./storage:/app/storage
    environment:
      - JWT_SECRET=change-this-in-production
    depends_on:
      - face-service

  face-service:
    build: ./python-face-service
    ports:
      - "8000:8000"
    volumes:
      - ./storage:/app/storage
```
