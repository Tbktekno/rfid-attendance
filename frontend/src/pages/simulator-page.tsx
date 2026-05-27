import React, { useRef, useState, useEffect } from "react";
import { Camera, RefreshCw, Send, ShieldCheck, CreditCard, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { http } from "../services/http";
import { clsx } from "clsx";

export const SimulatorPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [rfidUid, setRfidUid] = useState("");
  const [deviceCode, setDeviceCode] = useState("SIMULATOR-01");
  const [pairingKey, setPairingKey] = useState("LOBBY-1");
  const [isCapturing, setIsCapturing] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error" | "loading"; message?: string }>({
    type: "idle"
  });

  // Initialize Camera
  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
        setStatus({ type: "error", message: "Gagal mengakses kamera. Pastikan izin diberikan." });
      }
    }
    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCaptureAndSend = async () => {
    if (!videoRef.current || !canvasRef.current || !rfidUid) {
      setStatus({ type: "error", message: "Silakan isi RFID UID dan pastikan kamera aktif." });
      return;
    }

    setIsCapturing(true);
    setStatus({ type: "loading", message: "Mengambil gambar & memproses..." });

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.8));
      if (!blob) throw new Error("Gagal mengkonversi gambar");

      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");
      formData.append("uid", rfidUid);
      formData.append("deviceCode", deviceCode);
      formData.append("pairingKey", pairingKey);

      const response = await http.post("/api/v1/attendance/face", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setStatus({ type: "success", message: "Data berhasil dikirim: " + (response.data.message || "OK") });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: "error", message: "Gagal mengirim data: " + (err.response?.data?.message || err.message) });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="panel flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Simulator Perangkat</h1>
          <p className="text-[11px] text-slate-500 mt-1">Simulasikan interaksi ESP32-CAM dan RFID Reader langsung dari browser.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 border border-blue-100">
          <ShieldCheck className="h-4 w-4" />
          Testing Environment
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Camera Preview Section */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
              <div className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Live Preview</span>
            </div>
            
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full min-h-[400px] w-full object-cover grayscale-[0.2] transition-all duration-500"
            />
            
            <AnimatePresence>
              {isCapturing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                  <RefreshCw className="h-10 w-10 animate-spin text-white" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Canvas hidden for capture */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <CreditCard className="h-4 w-4 text-slate-500" />
              Data RFID
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">RFID UID (Decimal/Hex)</label>
                <input
                  type="text"
                  value={rfidUid}
                  onChange={(e) => setRfidUid(e.target.value)}
                  placeholder="Contoh: 12345678"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Laptop className="h-4 w-4 text-slate-500" />
              Konfigurasi Device
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Kode Device</label>
                <input
                  type="text"
                  value={deviceCode}
                  onChange={(e) => setDeviceCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Pairing Key</label>
                <input
                  type="text"
                  value={pairingKey}
                  onChange={(e) => setPairingKey(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleCaptureAndSend}
            disabled={isCapturing || !rfidUid}
            className={clsx(
              "group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl py-4 font-semibold text-white shadow-lg transition-all active:scale-95 disabled:grayscale",
              isCapturing ? "bg-slate-400" : "bg-gradient-to-br from-blue-600 to-indigo-700 hover:shadow-blue-500/25"
            )}
          >
            <Camera className="h-5 w-5" />
            <span>{isCapturing ? "Memproses..." : "Capture & Verifikasi"}</span>
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          <AnimatePresence>
            {status.type !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={clsx(
                  "rounded-2xl border p-4 text-sm font-medium",
                  status.type === "success" && "border-green-100 bg-green-50 text-green-700",
                  status.type === "error" && "border-red-100 bg-red-50 text-red-700",
                  status.type === "loading" && "border-blue-100 bg-blue-50 text-blue-700"
                )}
              >
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
