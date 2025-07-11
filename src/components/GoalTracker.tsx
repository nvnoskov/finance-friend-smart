import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
  PiggyBank,
  Home,
  Car,
  Plane,
  GraduationCap
} from "lucide-react";

interface FinancialGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  description?: string;
  monthlyContribution: number;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'paused';
}

export const GoalTracker = () => {
  const [goals, setGoals] = useState<FinancialGoal[]>([
    {
      id: 1,
      name: "Emergency Fund",
      targetAmount: 15000,
      currentAmount: 8500,
      deadline: "2024-12-31",
      category: "Safety",
      description: "6 months of living expenses",
      monthlyContribution: 500,
      priority: 'high',
      status: 'active'
    },
    {
      id: 2,
      name: "Dream Vacation",
      targetAmount: 5000,
      currentAmount: 2800,
      deadline: "2024-08-15",
      category: "Lifestyle",
      description: "Two weeks in Europe",
      monthlyContribution: 400,
      priority: 'medium',
      status: 'active'
    },
    {
      id: 3,
      name: "New Car Down Payment",
      targetAmount: 8000,
      currentAmount: 5200,
      deadline: "2024-09-30",
      category: "Transportation",
      description: "Down payment for reliable vehicle",
      monthlyContribution: 350,
      priority: 'high',
      status: 'active'
    },
    {
      id: 4,
      name: "Home Renovation",
      targetAmount: 12000,
      currentAmount: 3500,
      deadline: "2025-03-01",
      category: "Home",
      description: "Kitchen and bathroom upgrades",
      monthlyContribution: 600,
      priority: 'medium',
      status: 'active'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const categories = [
    { name: "Safety", icon: Target, color: "text-red-500" },
    { name: "Lifestyle", icon: Plane, color: "text-blue-500" },
    { name: "Transportation", icon: Car, color: "text-green-500" },
    { name: "Home", icon: Home, color: "text-purple-500" },
    { name: "Education", icon: GraduationCap, color: "text-orange-500" },
    { name: "Investment", icon: TrendingUp, color: "text-indigo-500" }
  ];

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');
  const totalTargetAmount = activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = activeGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalMonthlyContribution = activeGoals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);

  const getGoalProgress = (goal: FinancialGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getMonthsToCompletion = (goal: FinancialGoal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    if (goal.monthlyContribution <= 0) return Infinity;
    return Math.ceil(remaining / goal.monthlyContribution);
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.icon : Target;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : "text-gray-500";
  };

  const handleAddGoal = (formData: FormData) => {
    const newGoal: FinancialGoal = {
      id: Date.now(),
      name: formData.get("name") as string,
      targetAmount: parseFloat(formData.get("targetAmount") as string),
      currentAmount: parseFloat(formData.get("currentAmount") as string) || 0,
      deadline: formData.get("deadline") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      monthlyContribution: parseFloat(formData.get("monthlyContribution") as string),
      priority: formData.get("priority") as 'high' | 'medium' | 'low',
      status: 'active'
    };

    setGoals([...goals, newGoal]);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Goal Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
                <p className="text-2xl font-bold text-primary">{activeGoals.length}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Target</p>
                <p className="text-2xl font-bold text-foreground">${totalTargetAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Saved</p>
                <p className="text-2xl font-bold text-success">${totalCurrentAmount.toLocaleString()}</p>
              </div>
              <PiggyBank className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Contribution</p>
                <p className="text-2xl font-bold text-savings">${totalMonthlyContribution.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-savings" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Overall Goal Progress
            </span>
            <Badge variant="default">
              {((totalCurrentAmount / totalTargetAmount) * 100).toFixed(1)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(totalCurrentAmount / totalTargetAmount) * 100} className="h-4 mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${totalCurrentAmount.toLocaleString()} saved</span>
            <span>${totalTargetAmount.toLocaleString()} target</span>
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Your Financial Goals
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-financial hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Financial Goal</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleAddGoal(formData);
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Goal Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Emergency Fund" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetAmount">Target Amount</Label>
                      <Input 
                        id="targetAmount" 
                        name="targetAmount" 
                        type="number" 
                        step="0.01" 
                        placeholder="10000" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentAmount">Current Amount</Label>
                      <Input 
                        id="currentAmount" 
                        name="currentAmount" 
                        type="number" 
                        step="0.01" 
                        placeholder="0" 
                        defaultValue="0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Target Date</Label>
                      <Input id="deadline" name="deadline" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                      <Input 
                        id="monthlyContribution" 
                        name="monthlyContribution" 
                        type="number" 
                        step="0.01" 
                        placeholder="500" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.name} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select name="priority" defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Additional details about your goal" 
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Goal</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activeGoals.map((goal) => {
              const progress = getGoalProgress(goal);
              const daysLeft = getDaysUntilDeadline(goal.deadline);
              const monthsToComplete = getMonthsToCompletion(goal);
              const IconComponent = getCategoryIcon(goal.category);
              const colorClass = getCategoryColor(goal.category);

              return (
                <div key={goal.id} className="p-6 border rounded-lg bg-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full bg-primary/10`}>
                        <IconComponent className={`h-5 w-5 ${colorClass}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{goal.name}</h3>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'default' : 'secondary'}>
                        {goal.priority} priority
                      </Badge>
                      <Badge variant="outline">{goal.category}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    
                    <Progress value={Math.min(progress, 100)} className="h-3" />
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-primary">{progress.toFixed(1)}%</p>
                        <p className="text-muted-foreground">Complete</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">{daysLeft}</p>
                        <p className="text-muted-foreground">Days left</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-success">{monthsToComplete}</p>
                        <p className="text-muted-foreground">Months at current rate</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-success">
                        <DollarSign className="h-4 w-4" />
                        <span>${goal.monthlyContribution}/month</span>
                      </div>
                    </div>

                    {daysLeft < 0 && (
                      <div className="mt-3 p-3 bg-destructive/10 rounded text-sm text-destructive">
                        <strong>Goal Overdue:</strong> This goal passed its deadline. Consider adjusting the target date or contribution amount.
                      </div>
                    )}

                    {monthsToComplete > 12 && (
                      <div className="mt-3 p-3 bg-warning/10 rounded text-sm text-warning-foreground">
                        <strong>Consider increasing contributions:</strong> At the current rate, this goal will take over a year to complete.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Goal Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Goal Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Goals on Track</span>
              <Badge variant="default">
                {activeGoals.filter(goal => getMonthsToCompletion(goal) <= 12).length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">High Priority Goals</span>
              <Badge variant="destructive">
                {activeGoals.filter(goal => goal.priority === 'high').length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Progress</span>
              <span className="text-sm font-medium">
                {(activeGoals.reduce((sum, goal) => sum + getGoalProgress(goal), 0) / activeGoals.length).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-primary" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <p className="text-sm text-success-foreground">
                <strong>Great progress!</strong> You're actively working towards {activeGoals.length} financial goals.
              </p>
            </div>
            {activeGoals.filter(goal => goal.priority === 'high' && getGoalProgress(goal) < 50).length > 0 && (
              <div className="p-3 bg-warning/10 rounded-lg">
                <p className="text-sm text-warning-foreground">
                  <strong>Focus needed:</strong> Prioritize high-priority goals that are behind schedule.
                </p>
              </div>
            )}
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">
                <strong>Tip:</strong> Review and adjust your goals monthly to stay on track.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};