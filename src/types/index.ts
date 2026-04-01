export type TransactionType = "income" | "expense";

export type Category =
  | "salary"
  | "freelance"
  | "investments"
  | "food"
  | "transport"
  | "entertainment"
  | "utilities"
  | "shopping"
  | "health"
  | "education"
  | "rent"
  | "travel"
  | "subscriptions"
  | "other";

export type UserRole = "admin" | "viewer";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryBreakdown {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: "positive" | "negative" | "neutral";
  value?: string;
  icon: string;
}

export type SortField = "date" | "amount" | "category";
export type SortDirection = "asc" | "desc";
export type FilterType = "all" | "income" | "expense";
export type ActiveView = "dashboard" | "transactions" | "insights";
