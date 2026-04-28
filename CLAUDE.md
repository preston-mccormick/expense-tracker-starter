# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Keep this file up to date as the codebase evolves — update the component structure, data model, and known issues sections whenever relevant changes are made.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

There are no tests in this project.

## Architecture

Single-page React app with no routing and no backend. All state is in-memory — there is no persistence layer. Styles are split between `src/index.css` (global/reset) and `src/App.css` (component styles).

### Component structure

- **`App`** — owns the `transactions` array and computes `totalIncome`, `totalExpenses`, and `balance`. The `categories` constant is defined at module level here and passed down as a prop.
- **`Summary`** — displays the three stat cards; receives `totalIncome`, `totalExpenses`, `balance` as props.
- **`TransactionForm`** — owns its own form state and calls `onAdd(transaction)` on submit; receives `categories` and `onAdd` as props.
- **`TransactionList`** — owns filter state and filtering logic; receives `transactions` and `categories` as props.
- **`SpendingChart`** — renders a recharts `BarChart` of expenses grouped by category, sorted highest to lowest, with percentage labels above each bar and in the tooltip; receives `transactions` as its only prop and derives categories from the data. Returns `null` when there are no expenses.

### Data model

Each transaction has: `{ id, description, amount, type, category, date }`.

- `type` is `"income"` or `"expense"`
- `category` is one of: `food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`
- `amount` is a number

### Known intentional issue

Seed data has "Freelance Work" typed as `"expense"` instead of `"income"` (`App.jsx:14`).
