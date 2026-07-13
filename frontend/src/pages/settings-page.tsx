import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Calendar, Sun, Moon, Info } from "lucide-react";
import { settingsService, SystemSettings } from "../services/settings.service";
import { ModalConfirm } from "../components/common/modal-confirm";

const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const DEFAULT_WORKING_DAYS = "1,2,3,4,5"; // Senin-Jumat

interface HolidayEntry {
  date: string;
  description: string;
}

export const SettingsPage = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    entry_time: "07:30",
    exit_time: "14:00",
    early_exit_tolerance: "15",
    overtime_threshold: "60",
    working_days: DEFAULT_WORKING_DAYS,
    holidays: "[]"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // State untuk holidays di UI
  const [holidayList, setHolidayList] = useState<HolidayEntry[]>([]);
  const [newHolidayDate, setNewHolidayDate] = useState("");
  const [newHolidayDesc, setNewHolidayDesc] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
      // Parse holidays JSON string ke array
      if (data.holidays) {
        try {
          const parsed = JSON.parse(data.holidays);
          if (Array.isArray(parsed)) {
            setHolidayList(parsed.map((h: any) => 
              typeof h === "string" ? { date: h, description: "" } : h
            ));
          }
        } catch {
          setHolidayList([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      setMessage({ text: "Gagal memuat pengaturan", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle hari kerja
  const toggleDay = useCallback((dayIndex: number) => {
    setSettings(prev => {
      const current = prev.working_days ? prev.working_days.split(",").map(Number) : [];
      const idx = current.indexOf(dayIndex);
      if (idx >= 0) {
        const updated = current.filter(d => d !== dayIndex);
        return { ...prev, working_days: updated.length > 0 ? updated.join(",") : "" };
      } else {
        return { ...prev, working_days: [...current, dayIndex].sort().join(",") };
      }
    });
  }, []);

  const isDaySelected = useCallback((dayIndex: number): boolean => {
    if (!settings.working_days) return false;
    return settings.working_days.split(",").map(Number).includes(dayIndex);
  }, [settings.working_days]);

  // Konversi daftar libur ke JSON string (hanya simpan tanggal)
  const holidaysToJson = useCallback((list: HolidayEntry[]): string => {
    return JSON.stringify(list.map(h => h.date));
  }, []);

  // Tambah hari libur
  const addHoliday = useCallback(() => {
    if (!newHolidayDate) return;
    const desc = newHolidayDesc.trim() || "Hari Libur";
    // Cek duplikasi
    if (holidayList.some(h => h.date === newHolidayDate)) {
      setMessage({ text: `Tanggal ${newHolidayDate} sudah ada dalam daftar`, type: "error" });
      return;
    }
    const updated = [...holidayList, { date: newHolidayDate, description: desc }];
    updated.sort((a, b) => a.date.localeCompare(b.date));
    setHolidayList(updated);
    // Simpan hanya tanggal (tanpa deskripsi) ke database
    setSettings(prev => ({ ...prev, holidays: holidaysToJson(updated) }));
    setNewHolidayDate("");
    setNewHolidayDesc("");
  }, [newHolidayDate, newHolidayDesc, holidayList, holidaysToJson]);

  // Hapus hari libur
  const removeHoliday = useCallback((date: string) => {
    const updated = holidayList.filter(h => h.date !== date);
    setHolidayList(updated);
    setSettings(prev => ({ ...prev, holidays: holidaysToJson(updated) }));
  }, [holidayList, holidaysToJson]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      await settingsService.updateSettings({
        ...settings,
        holidays: holidaysToJson(holidayList)
      });
      setMessage({ text: "Pengaturan berhasil disimpan", type: "success" });
    } catch (error) {
      console.error("Failed to save settings:", error);
      setMessage({ text: "Gagal menyimpan pengaturan", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="panel flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Pengaturan Sistem</h1>
          <p className="text-[11px] text-slate-500 mt-1">Konfigurasi jam operasional, hari kerja, dan hari libur</p>
        </div>
      </header>

      <div className="max-w-2xl space-y-6">
        {/* FORM PENGATURAN */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {isLoading ? (
            <div className="py-8 flex justify-center">
              <span className="text-slate-500">Memuat...</span>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {message && (
                <div
                  className={`p-4 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* --- JAM OPERASIONAL --- */}
              <div>
                <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Jam Operasional
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Jam Masuk (Batas Terlambat)
                    </label>
                    <input
                      type="time"
                      value={settings.entry_time}
                      onChange={(e) => setSettings({ ...settings, entry_time: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Karyawan yang absen setelah jam ini akan ditandai sebagai "Terlambat".
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Jam Pulang (Batas Cepat Pulang)
                    </label>
                    <input
                      type="time"
                      value={settings.exit_time}
                      onChange={(e) => setSettings({ ...settings, exit_time: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Karyawan yang absen sebelum jam ini akan ditandai sebagai "Pulang Cepat".
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* --- HARI KERJA --- */}
              <div>
                <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  Hari Kerja
                </h2>
                <p className="text-xs text-slate-500 mb-3">
                  Pilih hari apa saja yang merupakan hari kerja. Hari yang tidak dipilih akan dianggap libur mingguan dan tidak akan muncul di laporan absensi.
                </p>
                <div className="grid grid-cols-7 gap-2">
                  {DAY_NAMES.map((name, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleDay(idx)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                        isDaySelected(idx)
                          ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider">{name.slice(0, 3)}</span>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all text-[10px] ${
                        isDaySelected(idx)
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-slate-300 bg-white text-transparent"
                      }`}>
                        {isDaySelected(idx) ? "✓" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* --- HARI LIBUR SPESIFIK --- */}
              <div>
                <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-500" />
                  Hari Libur Spesifik
                </h2>
                <p className="text-xs text-slate-500 mb-3">
                  Tambahkan tanggal-tanggal libur nasional atau hari libur khusus. Pada tanggal ini, karyawan tidak akan dianggap bolos jika tidak hadir.
                </p>

                {/* Daftar hari libur */}
                {holidayList.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {holidayList.map((holiday) => (
                      <div
                        key={holiday.date}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-red-700 bg-red-100 px-2 py-1 rounded">
                            {holiday.date}
                          </span>
                          <span className="text-sm text-red-800 font-medium">
                            {holiday.description}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeHoliday(holiday.date)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-center text-sm text-slate-400 mb-4">
                    Belum ada hari libur spesifik. Tambahkan di bawah.
                  </div>
                )}

                {/* Form tambah hari libur */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <input
                      type="date"
                      value={newHolidayDate}
                      onChange={(e) => setNewHolidayDate(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                      placeholder="Pilih tanggal"
                    />
                  </div>
                  <div className="flex-[2]">
                    <input
                      type="text"
                      value={newHolidayDesc}
                      onChange={(e) => setNewHolidayDesc(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                      placeholder="Keterangan (mis: Tahun Baru)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addHoliday}
                    disabled={!newHolidayDate}
                    className="h-10 px-4 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah</span>
                  </button>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* TOMBOL SIMPAN */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="h-10 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Pengaturan"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* --- INFO TENTANG HARI LIBUR --- */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">Bagaimana cara kerja pengaturan hari libur?</p>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                <li><strong>Hari Kerja</strong>: Hari yang dipilih akan muncul di laporan absensi. Jika tidak ada absensi, akan ditandai <strong>BOLOS</strong>.</li>
                <li><strong>Hari Libur Spesifik</strong>: Tanggal tertentu (mis: libur nasional) yang tidak akan muncul di laporan, meskipun termasuk hari kerja.</li>
                <li>Hari Minggu dan Sabtu tidak perlu diubah jika ingin tetap libur — cukup hapus centang dari pilihan hari kerja.</li>
                <li>Perubahan akan berlaku untuk laporan bulanan yang di-generate setelah pengaturan disimpan.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-white p-6 rounded-xl border border-red-200 shadow-sm">
          <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-slate-600 mb-4">
            Tindakan ini akan menghapus seluruh data presensi, sesi, perangkat, dan karyawan (beserta foto wajah). Tindakan ini bersifat permanen dan tidak dapat dibatalkan. Akun Administrator akan tetap dipertahankan.
          </p>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="h-10 px-4 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Hapus Seluruh Data
          </button>
        </div>
      </div>

      <ModalConfirm
        open={showResetConfirm}
        title="Hapus Seluruh Data?"
        message="Apakah Anda yakin ingin menghapus seluruh data presensi, sesi, perangkat, dan karyawan (beserta foto wajah)? Tindakan ini bersifat permanen dan tidak dapat dibatalkan. Akun Administrator akan tetap dipertahankan."
        confirmLabel="Ya, Hapus Semua"
        variant="danger"
        loading={isResetting}
        onCancel={() => setShowResetConfirm(false)}
        onConfirm={async () => {
          setIsResetting(true);
          try {
            await settingsService.resetSystem();
            setShowResetConfirm(false);
            window.location.reload();
          } catch (error) {
            console.error(error);
            setIsResetting(false);
            setShowResetConfirm(false);
          }
        }}
      />
    </div>
  );
};

// Clock icon component
const Clock = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
