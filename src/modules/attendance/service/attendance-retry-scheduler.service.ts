import { logger } from "../../../shared/logger";
import { AttendanceRepository } from "../repository/attendance.repository";
import { AttendanceVerificationService } from "./attendance-verification.service";

const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 5000;

export class AttendanceRetrySchedulerService {
  private readonly timers = new Map<string, NodeJS.Timeout>();

  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly attendanceVerificationService: AttendanceVerificationService
  ) {}

  schedule(sessionId: string, attempt = 1, delayMs = 0): void {
    if (this.timers.has(sessionId)) {
      return;
    }

    const timer = setTimeout(async () => {
      this.timers.delete(sessionId);

      try {
        await this.attendanceVerificationService.verify(sessionId);
        logger.info({ sessionId, attempt }, "Attendance verification completed");
      } catch (error) {
        logger.error({ sessionId, attempt, error }, "Attendance verification failed");

        if (attempt >= MAX_ATTEMPTS) {
          const message = error instanceof Error ? error.message : "Verification failed after retries";
          await this.attendanceVerificationService.markFailed(sessionId, message);
          return;
        }

        this.schedule(sessionId, attempt + 1, BASE_DELAY_MS * 2 ** (attempt - 1));
      }
    }, delayMs);

    this.timers.set(sessionId, timer);
  }

  async resumePendingSessions(): Promise<void> {
    const sessionIds = await this.attendanceRepository.listPendingVerificationSessionIds();

    for (const sessionId of sessionIds) {
      this.schedule(sessionId);
    }

    if (sessionIds.length > 0) {
      logger.info({ count: sessionIds.length }, "Rescheduled pending attendance verifications");
    }
  }
}
