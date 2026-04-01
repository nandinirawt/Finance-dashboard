"use client";

import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  ChevronLeft,
  Wallet,
} from "lucide-react";
import { ActiveView } from "@/types";

const NAV_ITEMS: { view: ActiveView; label: string; icon: React.ElementType }[] = [
  { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { view: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { view: "insights", label: "Insights", icon: Lightbulb },
];

export function Sidebar() {
  const { activeView, setActiveView, sidebarOpen, toggleSidebar } = useStore();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r transition-transform duration-300 lg:static lg:translate-x-0",
        "bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-surface-200 dark:border-surface-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-emerald to-teal-600 shadow-lg shadow-accent-emerald/20">
            <Wallet className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-surface-900 dark:text-white">
              FinSight
            </h1>
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 lg:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500">
          Menu
        </p>
        {NAV_ITEMS.map(({ view, label, icon: Icon }) => {
          const isActive = activeView === view;
          return (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-accent-emerald/10 text-accent-emerald dark:bg-accent-emerald/15 shadow-sm"
                  : "text-surface-500 hover:bg-surface-100 hover:text-surface-700 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-200"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-accent-emerald" : ""
                )}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              {label}
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-emerald" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-surface-200 dark:border-surface-800 p-4">
        <div className="rounded-xl bg-gradient-to-br from-accent-emerald/10 to-teal-500/5 p-3.5 dark:from-accent-emerald/10 dark:to-teal-500/5">
          <p className="text-xs font-semibold text-accent-emerald">Pro Tip</p>
          <p className="mt-1 text-[11px] leading-relaxed text-surface-500 dark:text-surface-400">
            Switch to Admin role to add and manage transactions.
          </p>
        </div>
      </div>
    </aside>
  );
}
