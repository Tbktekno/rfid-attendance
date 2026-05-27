import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { AppSidebar } from "./app-sidebar";
import { Topbar } from "./topbar";
import { ToastViewport } from "../common/toast-viewport";

export const AppShell = () => (
  <div className="app-shell h-screen overflow-hidden">
    <AppSidebar />
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-w-0 overflow-y-scroll"
    >
      <Topbar />
      <div className="px-4 pb-4 sm:px-6 lg:px-8 lg:pb-7">
        <Outlet />
      </div>
    </motion.main>
    <ToastViewport />
  </div>
);
