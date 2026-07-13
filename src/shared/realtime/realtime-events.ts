import { EventEmitter } from "node:events";

export type RealtimeEvent =
  | {
      channel: "attendance";
      type: "attendance.session.updated" | "attendance.verification.completed" | "attendance.verification.failed";
      payload: {
        sessionId: string;
        correlationId?: string;
        status?: "VALID" | "INVALID" | "NO_FACE";
      };
    }
  | {
      channel: "device";
      type: "device.updated";
      payload: {
        deviceCode: string;
      };
    }
  | {
      channel: "device";
      type: "device.rfid.scanned";
      payload: {
        uid: string;
        deviceCode: string;
      };
    }
  | {
      channel: "employee";
      type: "registration.image.captured";
      payload: {
        uid: string;
        imageUrl: string;
      };
    };

const emitter = new EventEmitter();
emitter.setMaxListeners(100);

export const realtimeEvents = {
  publish(event: RealtimeEvent): void {
    emitter.emit("event", event);
  },
  subscribe(listener: (event: RealtimeEvent) => void): () => void {
    emitter.on("event", listener);
    return () => emitter.off("event", listener);
  }
};
