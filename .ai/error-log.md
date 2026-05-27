# AI Error Log

### [2026-04-28 17:33:00] Missing Import and Implicit Any in AttendanceController

- Context: Transitioning from Student to Employee system.
- Requested task: Refactor the entire system.
- What was generated: `AttendanceController` was missing the `upload` import and had an implicit `any` parameter `err`.
- What was wrong: Compilation error `TS2304: Cannot find name 'upload'` and `TS7006`.
- Root cause: Careless refactoring of a large file without running `tsc` immediately.
- Fix applied: Added import and explicit type.
- Prevention rule: Always run `npx tsc --noEmit` after major refactoring of controllers or services.
- Affected files: `src/modules/attendance/controller/attendance.controller.ts`
- Status: fixed

### [2026-04-28 17:35:00] gRPC Server Startup Failure (Database Schema Mismatch)

- Context: Transitioning from Student to Employee system.
- Requested task: Refactor the entire system.
- What was generated: New schema with `employees` table and `employee_id` in `attendance_records`, but no migration for existing DB.
- What was wrong: Runtime error when starting gRPC server because `sqlite.ts` tried to create an index on a non-existent `employee_id` column.
- Root cause: Assumed a fresh database start or manual migration without providing an automated one.
- Fix applied: Added an automated migration in `sqlite.ts` to add `employee_id` to `attendance_records` if missing.
- Prevention rule: When renaming tables or columns in `sqlite.ts`, always include a migration check for existing columns/tables.
- Affected files: `src/shared/database/sqlite.ts`
- Status: fixed

### [2026-04-28 17:37:00] 404 Error for /api/v1/students

- Context: Transitioning from Student to Employee system.
- Requested task: Refactor the entire system.
- What was generated: Renamed `/api/v1/students` to `/api/v1/employees` in the gateway.
- What was wrong: Frontend was still calling the old endpoint, resulting in 404.
- Root cause: Breaking backward compatibility with the frontend without notice.
- Fix applied: Added aliased routes in `app.ts` and aliased `studentId` in `attendance.dto.ts`.
- Prevention rule: When refactoring public APIs, maintain backward compatibility aliases if the frontend is not updated simultaneously.
- Affected files: `src/gateway/app.ts`, `src/modules/attendance/dto/attendance.dto.ts`
- Status: fixed

### [2026-04-28 17:40:00] Frontend Crash (TypeError: students is undefined)

- Context: Transitioning from Student to Employee system.
- Requested task: Refactor the entire system.
- What was generated: Response JSON key changed from `students` to `employees`.
- What was wrong: Frontend crashed with `TypeError: can't access property "filter", students is undefined`.
- Root cause: Missing backward compatibility for response keys and object properties (`name` vs `fullName`, `className` vs `department`).
- Fix applied: Added `students`, `student`, `name`, and `className` aliases in `EmployeeController` and `employee.handler.ts`.
- Prevention rule: When renaming core entities, maintain property aliases in the API layer until the frontend is fully migrated.
- Affected files: `src/modules/employee/controller/employee.controller.ts`, `src/grpc/handlers/employee.handler.ts`
- Status: fixed

### [2026-05-09 19:10:00] PDF Export Implementation

- Context: User requested PDF export for attendance data.
- Requested task: Implement PDF export system.
- What was generated: Added PdfGenerator utility, updated AttendanceController and gateway routes.
- What was wrong: Initial PdfGenerator had compilation errors (PdfPrinter constructor and implicit any).
- Root cause: Complexity of pdfmake types in Node.js and strict TS rules.
- Fix applied: Used @ts-ignore for PdfPrinter constructor and added explicit Buffer type to chunks.
- Prevention rule: Always verify third-party library constructor types when using TypeScript in Node.js.
- Affected files: src/shared/utils/pdf-generator.ts, src/modules/attendance/controller/attendance.controller.ts, src/gateway/app.ts
- Status: fixed

### [2026-05-09 19:14:00] pdfmake Runtime TypeError

