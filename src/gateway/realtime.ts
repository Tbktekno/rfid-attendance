import { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { grpcClients } from "../shared/grpc/grpc-client";
import { realtimeEvents } from "../shared/realtime/realtime-events";
import { logger } from "../shared/logger";

export const setupRealtime = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    logger.info({ socketId: socket.id }, "New socket client connected");

    socket.on("disconnect", () => {
      logger.info({ socketId: socket.id }, "Socket client disconnected");
    });
  });

  // Watch events from gRPC server and propagate to Socket.io and local EventEmitter (for SSE)
  const watchGrpcEvents = () => {
    const stream = grpcClients.attendance.WatchEvents({});

    stream.on("data", (data: any) => {
      const event = {
        channel: data.channel,
        type: data.type,
        payload: data.payloadJson ? JSON.parse(data.payloadJson) : {}
      };

      // Propagate locally (for SSE)
      realtimeEvents.publish(event as any);

      // Propagate to Socket.io
      io.emit("event", event);
    });

    stream.on("error", (error: any) => {
      logger.error({ error }, "gRPC WatchEvents stream error, reconnecting in 5s...");
      setTimeout(watchGrpcEvents, 5000);
    });

    stream.on("end", () => {
      logger.warn("gRPC WatchEvents stream ended, reconnecting in 5s...");
      setTimeout(watchGrpcEvents, 5000);
    });
  };

  watchGrpcEvents();

  return io;
};
