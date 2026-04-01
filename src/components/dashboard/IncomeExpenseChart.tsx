"use client";

import { useStore } from "@/store";
import { getMonthlyData } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function IncomeExpenseChart() {
  const { transactions } = useStore();
  const data = getMonthlyData(transactions);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-4 py-3 shadow-xl">
        <p className="text-xs font-semibold text-surface-500 mb-1.5">{label} 2024</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-[11px]">
            <span
              className="inline-block h-2 w-2 rounded-full mr-1.5"
              style={{ backgroundColor: p.fill }}
            />
            <span className="text-surface-500">{p.name}:</span>{" "}
            <span className="font-semibold text-surface-800 dark:text-surface-200">
              {formatCurrency(p.value)}
            </span>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 animate-slide-up animate-delay-400">
      <div className="mb-5">
        <h3 className="font-display text-sm font-semibold text-surface-900 dark:text-white">
          Income vs Expenses
        </h3>
        <p className="mt-0.5 text-xs text-surface-400">Monthly comparison</p>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-surface-100 dark:text-surface-800"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#9aa1b3" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9aa1b3" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="income"
              name="Income"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#f43f5e"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-5">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-accent-emerald" />
          <span className="text-[11px] text-surface-500">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-accent-coral" />
          <span className="text-[11px] text-surface-500">Expenses</span>
        </div>
      </div>
    </div>
  );
}
