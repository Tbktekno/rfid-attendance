import { BellDot, GroupIcon, Laptop, LayoutDashboard, LogOut, ScanFace, Settings, Table2, User, Users, Wifi } from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useAuthStore } from "../../state/auth-store";
import { useAttendanceStore } from "../../state/attendance-store";

const navigation = [
  { to: "/", label: "Ringkasan", icon: LayoutDashboard },
  { to: "/employees", label: "Karyawan", icon: Users },
  { to: "/history", label: "Log Presensi", icon: Table2 },
  { to: "/monitoring", label: "Monitor Real-time", icon: ScanFace },
  // { to: "/simulator", label: "Simulator", icon: Laptop },
  { to: "/settings", label: "Pengaturan", icon: Settings }
];

export const AppSidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isStreaming = useAttendanceStore((state) => state.isStreaming);

  return (
    <aside className="flex h-screen  flex-col border-r border-slate-200 bg-slate-50 px-5 py-6 lg:min-h-screen">
      <div className="mb-10 flex flex-col justify-between lg:block">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">AttendTrack</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">Konsol Admin</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )
              }
            >
              <Icon className={clsx("h-[18px] w-[18px]")} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 flex items-center justify-between rounded-xl bg-slate-100/80 p-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
            <User className="h-5 w-5 text-slate-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{user?.name ?? "Admin"}</p>
            <p className="text-[10px] text-slate-500">v2.4.0-stabil</p>
          </div>
        </div>
        <button 
          type="button" 
          onClick={logout} 
          className="text-slate-400 hover:text-slate-700 transition"
          title="Keluar"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
};
