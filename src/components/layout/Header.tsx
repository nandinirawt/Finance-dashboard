"use client";

import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import {
  Menu,
  Moon,
  Sun,
  Shield,
  Eye,
  Download,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { exportToCSV, exportToJSON } from "@/lib/utils";

export function Header() {
  const {
    role,
    setRole,
    darkMode,
    toggleDarkMode,
    toggleSidebar,
    activeView,
    transactions,
  } = useStore();

  const [roleOpen, setRoleOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const roleRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (roleRef.current && !roleRef.current.contains(e.target as Node))
        setRoleOpen(false);
      if (exportRef.current && !exportRef.current.contains(e.target as Node))
        setExportOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const viewTitle = {
    dashboard: "Dashboard",
    transactions: "Transactions",
    insights: "Insights",
  }[activeView];

  const viewSubtitle = {
    dashboard: "Your financial overview at a glance",
    transactions: "Manage and explore your transactions",
    insights: "Spending patterns and analysis",
  }[activeView];

  return (
    <header className="flex h-16 items-center justify-between border-b border-surface-200 dark:border-surface-800 bg-white/80 dark:bg-surface-900/80 glass px-4 md:px-6 lg:px-8">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h2 className="font-display text-lg font-semibold text-surface-900 dark:text-white">
            {viewTitle}
          </h2>
          <p className="hidden text-xs text-surface-400 sm:block">
            {viewSubtitle}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Export */}
        <div ref={exportRef} className="relative">
          <button
            onClick={() => setExportOpen(!exportOpen)}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-surface-200 dark:border-surface-700 px-3 text-xs font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          {exportOpen && (
            <div className="absolute right-0 top-11 z-50 w-36 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 shadow-xl py-1.5 animate-fade-in">
              <button
                onClick={() => {
                  exportToCSV(
                    transactions.map((t) => ({
                      ...t,
                      amount: t.type === "expense" ? -t.amount : t.amount,
                    })),
                    "transactions"
                  );
                  setExportOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 text-xs text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
              >
                Export as CSV
              </button>
              <button
                onClick={() => {
                  exportToJSON(transactions, "transactions");
                  setExportOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 text-xs text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
              >
                Export as JSON
              </button>
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-200 dark:border-surface-700 text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        {/* Role Switcher */}
        <div ref={roleRef} className="relative">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className={cn(
              "flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition-colors",
              role === "admin"
                ? "border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald hover:bg-accent-emerald/15"
                : "border-accent-blue/30 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/15"
            )}
          >
            {role === "admin" ? (
              <Shield className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline capitalize">{role}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          {roleOpen && (
            <div className="absolute right-0 top-11 z-50 w-44 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 shadow-xl py-1.5 animate-fade-in">
              <button
                onClick={() => {
                  setRole("admin");
                  setRoleOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2.5 text-xs",
                  role === "admin"
                    ? "text-accent-emerald bg-accent-emerald/5"
                    : "text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                )}
              >
                <Shield className="h-4 w-4" />
                <div className="text-left">
                  <p className="font-semibold">Admin</p>
                  <p className="text-[10px] opacity-60">Full access</p>
                </div>
              </button>
              <button
                onClick={() => {
                  setRole("viewer");
                  setRoleOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2.5 text-xs",
                  role === "viewer"
                    ? "text-accent-blue bg-accent-blue/5"
                    : "text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                )}
              >
                <Eye className="h-4 w-4" />
                <div className="text-left">
                  <p className="font-semibold">Viewer</p>
                  <p className="text-[10px] opacity-60">Read only</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
