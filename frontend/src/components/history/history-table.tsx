import { ChevronLeft, ChevronRight, LogIn, LogOut } from "lucide-react";
import { useAttendanceStore } from "../../state/attendance-store";
import { StatusBadge } from "../common/status-badge";
import { formatDateTime } from "../../utils/format";
import { resolveCaptureUrl } from "../../utils/image";
import type { AttendanceRecord } from "../../types/domain";

const PunctualityBadge = ({ value, category, view }: { value?: AttendanceRecord["punctuality"]; category?: AttendanceRecord["category"]; view?: "log" | "report" }) => {
  if (!value) return null;
  
  const config: Record<string, { label: string; className: string }> = {
    ON_TIME: { label: "Tepat Waktu", className: "bg-emerald-100 text-emerald-700" },
    LATE: { label: "Terlambat", className: "bg-rose-100 text-rose-700" },
    EARLY_EXIT: { label: "Pulang Terlalu Awal", className: "bg-amber-100 text-amber-700" },
    OVERTIME: { label: "Lembur", className: "bg-purple-100 text-purple-700" },
    BOLOS: { label: "Tidak Hadir", className: "bg-red-100 text-red-700" },
  };

  if (view === "report" && value === "BOLOS") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-red-600 text-white shadow-sm">
        Bolos
      </span>
    );
  }

  const item = config[value];
  if (!item) return null;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${item.className}`}>
      {item.label}
    </span>
  );
};

export const HistoryTable = () => {
  const employees = useAttendanceStore((state) => state.employees);
  const history = useAttendanceStore((state) => state.history);
  const totalRecords = useAttendanceStore((state) => state.totalRecords);
  const page = useAttendanceStore((state) => state.page);
  const pageSize = useAttendanceStore((state) => state.pageSize);
  const setPage = useAttendanceStore((state) => state.setPage);
  const setPageSize = useAttendanceStore((state) => state.setPageSize);
  const isLoading = useAttendanceStore((state) => state.isLoading);
  const view = useAttendanceStore((state) => state.view);

  const totalPages = Math.ceil(totalRecords / pageSize);
  const startRange = (page - 1) * pageSize + 1;
  const endRange = Math.min(page * pageSize, totalRecords);

  return (
    <section className="flex flex-col h-full">
      <div className="flex-1 overflow-x-auto min-h-[400px]">
        <table className="min-w-full text-left relative">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-200 sticky top-0 z-10">
            <tr>
              <th className="px-5 py-3">Karyawan</th>
              <th className="px-5 py-3">Capture</th>
              <th className="px-5 py-3">Hari</th>
              <th className="px-5 py-3">Tanggal</th>
              <th className="px-5 py-3">Jam</th>
              <th className="px-5 py-3">Jenis Presensi</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Keterangan</th>
            </tr>
          </thead>
          <tbody className={isLoading ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
            {history.length === 0 ? (
               <tr>
                 <td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-500">
                   {isLoading ? "Memuat data..." : "Tidak ada data absensi."}
                 </td>
               </tr>
            ) : history.map((record) => {
              const employeeId = record.employeeId || record.studentId;
              const employee = employees.find((item) => item.id === employeeId);
              const captureUrl = resolveCaptureUrl(record.imagePath);

              const dateObj = new Date(record.verifiedAt);
              const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
              const dayName = days[dateObj.getDay()] || "-";

              const dateStr = dateObj.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              });

              const timeStr = dateObj.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
              });

              return (
                <tr key={record.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition">
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">{record.employeeName || record.studentName || employee?.fullName || "Tidak dikenali"}</p>
                    <p className="text-[11px] text-slate-500">
                      {employee?.department || "-"} · {employee?.position || "-"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    {captureUrl ? (
                      <img src={captureUrl} alt={record.employeeName} className="h-10 w-10 rounded object-cover border border-slate-200" />
                    ) : (
                      <div className="h-10 w-10 rounded bg-slate-200 border border-slate-300" />
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">{dayName}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">{dateStr}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">{timeStr}</td>
                  <td className="px-5 py-4">
                    {view === "report" && record.punctuality === "BOLOS" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 uppercase">
                        Tidak Masuk
                      </span>
                    ) : record.category === "ENTRY" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 uppercase">
                        <LogIn className="h-3.5 w-3.5" /> Masuk
                      </span>
                    ) : record.category === "EXIT" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 uppercase">
                        <LogOut className="h-3.5 w-3.5" /> Pulang
                      </span>
                    ) : view === "log" && record.punctuality === "BOLOS" ? (
                      <span className="text-[11px] font-bold text-slate-400 uppercase">-</span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400 uppercase">-</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <PunctualityBadge value={record.punctuality} category={record.category} view={view} />
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{record.reason || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-5 py-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Tampilkan</span>
            <select 
              value={pageSize} 
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-pine"
            >
              {[10, 20, 30, 50, 100].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <span className="text-xs text-slate-500">
            Menampilkan <span className="font-bold text-slate-900">{totalRecords > 0 ? startRange : 0}</span> - <span className="font-bold text-slate-900">{endRange}</span> dari <span className="font-bold text-slate-900">{totalRecords}</span> data
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1 || isLoading}
            className="p-1.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <div className="flex items-center gap-1 mx-2">
             <span className="text-xs text-slate-500">Halaman</span>
             <span className="text-xs font-bold text-slate-900 px-2 py-1 bg-slate-100 rounded min-w-[24px] text-center">{page}</span>
             <span className="text-xs text-slate-500">dari {totalPages || 1}</span>
          </div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages || isLoading}
            className="p-1.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
