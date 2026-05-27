import { HistoryFilters } from "../components/history/history-filters";
import { HistoryTable } from "../components/history/history-table";

export const HistoryPage = () => (
  <div className="flex flex-col rounded-2xl bg-white shadow-sm border border-slate-100">
    <HistoryFilters />
    <HistoryTable />
  </div>
);
