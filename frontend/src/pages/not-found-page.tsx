import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-400">404</p>
    <h1 className="text-3xl font-bold">Halaman tidak ditemukan</h1>
    <Link to="/" className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white">
      Kembali ke dashboard
    </Link>
  </div>
);
