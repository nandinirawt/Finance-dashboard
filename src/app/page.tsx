"use client";

import { useEffect } from "react";
import { useStore } from "@/store";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { InsightsView } from "@/components/insights/InsightsView";

export default function Home() {
  const { darkMode, activeView, sidebarOpen, toggleSidebar } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 dark:bg-surface-950 transition-theme">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-[1440px]">
            {activeView === "dashboard" && <DashboardView />}
            {activeView === "transactions" && <TransactionsView />}
            {activeView === "insights" && <InsightsView />}
          </div>
        </main>
      </div>
    </div>
  );
}
