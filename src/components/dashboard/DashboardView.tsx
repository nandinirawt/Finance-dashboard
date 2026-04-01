"use client";

import { SummaryCards } from "./SummaryCards";
import { BalanceTrend } from "./BalanceTrend";
import { SpendingBreakdown } from "./SpendingBreakdown";
import { RecentTransactions } from "./RecentTransactions";
import { IncomeExpenseChart } from "./IncomeExpenseChart";

export function DashboardView() {
  return (
    <div className="space-y-6">
      <SummaryCards />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <BalanceTrend />
        </div>
        <div className="lg:col-span-2">
          <SpendingBreakdown />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecentTransactions />
        </div>
        <div className="lg:col-span-2">
          <IncomeExpenseChart />
        </div>
      </div>
    </div>
  );
}
