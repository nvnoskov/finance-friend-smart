import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  // Mock data for charts
  const monthlyData = [
    { month: "Jan", income: 5200, expenses: 3800, savings: 1400 },
    { month: "Feb", income: 5200, expenses: 4100, savings: 1100 },
    { month: "Mar", income: 5200, expenses: 3650, savings: 1550 },
    { month: "Apr", income: 5200, expenses: 3900, savings: 1300 },
    { month: "May", income: 5400, expenses: 4200, savings: 1200 },
    { month: "Jun", income: 5400, expenses: 3850, savings: 1550 }
  ];

  const categorySpending = [
    { name: "Food & Dining", value: 1250, color: "#3B82F6" },
    { name: "Transportation", value: 850, color: "#10B981" },
    { name: "Shopping", value: 650, color: "#8B5CF6" },
    { name: "Utilities", value: 450, color: "#F59E0B" },
    { name: "Entertainment", value: 350, color: "#EF4444" },
    { name: "Healthcare", value: 300, color: "#EC4899" }
  ];

  const dailySpending = [
    { day: "Mon", amount: 45 },
    { day: "Tue", amount: 32 },
    { day: "Wed", amount: 78 },
    { day: "Thu", amount: 55 },
    { day: "Fri", amount: 89 },
    { day: "Sat", amount: 125 },
    { day: "Sun", amount: 67 }
  ];

  const savingsRate = [
    { month: "Jan", rate: 26.9 },
    { month: "Feb", rate: 21.2 },
    { month: "Mar", rate: 29.8 },
    { month: "Apr", rate: 25.0 },
    { month: "May", rate: 22.2 },
    { month: "Jun", rate: 28.7 }
  ];

  // Financial health calculations
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const avgSavingsRate = savingsRate.reduce((sum, item) => sum + item.rate, 0) / savingsRate.length;
  const totalSpending = categorySpending.reduce((sum, item) => sum + item.value, 0);
  const expenseGrowth = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100;

  // Financial health score calculation
  const calculateHealthScore = () => {
    let score = 0;
    
    // Savings rate (40 points max)
    if (avgSavingsRate >= 20) score += 40;
    else if (avgSavingsRate >= 15) score += 30;
    else if (avgSavingsRate >= 10) score += 20;
    else score += 10;

    // Expense growth (30 points max)
    if (expenseGrowth < 0) score += 30; // Expenses decreased
    else if (expenseGrowth < 5) score += 20; // Controlled growth
    else if (expenseGrowth < 10) score += 10; // Moderate growth
    else score += 0; // High growth

    // Income stability (30 points max)
    const incomeStability = monthlyData.every(month => month.income >= 5000);
    score += incomeStability ? 30 : 15;

    return Math.min(score, 100);
  };

  const healthScore = calculateHealthScore();

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-expense";
  };

  const getHealthScoreStatus = (score: number) => {
    if (score >= 80) return { text: "Excellent", icon: CheckCircle, color: "text-success" };
    if (score >= 60) return { text: "Good", icon: Target, color: "text-warning" };
    return { text: "Needs Attention", icon: AlertTriangle, color: "text-expense" };
  };

  const status = getHealthScoreStatus(healthScore);
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Financial Analytics</h2>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last 12 Months</SelectItem>
            <SelectItem value="ytd">Year to Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Financial Health Score */}
      <Card className="bg-gradient-card shadow-financial border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Financial Health Score
            </span>
            <Badge variant="outline" className={status.color}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getHealthScoreColor(healthScore)}`}>
                {healthScore}/100
              </div>
              <p className="text-muted-foreground">Your financial health is {status.text.toLowerCase()}</p>
            </div>
            <Progress value={healthScore} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium">Savings Rate</p>
                <p className="text-success">{avgSavingsRate.toFixed(1)}%</p>
              </div>
              <div className="text-center">
                <p className="font-medium">Expense Growth</p>
                <p className={expenseGrowth < 0 ? 'text-success' : expenseGrowth < 5 ? 'text-warning' : 'text-expense'}>
                  {expenseGrowth > 0 ? '+' : ''}{expenseGrowth.toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <p className="font-medium">Income Stability</p>
                <p className="text-success">Stable</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Income vs Expenses Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stackId="1" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="2" 
                  stroke="#EF4444" 
                  fill="#EF4444" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categorySpending.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-xs">{category.name}</span>
                  <span className="text-xs font-medium">${category.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Spending Pattern */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Daily Spending Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Spent']} />
                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Savings Rate Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Savings Rate Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={savingsRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Savings Rate']} />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-success" />
              Top Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <p className="text-sm text-success-foreground">
                <strong>Great savings rate!</strong> Your average savings rate of {avgSavingsRate.toFixed(1)}% is above the recommended 20%.
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">
                <strong>Consistent income:</strong> Your income has remained stable, providing good financial security.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
              Areas to Watch
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenseGrowth > 5 && (
              <div className="p-3 bg-warning/10 rounded-lg">
                <p className="text-sm text-warning-foreground">
                  <strong>Rising expenses:</strong> Your expenses increased by {expenseGrowth.toFixed(1)}% this month.
                </p>
              </div>
            )}
            <div className="p-3 bg-warning/10 rounded-lg">
              <p className="text-sm text-warning-foreground">
                <strong>Weekend spending:</strong> You tend to spend more on weekends. Consider setting weekend budgets.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">
                <strong>Optimize food spending:</strong> Food & Dining is your largest expense category at ${categorySpending[0].value}.
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">
                <strong>Emergency fund:</strong> Continue building your emergency fund to 6 months of expenses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-primary" />
            Detailed Financial Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">${currentMonth.income.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Current Monthly Income</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-expense">${currentMonth.expenses.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Current Monthly Expenses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">${currentMonth.savings.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Current Monthly Savings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">${(totalSpending / 6).toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Avg Monthly Spending</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};