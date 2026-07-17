import { useEffect } from "react";
import { useAttendanceStore } from "../state/attendance-store";
import { useAuthStore } from "../state/auth-store";

export const useBootstrapData = (): void => {
  const token = useAuthStore((state) => state.token);
  const refreshAll = useAttendanceStore((state) => state.refreshAll);
  const fetchSettings = useAttendanceStore((state) => state.fetchSettings);

  useEffect(() => {
    if (!token) {
      return;
    }

    Promise.all([
      refreshAll(),
      fetchSettings()
    ]).catch(() => undefined);
  }, [refreshAll, fetchSettings, token]);
};
