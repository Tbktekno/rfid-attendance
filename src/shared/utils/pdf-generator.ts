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
}

export class PdfGenerator {
  static async generateAttendanceReport(
    data: AttendanceReportData[], 
    options?: { month?: string; employeeName?: string }
  ): Promise<Buffer> {
    const isMonthly = !!(options?.month && options?.employeeName);
    const title = isMonthly ? "Laporan Absensi Karyawan (Bulanan)" : "Laporan Absensi Karyawan";
    
    let totalHadir = 0;
    let totalBolos = 0;
    if (isMonthly) {
       totalHadir = data.filter(d => d.punctuality !== "BOLOS").length;
       totalBolos = data.filter(d => d.punctuality === "BOLOS").length;
    }

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: title, style: "header" },
        isMonthly ? { text: `Bulan: ${options.month}\nNama Karyawan: ${options.employeeName}`, style: "subheader" } : { text: `Tanggal Cetak: ${new Date().toLocaleString("id-ID")}`, style: "subheader" },
        isMonthly ? { text: `Total Hadir: ${totalHadir} hari   |   Total Tidak Hadir: ${totalBolos} hari\n\n`, style: "subheader" } : { text: "\n" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "*", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                { text: "No", style: "tableHeader" },
                { text: "RFID UID", style: "tableHeader" },
                { text: "Nama Karyawan", style: "tableHeader" },
                { text: "Hari", style: "tableHeader" },
                { text: "Tanggal", style: "tableHeader" },
                { text: "Jam", style: "tableHeader" },
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
                  kehadiranText = "Tidak Hadir";
                } else if (item.category === "ENTRY") {
                  kehadiranText = "Masuk";
                } else if (item.category === "EXIT") {
                  kehadiranText = "Pulang";
                }

                let kehadiranColor = "#6b7280"; // Gray default
                if (kehadiranText === "Masuk") kehadiranColor = "#10b981"; // Emerald
                else if (kehadiranText === "Pulang") kehadiranColor = "#3b82f6"; // Blue
                else if (kehadiranText === "Tidak Masuk") kehadiranColor = "#ef4444"; // Red

                let punctualityText = item.punctuality === "ON_TIME" ? "Tepat Waktu" : 
                                      item.punctuality === "LATE" ? "Terlambat" : 
                                      (item.punctuality === "EARLY" || item.punctuality === "EARLY_EXIT") ? "Pulang Cepat" : 
                                      item.punctuality === "BOLOS" ? "Bolos" : "-";
                let punctualityColor = (item.punctuality === "LATE" || item.punctuality === "BOLOS") ? "#ef4444" : 
                                       (item.punctuality === "ON_TIME" ? "#10b981" : "#6b7280");

                return [
                  (index + 1).toString(),
                  item.rfidUid,
                  item.employeeName || "Unknown",
                  dayName,
                  dateStr,
                  timeStr,
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
