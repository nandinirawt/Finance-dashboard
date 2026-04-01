# FinSight — Finance Dashboard

A modern, interactive finance dashboard built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Recharts**, and **Zustand**. Designed for clarity, responsiveness, and a polished user experience.

---

## Overview

FinSight lets users track and understand their financial activity through:

- **Dashboard Overview** — Summary cards (Balance, Income, Expenses, Savings Rate), balance trend area chart, spending breakdown donut chart, income vs. expenses bar chart, and recent transactions.
- **Transactions Section** — Full transaction list with search, type/category filtering, sortable columns, and CRUD operations for admins.
- **Insights Section** — Financial insights (top spending category, expense trends, savings rate analysis, best/worst months), net savings chart, spending radar profile, and ranked category breakdown.
- **Role-Based UI** — Toggle between Admin (full CRUD) and Viewer (read-only) via a header dropdown.
- **Dark Mode** — Full dark/light theme toggle with smooth transitions.
- **Export** — Download transactions as CSV or JSON.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Charts | Recharts |
| Icons | Lucide React |
| Date Utilities | date-fns |
| Animation | Framer Motion + CSS Animations |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, fonts, custom utilities
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page orchestrator
├── components/
│   ├── dashboard/
│   │   ├── DashboardView.tsx      # Dashboard layout composition
│   │   ├── SummaryCards.tsx        # Balance, Income, Expenses, Savings cards
│   │   ├── BalanceTrend.tsx        # Area chart — cumulative balance
│   │   ├── SpendingBreakdown.tsx   # Donut chart — category breakdown
│   │   ├── IncomeExpenseChart.tsx  # Bar chart — monthly comparison
│   │   └── RecentTransactions.tsx  # Last 6 transactions list
│   ├── transactions/
│   │   └── TransactionsView.tsx    # Full transactions table + filters + modal
│   ├── insights/
│   │   └── InsightsView.tsx        # Insight cards, net savings, radar, ranking
│   └── layout/
│       ├── Sidebar.tsx             # Navigation sidebar
│       └── Header.tsx              # Top bar with role switch, theme, export
├── store/
│   └── index.ts             # Zustand store — all state + actions
├── data/
│   └── mock.ts              # 92 mock transactions + helper functions
├── types/
│   └── index.ts             # TypeScript type definitions
└── lib/
    └── utils.ts             # Formatting, export, className utilities
```

---

## Features in Detail

### 1. Dashboard Overview
- **4 Summary Cards** with animated entry, trend indicators, and gradient accents
- **Balance Trend** — Area chart showing cumulative balance over Jan–Jun 2024
- **Spending Breakdown** — Interactive donut chart with category legend
- **Income vs Expenses** — Side-by-side bar chart with monthly comparison
- **Recent Transactions** — Quick-glance list with category colors

### 2. Transactions
- **Search** — Real-time text search across descriptions and categories
- **Type Filter** — Toggle between All / Income / Expense
- **Category Filter** — Dropdown with all 14 categories
- **Sortable Columns** — Click Date, Category, or Amount headers to sort
- **Add Transaction** (Admin) — Modal with type toggle, validated inputs, dynamic category list
- **Delete Transaction** (Admin) — Single-click removal
- **Empty State** — Graceful UI when no transactions match filters

### 3. Role-Based UI
- **Admin** — Can add and delete transactions; sees action buttons
- **Viewer** — Read-only; add/delete buttons hidden; "read-only" badge shown
- **Toggle** — Dropdown in header with role descriptions

### 4. Insights
- **6 Insight Cards** — Top category, expense trend, savings rate, best/worst month, averages
- **Monthly Net Savings Chart** — Bar chart with green/red coloring
- **Spending Radar** — Radar chart profiling top 6 expense categories
- **Expense Ranking** — Full ranked list with progress bars and percentages

### 5. State Management (Zustand)
Single store managing transactions CRUD, navigation, filter/sort state, role, and theme toggles with computed selectors.

### 6. UI/UX Polish
- Custom typography (Outfit + DM Sans + JetBrains Mono)
- Dark/light themes with CSS variable system
- Entry animations (slide-up, fade-in with staggered delays)
- Responsive across mobile, tablet, desktop
- Glass-morphism header
- Custom scrollbars and accessible focus states

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone <your-repo-url>
cd finance-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## Deploying to Vercel

### Option A: One-Click Deploy
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import repository → Click **Deploy**

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel
```

No environment variables required — uses static mock data.

---

## Optional Enhancements Implemented

| Enhancement | Status |
|-------------|--------|
| Dark Mode | ✅ Full toggle |
| Export (CSV/JSON) | ✅ Download transactions |
| Animations | ✅ Entry animations, hover states |
| Responsive Design | ✅ Mobile-first, 3 breakpoints |
| Empty States | ✅ Graceful no-data handling |
| Custom Typography | ✅ 3 font families |

---

## Design Decisions

- **Zustand** — Simpler than Redux for this scope; single store with computed selectors
- **Recharts** — Declarative, React-native charting with custom tooltips
- **App Router** — Next.js 14 modern routing (single page SPA, expandable)
- **Tailwind** — Utility-first with extended design tokens
- **92 Mock Transactions** — 6 months, 14 categories for realistic data density

---

## License

This project is for evaluation purposes.
