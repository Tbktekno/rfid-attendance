const pdfmake = require("pdfmake");
import path from "node:path";
import { TDocumentDefinitions } from "pdfmake/interfaces";

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique"
  }
};

// pdfmake 0.3.x uses a shared instance and new API
pdfmake.setFonts(fonts);

export interface AttendanceReportData {
  rfidUid: string;
  employeeName: string;
  verifiedAt: string;
  status: string;
  category?: string;
  punctuality?: string;
  entryTime?: string;
  exitTime?: string;
}

export class PdfGenerator {
  static async generateAttendanceReport(
    data: AttendanceReportData[], 
    options?: { month?: string; employeeName?: string }
  ): Promise<Buffer> {
    const isMonthly = !!(options?.month && options?.employeeName);
    const title = isMonthly ? "Laporan Absensi Karyawan (Bulanan)" : "Laporan Absensi Karyawan";
    
    let totalTepatWaktu = 0;
    let totalTerlambat = 0;
    let totalBolos = 0;
    if (isMonthly) {
       totalTepatWaktu = data.filter(d => d.punctuality === "ON_TIME").length;
       totalTerlambat = data.filter(d => d.punctuality === "LATE").length;
       totalBolos = data.filter(d => d.punctuality === "BOLOS").length;
    }

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: title, style: "header" },
        isMonthly ? { text: `Bulan: ${options.month}\nNama Karyawan: ${options.employeeName}`, style: "subheader" } : { text: `Tanggal Cetak: ${new Date().toLocaleString("id-ID")}`, style: "subheader" },
        isMonthly ? { text: `✅ Tepat Waktu: ${totalTepatWaktu} hari   |   ⚠ Terlambat: ${totalTerlambat} hari   |   ❌ Tidak Hadir: ${totalBolos} hari\n\n`, style: "subheader" } : { text: "\n" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "*", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                { text: "No", style: "tableHeader" },
                { text: "RFID UID", style: "tableHeader" },
                { text: "Nama Karyawan", style: "tableHeader" },
                { text: "Hari", style: "tableHeader" },
                { text: "Tanggal", style: "tableHeader" },
                { text: "Jam Hadir", style: "tableHeader" },
                { text: "Jam Pulang", style: "tableHeader" },
                { text: "Kehadiran", style: "tableHeader" },
                { text: "Ketepatan", style: "tableHeader" }
              ],
              ...data.map((item, index) => {
                const dateObj = new Date(item.verifiedAt);
                const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
                const dayName = days[dateObj.getDay()] || "-";

                const dateStr = dateObj.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                });

                const timeStr = dateObj.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false
                });

                let kehadiranText = "-";
                if (item.punctuality === "BOLOS") {
                  kehadiranText = isMonthly ? "Tidak Hadir" : "Pulang Terlalu Awal";
                } else if (isMonthly) {
                  kehadiranText = item.punctuality === "ON_TIME" ? "Tepat Waktu" :
                                  item.punctuality === "LATE" ? "Terlambat" :
                                  item.punctuality === "EARLY_EXIT" ? "Pulang Awal" : "Hadir";
                } else if (item.category === "ENTRY") {
                  kehadiranText = "Masuk";
                } else if (item.category === "EXIT") {
                  kehadiranText = "Pulang";
                }

                let kehadiranColor = "#6b7280";
                if (kehadiranText === "Masuk" || kehadiranText === "Tepat Waktu") kehadiranColor = "#10b981";
                else if (kehadiranText === "Pulang" || kehadiranText === "Hadir") kehadiranColor = "#3b82f6";
                else if (kehadiranText === "Terlambat") kehadiranColor = "#f59e0b";
                else if (kehadiranText === "Pulang Awal" || kehadiranText === "Pulang Terlalu Awal") kehadiranColor = "#f97316";
                else if (kehadiranText === "Tidak Hadir") kehadiranColor = "#ef4444";

                let punctualityText = item.punctuality === "ON_TIME" ? "Tepat Waktu" : 
                                      item.punctuality === "LATE" ? "Terlambat" : 
                                      item.punctuality === "EARLY_EXIT" ? "Pulang Cepat" : 
                                      item.punctuality === "BOLOS" ? "Tidak Hadir" : "-";
                let punctualityColor = item.punctuality === "LATE" ? "#f59e0b" : 
                                       item.punctuality === "BOLOS" ? "#ef4444" : 
                                       (item.punctuality === "ON_TIME" ? "#10b981" : "#6b7280");

                const jamHadirText = item.entryTime || (item.category === "ENTRY" ? timeStr : "-");
                const jamPulangText = item.exitTime || (item.category === "EXIT" ? timeStr : "-");

                return [
                  (index + 1).toString(),
                  item.rfidUid,
                  item.employeeName || "Unknown",
                  dayName,
                  dateStr,
                  jamHadirText,
                  jamPulangText,
                  { text: kehadiranText, color: kehadiranColor, bold: true },
                  { text: punctualityText, color: punctualityColor }
                ];
              })
            ]
          },
          layout: {
            fillColor: (rowIndex: number) => (rowIndex === 0 ? "#f3f4f6" : null),
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: () => "#e5e7eb",
            vLineColor: () => "#e5e7eb",
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          color: "#111827"
        },
        subheader: {
          fontSize: 10,
          color: "#6b7280",
          margin: [0, 0, 0, 20]
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: "#374151",
          margin: [0, 5, 0, 5]
        }
      },
      defaultStyle: {
        font: "Helvetica",
        fontSize: 10
      }
    };

    try {
      const output = pdfmake.createPdf(docDefinition);
      const buffer = await output.getBuffer();
      return buffer;
    } catch (error) {
      console.error("[PDF_GENERATOR] Error generating report:", error);
      throw error;
    }
  }
}
