import { http } from "./http";
import type { Employee } from "../types/domain";

export const employeeService = {
  async list(): Promise<Employee[]> {
    // Both endpoints work, but we prefer employees
    const { data } = await http.get<{ employees: Employee[] }>("/api/v1/employees");
    return data.employees;
  },
  async create(payload: {
    fullName: string;
    department: string;
    position: string;
    rfidUid: string;
    faceImageBase64: string;
  }): Promise<Employee> {
    const { data } = await http.post<{ employee: Employee }>("/api/v1/employees", payload);
    return data.employee;
  },
  async delete(id: string): Promise<void> {
    await http.delete(`/api/v1/employees/${id}`);
  },
  async update(id: string, payload: Partial<{
    fullName: string;
    department: string;
    position: string;
    rfidUid: string;
    faceImageBase64?: string;
  }>): Promise<Employee> {
    const { data } = await http.put<{ employee: Employee }>(`/api/v1/employees/${id}`, payload);
    return data.employee;
  }
};
