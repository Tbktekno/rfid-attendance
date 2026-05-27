import { env } from "../config/env";
import { createGatewayApp } from "./app";
import { ensureUploadDir } from "../shared/utils/file-storage";
import { logger } from "../shared/logger";

import { createServer } from "node:http";
import { setupRealtime } from "./realtime";

const start = async () => {
  await ensureUploadDir();

  const app = createGatewayApp();
  const httpServer = createServer(app);
  
  setupRealtime(httpServer);

  httpServer.listen(env.PORT, () => {
    logger.info(`API Gateway listening on port ${env.PORT} (with Socket.io)`);
  });
};

start().catch((error) => {
  logger.error({ error }, "Failed to start API Gateway");
  process.exit(1);
});
