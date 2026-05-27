import { sqlite } from "../../../shared/database/sqlite";
import { EmployeeEntity, EmployeeRow, mapEmployeeEntity } from "../entity/employee.model";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import { v4 as uuid } from "uuid";

export class EmployeeRepository {
  async create(dto: CreateEmployeeDto, faceDescriptor: number[] | null): Promise<EmployeeEntity> {
    const id = uuid();
    const now = new Date().toISOString();
    
    await sqlite.run(
      `INSERT INTO employees (id, full_name, department, position, rfid_uid, face_descriptor, face_image_path, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        dto.fullName,
        dto.department ?? null,
        dto.position ?? null,
        dto.rfidUid,
        faceDescriptor ? JSON.stringify(faceDescriptor) : null,
        dto.faceImagePath ?? null,
        dto.isActive ? 1 : 0,
        now,
        now
      ]
    );

    return (await this.findById(id))!;
  }

  async update(dto: UpdateEmployeeDto, faceDescriptor?: number[]): Promise<EmployeeEntity> {
    const existing = await this.findById(dto.id);
    if (!existing) {
      throw new Error("Employee not found");
    }

    const now = new Date().toISOString();
    await sqlite.run(
      `UPDATE employees 
       SET full_name = ?, department = ?, position = ?, rfid_uid = ?, face_descriptor = ?, face_image_path = ?, is_active = ?, updated_at = ?
       WHERE id = ?`,
      [
        dto.fullName ?? existing.fullName,
        dto.department ?? existing.department,
        dto.position ?? existing.position,
        dto.rfidUid ?? existing.rfidUid,
        faceDescriptor ? JSON.stringify(faceDescriptor) : (existing.faceDescriptor ? JSON.stringify(existing.faceDescriptor) : null),
        dto.faceImagePath ?? existing.faceImagePath,
        dto.isActive !== undefined ? (dto.isActive ? 1 : 0) : (existing.isActive ? 1 : 0),
        now,
        dto.id
      ]
    );

    return (await this.findById(dto.id))!;
  }

  async findById(id: string): Promise<EmployeeEntity | null> {
    const row = sqlite.get<EmployeeRow>("SELECT * FROM employees WHERE id = ?", [id]);
    return row ? mapEmployeeEntity(row) : null;
  }

  async findByRfidUid(rfidUid: string): Promise<EmployeeEntity | null> {
    const row = sqlite.get<EmployeeRow>("SELECT * FROM employees WHERE rfid_uid = ?", [rfidUid]);
    return row ? mapEmployeeEntity(row) : null;
  }

  async list(search?: string): Promise<EmployeeEntity[]> {
    const sql = search 
      ? "SELECT * FROM employees WHERE full_name LIKE ? OR department LIKE ? OR position LIKE ? ORDER BY created_at DESC"
      : "SELECT * FROM employees ORDER BY created_at DESC";
    
    const params = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];
    const rows = sqlite.all<EmployeeRow>(sql, params);
    return rows.map(mapEmployeeEntity);
  }

  async delete(id: string): Promise<void> {
    await sqlite.run("DELETE FROM employees WHERE id = ?", [id]);
  }
}
