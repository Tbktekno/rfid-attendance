import { useEffect } from "react";
import { connectSocket } from "../services/realtime.service";
import { useAttendanceStore } from "../state/attendance-store";
import { useAuthStore } from "../state/auth-store";

/** Fallback polling interval (ms) when realtime connection is unstable */
const POLL_INTERVAL_MS = 30_000;

export const useRealtimeAttendance = (): void => {
  const token = useAuthStore((state) => state.token);
  const refreshAll = useAttendanceStore((state) => state.refreshAll);
  const pushRealtimeEvent = useAttendanceStore((state) => state.pushRealtimeEvent);
  const setStreaming = useAttendanceStore((state) => state.setStreaming);
  const refreshSessionsOnly = useAttendanceStore((state) => state.refreshSessionsOnly);

  useEffect(() => {
    if (!token) {
      return;
    }

    const isConnectedRef = { current: false };

    const socket = connectSocket({
      onMessage: (message) => {
        pushRealtimeEvent(message);

        if (message.type?.startsWith("attendance.")) {
          refreshAll();
        } else if (message.channel === "device") {
          refreshSessionsOnly();
        }
      },
      onConnect: () => {
        isConnectedRef.current = true;
        setStreaming(true);
      },
      onDisconnect: () => {
        isConnectedRef.current = false;
        setStreaming(false);
      }
    });

    const pollTimer = setInterval(() => {
      if (!isConnectedRef.current) {
        refreshAll();
      }
    }, POLL_INTERVAL_MS);

    return () => {
      socket.close();
      clearInterval(pollTimer);
    };
  }, [pushRealtimeEvent, refreshAll, refreshSessionsOnly, setStreaming, token]);
};
