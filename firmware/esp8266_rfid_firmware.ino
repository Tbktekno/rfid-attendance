/**
 * RFID Scanner Firmware for ESP8266 (SLAVE MODE)
 * Hardware: ESP8266 + MFRC522 + LCD I2C
 * 
 * Komunikasi: Mengirim data ke ESP32-CAM melalui SoftwareSerial
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

#define SS_PIN  15
#define RST_PIN 2

MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Pin 16 (D0) digunakan sebagai TX untuk mengirim ke ESP32-CAM
// RX diset ke -1 karena kita tidak menerima data balik dalam mode ini
SoftwareSerial linkSerial(-1, 16); 

unsigned long lastScanAt = 0;
const unsigned long scanCooldownMs = 3000;

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
    if (i < mfrc522.uid.size - 1) uid += " ";
  }
  uid.toUpperCase();
  return uid;
}

void setup() {
  Serial.begin(115200);   // Debug port
  linkSerial.begin(9600); // Komunikasi ke ESP32-CAM

  Wire.begin(4, 5);
  lcd.init();
  lcd.backlight();
  
  lcd.setCursor(0, 0);
  lcd.print("RFID Initializing");
  
  SPI.begin();
  mfrc522.PCD_Init();
  
  delay(1000);
  showIdle();
}

void loop() {
  if (millis() - lastScanAt < scanCooldownMs) return;

  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) return;

  String uid = readUID();
  Serial.println("UID Detected: " + uid);
  lastScanAt = millis();

  // Tampilkan di LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Kartu Terdeteksi");
  lcd.setCursor(0, 1);
  lcd.print("Wait for Camera");

  // Kirim perintah ke ESP32-CAM
  // Format: CAPTURE|UID
  String cmd = "CAPTURE|" + uid;
  linkSerial.println(cmd);
  
  delay(2000); // Tunggu proses kamera selesai
  
  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  showIdle();
}
