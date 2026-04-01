"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { getCategoryLabel, getCategoryColor, CATEGORIES, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/data/mock";
import { Transaction, Category, TransactionType } from "@/types";
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Pencil,
  X,
  Check,
} from "lucide-react";

function AddTransactionModal({ onClose }: { onClose: () => void }) {
  const { addTransaction } = useStore();
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense" as TransactionType,
    category: "food" as Category,
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    addTransaction({
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    });
    onClose();
  };

  const categories = form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 p-6 shadow-2xl animate-slide-up">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-surface-900 dark:text-white">
            Add Transaction
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2 rounded-xl bg-surface-50 dark:bg-surface-800 p-1">
            {(["expense", "income"] as TransactionType[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setForm((f) => ({
                    ...f,
                    type: t,
                    category: t === "income" ? "salary" : "food",
                  }));
                }}
                className={cn(
                  "flex-1 rounded-lg py-2 text-xs font-semibold capitalize transition-all",
                  form.type === t
                    ? t === "income"
                      ? "bg-accent-emerald text-white shadow-sm"
                      : "bg-accent-coral text-white shadow-sm"
                    : "text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-surface-500">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="e.g., Grocery shopping"
              className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3.5 py-2.5 text-sm text-surface-900 dark:text-white placeholder-surface-400 outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-surface-500">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="0.00"
                className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3.5 py-2.5 text-sm text-surface-900 dark:text-white placeholder-surface-400 outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-surface-500">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3.5 py-2.5 text-sm text-surface-900 dark:text-white outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald/30"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-surface-500">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
              className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3.5 py-2.5 text-sm text-surface-900 dark:text-white outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald/30"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {getCategoryLabel(c)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!form.description || !form.amount}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-emerald py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-emerald/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-accent-emerald/20"
          >
            <Check className="h-4 w-4" />
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

export function TransactionsView() {
  const {
    role,
    filterType,
    filterCategory,
    searchQuery,
    sortField,
    sortDirection,
    setFilterType,
    setFilterCategory,
    setSearchQuery,
    setSortField,
    deleteTransaction,
    getFilteredTransactions,
  } = useStore();

  const [showAdd, setShowAdd] = useState(false);
  const filtered = getFilteredTransactions();
  const isAdmin = role === "admin";

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 py-2.5 pl-10 pr-4 text-sm text-surface-900 dark:text-white placeholder-surface-400 outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald/30"
          />
        </div>

        {/* Type Filter */}
        <div className="flex gap-1 rounded-xl bg-surface-50 dark:bg-surface-800 p-1">
          {(["all", "income", "expense"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all",
                filterType === t
                  ? "bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm"
                  : "text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as Category | "all")}
          className="rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3 py-2 text-xs font-medium text-surface-700 dark:text-surface-300 outline-none focus:border-accent-emerald"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {getCategoryLabel(c)}
            </option>
          ))}
        </select>

        {/* Add Button (Admin only) */}
        {isAdmin && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 rounded-xl bg-accent-emerald px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-accent-emerald/90 shadow-lg shadow-accent-emerald/20"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 border-b border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-800/50 px-4 py-3">
          <button
            onClick={() => setSortField("date")}
            className="col-span-3 md:col-span-2 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-surface-400 hover:text-surface-600"
          >
            Date
            {sortField === "date" && (
              <ArrowUpDown className="h-3 w-3" />
            )}
          </button>
          <div className="col-span-4 md:col-span-4 text-[11px] font-semibold uppercase tracking-wider text-surface-400">
            Description
          </div>
          <button
            onClick={() => setSortField("category")}
            className="col-span-2 hidden md:flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-surface-400 hover:text-surface-600"
          >
            Category
            {sortField === "category" && (
              <ArrowUpDown className="h-3 w-3" />
            )}
          </button>
          <button
            onClick={() => setSortField("amount")}
            className="col-span-3 md:col-span-2 flex items-center justify-end gap-1 text-[11px] font-semibold uppercase tracking-wider text-surface-400 hover:text-surface-600"
          >
            Amount
            {sortField === "amount" && (
              <ArrowUpDown className="h-3 w-3" />
            )}
          </button>
          {isAdmin && (
            <div className="col-span-2 text-right text-[11px] font-semibold uppercase tracking-wider text-surface-400">
              Actions
            </div>
          )}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Filter className="h-10 w-10 text-surface-300 dark:text-surface-600 mb-3" />
            <p className="text-sm font-medium text-surface-500">No transactions found</p>
            <p className="mt-1 text-xs text-surface-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-surface-50 dark:divide-surface-800/50">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-12 gap-2 items-center px-4 py-3 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/30"
              >
                <div className="col-span-3 md:col-span-2">
                  <p className="text-xs font-medium text-surface-600 dark:text-surface-400">
                    {formatDate(t.date)}
                  </p>
                </div>
                <div className="col-span-4 md:col-span-4 flex items-center gap-2.5 min-w-0">
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: getCategoryColor(t.category) + "18" }}
                  >
                    {t.type === "income" ? (
                      <ArrowUpRight className="h-3.5 w-3.5" style={{ color: getCategoryColor(t.category) }} />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" style={{ color: getCategoryColor(t.category) }} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-surface-800 dark:text-surface-200">
                      {t.description}
                    </p>
                    <p className="text-[11px] text-surface-400 md:hidden">
                      {getCategoryLabel(t.category)}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span
                    className="inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{
                      backgroundColor: getCategoryColor(t.category) + "15",
                      color: getCategoryColor(t.category),
                    }}
                  >
                    {getCategoryLabel(t.category)}
                  </span>
                </div>
                <div className="col-span-3 md:col-span-2 text-right">
                  <span
                    className={cn(
                      "font-mono text-sm font-semibold",
                      t.type === "income"
                        ? "text-accent-emerald"
                        : "text-surface-700 dark:text-surface-300"
                    )}
                  >
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </span>
                </div>
                {isAdmin && (
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-400 hover:bg-accent-coral/10 hover:text-accent-coral transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-800/30 px-4 py-2.5">
          <p className="text-[11px] text-surface-400">
            Showing {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </p>
          {!isAdmin && (
            <p className="text-[11px] text-accent-blue font-medium">
              Viewing as read-only
            </p>
          )}
        </div>
      </div>

      {showAdd && <AddTransactionModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
