import { format, isToday, parseISO } from "date-fns";

export const formatDateTime = (value?: string): string => {
  if (!value) {
    return "-";
  }

  const date = parseISO(value);
  return isToday(date) ? `Hari ini, ${format(date, "HH:mm:ss")}` : format(date, "dd MMM yyyy, HH:mm:ss");
};

export const formatClock = (value?: string): string => {
  if (!value) {
    return "--:--:--";
  }

  return format(parseISO(value), "HH:mm:ss");
};

export const formatShortDate = (value?: string): string => {
  if (!value) {
    return "-";
  }

  return format(parseISO(value), "dd MMM yyyy");
};
