import { useState, useEffect } from "react";
import { settingsService, SystemSettings } from "../services/settings.service";

export const SettingsPage = () => {
  const [settings, setSettings] = useState<SystemSettings>({ entry_time: "07:30", exit_time: "14:00" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      setMessage({ text: "Gagal memuat pengaturan", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      await settingsService.updateSettings(settings);
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
          <p className="text-[11px] text-slate-500 mt-1">Konfigurasi jam operasional dan aturan presensi</p>
        </div>
      </header>

      <div className="max-w-xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
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

            <div className="space-y-4">
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
                  Karyawan yang absen setelah jam ini (sebelum pukul 11:00) akan ditandai sebagai "Terlambat".
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
                  Karyawan yang absen sebelum jam ini (setelah pukul 11:00) akan ditandai sebagai "Pulang Cepat".
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="h-10 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? "Menyimpan..." : "Simpan Pengaturan"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="max-w-xl bg-white p-6 rounded-xl border border-red-200 shadow-sm mt-6">
        <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-sm text-slate-600 mb-4">
          Tindakan ini akan menghapus seluruh data presensi, sesi, perangkat, dan karyawan (beserta foto wajah). Tindakan ini bersifat permanen dan tidak dapat dibatalkan. Akun Administrator akan tetap dipertahankan.
        </p>
        <button
          onClick={async () => {
            const confirmed = window.confirm(
              "APAKAH ANDA YAKIN?\n\nSeluruh data presensi dan karyawan akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan!"
            );
            if (confirmed) {
              const doubleConfirm = window.confirm("Konfirmasi sekali lagi: Hapus semua data sekarang?");
              if (doubleConfirm) {
                try {
                  await settingsService.resetSystem();
                  alert("Sistem berhasil di-reset. Halaman akan dimuat ulang.");
                  window.location.reload();
                } catch (error) {
                  console.error(error);
                  alert("Gagal mereset sistem!");
                }
              }
            }
          }}
          className="h-10 px-4 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Hapus Seluruh Data
        </button>
      </div>
    </div>
  );
};
