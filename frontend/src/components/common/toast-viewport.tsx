import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, BellRing, X } from "lucide-react";
import { useAttendanceStore } from "../../state/attendance-store";
import type { ToastMessage } from "../../types/domain";

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: BellRing
};

const ToastItem = ({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000); // Otomatis hilang setelah 5 detik
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const Icon = iconMap[toast.kind];

  return (
    <motion.button
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      onClick={() => onDismiss(toast.id)}
      className="panel group relative flex items-start gap-3 p-4 text-left border-l-4 shadow-lg bg-white"
      style={{ 
        borderLeftColor: toast.kind === 'success' ? '#10b981' : toast.kind === 'error' ? '#ef4444' : '#3b82f6'
      }}
    >
      <div className={`mt-0.5 rounded-full p-1 ${
        toast.kind === 'success' ? 'bg-emerald-50 text-emerald-600' : 
        toast.kind === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
      }`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 pr-4">
        <p className="text-sm font-bold text-slate-900">{toast.title}</p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{toast.description}</p>
      </div>
      <X className="absolute right-3 top-3 h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
};

export const ToastViewport = () => {
  const toasts = useAttendanceStore((state) => state.toasts);
  const dismissToast = useAttendanceStore((state) => state.dismissToast);

  return (
    <div className="fixed right-6 top-6 z-[9999] flex w-[320px] flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
