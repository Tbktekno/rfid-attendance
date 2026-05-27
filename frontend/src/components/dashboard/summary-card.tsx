// components/summary-card.tsx
import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  icon?: ReactNode;
  value: ReactNode;
  footer?: ReactNode;
  rightTop?: ReactNode;
}

export const SummaryCard = ({
  title,
  icon,
  value,
  footer,
  rightTop,
}: SummaryCardProps) => {
  return (
    <div className="panel px-6 py-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        {rightTop || icon}
      </div>

      {/* Value */}
      <div className="mt-4">{value}</div>

      {/* Footer */}
      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
};