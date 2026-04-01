"use client";

import { useStore } from "@/store";
import { formatCurrency, cn } from "@/lib/utils";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
} from "lucide-react";

export function SummaryCards() {
  const { getTotalIncome, getTotalExpenses, getBalance, transactions } = useStore();

  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const balance = getBalance();
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : "0";

  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(balance),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Wallet,
      gradient: "from-accent-emerald to-teal-600",
      shadowColor: "shadow-accent-emerald/20",
      bgColor: "bg-accent-emerald/8",
      iconBg: "bg-accent-emerald/15",
      iconColor: "text-accent-emerald",
    },
    {
      title: "Total Income",
      value: formatCurrency(income),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      gradient: "from-accent-blue to-blue-600",
      shadowColor: "shadow-accent-blue/20",
      bgColor: "bg-accent-blue/8",
      iconBg: "bg-accent-blue/15",
      iconColor: "text-accent-blue",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(expenses),
      change: "+3.1%",
      changeType: "negative" as const,
      icon: TrendingDown,
      gradient: "from-accent-coral to-rose-600",
      shadowColor: "shadow-accent-coral/20",
      bgColor: "bg-accent-coral/8",
      iconBg: "bg-accent-coral/15",
      iconColor: "text-accent-coral",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      change: `${transactions.length} txns`,
      changeType: "neutral" as const,
      icon: PiggyBank,
      gradient: "from-accent-violet to-purple-600",
      shadowColor: "shadow-accent-violet/20",
      bgColor: "bg-accent-violet/8",
      iconBg: "bg-accent-violet/15",
      iconColor: "text-accent-violet",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
            "animate-slide-up",
            i === 1 && "animate-delay-100",
            i === 2 && "animate-delay-200",
            i === 3 && "animate-delay-300"
          )}
        >
          {/* Subtle gradient background */}
          <div
            className={cn(
              "absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.12]",
              `bg-gradient-to-br ${card.gradient}`
            )}
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  card.iconBg
                )}
              >
                <card.icon className={cn("h-5 w-5", card.iconColor)} />
              </div>
              <div
                className={cn(
                  "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  card.changeType === "positive" &&
                    "bg-accent-emerald/10 text-accent-emerald",
                  card.changeType === "negative" &&
                    "bg-accent-coral/10 text-accent-coral",
                  card.changeType === "neutral" &&
                    "bg-surface-100 dark:bg-surface-800 text-surface-500"
                )}
              >
                {card.changeType === "positive" && (
                  <ArrowUpRight className="h-3 w-3" />
                )}
                {card.changeType === "negative" && (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {card.change}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-medium text-surface-400 dark:text-surface-500">
                {card.title}
              </p>
              <p className="mt-1 font-display text-2xl font-bold tracking-tight text-surface-900 dark:text-white">
                {card.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
