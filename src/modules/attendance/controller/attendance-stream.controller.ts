import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middleware/authenticate";
import { realtimeEvents } from "../../../shared/realtime/realtime-events";
import { logger } from "../../../shared/logger";

export class AttendanceStreamController {
  stream(req: AuthenticatedRequest, res: Response): void {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    res.write(
      `data: ${JSON.stringify({
        type: "stream.connected",
        payload: { userId: req.user?.sub ?? "" }
      })}\n\n`
    );

    const unsubscribe = realtimeEvents.subscribe((event) => {
      logger.debug({ event }, "Sending realtime event to stream");
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    const heartbeat = setInterval(() => {
      res.write(`event: ping\ndata: {}\n\n`);
    }, 15000);

    req.on("close", () => {
      clearInterval(heartbeat);
      unsubscribe();
      res.end();
    });
  }
}
