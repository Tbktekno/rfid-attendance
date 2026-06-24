import { env } from "../config/env";
import { createGatewayApp } from "./app";
import { ensureUploadDir } from "../shared/utils/file-storage";
import { logger } from "../shared/logger";

import { createServer } from "node:http";
import { setupRealtime } from "./realtime";
import Bonjour from "bonjour-service";

const start = async () => {
  await ensureUploadDir();

  const app = createGatewayApp();
  const httpServer = createServer(app);
  
  setupRealtime(httpServer);

  httpServer.listen(env.PORT, () => {
    logger.info(`API Gateway listening on port ${env.PORT} (with Socket.io)`);
    
    try {
      const bonjour = new Bonjour();
      bonjour.publish({ name: 'AttendTrack Server', type: 'attendtrack', port: env.PORT });
      logger.info(`mDNS service '_attendtrack._tcp' published on port ${env.PORT}`);
    } catch (err) {
      logger.error({ err }, "Failed to publish mDNS service");
    }
  });
};

start().catch((error) => {
  logger.error({ error }, "Failed to start API Gateway");
  process.exit(1);
});
