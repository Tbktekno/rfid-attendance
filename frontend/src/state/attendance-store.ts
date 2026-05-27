import { create } from "zustand";
import { isToday, parseISO } from "date-fns";
import { attendanceService } from "../services/attendance.service";
import type {
  AttendanceRecord,
  AttendanceSession,
  AttendanceSummary,
  Device,
  RealtimeMessage,
  Employee,
  ToastMessage
} from "../types/domain";

interface AttendanceState {
  employees: Employee[];
  devices: Device[];
  sessions: AttendanceSession[];
  history: AttendanceRecord[];
  totalRecords: number;
  page: number;
  pageSize: number;
  events: RealtimeMessage[];
  toasts: ToastMessage[];
  statusFilter: "ALL" | "VALID" | "INVALID";
  deptFilter: string;
  dateFilter: string;
  isLoading: boolean;
  isStreaming: boolean;
  refreshAll: () => Promise<void>;
  fetchHistory: (page?: number, limit?: number) => Promise<void>;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setStreaming: (value: boolean) => void;
  pushRealtimeEvent: (message: RealtimeMessage) => void;
  dismissToast: (id: string) => void;
  setStatusFilter: (value: "ALL" | "VALID" | "INVALID") => void;
  setDeptFilter: (value: string) => void;
  setDateFilter: (value: string) => void;
  summary: () => AttendanceSummary;
  // Backward compatibility
  students: Employee[];
}

const makeToast = (message: RealtimeMessage): ToastMessage | null => {
  if (message.type === "attendance.verification.completed") {
    return {
      id: `${message.type}-${message.payload.sessionId}-${Date.now()}`,
      kind: "success",
      title: "Verifikasi selesai",
      description: `Sesi ${message.payload.correlationId ?? message.payload.sessionId ?? ""} telah diperbarui.`
    };
  }

  if (message.type === "attendance.verification.failed") {
    return {
      id: `${message.type}-${message.payload.sessionId}-${Date.now()}`,
      kind: "error",
      title: "Verifikasi gagal",
      description: `Sesi ${message.payload.correlationId ?? message.payload.sessionId ?? ""} perlu dicek ulang.`
    };
  }

  if (message.type === "attendance.session.updated") {
    return {
      id: `${message.type}-${message.payload.sessionId}-${Date.now()}`,
      kind: "info",
      title: "Scan baru masuk",
      description: `RFID atau foto baru diterima untuk sesi ${message.payload.correlationId ?? ""}.`
    };
  }

  return null;
};

const getTodayStr = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  employees: [],
  students: [],
  devices: [],
  sessions: [],
  history: [],
  totalRecords: 0,
  page: 1,
  pageSize: 10,
  events: [],
  toasts: [],
  statusFilter: "ALL",
  deptFilter: "ALL",
  dateFilter: getTodayStr(),
  isLoading: false,
  isStreaming: false,
  async refreshAll() {
    set({ isLoading: true });

    try {
      const { page, pageSize, statusFilter, dateFilter, deptFilter } = get();
      const [employees, devices, sessions, historyData] = await Promise.all([
        attendanceService.getEmployees(),
        attendanceService.getDevices(),
        attendanceService.getSessions(),
        attendanceService.getHistory({ 
          page, 
          limit: pageSize, 
          status: statusFilter === "ALL" ? undefined : statusFilter,
          date: dateFilter || undefined,
          // Note: Backend might not support dept filter yet in query, but we send it
        })
      ]);

      set({
        employees,
        students: employees, // Alias
        devices,
        sessions,
        history: historyData.records,
        totalRecords: historyData.totalRecords,
        isLoading: false
      });
    } catch {
      set({ isLoading: false });
    }
  },
  async fetchHistory(page, limit) {
    const p = page ?? get().page;
    const l = limit ?? get().pageSize;
    const { statusFilter, dateFilter, deptFilter } = get();
    
    set({ isLoading: true });
    try {
      const data = await attendanceService.getHistory({
        page: p,
        limit: l,
        status: statusFilter === "ALL" ? undefined : statusFilter,
        date: dateFilter || undefined
      });
      set({ 
        history: data.records, 
        totalRecords: data.totalRecords, 
        page: p, 
        pageSize: l,
        isLoading: false 
      });
    } catch {
      set({ isLoading: false });
    }
  },
  setPage(page) {
    get().fetchHistory(page);
  },
  setPageSize(size) {
    get().fetchHistory(1, size);
  },
  setStreaming(value) {
    set({ isStreaming: value });
  },
  pushRealtimeEvent(message) {
    const toast = makeToast(message);
    set((state) => ({
      events: [message, ...state.events].slice(0, 20),
      toasts: toast ? [toast, ...state.toasts].slice(0, 5) : state.toasts
    }));
  },
  dismissToast(id) {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  },
  setStatusFilter(value) {
    set({ statusFilter: value, page: 1 });
    get().fetchHistory(1);
  },
  setDeptFilter(value) {
    set({ deptFilter: value, page: 1 });
    get().fetchHistory(1);
  },
  setDateFilter(value) {
    set({ dateFilter: value, page: 1 });
    get().fetchHistory(1);
  },
  summary() {
    const { history, sessions, devices } = get();
    const todayRecords = history.filter((record) => isToday(parseISO(record.verifiedAt)));
    const validToday = todayRecords.filter((record) => record.status === "VALID").length;
    const invalidToday = todayRecords.filter((record) => record.status === "INVALID").length;
    const activeSessions = sessions.filter((session) => session.status === "PENDING" || session.status === "READY").length;
    const onlineDevices = devices.filter((device) => device.isOnline).length;

    return {
      totalToday: todayRecords.length,
      validToday,
      invalidToday,
      activeSessions,
      onlineDevices,
      verificationRate: todayRecords.length ? Math.round((validToday / todayRecords.length) * 100) : 0
    };
  }
}));
