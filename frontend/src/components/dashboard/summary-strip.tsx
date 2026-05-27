import { useShallow } from "zustand/react/shallow";
import { TrendingUp, AlertTriangle, QrCode, Wifi } from "lucide-react";
import { useAttendanceStore } from "../../state/attendance-store";
import { SummaryCard } from "./summary-card";

export const SummaryStrip = () => {
  const summary = useAttendanceStore(useShallow((state) => state.summary()));
  const employees = useAttendanceStore((state) => state.employees);

  const cards = [
    {
      key: "valid",
      title: "Karyawan Hadir Hari Ini",
      icon: (
        <div className="h-8 w-8 rounded bg-emerald-100 flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </div>
      ),
      value: (
        <div className="flex items-baseline gap-3">
          <p className="text-4xl font-extrabold text-slate-900">
            {summary.validToday}
          </p>
          <span className="text-sm font-semibold text-emerald-600">
            {summary.totalToday > 0 ? `${Math.round((summary.validToday / summary.totalToday) * 100)}%` : "0%"}
          </span>
        </div>
      ),
      footer: (
        <p className="text-[11px] text-slate-400">
          Dari total {employees.length} karyawan terdaftar
        </p>
      ),
    },
    {
      key: "invalid",
      title: "Scan Tidak Valid",
      icon: (
        <div className="h-8 w-8 rounded bg-rose-50 flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-rose-500" />
        </div>
      ),
      value: (
        <div className="flex items-baseline gap-3">
          <p className="text-4xl font-extrabold text-slate-900">
            {summary.invalidToday}
          </p>
          <span className="text-sm font-semibold text-rose-600">
            +{summary.invalidToday} hari ini
          </span>
        </div>
      ),
      footer: (
        <p className="text-[11px] text-slate-400">
          Memerlukan peninjauan admin
        </p>
      ),
    },
    {
      key: "total",
      title: "Total Scan",
      icon: (
        <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center">
          <QrCode className="h-4 w-4 text-blue-500" />
        </div>
      ),
      value: (
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-extrabold text-slate-900">
            {summary.totalToday}
          </p>
          <span className="text-sm text-slate-500">Hari ini</span>
        </div>
      ),
      footer: (
        <p className="text-[11px] text-slate-400">
          Sinkronisasi cloud terakhir: baru saja
        </p>
      ),
    },
    {
      key: "iot",
      title: "IoT Devices",
      icon: (
        <div className="h-8 w-8 rounded bg-indigo-50 flex items-center justify-center">
          <Wifi className="h-4 w-4 text-indigo-500" />
        </div>
      ),
      value: (
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-extrabold text-slate-900">
            {summary.onlineDevices}
          </p>
          <span className="text-sm text-slate-500">Online</span>
        </div>
      ),
      footer: (
        <div className="flex gap-4 text-[11px] text-slate-500">
          <span>RFID Reader</span>
          <span>Face Scanner</span>
        </div>
      ),
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard
          key={card.key}
          title={card.title}
          icon={card.icon}
          value={card.value}
          footer={card.footer}
        />
      ))}
    </section>
  );
};