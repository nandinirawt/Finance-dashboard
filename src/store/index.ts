import { create } from "zustand";
import {
  Transaction,
  UserRole,
  FilterType,
  SortField,
  SortDirection,
  ActiveView,
  Category,
} from "@/types";
import { mockTransactions } from "@/data/mock";

interface AppState {
  // Data
  transactions: Transaction[];
  role: UserRole;
  activeView: ActiveView;
  darkMode: boolean;
  sidebarOpen: boolean;

  // Filters
  filterType: FilterType;
  filterCategory: Category | "all";
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;

  // Actions
  setRole: (role: UserRole) => void;
  setActiveView: (view: ActiveView) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setFilterType: (type: FilterType) => void;
  setFilterCategory: (cat: Category | "all") => void;
  setSearchQuery: (query: string) => void;
  setSortField: (field: SortField) => void;
  setSortDirection: (dir: SortDirection) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, updates: Partial<Transaction>) => void;

  // Computed
  getFilteredTransactions: () => Transaction[];
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
}

export const useStore = create<AppState>((set, get) => ({
  transactions: mockTransactions,
  role: "admin",
  activeView: "dashboard",
  darkMode: true,
  sidebarOpen: false,

  filterType: "all",
  filterCategory: "all",
  searchQuery: "",
  sortField: "date",
  sortDirection: "desc",

  setRole: (role) => set({ role }),
  setActiveView: (activeView) => set({ activeView, sidebarOpen: false }),
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  setFilterType: (filterType) => set({ filterType }),
  setFilterCategory: (filterCategory) => set({ filterCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortField: (sortField) =>
    set((s) => ({
      sortField,
      sortDirection:
        s.sortField === sortField
          ? s.sortDirection === "asc"
            ? "desc"
            : "asc"
          : "desc",
    })),
  setSortDirection: (sortDirection) => set({ sortDirection }),

  addTransaction: (t) =>
    set((s) => ({
      transactions: [
        { ...t, id: `t${Date.now()}` },
        ...s.transactions,
      ],
    })),

  deleteTransaction: (id) =>
    set((s) => ({
      transactions: s.transactions.filter((t) => t.id !== id),
    })),

  editTransaction: (id, updates) =>
    set((s) => ({
      transactions: s.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  getFilteredTransactions: () => {
    const { transactions, filterType, filterCategory, searchQuery, sortField, sortDirection } = get();
    let filtered = [...transactions];

    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType);
    }
    if (filterCategory !== "all") {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    filtered.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "date":
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          cmp = a.amount - b.amount;
          break;
        case "category":
          cmp = a.category.localeCompare(b.category);
          break;
      }
      return sortDirection === "asc" ? cmp : -cmp;
    });

    return filtered;
  },

  getTotalIncome: () =>
    get()
      .transactions.filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0),

  getTotalExpenses: () =>
    get()
      .transactions.filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0),

  getBalance: () => {
    const state = get();
    return state.getTotalIncome() - state.getTotalExpenses();
  },
}));
