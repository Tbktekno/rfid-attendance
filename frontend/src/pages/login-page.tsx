import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../state/auth-store";

export const LoginPage = () => {
  const token = useAuthStore((state) => state.token);
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel grid w-full max-w-5xl overflow-hidden lg:grid-cols-[0.95fr_1.05fr]"
      >
        <div className="bg-ink px-8 py-10 text-white lg:px-10 lg:py-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-emerald-300">RFID V3</p>
          <h1 className="mt-6 max-w-sm text-4xl font-extrabold leading-tight">
            Satu ruang kerja untuk scan RFID, foto wajah, dan validasi absensi.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            Masuk sebagai operator untuk memantau alur dari ESP8266 dan ESP32CAM tanpa berpindah layar.
          </p>
          <div className="mt-10 flex items-center gap-3 text-sm text-white/70">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            Update langsung via SSE, histori, dan monitoring perangkat.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-10 lg:px-10 lg:py-12">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Masuk</p>
          <h2 className="mt-3 text-3xl font-bold">Konsol Operator</h2>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#d8e1d8] bg-[#f7faf6] px-4 py-3 outline-none"
                placeholder="admin@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Kata Sandi</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#d8e1d8] bg-[#f7faf6] px-4 py-3 outline-none"
                placeholder="••••••••"
              />
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-pine disabled:opacity-60"
          >
            {isLoading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
