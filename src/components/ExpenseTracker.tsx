import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Calendar,
  DollarSign,
  Tag,
  Search,
  Filter,
  MoreHorizontal,
  Receipt,
  MapPin,
  Clock
} from "lucide-react";

interface Transaction {
  id: number;
  merchant: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  paymentMethod: string;
  location?: string;
}

export const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      merchant: "Starbucks Coffee",
      amount: -5.45,
      category: "Food & Dining",
      date: "2024-01-15",
      description: "Morning coffee",
      paymentMethod: "Credit Card",
      location: "Downtown"
    },
    {
      id: 2,
      merchant: "Uber",
      amount: -12.50,
      category: "Transportation",
      date: "2024-01-15",
      description: "Ride to work",
      paymentMethod: "Debit Card",
      location: "City Center"
    },
    {
      id: 3,
      merchant: "Salary Deposit",
      amount: 2600.00,
      category: "Income",
      date: "2024-01-14",
      description: "Monthly salary",
      paymentMethod: "Direct Deposit"
    },
    {
      id: 4,
      merchant: "Amazon",
      amount: -89.99,
      category: "Shopping",
      date: "2024-01-14",
      description: "Home supplies",
      paymentMethod: "Credit Card"
    },
    {
      id: 5,
      merchant: "Electric Company",
      amount: -125.00,
      category: "Utilities",
      date: "2024-01-13",
      description: "Monthly electric bill",
      paymentMethod: "Auto-pay"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Income",
    "Savings",
    "Other"
  ];

  const paymentMethods = [
    "Credit Card",
    "Debit Card",
    "Cash",
    "Bank Transfer",
    "Digital Wallet"
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const handleAddTransaction = (formData: FormData) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      merchant: formData.get("merchant") as string,
      amount: parseFloat(formData.get("amount") as string),
      category: formData.get("category") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      paymentMethod: formData.get("paymentMethod") as string,
      location: formData.get("location") as string
    };

    setTransactions([newTransaction, ...transactions]);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-expense">-${totalExpenses.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-expense" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-income">+${totalIncome.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-income" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Flow</p>
                <p className={`text-2xl font-bold ${
                  (totalIncome - totalExpenses) >= 0 ? 'text-income' : 'text-expense'
                }`}>
                  {(totalIncome - totalExpenses) >= 0 ? '+' : ''}${(totalIncome - totalExpenses).toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Receipt className="mr-2 h-5 w-5 text-primary" />
              Transaction History
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-financial hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Transaction</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleAddTransaction(formData);
                }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="merchant">Merchant</Label>
                      <Input id="merchant" name="merchant" placeholder="Store name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input 
                        id="amount" 
                        name="amount" 
                        type="number" 
                        step="0.01" 
                        placeholder="-25.50" 
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
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" name="date" type="date" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Payment Method</Label>
                      <Select name="paymentMethod" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map(method => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (Optional)</Label>
                      <Input id="location" name="location" placeholder="Store location" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea id="description" name="description" placeholder="Additional notes" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Transaction</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{transaction.merchant}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Tag className="mr-1 h-3 w-3" />
                        {transaction.paymentMethod}
                      </span>
                      {transaction.location && (
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {transaction.location}
                        </span>
                      )}
                    </div>
                    {transaction.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {transaction.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    transaction.amount >= 0 ? 'text-income' : 'text-expense'
                  }`}>
                    {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};