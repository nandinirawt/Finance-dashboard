"use client";

import { useStore } from "@/store";
import { getCategoryBreakdown, getCategoryLabel } from "@/data/mock";
import { formatCurrency, cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function SpendingBreakdown() {
  const { transactions } = useStore();
  const data = getCategoryBreakdown(transactions);
  const top6 = data.slice(0, 6);

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-4 py-3 shadow-xl">
        <p className="text-xs font-semibold text-surface-500">
          {getCategoryLabel(d.category)}
        </p>
        <p className="mt-1 text-sm font-bold text-surface-900 dark:text-white">
          {formatCurrency(d.amount)}
        </p>
        <p className="text-[11px] text-surface-400">{d.percentage}% of total</p>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 animate-slide-up animate-delay-300">
      <div className="mb-4">
        <h3 className="font-display text-sm font-semibold text-surface-900 dark:text-white">
          Spending Breakdown
        </h3>
        <p className="mt-0.5 text-xs text-surface-400">By category</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="h-[180px] w-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={top6}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="amount"
                stroke="none"
                paddingAngle={3}
              >
                {top6.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid w-full grid-cols-2 gap-2">
          {top6.map((item) => (
            <div
              key={item.category}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
            >
              <div
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-surface-600 dark:text-surface-300">
                  {getCategoryLabel(item.category)}
                </p>
                <p className="text-[10px] text-surface-400">
                  {item.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
