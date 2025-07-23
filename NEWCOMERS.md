# Finance Friend Smart - Newcomer's Guide

Welcome to the Finance Friend Smart project! This guide will help you understand the codebase structure, key components, and provide guidance on how to get started.

## Project Overview

Finance Friend Smart is a personal finance management application built with modern web technologies. It helps users track expenses, manage budgets, set financial goals, and visualize their financial data through interactive dashboards.

## Tech Stack

The project is built with the following technologies:

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: Adds static typing to JavaScript for better developer experience
- **Vite**: A fast build tool and development server
- **Tailwind CSS**: A utility-first CSS framework
- **shadcn/ui**: A collection of reusable UI components
- **React Router**: For navigation between pages
- **Recharts**: For data visualization
- **React Hook Form**: For form handling
- **Zod**: For schema validation
- **React Query**: For data fetching and state management

## Project Structure

```
finance-friend-smart/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── ui/             # UI components from shadcn
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── BudgetManager.tsx
│   │   ├── ExpenseTracker.tsx
│   │   ├── FinancialDashboard.tsx
│   │   └── GoalTracker.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and libraries
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Main page
│   │   └── NotFound.tsx    # 404 page
│   ├── App.css             # Global styles
│   ├── App.tsx             # Main application component
│   ├── index.css           # Tailwind imports
│   └── main.tsx            # Application entry point
├── .gitignore              # Git ignore file
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Key Components

### 1. FinancialDashboard.tsx

The main dashboard component that serves as the central hub of the application. It includes:
- Overview of financial status
- Navigation tabs to different sections
- Summary cards for key financial metrics

### 2. ExpenseTracker.tsx

Handles tracking and categorizing user expenses with features like:
- Adding new expenses
- Categorizing transactions
- Viewing expense history
- Filtering and sorting transactions

### 3. BudgetManager.tsx

Manages user budgets with capabilities for:
- Creating budget categories
- Setting monthly limits
- Tracking spending against budgets
- Budget utilization visualization

### 4. GoalTracker.tsx

Helps users set and track financial goals:
- Creating savings goals
- Setting target amounts and deadlines
- Tracking progress
- Visualizing goal completion

### 5. AnalyticsDashboard.tsx

Provides data visualization and insights:
- Spending trends over time
- Category breakdowns
- Income vs. expenses
- Savings rate analysis

### 6. UI Components

The `src/components/ui/` directory contains reusable UI components from the shadcn/ui library, including:
- Buttons, cards, and form elements
- Modals and dialogs
- Navigation components
- Data visualization components
- Layout components

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/nvnoskov/finance-friend-smart.git
   cd finance-friend-smart
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Development Workflow

1. The application uses React Router for navigation
2. The main entry point is `src/main.tsx`
3. The application structure is defined in `src/App.tsx`
4. The main page is rendered from `src/pages/Index.tsx`
5. All major features are implemented as separate components in `src/components/`

## Data Flow

Currently, the application uses mock data defined within the components. In a production environment, this would be replaced with:
- API calls to a backend service
- Local storage for persistent data
- Authentication for user-specific data

## Styling

The project uses Tailwind CSS for styling with the following organization:
- Global styles in `src/App.css` and `src/index.css`
- Component-specific styles using Tailwind utility classes
- UI components from shadcn/ui with consistent theming

## Things to Learn Next

1. **Component Architecture**: Understand how the different components interact with each other
2. **State Management**: Learn how state is managed within and between components
3. **UI Component Library**: Explore the shadcn/ui components and how they're used
4. **Data Visualization**: Study the charts and graphs in the AnalyticsDashboard component
5. **Form Handling**: Examine how forms are implemented using React Hook Form and Zod
6. **Responsive Design**: Notice how the UI adapts to different screen sizes

## Contributing

When contributing to this project:
1. Follow the existing code style and patterns
2. Use TypeScript for type safety
3. Leverage the existing UI components from shadcn/ui
4. Test your changes across different screen sizes
5. Document any new features or significant changes

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/en/main)
- [Recharts Documentation](https://recharts.org/en-US/)

## Project Management

This project is managed through [Lovable](https://lovable.dev/projects/b0bb9cdb-cc92-4194-be02-f9930a883d94), where you can:
- View the project details
- Make changes through the Lovable interface
- Deploy the application

Happy coding!