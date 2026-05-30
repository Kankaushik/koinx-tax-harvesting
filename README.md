# KoinX - Tax Loss Harvesting Tool

A responsive React application that simulates Tax Loss Harvesting by showing how selling selected crypto holdings at a loss can reduce your capital gains tax liability.

## Tech Stack

- **React.js** — UI library
- **Tailwind CSS v3** — styling
- **React Hooks** — state management (useState, useEffect, useMemo)
- **Mock API** — simulated with Promises (no external server needed)

## Folder Structure

src/
├── api/
│ └── mockApi.js # Mock API
├── components/
│ ├── Header.jsx # Top navigation
│ ├── CapitalGainsCard.jsx # Pre/After harvesting cards
│ └── HoldingsTable.jsx # Holdings table
├── hooks/
│ └── useHarvesting.js # Core business logic hook
├── App.js # Root component
└── index.css

# Features

Pre-Harvesting Summary – Shows your current capital gains and losses before selling any holdings, including short-term and long-term gains.
After-Harvesting Summary – Updates instantly as you select holdings, helping you see the impact of tax-loss harvesting in real time.
Holdings Table – Displays all investments with the ability to sort them by short-term gains.
Row Selection – Select individual holdings using checkboxes to include them in tax-loss harvesting calculations.
Select All Option – Quickly select or deselect all holdings with a single checkbox in the table header.
View More / View Less – Expand the table to see all holdings or collapse it to show only the first seven.
Tax Savings Indicator – Highlights potential tax savings when harvesting losses reduces your overall taxable gains.
Loading and Error Handling – Shows a loading spinner while data is being fetched and provides a retry option if something goes wrong.
Mobile-Friendly Design – Automatically adjusts the layout for a smooth experience on tablets and mobile devices.

# Assumptions

All monetary values are displayed in Indian Rupees (₹).
A mock API with a 600ms delay is used to simulate real-world network requests.
Holdings with extremely small gains or losses are displayed as "—" instead of insignificant numbers.
When a holding is selected, the Amount to Sell field is automatically filled with the total available quantity.
Sorting for Short-Term Gains follows three states: Default → Highest to Lowest → Lowest to Highest → Default.
