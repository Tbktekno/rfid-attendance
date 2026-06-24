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