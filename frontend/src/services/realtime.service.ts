import { io, Socket } from "socket.io-client";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import type { RealtimeMessage } from "../types/domain";
import { apiBaseUrl } from "../utils/api-base";

export const connectSocket = (input: {
  onMessage: (message: RealtimeMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}): Socket => {
  const socket = io(apiBaseUrl, {
    transports: ["websocket"]
  });

  socket.on("connect", () => {
    input.onConnect?.();
  });

  socket.on("disconnect", () => {
    input.onDisconnect?.();
  });

  socket.on("event", (message: RealtimeMessage) => {
    input.onMessage(message);
  });

  return socket;
};

export const connectAttendanceStream = async (input: {
  token: string;
  signal: AbortSignal;
  onMessage: (message: RealtimeMessage) => void;
  onError: (error: unknown) => void;
}): Promise<void> => {
  await fetchEventSource(`${apiBaseUrl}/api/v1/attendance/stream`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${input.token}`
    },
    signal: input.signal,
    openWhenHidden: true,
    onmessage(event) {
      if (!event.data || event.data === "{}") {
        return;
      }

      try {
        const message = JSON.parse(event.data) as RealtimeMessage;
        if (message.type && message.payload) {
          input.onMessage(message);
        }
      } catch (error) {
        console.warn("Received malformed realtime message:", error);
      }
    },
    onerror(error) {
      input.onError(error);
      throw error;
    }
  });
};
