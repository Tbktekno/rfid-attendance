import { useMemo, useState } from "react";
import { FileText, CheckCircle2, X } from "lucide-react";
import { useAttendanceStore } from "../../state/attendance-store";
import { attendanceService } from "../../services/attendance.service";

export const HistoryFilters = () => {
  const employees = useAttendanceStore((state) => state.employees);
  const statusFilter = useAttendanceStore((state) => state.statusFilter);
  const deptFilter = useAttendanceStore((state) => state.deptFilter);
  const dateFilter = useAttendanceStore((state) => state.dateFilter);
  const monthFilter = useAttendanceStore((state) => state.monthFilter);
  const employeeFilter = useAttendanceStore((state) => state.employeeFilter);
  const setStatusFilter = useAttendanceStore((state) => state.setStatusFilter);
  const setDeptFilter = useAttendanceStore((state) => state.setDeptFilter);
  const setDateFilter = useAttendanceStore((state) => state.setDateFilter);
  const setMonthFilter = useAttendanceStore((state) => state.setMonthFilter);
  const setEmployeeFilter = useAttendanceStore((state) => state.setEmployeeFilter);
  
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const monthOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentYear, i, 1);
      const value = `${currentYear}-${String(i + 1).padStart(2, '0')}`;
      const label = date.toLocaleString('id-ID', { month: 'long' });
      return { value, label };
    });
  }, [currentYear]);

  const deptOptions = useMemo(
    () => ["ALL", ...new Set(employees.map((employee) => employee.department).filter(Boolean))],
    [employees]
  );

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await attendanceService.exportPdf({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        date: dateFilter || undefined,
        month: monthFilter || undefined,
        employeeId: employeeFilter || undefined
      });
      // Show the beautiful success modal
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Gagal mengekspor PDF", error);
      alert("Gagal mengekspor PDF. Silakan coba lagi.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <section className="p-5 border-b border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Karyawan</label>
            <select
              value={employeeFilter}
              onChange={(event) => setEmployeeFilter(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            >
              <option value="">Semua Karyawan</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Bulan (Laporan)</label>
            <select
              value={monthFilter}
              onChange={(event) => setMonthFilter(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            >
              <option value="">Pilih Bulan</option>
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tanggal (Harian)</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Departemen</label>
            <select
              value={deptFilter}
              onChange={(event) => setDeptFilter(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            >
              {deptOptions.map((item) => (
                <option key={item} value={item}>
                  {item === "ALL" ? "Semua" : item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Status</label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "ALL" | "VALID" | "INVALID")}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            >
              <option value="ALL">Semua</option>
              <option value="VALID">Valid</option>
              <option value="INVALID">Invalid</option>
            </select>
          </div>
          <div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50 h-[38px]"
            >
              <FileText className="h-4 w-4" />
              {isExporting ? "Mengekspor..." : "Ekspor PDF"}
            </button>
          </div>
        </div>
      </section>

      {/* Modern Premium Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
          <div className="relative w-full max-w-md scale-100 overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Checkmark Icon Container */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Laporan Berhasil Diekspor!
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Dokumen PDF riwayat absensi karyawan telah berhasil dibuat dan diunduh ke perangkat Anda. Silakan periksa folder unduhan Anda.
            </p>

            {/* Action Button */}
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </>
  );
};
