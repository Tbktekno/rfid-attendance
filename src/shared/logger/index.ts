import pino from "pino";
import { env } from "../../config/env";

const resolveTransport = () => {
  if (process.env.NODE_ENV === "production") {
    return undefined;
  }

  try {
    require.resolve("pino-pretty");
    return {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard"
      }
    };
  } catch {
    return undefined;
  }
};

export const logger = pino({
  level: env.LOG_LEVEL,
  transport: resolveTransport()
});
