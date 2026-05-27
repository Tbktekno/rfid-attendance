import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../services/realtime.service";
import { useAttendanceStore } from "../state/attendance-store";
import { useAuthStore } from "../state/auth-store";

export const useRealtimeAttendance = (): void => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const refreshAll = useAttendanceStore((state) => state.refreshAll);
  const pushRealtimeEvent = useAttendanceStore((state) => state.pushRealtimeEvent);
  const setStreaming = useAttendanceStore((state) => state.setStreaming);

  useEffect(() => {
    if (!token) {
      return;
    }

    const socket = connectSocket({
      onMessage: (message) => {
        pushRealtimeEvent(message);

        if (message.channel === "attendance" || message.channel === "device") {
          refreshAll();
        }

        if (message.type === "attendance.verification.completed") {
          navigate("/history");
        }
      },
      onConnect: () => {
        setStreaming(true);
      },
      onDisconnect: () => {
        setStreaming(false);
      }
    });

    return () => {
      socket.close();
    };
  }, [pushRealtimeEvent, refreshAll, setStreaming, token]);
};
