import { Transaction, Category, MonthlyData } from "@/types";

const CATEGORY_COLORS: Record<Category, string> = {
  salary: "#10b981",
  freelance: "#34d399",
  investments: "#3b82f6",
  food: "#f59e0b",
  transport: "#8b5cf6",
  entertainment: "#ec4899",
  utilities: "#6366f1",
  shopping: "#f43f5e",
  health: "#14b8a6",
  education: "#06b6d4",
  rent: "#ef4444",
  travel: "#a855f7",
  subscriptions: "#f97316",
  other: "#6b7280",
};

export const getCategoryColor = (cat: Category): string => CATEGORY_COLORS[cat];

export const getCategoryLabel = (cat: Category): string => {
  const labels: Record<Category, string> = {
    salary: "Salary",
    freelance: "Freelance",
    investments: "Investments",
    food: "Food & Dining",
    transport: "Transport",
    entertainment: "Entertainment",
    utilities: "Utilities",
    shopping: "Shopping",
    health: "Healthcare",
    education: "Education",
    rent: "Rent",
    travel: "Travel",
    subscriptions: "Subscriptions",
    other: "Other",
  };
  return labels[cat];
};

export const CATEGORIES: Category[] = [
  "salary", "freelance", "investments", "food", "transport",
  "entertainment", "utilities", "shopping", "health", "education",
  "rent", "travel", "subscriptions", "other",
];

export const INCOME_CATEGORIES: Category[] = ["salary", "freelance", "investments"];
export const EXPENSE_CATEGORIES: Category[] = [
  "food", "transport", "entertainment", "utilities", "shopping",
  "health", "education", "rent", "travel", "subscriptions", "other",
];

