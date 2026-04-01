"use client";

import { useStore } from "@/store";
import { formatCurrency, cn } from "@/lib/utils";
import { getCategoryLabel, getCategoryColor, getCategoryBreakdown, getMonthlyData } from "@/data/mock";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Zap,
  PiggyBank,
  CalendarDays,
  ShoppingBag,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

export function InsightsView() {
  const { transactions, getTotalIncome, getTotalExpenses, getBalance } = useStore();

  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const balance = getBalance();
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;
  const monthlyData = getMonthlyData(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions);

  // Compute insights
  const highestCategory = categoryBreakdown[0];
  const avgMonthlyExpense = expenses / 6;
  const avgMonthlyIncome = income / 6;

  // Month-over-month change (last vs previous)
  const lastMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData[monthlyData.length - 2];
  const expenseChange = prevMonth.expenses > 0
    ? ((lastMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100
    : 0;
  const incomeChange = prevMonth.income > 0
    ? ((lastMonth.income - prevMonth.income) / prevMonth.income) * 100
    : 0;

  // Find best and worst months
  const bestMonth = [...monthlyData].sort((a, b) => (b.income - b.expenses) - (a.income - a.expenses))[0];
  const worstMonth = [...monthlyData].sort((a, b) => (a.income - a.expenses) - (b.income - b.expenses))[0];

  // Radar data for top categories
  const radarData = categoryBreakdown.slice(0, 6).map((c) => ({
    category: getCategoryLabel(c.category).split(" ")[0],
    value: c.amount,
    fullMark: categoryBreakdown[0].amount,
  }));

  const insights = [
    {
      icon: ShoppingBag,
      title: "Top Spending Category",
      description: `${getCategoryLabel(highestCategory.category)} leads your expenses at ${highestCategory.percentage}% of total spending.`,
      value: formatCurrency(highestCategory.amount),
      type: "neutral" as const,
      color: getCategoryColor(highestCategory.category),
    },
    {
      icon: expenseChange > 0 ? TrendingUp : TrendingDown,
      title: "Expense Trend",
      description: expenseChange > 0
        ? `Spending increased by ${Math.abs(expenseChange).toFixed(1)}% from ${prevMonth.month} to ${lastMonth.month}.`
        : `Spending decreased by ${Math.abs(expenseChange).toFixed(1)}% from ${prevMonth.month} to ${lastMonth.month}. Great job!`,
      value: `${expenseChange > 0 ? "+" : ""}${expenseChange.toFixed(1)}%`,
      type: expenseChange > 0 ? "negative" : "positive",
      color: expenseChange > 0 ? "#f43f5e" : "#10b981",
    },
    {
      icon: PiggyBank,
      title: "Savings Rate",
      description: savingsRate >= 20
        ? `Excellent! You're saving ${savingsRate.toFixed(1)}% of your income.`
        : `Your savings rate is ${savingsRate.toFixed(1)}%. Aim for 20%+ for healthier finances.`,
      value: `${savingsRate.toFixed(1)}%`,
      type: savingsRate >= 20 ? "positive" : "negative",
      color: savingsRate >= 20 ? "#10b981" : "#f59e0b",
    },
    {
      icon: CalendarDays,
      title: "Best Month",
      description: `${bestMonth.month} was your best month with a net surplus of ${formatCurrency(bestMonth.income - bestMonth.expenses)}.`,
      value: bestMonth.month,
      type: "positive" as const,
      color: "#3b82f6",
    },
    {
      icon: AlertTriangle,
      title: "Watch Out",
      description: `${worstMonth.month} had the lowest net balance. Consider reviewing spending that month.`,
      value: worstMonth.month,
      type: "negative" as const,
      color: "#f43f5e",
    },
    {
      icon: Zap,
      title: "Monthly Average",
      description: `You earn ~${formatCurrency(avgMonthlyIncome)}/mo and spend ~${formatCurrency(avgMonthlyExpense)}/mo on average.`,
      value: formatCurrency(avgMonthlyIncome - avgMonthlyExpense),
      type: "neutral" as const,
      color: "#8b5cf6",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-4 py-3 shadow-xl">
        <p className="text-xs font-semibold text-surface-500">{label} 2024</p>
        <p className="mt-1 text-sm font-bold" style={{ color: "#10b981" }}>
          Net: {formatCurrency(payload[0]?.value || 0)}
        </p>
      </div>
    );
  };

  const netData = monthlyData.map((m) => ({
    month: m.month,
    net: m.income - m.expenses,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Insight Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, i) => (
          <div
            key={insight.title}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-slide-up",
              i >= 1 && "animate-delay-100",
              i >= 2 && "animate-delay-200",
              i >= 3 && "animate-delay-300"
            )}
          >
            <div
              className="absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-[0.08] blur-2xl"
              style={{ backgroundColor: insight.color }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: insight.color + "18" }}
                >
                  <insight.icon className="h-5 w-5" style={{ color: insight.color }} />
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 font-display text-sm font-bold",
                  )}
                  style={{ color: insight.color }}
                >
                  {insight.value}
                </span>
              </div>
              <h4 className="mt-3 text-sm font-semibold text-surface-800 dark:text-surface-200">
                {insight.title}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-surface-500 dark:text-surface-400">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Net Savings per Month */}
        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
          <div className="mb-5">
            <h3 className="font-display text-sm font-semibold text-surface-900 dark:text-white">
              Monthly Net Savings
            </h3>
            <p className="mt-0.5 text-xs text-surface-400">
              Income minus expenses each month
            </p>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={netData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-surface-100 dark:text-surface-800"
                  vertical={false}
                />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9aa1b3" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9aa1b3" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="net" radius={[8, 8, 0, 0]} maxBarSize={40}>
                  {netData.map((entry, i) => (
                    <rect key={i} fill={entry.net >= 0 ? "#10b981" : "#f43f5e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Radar */}
        <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
          <div className="mb-5">
            <h3 className="font-display text-sm font-semibold text-surface-900 dark:text-white">
              Spending Profile
            </h3>
            <p className="mt-0.5 text-xs text-surface-400">Top 6 expense categories</p>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e6ef" className="dark:stroke-surface-700" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: "#9aa1b3" }} />
                <Radar
                  name="Spending"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Ranking */}
      <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
        <div className="mb-5">
          <h3 className="font-display text-sm font-semibold text-surface-900 dark:text-white">
            Expense Ranking
          </h3>
          <p className="mt-0.5 text-xs text-surface-400">All categories ranked by total spend</p>
        </div>
        <div className="space-y-3">
          {categoryBreakdown.map((cat, i) => (
            <div key={cat.category} className="flex items-center gap-3">
              <span className="w-5 text-right font-mono text-[11px] font-semibold text-surface-400">
                {i + 1}
              </span>
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: cat.color + "18" }}
              >
                <BarChart3 className="h-3.5 w-3.5" style={{ color: cat.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-surface-700 dark:text-surface-300">
                    {getCategoryLabel(cat.category)}
                  </p>
                  <p className="font-mono text-xs font-semibold text-surface-800 dark:text-surface-200">
                    {formatCurrency(cat.amount)}
                  </p>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium text-surface-400 w-10 text-right">
                {cat.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
