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
      lcd.print("CONNECTING WIFI");
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
        lcd.print("WIFI CONNECTED");
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
  http.setTimeout(20000);
  
  int verifyCode = http.POST(payload);
  String responseBody = http.getString();
  String verifyStatus = "";
  {
    StaticJsonDocument<256> doc;
    deserializeJson(doc, responseBody);
    verifyStatus = doc["status"].as<String>();
  }

  lcd.clear();
  if (verifyStatus == "NO_FACE") {
    lcd.print("Tidak Ada Wajah");
    lcd.setCursor(0, 1);
    lcd.print("Arahkan Kamera");
    beep(100); delay(50); beep(100);
  } else if (verifyCode == 200) {
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
