import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, CreditCard, LogIn, LogOut, ShieldCheck, Trash2 } from "lucide-react";
import { useAttendanceStore } from "../../state/attendance-store";
import { resolveCaptureUrl } from "../../utils/image";
import { formatDateTime } from "../../utils/format";
import { StatusBadge } from "../common/status-badge";
import { ModalConfirm } from "../common/modal-confirm";
import { attendanceService } from "../../services/attendance.service";

export const SessionMonitor = () => {
  const sessions = useAttendanceStore((state) => state.sessions);
  const employees = useAttendanceStore((state) => state.employees);
  const refreshAll = useAttendanceStore((state) => state.refreshAll);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await attendanceService.deleteSession(deleteTarget);
      setDeleteTarget(null);
      refreshAll();
    } catch (error) {
      console.error("Failed to delete session:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="space-y-4">
      {sessions.map((session, index) => {
        const employee = employees.find((item) => item.rfidUid === session.rfidUid);
        const imageUrl = resolveCaptureUrl(session.faceImagePath);

        return (
          <motion.article
            key={session.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="panel grid gap-5 p-5 xl:grid-cols-[240px_1fr] bg-white border border-slate-100 shadow-sm rounded-xl relative"
            onMouseEnter={() => setHoveredId(session.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <button
              onClick={() => setDeleteTarget(session.id)}
              className={`absolute top-3 right-3 p-2 rounded-lg transition-all z-10 ${
                hoveredId === session.id
                  ? "opacity-100 text-red-400 hover:text-red-600 hover:bg-red-50"
                  : "opacity-0"
              }`}
              title="Hapus sesi"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
              {imageUrl ? (
                <img src={imageUrl} alt={employee?.fullName ?? session.correlationId} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-[180px] xl:h-full items-center justify-center text-slate-400">
                  <Camera className="h-8 w-8" />
                </div>
              )}
            </div>

            <div className="grid gap-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:pr-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sesi Presensi</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{employee?.fullName ?? "Karyawan belum dikenali"}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {employee?.department ?? "-"} · {employee?.position ?? "-"}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {new Date(session.startedAt).getHours() < 11 ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                        <LogIn className="h-3 w-3" /> Masuk
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">
                        <LogOut className="h-3 w-3" /> Pulang
                      </span>
                    )}
                  </div>
                </div>
                <StatusBadge value={session.status} />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <CreditCard className="h-3.5 w-3.5" />
                    Data RFID
                  </p>
                  <p className="mt-2 font-mono text-xs font-semibold text-slate-900">{session.rfidUid || "-"}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{session.rfidDeviceCode || "Menunggu scanner"}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verifikasi
                  </p>
                  <p className="mt-2 text-xs font-semibold text-slate-900">{session.reason || "Sedang menunggu sinkronisasi scan"}</p>
                  <p className="mt-1 text-[10px] text-slate-400">Update terakhir {formatDateTime(session.lastEventAt)}</p>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
      
      {sessions.length === 0 && (
         <div className="panel py-12 flex flex-col items-center justify-center text-slate-500">
            <Camera className="h-12 w-12 text-slate-300 mb-3" />
            <p className="text-sm">Menunggu sesi absensi baru...</p>
         </div>
      )}

      <ModalConfirm
        open={deleteTarget !== null}
        title="Hapus Sesi?"
        message="Apakah Anda yakin ingin menghapus sesi ini? Data presensi terkait juga akan dihapus secara permanen."
        confirmLabel="Ya, Hapus"
        variant="danger"
        loading={isDeleting}
        onCancel={() => { if (!isDeleting) setDeleteTarget(null); }}
        onConfirm={handleDelete}
      />
    </section>
  );
};
