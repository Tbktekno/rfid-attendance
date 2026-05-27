export interface CreateEmployeeDto {
  fullName: string;
  department?: string;
  position?: string;
  rfidUid: string;
  faceImagePath?: string;
  faceImageBase64?: string;
  isActive?: boolean;
}

export interface UpdateEmployeeDto {
  id: string;
  fullName?: string;
  department?: string;
  position?: string;
  rfidUid?: string;
  faceImagePath?: string;
  faceImageBase64?: string;
  isActive?: boolean;
}

export interface ListEmployeesQuery {
  search?: string;
}
