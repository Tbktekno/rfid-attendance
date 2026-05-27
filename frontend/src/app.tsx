import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/app-shell";
import { DashboardPage } from "./pages/dashboard-page";
import { MonitoringPage } from "./pages/monitoring-page";
import { HistoryPage } from "./pages/history-page";
import { LoginPage } from "./pages/login-page";
import { EmployeesPage } from "./pages/employees-page";
import { SimulatorPage } from "./pages/simulator-page";
import { NotFoundPage } from "./pages/not-found-page";
import { SettingsPage } from "./pages/settings-page";
import { useAuthStore } from "./state/auth-store";
import { useAuthHydrate } from "./hooks/use-auth-hydrate";
import { useBootstrapData } from "./hooks/use-bootstrap-data";
import { useRealtimeAttendance } from "./hooks/use-realtime-attendance";

const ProtectedRoutes = () => {
  const token = useAuthStore((state) => state.token);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useBootstrapData();
  useRealtimeAttendance();

  if (!isHydrated) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Menyiapkan console...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export const App = () => {
  useAuthHydrate();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
};
