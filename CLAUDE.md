# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

There are no tests in this project.

## Architecture

Single-page React app with no routing and no backend. All state is in-memory — there is no persistence layer.

The entire application lives in `src/App.jsx` as one monolithic component: transaction state, summary calculations, filtering logic, the add-transaction form, and the transaction table are all co-located. Styles are split between `src/index.css` (global/reset) and `src/App.css` (component styles).

### Data model

Each transaction has: `{ id, description, amount, type, category, date }`.

- `type` is `"income"` or `"expense"`
- `category` is one of: `food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`
- `amount` is currently stored as a **string** (bug — causes string concatenation instead of numeric addition in the summary totals)

### Known intentional issues

This is a course starter project — the following issues are left in deliberately:

1. `amount` is stored as a string, breaking the reduce-based totals/balance calculations
2. Seed data has "Freelance Work" typed as `"expense"` instead of `"income"` (`App.jsx:9`)
3. No component decomposition — everything is in one file
4. No persistence
