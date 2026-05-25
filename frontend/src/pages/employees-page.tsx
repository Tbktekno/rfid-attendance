import { useEffect, useRef, useState } from "react";
import { Camera, Edit2, Plus, Search, Trash2, UserPlus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { employeeService } from "../services/employee.service";
import { useAttendanceStore } from "../state/attendance-store";
import { resolveCaptureUrl } from "../utils/image";
import type { Employee } from "../types/domain";

export const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const refreshAll = useAttendanceStore((state) => state.refreshAll);

  const fetchEmployees = async () => {
    try {
      const data = await employeeService.list();
      setEmployees(data);
    } catch (error) {
      console.error("Gagal mengambil data karyawan", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = (employees || []).filter(
    (e) =>
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data karyawan ini?")) return;
    try {
      await employeeService.delete(id);
      fetchEmployees();
      refreshAll();
    } catch (error) {
      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="space-y-6">
      <header className="panel flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Direktori Karyawan</h1>
          <p className="text-[11px] text-slate-500 mt-1">Kelola data karyawan terdaftar dan data biometrik mereka</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, departemen, atau jabatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-slate-200 bg-slate-50/70 py-2 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <button
            onClick={() => {
              setEditingEmployee(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Tambah Karyawan
          </button>
        </div>
      </header>

      <div className="panel overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            <tr>
              <th className="px-5 py-3">Identitas</th>
              <th className="px-5 py-3">Departemen & Jabatan</th>
              <th className="px-5 py-3">RFID UID</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-sm text-slate-500">
                  Belum ada data karyawan.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200 border border-slate-300">
                        {employee.faceImagePath ? (
                          <img src={resolveCaptureUrl(employee.faceImagePath) || ""} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <Camera className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{employee.fullName}</p>
                        <span className="inline-flex rounded text-[9px] bg-emerald-100 px-1.5 py-0.5 font-bold uppercase tracking-wide text-emerald-700">
                          Aktif
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-xs font-medium text-slate-700">{employee.department}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tight">{employee.position}</p>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] font-medium text-slate-600">{employee.rfidUid}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => {
                          setEditingEmployee(employee);
                          setIsFormOpen(true);
                        }}
                        className="rounded p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="rounded p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <EmployeeForm
            employee={editingEmployee}
            onClose={() => {
              setIsFormOpen(false);
              setEditingEmployee(null);
            }}
            onSuccess={() => {
              setIsFormOpen(false);
              setEditingEmployee(null);
              fetchEmployees();
              refreshAll();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const EmployeeForm = ({
  employee,
  onClose,
  onSuccess
}: {
  employee: Employee | null;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const isEdit = !!employee;
  const [formData, setFormData] = useState({
    fullName: employee?.fullName || "",
    department: employee?.department || "",
    position: employee?.position || "",
    rfidUid: employee?.rfidUid || ""
  });
  
  const events = useAttendanceStore((state) => state.events);
  
  useEffect(() => {
    const latestEvent = events[0];
    if (latestEvent && latestEvent.type === "device.rfid.scanned" && latestEvent.payload?.uid) {
      setFormData((prev) => ({ ...prev, rfidUid: latestEvent.payload.uid as string }));
    }
  }, [events]);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(
    employee?.faceImagePath ? resolveCaptureUrl(employee.faceImagePath) : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 480 } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err) {
      console.error("Kesalahan kamera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    if (!capturedImage) {
      startCamera();
    }
    return () => stopCamera();
  }, [capturedImage]);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 480, 480);
        setCapturedImage(canvasRef.current.toDataURL("image/jpeg", 0.9));
        stopCamera();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage) return alert("Tangkap wajah terlebih dahulu");

    setIsLoading(true);
    try {
      const faceImageBase64 = capturedImage.startsWith("data:image") ? capturedImage : undefined;

      if (isEdit && employee) {
        await employeeService.update(employee.id, {
          ...formData,
          faceImageBase64
        });
      } else {
        await employeeService.create({
          ...formData,
          faceImageBase64: faceImageBase64 || ""
        });
      }
      onSuccess();
    } catch (error) {
      alert("Gagal menyimpan data karyawan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="panel w-full max-w-2xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5 bg-white">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
              {isEdit ? <Edit2 className="h-4 w-4 text-blue-600" /> : <UserPlus className="h-4 w-4 text-blue-600" />}
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEdit ? "Edit Data Karyawan" : "Daftar Karyawan Baru"}
            </h2>
          </div>
          <button onClick={onClose} className="rounded p-1.5 text-slate-400 hover:bg-slate-100 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-slate-50/50">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nama Lengkap</span>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Departemen</span>
                <input
                  required
                  type="text"
                  placeholder="Contoh: IT, HR, Produksi"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Jabatan</span>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Supervisor, Staff, Manager"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">RFID UID</span>
                <input
                  required
                  type="text"
                  value={formData.rfidUid}
                  onChange={(e) => setFormData({ ...formData, rfidUid: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm font-mono"
                  placeholder="Scan kartu atau masukkan UID"
                />
              </label>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white p-4 border border-slate-200 shadow-sm">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-900">
                {capturedImage ? (
                  <img src={capturedImage} className="h-full w-full object-cover" />
                ) : (
                  <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
                )}
                <canvas ref={canvasRef} width={480} height={480} className="hidden" />
              </div>

              {!capturedImage || (capturedImage && capturedImage.startsWith("data:image")) ? (
                <button
                  type="button"
                  onClick={capturedImage ? () => setCapturedImage(null) : capture}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700 shadow-sm"
                >
                  <Camera className="h-4 w-4" />
                  {capturedImage ? "Ambil Ulang" : "Tangkap Wajah"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCapturedImage(null)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 shadow-sm"
                >
                  <Camera className="h-4 w-4" />
                  Ganti Foto
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading || !capturedImage}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-50 shadow-sm"
            >
              {isLoading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Data Karyawan"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
