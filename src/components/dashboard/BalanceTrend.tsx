"use client";

import { useStore } from "@/store";
import { getMonthlyData } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function BalanceTrend() {
  const { transactions } = useStore();
  const data = getMonthlyData(transactions);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-4 py-3 shadow-xl">
        <p className="text-xs font-semibold text-surface-500">{label} 2024</p>
        <p className="mt-1 font-display text-sm font-bold text-accent-emerald">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 animate-slide-up animate-delay-200">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold text-surface-900 dark:text-white">
            Balance Trend
          </h3>
          <p className="mt-0.5 text-xs text-surface-400">
            Cumulative balance over 6 months
          </p>
        </div>
        <div className="rounded-lg bg-accent-emerald/10 px-2.5 py-1 text-[11px] font-semibold text-accent-emerald">
          Jan — Jun 2024
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#balanceGradient)"
              dot={{ fill: "#10b981", r: 4, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
