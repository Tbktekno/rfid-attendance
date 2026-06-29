import { http } from "./http";
import type { AttendanceRecord, AttendanceSession, Device, Employee } from "../types/domain";

export const attendanceService = {
  async getHistory(params: {
    page?: number;
    limit?: number;
    status?: string;
    employeeId?: string;
    studentId?: string;
    date?: string;
    month?: string;
    view?: "log" | "report";
  }): Promise<{ records: AttendanceRecord[]; totalRecords: number }> {
    const { data } = await http.get<{ records: AttendanceRecord[]; totalRecords: number }>("/api/v1/attendance/history", {
      params: { 
        page: params.page ?? 1, 
        limit: params.limit ?? 50,
        status: params.status || undefined,
        employeeId: params.employeeId || params.studentId || undefined,
        date: params.date || undefined,
        month: params.month || undefined,
        view: params.view || undefined
      }
    });
    return data;
  },
  async getSessions(): Promise<AttendanceSession[]> {
    const { data } = await http.get<{ sessions: AttendanceSession[] }>("/api/v1/attendance/sessions", {
      params: { limit: 50 }
    });
    return data.sessions;
  },
  async getDevices(): Promise<Device[]> {
    const { data } = await http.get<{ devices: Device[] }>("/api/v1/devices");
    return data.devices;
  },
  async getEmployees(): Promise<Employee[]> {
    const { data } = await http.get<{ employees: Employee[] }>("/api/v1/employees");
    return data.employees;
  },
  // Alias for backward compatibility
  async getStudents(): Promise<Employee[]> {
    return this.getEmployees();
  },
  async deleteSession(id: string): Promise<void> {
    await http.delete(`/api/v1/attendance/sessions/${id}`);
  },

  async exportPdf(params: {
    status?: string;
    employeeId?: string;
    date?: string;
    month?: string;
    view?: "log" | "report";
  }): Promise<void> {
    try {
      const response = await http.get("/api/v1/attendance/export/pdf", {
        params,
        responseType: "blob"
      });
      
      const blob = response.data instanceof Blob ? response.data : new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `attendance-report-${new Date().toISOString().split("T")[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Delay revocation slightly to ensure the browser has initiated the download
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error: any) {
      console.error("[ATTENDANCE_SERVICE] exportPdf error:", error);
      // If the download actually succeeded (status 200) but Axios/browser threw a CORS/network error after completion, ignore it
      if (error?.response?.status === 200 || error?.status === 200 || error?.message?.includes("200")) {
        return;
      }
      throw error;
    }
  }
};
