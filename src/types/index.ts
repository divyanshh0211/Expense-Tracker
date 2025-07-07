export interface User {
  id: string;
  username: string;
  email?: string;
  country: string;
  currency: string;
  currencySymbol: string;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date;
  userId: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
}

export interface SavingTip {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

export interface SpendingInsight {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
}