export const mockTransactions: Transaction[] = [
  // January 2024
  { id: "t001", date: "2024-01-02", description: "Monthly Salary", amount: 8500, type: "income", category: "salary" },
  { id: "t002", date: "2024-01-03", description: "Rent Payment", amount: 2200, type: "expense", category: "rent" },
  { id: "t003", date: "2024-01-05", description: "Grocery Store", amount: 156.30, type: "expense", category: "food" },
  { id: "t004", date: "2024-01-07", description: "Uber Rides", amount: 42.50, type: "expense", category: "transport" },
  { id: "t005", date: "2024-01-08", description: "Netflix Subscription", amount: 15.99, type: "expense", category: "subscriptions" },
  { id: "t006", date: "2024-01-10", description: "Freelance Web Project", amount: 1200, type: "income", category: "freelance" },
  { id: "t007", date: "2024-01-12", description: "Electric Bill", amount: 89.00, type: "expense", category: "utilities" },
  { id: "t008", date: "2024-01-14", description: "Movie Tickets", amount: 32.00, type: "expense", category: "entertainment" },
  { id: "t009", date: "2024-01-15", description: "Dividend Income", amount: 340, type: "income", category: "investments" },
  { id: "t010", date: "2024-01-18", description: "Pharmacy", amount: 28.50, type: "expense", category: "health" },
  { id: "t011", date: "2024-01-20", description: "Restaurant Dinner", amount: 78.90, type: "expense", category: "food" },
  { id: "t012", date: "2024-01-22", description: "Online Course", amount: 49.99, type: "expense", category: "education" },
  { id: "t013", date: "2024-01-25", description: "Gas Station", amount: 55.00, type: "expense", category: "transport" },
  { id: "t014", date: "2024-01-28", description: "New Sneakers", amount: 129.99, type: "expense", category: "shopping" },
  { id: "t015", date: "2024-01-30", description: "Internet Bill", amount: 69.99, type: "expense", category: "utilities" },

  // February 2024
  { id: "t016", date: "2024-02-01", description: "Monthly Salary", amount: 8500, type: "income", category: "salary" },
  { id: "t017", date: "2024-02-02", description: "Rent Payment", amount: 2200, type: "expense", category: "rent" },
  { id: "t018", date: "2024-02-04", description: "Grocery Shopping", amount: 178.45, type: "expense", category: "food" },
  { id: "t019", date: "2024-02-06", description: "Gym Membership", amount: 45.00, type: "expense", category: "health" },
  { id: "t020", date: "2024-02-08", description: "Spotify Premium", amount: 11.99, type: "expense", category: "subscriptions" },
  { id: "t021", date: "2024-02-10", description: "Valentine's Dinner", amount: 145.00, type: "expense", category: "food" },
  { id: "t022", date: "2024-02-12", description: "Freelance Design Work", amount: 800, type: "income", category: "freelance" },
  { id: "t023", date: "2024-02-14", description: "Flowers & Gift", amount: 85.00, type: "expense", category: "shopping" },
  { id: "t024", date: "2024-02-15", description: "Stock Dividend", amount: 280, type: "income", category: "investments" },
  { id: "t025", date: "2024-02-18", description: "Heating Bill", amount: 120.00, type: "expense", category: "utilities" },
  { id: "t026", date: "2024-02-20", description: "Concert Tickets", amount: 150.00, type: "expense", category: "entertainment" },
  { id: "t027", date: "2024-02-22", description: "Uber Eats", amount: 38.90, type: "expense", category: "food" },
  { id: "t028", date: "2024-02-25", description: "Parking Fees", amount: 30.00, type: "expense", category: "transport" },
  { id: "t029", date: "2024-02-28", description: "Book Purchase", amount: 24.99, type: "expense", category: "education" },

  // March 2024
  { id: "t030", date: "2024-03-01", description: "Monthly Salary", amount: 8500, type: "income", category: "salary" },
  { id: "t031", date: "2024-03-02", description: "Rent Payment", amount: 2200, type: "expense", category: "rent" },
  { id: "t032", date: "2024-03-04", description: "Groceries", amount: 142.80, type: "expense", category: "food" },
  { id: "t033", date: "2024-03-06", description: "Metro Pass", amount: 75.00, type: "expense", category: "transport" },
  { id: "t034", date: "2024-03-08", description: "Freelance Consulting", amount: 1500, type: "income", category: "freelance" },
  { id: "t035", date: "2024-03-10", description: "Water Bill", amount: 42.00, type: "expense", category: "utilities" },
  { id: "t036", date: "2024-03-12", description: "Dinner with Friends", amount: 67.50, type: "expense", category: "food" },
  { id: "t037", date: "2024-03-14", description: "Clothing Store", amount: 215.00, type: "expense", category: "shopping" },
  { id: "t038", date: "2024-03-15", description: "Investment Return", amount: 520, type: "income", category: "investments" },
  { id: "t039", date: "2024-03-17", description: "Doctor Visit", amount: 150.00, type: "expense", category: "health" },
  { id: "t040", date: "2024-03-19", description: "Gaming Subscription", amount: 14.99, type: "expense", category: "subscriptions" },
  { id: "t041", date: "2024-03-21", description: "Weekend Trip", amount: 450.00, type: "expense", category: "travel" },
  { id: "t042", date: "2024-03-23", description: "Lunch Takeout", amount: 22.50, type: "expense", category: "food" },
  { id: "t043", date: "2024-03-25", description: "Electric Bill", amount: 78.00, type: "expense", category: "utilities" },
  { id: "t044", date: "2024-03-28", description: "Online Workshop", amount: 99.00, type: "expense", category: "education" },
  { id: "t045", date: "2024-03-30", description: "Taxi Rides", amount: 35.00, type: "expense", category: "transport" },

  // April 2024
  { id: "t046", date: "2024-04-01", description: "Monthly Salary", amount: 8500, type: "income", category: "salary" },
  { id: "t047", date: "2024-04-02", description: "Rent Payment", amount: 2200, type: "expense", category: "rent" },
  { id: "t048", date: "2024-04-04", description: "Grocery Run", amount: 198.20, type: "expense", category: "food" },
  { id: "t049", date: "2024-04-06", description: "Car Maintenance", amount: 320.00, type: "expense", category: "transport" },
  { id: "t050", date: "2024-04-08", description: "Cloud Storage Sub", amount: 9.99, type: "expense", category: "subscriptions" },
  { id: "t051", date: "2024-04-10", description: "Freelance Project", amount: 2000, type: "income", category: "freelance" },
  { id: "t052", date: "2024-04-12", description: "Sushi Restaurant", amount: 92.00, type: "expense", category: "food" },
  { id: "t053", date: "2024-04-14", description: "Theme Park", amount: 110.00, type: "expense", category: "entertainment" },
  { id: "t054", date: "2024-04-15", description: "Quarterly Dividend", amount: 680, type: "income", category: "investments" },
  { id: "t055", date: "2024-04-18", description: "Dentist Appointment", amount: 200.00, type: "expense", category: "health" },
  { id: "t056", date: "2024-04-20", description: "Spring Wardrobe", amount: 340.00, type: "expense", category: "shopping" },
  { id: "t057", date: "2024-04-22", description: "Internet Bill", amount: 69.99, type: "expense", category: "utilities" },
  { id: "t058", date: "2024-04-25", description: "Coffee Shops", amount: 48.50, type: "expense", category: "food" },
  { id: "t059", date: "2024-04-28", description: "Online Certification", amount: 199.00, type: "expense", category: "education" },
  { id: "t060", date: "2024-04-30", description: "Gas & Tolls", amount: 72.00, type: "expense", category: "transport" },

  // May 2024
  { id: "t061", date: "2024-05-01", description: "Monthly Salary", amount: 9000, type: "income", category: "salary" },
  { id: "t062", date: "2024-05-02", description: "Rent Payment", amount: 2200, type: "expense", category: "rent" },
  { id: "t063", date: "2024-05-04", description: "Grocery Shopping", amount: 167.30, type: "expense", category: "food" },
  { id: "t064", date: "2024-05-06", description: "Bus Pass", amount: 65.00, type: "expense", category: "transport" },
  { id: "t065", date: "2024-05-08", description: "Streaming Bundle", amount: 22.99, type: "expense", category: "subscriptions" },
  { id: "t066", date: "2024-05-10", description: "Mother's Day Gift", amount: 120.00, type: "expense", category: "shopping" },
  { id: "t067", date: "2024-05-12", description: "Freelance Article", amount: 600, type: "income", category: "freelance" },
  { id: "t068", date: "2024-05-14", description: "Brunch Outing", amount: 56.00, type: "expense", category: "food" },
  { id: "t069", date: "2024-05-15", description: "Bond Interest", amount: 190, type: "income", category: "investments" },
  { id: "t070", date: "2024-05-17", description: "Electric Bill", amount: 72.00, type: "expense", category: "utilities" },
  { id: "t071", date: "2024-05-19", description: "Weekend Getaway", amount: 580.00, type: "expense", category: "travel" },
  { id: "t072", date: "2024-05-21", description: "Prescription Meds", amount: 35.00, type: "expense", category: "health" },
  { id: "t073", date: "2024-05-23", description: "Board Games Night", amount: 45.00, type: "expense", category: "entertainment" },
  { id: "t074", date: "2024-05-25", description: "Takeout Pizza", amount: 28.90, type: "expense", category: "food" },
  { id: "t075", date: "2024-05-28", description: "Coding Bootcamp", amount: 299.00, type: "expense", category: "education" },
  { id: "t076", date: "2024-05-30", description: "Uber Rides", amount: 52.00, type: "expense", category: "transport" },

  // June 2024
  { id: "t077", date: "2024-06-01", description: "Monthly Salary", amount: 9000, type: "income", category: "salary" },
  { id: "t078", date: "2024-06-02", description: "Rent Payment", amount: 2200, type: "expense", category: "rent" },
  { id: "t079", date: "2024-06-04", description: "Costco Run", amount: 245.60, type: "expense", category: "food" },
  { id: "t080", date: "2024-06-06", description: "Car Insurance", amount: 180.00, type: "expense", category: "transport" },
  { id: "t081", date: "2024-06-08", description: "Freelance App Dev", amount: 2500, type: "income", category: "freelance" },
  { id: "t082", date: "2024-06-10", description: "Summer Clothes", amount: 275.00, type: "expense", category: "shopping" },
  { id: "t083", date: "2024-06-12", description: "Water & Sewage", amount: 48.00, type: "expense", category: "utilities" },
  { id: "t084", date: "2024-06-14", description: "Beach Trip", amount: 320.00, type: "expense", category: "travel" },
  { id: "t085", date: "2024-06-15", description: "Stock Sale Profit", amount: 1200, type: "income", category: "investments" },
  { id: "t086", date: "2024-06-17", description: "Annual Health Checkup", amount: 350.00, type: "expense", category: "health" },
  { id: "t087", date: "2024-06-19", description: "Live Music Show", amount: 85.00, type: "expense", category: "entertainment" },
  { id: "t088", date: "2024-06-21", description: "BBQ Supplies", amount: 92.50, type: "expense", category: "food" },
  { id: "t089", date: "2024-06-23", description: "Podcast Equipment", amount: 159.00, type: "expense", category: "other" },
  { id: "t090", date: "2024-06-25", description: "Language App Sub", amount: 12.99, type: "expense", category: "subscriptions" },
  { id: "t091", date: "2024-06-28", description: "Taxi to Airport", amount: 45.00, type: "expense", category: "transport" },
  { id: "t092", date: "2024-06-30", description: "Internet Bill", amount: 69.99, type: "expense", category: "utilities" },
];

