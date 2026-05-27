import { SummaryStrip } from "../components/dashboard/summary-strip";
import { LiveFeed } from "../components/dashboard/live-feed";
import { DeviceOverview } from "../components/dashboard/device-overview";

export const DashboardPage = () => (
  <div className="space-y-6">
    <SummaryStrip />
    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <LiveFeed />
      <DeviceOverview />
    </div>
  </div>
);
