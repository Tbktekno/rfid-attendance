export const resolveCorrelationId = (input: {
  correlationId?: string;
  pairingKey?: string;
  deviceCode?: string;
  capturedAt?: string;
  windowSeconds: number;
}): string => {
  if (input.correlationId) {
    return input.correlationId;
  }

  const timestamp = (input.capturedAt && input.capturedAt !== "") ? new Date(input.capturedAt).getTime() : Date.now();
  const bucket = Math.floor(timestamp / (input.windowSeconds * 1000));
  const key = input.pairingKey || input.deviceCode || "default-device";

  return `${key}:${bucket}`;
};
