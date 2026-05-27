import { useEffect } from "react";
import { useAttendanceStore } from "../state/attendance-store";
import { useAuthStore } from "../state/auth-store";

export const useBootstrapData = (): void => {
  const token = useAuthStore((state) => state.token);
  const refreshAll = useAttendanceStore((state) => state.refreshAll);

  useEffect(() => {
    if (!token) {
      return;
    }

    refreshAll().catch(() => undefined);
  }, [refreshAll, token]);
};
