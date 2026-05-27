import { RefreshCw, Server, Camera, WifiOff } from "lucide-react";
import { useAttendanceStore } from "../../state/attendance-store";

export const DeviceOverview = () => {
  const devices = useAttendanceStore((state) => state.devices);

  return (
    <section className="panel flex flex-col">
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Status Perangkat</h3>
        <button className="text-slate-400 hover:text-slate-600 transition">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5 flex-1 space-y-3">
        {devices.length === 0 ? (
          <div className="text-center py-6 text-sm text-slate-500">
            Belum ada perangkat terdaftar.
          </div>
        ) : (
          devices.map((device) => {
            const isOnline = device.isOnline;
            const Icon = device.type === "ESP32CAM" ? Camera : Server;
            
            // Extract IP if it exists in metadata Json, otherwise placeholder
            let ipAddress = "IP: 192.168.x.x";
            if (device.metadataJson) {
               try {
                  const meta = JSON.parse(device.metadataJson);
                  if (meta.ip) ipAddress = `IP: ${meta.ip}`;
               } catch(e) {}
            }

            return (
              <div key={device.id} className="panel-muted flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <Icon className={`h-5 w-5 ${isOnline ? "text-blue-600" : "text-slate-400"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{device.name || device.deviceCode}</p>
                    <p className="text-[10px] font-medium text-slate-500">{ipAddress}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${isOnline ? "text-emerald-600" : "text-rose-600"}`}>
                    {isOnline ? "Online" : "Offline"}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                    {isOnline ? "Aktif" : "Tidak Aktif"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
