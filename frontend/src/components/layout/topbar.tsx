import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Bell, HelpCircle, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../state/auth-store";

export const Topbar = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Ringkasan Sistem";
      case "/employees": return "Direktori Karyawan";
      case "/history": return "Log Presensi";
      case "/monitoring": return "Monitor Real-time";
      case "/simulator": return "Simulator Event";
      case "/settings": return "Pengaturan Sistem";
      default: return "Dashboard";
    }
  };

  return (
    <header className="p-4 sm:p-6 lg:px-8 lg:py-5 mb-8 sticky top-0 z-10 bg-white flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-200/60 pb-5">
      <h2 className="text-xl font-bold tracking-tight text-slate-900 min-w-[200px]">
        {getPageTitle()}
      </h2>
      
      <div className="flex-1 flex justify-center max-w-xl mx-auto hidden lg:flex">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari karyawan atau perangkat..." 
            className="w-full bg-slate-100/70 border border-slate-200 text-slate-900 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 text-blue-700 px-3 py-1.5 text-xs font-semibold">
          <span>📅</span> {format(new Date(), "dd MMM yyyy", { locale: id })}
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition">
          <Bell className="h-5 w-5" />
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition">
          <HelpCircle className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden ml-2">
           <User className="h-4 w-4 text-slate-500" />
        </div>
      </div>
    </header>
  );
};
