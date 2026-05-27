import { SessionMonitor } from "../components/monitoring/session-monitor";

export const MonitoringPage = () => (
  <div className="flex flex-col rounded-2xl bg-white shadow-sm border border-slate-100">
    <section className="flex flex-col gap-3 p-5 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Monitor Real-time</h1>
        <p className="text-[11px] text-slate-500 mt-1">Sesi scan RFID dan tangkapan wajah aktif</p>
      </div>
    </section>
    <div className="p-5 bg-slate-50/30 rounded-b-2xl">
      <SessionMonitor />
    </div>
  </div>
);
