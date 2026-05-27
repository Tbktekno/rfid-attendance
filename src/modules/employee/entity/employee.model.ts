export interface EmployeeEntity {
  id: string;
  fullName: string;
  department: string | null;
  position: string | null;
  rfidUid: string;
  faceDescriptor: number[] | null;
  faceImagePath: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeRow {
  id: string;
  full_name: string;
  department: string | null;
  position: string | null;
  rfid_uid: string;
  face_descriptor: string | null;
  face_image_path: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export const mapEmployeeEntity = (row: EmployeeRow): EmployeeEntity => ({
  id: row.id,
  fullName: row.full_name,
  department: row.department,
  position: row.position,
  rfidUid: row.rfid_uid,
  faceDescriptor: row.face_descriptor ? JSON.parse(row.face_descriptor) : null,
  faceImagePath: row.face_image_path,
  isActive: Boolean(row.is_active),
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at)
});
