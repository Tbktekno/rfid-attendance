# RFID V3 Backend Architecture

## Components

- Express API Gateway exposes REST endpoints for frontend and IoT devices.
- gRPC service layer hosts internal module services for Auth, Student, Attendance, and Device.
- SQLite-backed attendance sessions synchronize RFID and face events without Redis.
- An in-process retry scheduler retries face verification jobs and recovers pending `READY` sessions at server startup.
- SQLite stores users, students, devices, attendance sessions, and attendance history.
- Python face service generates face descriptors and verifies captured faces against registered students.

## Attendance Flow

1. ESP8266 sends RFID UID to `/api/v1/attendance/rfid`.
2. ESP32CAM sends face photo to `/api/v1/attendance/face`.
3. API Gateway forwards requests to the internal Attendance gRPC service.
4. Attendance service persists session updates in SQLite.
5. Session correlation happens by `correlationId` or `pairingKey`.
6. Retry scheduler loads student by RFID, calls face recognition service, and stores `VALID` or `INVALID`.

## Clean Architecture Mapping

- `controller`: REST handlers in API Gateway.
- `service`: business logic and orchestration.
- `repository`: SQLite data access.
- `entity`: domain shapes and serializers.
- `dto`: request validation and transport contracts.
