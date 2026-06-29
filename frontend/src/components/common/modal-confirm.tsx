import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ModalConfirmProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ModalConfirm = ({
  open,
  title,
  message,
  confirmLabel = "Ya, Hapus",
  cancelLabel = "Batal",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel
}: ModalConfirmProps) => {
  const variantStyles = {
    danger: {
      icon: "text-red-500 bg-red-50",
      button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      border: "border-red-200"
    },
    warning: {
      icon: "text-amber-500 bg-amber-50",
      button: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
      border: "border-amber-200"
    },
    info: {
      icon: "text-blue-500 bg-blue-50",
      button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      border: "border-blue-200"
    }
  };

  const styles = variantStyles[variant];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-slate-200"
          >
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              <div className={`inline-flex p-3 rounded-xl ${styles.icon} mb-4`}>
                <AlertTriangle className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
            </div>

            <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${styles.border} bg-slate-50/50 rounded-b-2xl`}>
              <button
                onClick={onCancel}
                disabled={loading}
                className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors disabled:opacity-70"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`h-10 px-5 rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${styles.button}`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Menghapus...
                  </span>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