- Context: Starting gateway with pdfmake.
- Requested task: Fix runtime error.
- What was generated: import PdfPrinter from " pdfmake\
- What was wrong: TypeError: import_pdfmake.default is not a constructor.
- Root cause: ESM/CJS interop issues with pdfmake in tsx environment.
- Fix applied: Changed to const PdfPrinter = require(\pdfmake\).
- Prevention rule: Use require() for libraries with problematic ESM exports in Node.js TS projects.
- Affected files: src/shared/utils/pdf-generator.ts
- Status: fixed

### [2026-05-09 19:17:00] pdfmake 0.3.x Architecture Mismatch

- Context: Migrated to pdfmake 0.3.8.
- Requested task: Fix PdfPrinter is not a constructor error.
- What was generated: const printer = new PdfPrinter(fonts)
- What was wrong: TypeError: PdfPrinter is not a constructor.
- Root cause: pdfmake 0.3.x changed its API to a singleton-based approach with a different internal class structure.
- Fix applied: Refactored to use pdfmake.setFonts(fonts) and pdfmake.createPdf(docDefinition).getBuffer().
- Prevention rule: When upgrading libraries, always check if the core constructor API has changed to a singleton or factory pattern.
- Affected files: src/shared/utils/pdf-generator.ts
- Status: fixed

### [2026-05-09 19:33:00] Export PDF Failure due to Zod Validation Limit

- Context: Exporting PDF requested 1000 records.
- Requested task: Fix 500 error on export PDF.
- What was generated: limit: 1000 in AttendanceController.
- What was wrong: gRPC DTO restricted limit to max 500.
- Root cause: Mismatch between controller request limit and DTO validation rules.
- Fix applied: Increased max limit in attendanceHistorySchema to 1000.
- Prevention rule: When setting hardcoded limits in controllers, verify they comply with the DTO validation rules in the shared modules.
- Affected files: src/modules/attendance/dto/attendance.dto.ts
- Status: fixed

### [2026-05-09 19:36:00] Unknown Font Format in PDF Export

- Context: pdfmake failed to generate report due to font issue.
- Requested task: Fix Unknown font format error.
- What was wrong: Font files (Roboto-Regular.ttf, Roboto-Bold.ttf) were actually HTML error pages.
- Root cause: Incorrect download URLs or GitHub raw access issues in previous attempts.
- Fix applied: Re-downloaded fonts using direct raw=true GitHub URLs (approx 200KB each).
- Prevention rule: Always verify the size and magic bytes of downloaded assets (fonts, images) to ensure they are valid binaries and not HTML error pages.
- Affected files: src/assets/fonts/Roboto-Regular.ttf, src/assets/fonts/Roboto-Bold.ttf
- Status: fixed

### [2026-05-09 19:47:00] Unknown Font Format due to Corrupted TTF Files

- Context: pdfmake failed to load Roboto TTF files for PDF generation.
- Requested task: Fix 500 error on export PDF.
- What was wrong: The downloaded TTF files were still corrupted or invalid, causing fontkit to throw an Unknown font format error.
- Root cause: Difficulty in reliably downloading raw binary TTF files from GitHub/CDNs using CLI tools without encountering HTML error pages or package size limits.
- Fix applied: Removed dependency on external TTF files entirely by switching PdfGenerator to use pdfmake's built-in standard font (Helvetica).
- Prevention rule: When generating PDFs on the backend, prefer built-in standard fonts (like Helvetica, Courier, Times) unless custom branding is strictly required, to avoid file system and binary parsing complexities.
- Affected files: src/shared/utils/pdf-generator.ts
- Status: fixed

### [2026-05-09 20:25:00] CORS Network Error on PDF Export

- Context: Frontend Axios request for PDF export failed with CORS Network Error.
- Requested task: Fix Permintaan Cross-Origin Ditolak.
- What was wrong: Gateway using default cors() did not expose Content-Disposition header, and when previous 500 errors occurred, they masked the CORS headers causing browser to block the response.
- Root cause: Missing explicit exposedHeaders in CORS config.
- Fix applied: Updated app.use(cors({ ... })) to explicitly allow origins, methods, and expose Content-Disposition header.
- Prevention rule: Always explicitly configure CORS with exposedHeaders when building endpoints that return file downloads (blobs/arraybuffers).
- Affected files: src/gateway/app.ts
- Status: fixed
