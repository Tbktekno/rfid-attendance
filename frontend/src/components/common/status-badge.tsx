import clsx from "clsx";

export const StatusBadge = ({ value }: { value: string }) => {
  const palette =
    value === "VALID" || value === "ONLINE" || value === "VERIFIED" || value === "READY"
      ? "bg-emerald-100 text-emerald-800"
      : value === "INVALID" || value === "FAILED" || value === "ERROR" || value === "EXPIRED"
        ? "bg-rose-100 text-rose-700"
        : "bg-amber-100 text-amber-800";

  const getLabel = (v: string) => {
    switch (v) {
      case "VALID": return "Valid";
      case "INVALID": return "Tidak Valid";
      case "ONLINE": return "Online";
      case "OFFLINE": return "Offline";
      case "READY": return "Siap";
      case "VERIFIED": return "Terverifikasi";
      case "FAILED": return "Gagal";
      case "PENDING": return "Menunggu";
      case "EXPIRED": return "Kedaluwarsa";
      case "ERROR": return "Error";
      default: return v;
    }
  };

  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
        palette
      )}
    >
      {getLabel(value)}
    </span>
  );
};