export const getMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const monthMap = new Map<string, { income: number; expenses: number }>();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  months.forEach((m) => monthMap.set(m, { income: 0, expenses: 0 }));

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const monthIdx = date.getMonth();
    if (monthIdx < 6) {
      const key = months[monthIdx];
      const data = monthMap.get(key)!;
      if (t.type === "income") {
        data.income += t.amount;
      } else {
        data.expenses += t.amount;
      }
    }
  });

  let runningBalance = 0;
  return months.map((month) => {
    const data = monthMap.get(month)!;
    runningBalance += data.income - data.expenses;
    return {
      month,
      income: Math.round(data.income * 100) / 100,
      expenses: Math.round(data.expenses * 100) / 100,
      balance: Math.round(runningBalance * 100) / 100,
    };
  });
};

export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const catMap = new Map<Category, number>();
  const expenseTransactions = transactions.filter((t) => t.type === "expense");
  const total = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  expenseTransactions.forEach((t) => {
    catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount);
  });

  return Array.from(catMap.entries())
    .map(([category, amount]) => ({
      category,
      amount: Math.round(amount * 100) / 100,
      percentage: Math.round((amount / total) * 1000) / 10,
      color: getCategoryColor(category),
    }))
    .sort((a, b) => b.amount - a.amount);
};
