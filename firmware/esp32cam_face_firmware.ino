#include "esp_camera.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ================= CONFIG =================
const char* ssid = "Ikannn";
const char* password = "11122233344556";
const char* serverUrl = "http://10.16.199.114:3000";

const char* deviceCode = "ESP32CAM-MASTER-01";
const char* pairingKey = "ROOM-1";

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
#define TX2_PIN 12 // Pin TX untuk mengirim data balik ke ESP8266

unsigned long lastHeartbeat = 0;

// ================= WIFI CONNECT =================
void connectWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting WiFi");

  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < 20) {
    delay(500);
    Serial.print(".");
    retry++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected!");
  } else {
    Serial.println("\nWiFi Failed!");
  }
}

// ================= CAMERA INIT =================
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

  // 🔥 FIX: logika dibalik dari kode kamu
  if(psramFound()){
    config.frame_size = FRAMESIZE_SVGA; // besar kalau ada PSRAM
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_VGA;  // kecil kalau tidak ada
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.println("Camera init failed");
    ESP.restart();
  }
}

// ================= HEARTBEAT =================
void sendHeartbeat() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(String(serverUrl) + "/api/v1/devices/heartbeat");
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

// ================= CAPTURE & SEND =================
void captureAndSend(String uid) {
  // 1. Nyalakan Flash sebagai indikator dan penerang
  digitalWrite(FLASH_GPIO_NUM, HIGH);
  
  // 2. Beri waktu yang cukup (800ms) agar sensor kamera menyesuaikan Auto-Exposure (AEC)
  delay(800); 

  // 3. DUMMY CAPTURE (BUANG FRAME LAMA)
  camera_fb_t * dummy_fb = esp_camera_fb_get();
  if (dummy_fb) {
    esp_camera_fb_return(dummy_fb); // buang
  }
  
  delay(50); // Jeda singkat untuk buffer

  // 4. AMBIL FRAME ASLI YANG SEKARANG (REAL-TIME)
  camera_fb_t * fb = esp_camera_fb_get();

  // 5. Matikan Flash segera setelah capture selesai agar tidak boros
  digitalWrite(FLASH_GPIO_NUM, LOW);

  if(!fb) {
    Serial.println("Capture failed");
    Serial2.println("RESULT|FAILED");
    return;
  }

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // Pastikan URL Server benar
    http.begin(String(serverUrl) + "/api/v1/attendance/face");
    http.setTimeout(20000); // Beri waktu lebih lama untuk upload gambar dan inferensi wajah

    // Gunakan Binary Upload (Octet-Stream) agar ringan dan stabil
    http.addHeader("Content-Type", "application/octet-stream");
    http.addHeader("X-UID", uid);
    http.addHeader("X-Device-Code", deviceCode);
    http.addHeader("X-Pairing-Key", pairingKey);

    Serial.println("Sending binary image for UID: " + uid);
    
    // Ini adalah fungsi standar yang didukung ESP32 Core 2.0.17
    int httpCode = http.POST(fb->buf, fb->len);

    if (httpCode > 0) {
      Serial.printf("Response: %d\n", httpCode);
      if (httpCode == 200 || httpCode == 201) {
        Serial2.println("RESULT|SUCCESS");
      } else {
        Serial2.println("RESULT|FAILED");
      }
      // Jika ingin melihat balasan server:
      // String payload = http.getString();
      // Serial.println(payload);
    } else {
      Serial.printf("Error: %s\n", http.errorToString(httpCode).c_str());
      Serial2.println("RESULT|FAILED");
    }

    http.end();
  } else {
    Serial.println("WiFi not connected, cannot send");
    Serial2.println("RESULT|FAILED");
  }

  esp_camera_fb_return(fb);
}


// ================= SETUP =================
void setup() {
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, RX2_PIN, TX2_PIN);

  pinMode(FLASH_GPIO_NUM, OUTPUT);
  digitalWrite(FLASH_GPIO_NUM, LOW);

  initCamera();
  connectWiFi();
}

// ================= LOOP =================
void loop() {
  // Heartbeat tiap 30 detik
  if (millis() - lastHeartbeat > 30000) {
    sendHeartbeat();
    lastHeartbeat = millis();
  }

  // Reconnect WiFi jika putus
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  // Baca serial dari ESP8266
  if (Serial2.available()) {
    String msg = Serial2.readStringUntil('\n');
    msg.trim();

    if (msg.startsWith("CAPTURE|")) {
      String uid = msg.substring(8);

      Serial.println("CMD: CAPTURE");
      captureAndSend(uid);
    }
  }
}