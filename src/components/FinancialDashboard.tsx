import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  CreditCard,
  PiggyBank,
  AlertTriangle,
  Calendar,
  Plus
} from "lucide-react";
import { ExpenseTracker } from "./ExpenseTracker";
import { BudgetManager } from "./BudgetManager";
import { GoalTracker } from "./GoalTracker";
import { AnalyticsDashboard } from "./AnalyticsDashboard";

export const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app this would come from backend
  const financialData = {
    totalBalance: 15750.00,
    monthlyIncome: 5200.00,
    monthlyExpenses: 3850.00,
    monthlyBudget: 4200.00,
    savings: 1350.00,
    emergencyFund: 8500.00,
    emergencyGoal: 15000.00,
    creditScore: 742,
    goals: [
      { name: "Emergency Fund", current: 8500, target: 15000, deadline: "Dec 2024" },
      { name: "Vacation", current: 2800, target: 5000, deadline: "Jun 2024" },
      { name: "Car Down Payment", current: 5200, target: 8000, deadline: "Sep 2024" }
    ],
    recentTransactions: [
      { id: 1, merchant: "Grocery Store", amount: -125.50, category: "Food", date: "Today" },
      { id: 2, merchant: "Salary Deposit", amount: 2600.00, category: "Income", date: "Yesterday" },
      { id: 3, merchant: "Gas Station", amount: -65.00, category: "Transportation", date: "2 days ago" }
    ]
  };

  const savingsRate = ((financialData.monthlyIncome - financialData.monthlyExpenses) / financialData.monthlyIncome * 100);
  const budgetUtilization = (financialData.monthlyExpenses / financialData.monthlyBudget * 100);
  const emergencyFundProgress = (financialData.emergencyFund / financialData.emergencyGoal * 100);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
            <p className="text-muted-foreground">Track your finances and achieve your goals</p>
          </div>
          <Button className="bg-gradient-financial hover:opacity-90 transition-smooth">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card shadow-card border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    ${financialData.totalBalance.toLocaleString()}
                  </div>
                  <p className="text-xs text-success">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                  <TrendingUp className="h-4 w-4 text-income" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-income">
                    +${financialData.monthlyIncome.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                  <TrendingDown className="h-4 w-4 text-expense" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-expense">
                    -${financialData.monthlyExpenses.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {budgetUtilization.toFixed(1)}% of budget used
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                  <PiggyBank className="h-4 w-4 text-savings" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-savings">
                    {savingsRate.toFixed(1)}%
                  </div>
                  <p className="text-xs text-success">
                    Above recommended 20%
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5 text-primary" />
                    Financial Goals Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {financialData.goals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{goal.name}</span>
                        <Badge variant="outline">
                          {goal.deadline}
                        </Badge>
                      </div>
                      <Progress
                        value={(goal.current / goal.target) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>${goal.current.toLocaleString()}</span>
                        <span>${goal.target.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-primary" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {financialData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.merchant}</p>
                          <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-medium ${
                        transaction.amount > 0 ? 'text-income' : 'text-expense'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Emergency Fund Status */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
                  Emergency Fund Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress to Goal</span>
                    <span className="text-sm text-muted-foreground">
                      ${financialData.emergencyFund.toLocaleString()} / ${financialData.emergencyGoal.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={emergencyFundProgress} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {emergencyFundProgress.toFixed(1)}% complete
                    </span>
                    <span className="text-muted-foreground">
                      ${(financialData.emergencyGoal - financialData.emergencyFund).toLocaleString()} remaining
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <ExpenseTracker />
          </TabsContent>

          <TabsContent value="budget">
            <BudgetManager />
          </TabsContent>

          <TabsContent value="goals">
            <GoalTracker />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};