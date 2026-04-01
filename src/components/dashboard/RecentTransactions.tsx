"use client";

import { useStore } from "@/store";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { getCategoryLabel, getCategoryColor } from "@/data/mock";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function RecentTransactions() {
  const { transactions, setActiveView } = useStore();
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 animate-slide-up animate-delay-300">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold text-surface-900 dark:text-white">
            Recent Transactions
          </h3>
          <p className="mt-0.5 text-xs text-surface-400">Last 6 entries</p>
        </div>
        <button
          onClick={() => setActiveView("transactions")}
          className="text-xs font-semibold text-accent-emerald hover:text-accent-emerald-light transition-colors"
        >
          View All →
        </button>
      </div>

      <div className="space-y-1">
        {recent.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/50"
          >
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: getCategoryColor(t.category) + "18" }}
            >
              {t.type === "income" ? (
                <ArrowUpRight
                  className="h-4 w-4"
                  style={{ color: getCategoryColor(t.category) }}
                />
              ) : (
                <ArrowDownRight
                  className="h-4 w-4"
                  style={{ color: getCategoryColor(t.category) }}
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-surface-800 dark:text-surface-200">
                {t.description}
              </p>
              <p className="text-[11px] text-surface-400">
                {getCategoryLabel(t.category)} · {formatDate(t.date)}
              </p>
            </div>
            <p
              className={cn(
                "font-mono text-sm font-semibold",
                t.type === "income"
                  ? "text-accent-emerald"
                  : "text-surface-700 dark:text-surface-300"
              )}
            >
              {t.type === "income" ? "+" : "-"}
              {formatCurrency(t.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
