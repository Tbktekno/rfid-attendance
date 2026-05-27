import { useMemo } from "react";
import { Filter, LogIn, LogOut } from "lucide-react";
import { useAttendanceStore } from "../../state/attendance-store";
import { formatClock } from "../../utils/format";
import { resolveCaptureUrl } from "../../utils/image";
import { StatusBadge } from "../common/status-badge";

export const LiveFeed = () => {
  const history = useAttendanceStore((state) => state.history);
  const employees = useAttendanceStore((state) => state.employees);

  const feed = useMemo(() => history.slice(0, 5), [history]);

  return (
    <section className="panel flex h-full flex-col">
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Presensi Real-time</h3>
          <p className="text-[11px] text-slate-500 mt-1">Live stream dari gate RFID aktif</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg">Filter Dept</div>
          <div className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg">Semua Status</div>
          <button className="bg-slate-100 text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50/50 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
            <tr>
              <th className="px-5 py-3">Karyawan</th>
              <th className="px-5 py-3">Departemen</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Waktu</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Gate</th>
            </tr>
          </thead>
          <tbody>
            {feed.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                  Menunggu event absensi baru.
                </td>
              </tr>
            ) : (
              feed.map((record) => {
                const employeeId = record.employeeId || record.studentId;
                const employee = employees.find((s) => s.id === employeeId);
                const captureUrl = resolveCaptureUrl(record.imagePath);

                return (
                  <tr key={record.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                    <td className="px-5 py-3 flex items-center gap-3">
                      {captureUrl ? (
                        <img src={captureUrl} alt={record.employeeName} className="h-9 w-9 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-slate-200 border border-slate-300" />
                      )}
                      <div>
                        <p className="text-sm font-bold text-slate-900">{record.employeeName || record.studentName || employee?.fullName || "Tidak dikenali"}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{employee?.position || "-"}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-700">{employee?.department || "-"}</td>
                    <td className="px-5 py-3">
                      {record.category === "ENTRY" ? (
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                          <LogIn className="h-3 w-3" /> Masuk
                        </span>
                      ) : record.category === "EXIT" ? (
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 uppercase tracking-wide">
                          <LogOut className="h-3 w-3" /> Pulang
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-700">{formatClock(record.verifiedAt)}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col gap-1 items-start">
                        <StatusBadge value={record.status} />
                        {record.punctuality && record.punctuality !== "ON_TIME" && (
                          <span className={`text-[10px] font-bold uppercase tracking-tight ${
                            record.punctuality === 'BOLOS' ? 'text-red-600 font-extrabold' : 
                            record.punctuality === 'LATE' ? 'text-rose-500' : 'text-amber-500'
                          }`}>
                            {record.punctuality === "BOLOS" ? "⚠ Bolos" : 
                             record.punctuality === "LATE" ? "Terlambat" : "Pulang Awal"}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-500">{record.faceDeviceCode || record.rfidDeviceCode || "Unknown"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-100 flex items-center justify-between">
         <p className="text-xs text-slate-500">Menampilkan {feed.length} dari {history.length} data</p>
         <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">Prev</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">Next</button>
         </div>
      </div>
    </section>
  );
};
