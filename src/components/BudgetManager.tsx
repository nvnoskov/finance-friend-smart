import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  PieChart,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Settings,
  Calendar
} from "lucide-react";

interface BudgetCategory {
  id: number;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
  type: 'fixed' | 'percentage';
}

export const BudgetManager = () => {
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    {
      id: 1,
      name: "Food & Dining",
      budgeted: 600,
      spent: 450.75,
      color: "bg-blue-500",
      type: 'fixed'
    },
    {
      id: 2,
      name: "Transportation",
      budgeted: 300,
      spent: 285.50,
      color: "bg-green-500",
      type: 'fixed'
    },
    {
      id: 3,
      name: "Shopping",
      budgeted: 400,
      spent: 520.25,
      color: "bg-purple-500",
      type: 'fixed'
    },
    {
      id: 4,
      name: "Utilities",
      budgeted: 250,
      spent: 225.00,
      color: "bg-orange-500",
      type: 'fixed'
    },
    {
      id: 5,
      name: "Entertainment",
      budgeted: 200,
      spent: 175.80,
      color: "bg-pink-500",
      type: 'fixed'
    },
    {
      id: 6,
      name: "Healthcare",
      budgeted: 150,
      spent: 95.00,
      color: "bg-red-500",
      type: 'fixed'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [monthlyIncome] = useState(5200);

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;
  const budgetUtilization = (totalSpent / totalBudgeted) * 100;

  const getBudgetStatus = (category: BudgetCategory) => {
    const percentage = (category.spent / category.budgeted) * 100;
    if (percentage > 100) return { status: 'over', color: 'text-expense', icon: AlertTriangle };
    if (percentage > 80) return { status: 'warning', color: 'text-warning', icon: AlertTriangle };
    return { status: 'good', color: 'text-success', icon: CheckCircle };
  };

  const handleAddBudget = (formData: FormData) => {
    const newBudget: BudgetCategory = {
      id: Date.now(),
      name: formData.get("name") as string,
      budgeted: parseFloat(formData.get("budgeted") as string),
      spent: 0,
      color: `bg-${['blue', 'green', 'purple', 'orange', 'pink', 'red', 'yellow', 'indigo'][Math.floor(Math.random() * 8)]}-500`,
      type: formData.get("type") as 'fixed' | 'percentage'
    };

    setBudgetCategories([...budgetCategories, newBudget]);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
                <p className="text-2xl font-bold text-income">${monthlyIncome.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-income" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budgeted</p>
                <p className="text-2xl font-bold text-primary">${totalBudgeted.toLocaleString()}</p>
              </div>
              <PieChart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-expense">${totalSpent.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-expense" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-success' : 'text-expense'}`}>
                  ${Math.abs(remainingBudget).toLocaleString()}
                </p>
              </div>
              <DollarSign className={`h-8 w-8 ${remainingBudget >= 0 ? 'text-success' : 'text-expense'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Utilization */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-primary" />
              Budget Utilization
            </span>
            <Badge variant={budgetUtilization > 100 ? "destructive" : budgetUtilization > 80 ? "secondary" : "default"}>
              {budgetUtilization.toFixed(1)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={Math.min(budgetUtilization, 100)} className="h-4 mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${totalSpent.toLocaleString()} spent</span>
            <span>${totalBudgeted.toLocaleString()} budgeted</span>
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-primary" />
              Budget Categories
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-financial hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Budget Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleAddBudget(formData);
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Groceries" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budgeted">Budget Amount</Label>
                      <Input 
                        id="budgeted" 
                        name="budgeted" 
                        type="number" 
                        step="0.01" 
                        placeholder="500.00" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select name="type" defaultValue="fixed">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                          <SelectItem value="percentage">Percentage of Income</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Category</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetCategories.map((category) => {
              const percentage = (category.spent / category.budgeted) * 100;
              const status = getBudgetStatus(category);
              const StatusIcon = status.icon;

              return (
                <div key={category.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <h3 className="font-medium">{category.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {category.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={`h-4 w-4 ${status.color}`} />
                      <span className={`text-sm font-medium ${status.color}`}>
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <Progress value={Math.min(percentage, 100)} className="h-2 mb-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${category.spent.toFixed(2)} spent
                    </span>
                    <span className="text-muted-foreground">
                      ${category.budgeted.toFixed(2)} budgeted
                    </span>
                  </div>
                  
                  {percentage > 100 && (
                    <div className="mt-2 p-2 bg-destructive/10 rounded text-sm text-destructive">
                      Over budget by ${(category.spent - category.budgeted).toFixed(2)}
                    </div>
                  )}
                  
                  {percentage > 80 && percentage <= 100 && (
                    <div className="mt-2 p-2 bg-warning/10 rounded text-sm text-warning-foreground">
                      Approaching budget limit
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              This Month's Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Categories Over Budget</span>
              <Badge variant="destructive">
                {budgetCategories.filter(cat => cat.spent > cat.budgeted).length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Categories Under Budget</span>
              <Badge variant="default">
                {budgetCategories.filter(cat => cat.spent < cat.budgeted).length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Category Utilization</span>
              <span className="text-sm font-medium">
                {(budgetCategories.reduce((sum, cat) => sum + (cat.spent / cat.budgeted), 0) / budgetCategories.length * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Budget Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <p className="text-sm text-success-foreground">
                <strong>Well done!</strong> You're staying within budget for most categories.
              </p>
            </div>
            {budgetCategories.filter(cat => cat.spent > cat.budgeted).length > 0 && (
              <div className="p-3 bg-warning/10 rounded-lg">
                <p className="text-sm text-warning-foreground">
                  <strong>Action needed:</strong> Review overspent categories and adjust spending.
                </p>
              </div>
            )}
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">
                <strong>Tip:</strong> Set up alerts when you reach 80% of any budget category.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};