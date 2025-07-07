import { Transaction, Category } from '../types';

export const categories: Category[] = [
  // Expense categories
  { id: 'food', name: 'Food & Dining', color: '#EF4444', icon: '🍽️', type: 'expense' },
  { id: 'transport', name: 'Transportation', color: '#3B82F6', icon: '🚗', type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', color: '#8B5CF6', icon: '🎬', type: 'expense' },
  { id: 'shopping', name: 'Shopping', color: '#EC4899', icon: '🛍️', type: 'expense' },
  { id: 'utilities', name: 'Utilities', color: '#F59E0B', icon: '💡', type: 'expense' },
  { id: 'healthcare', name: 'Healthcare', color: '#10B981', icon: '🏥', type: 'expense' },
  { id: 'education', name: 'Education', color: '#06B6D4', icon: '📚', type: 'expense' },
  { id: 'other', name: 'Other', color: '#6B7280', icon: '📦', type: 'expense' },
  
  // Income categories
  { id: 'salary', name: 'Salary', color: '#059669', icon: '💰', type: 'income' },
  { id: 'freelance', name: 'Freelance', color: '#7C3AED', icon: '💻', type: 'income' },
  { id: 'investment', name: 'Investment', color: '#DC2626', icon: '📈', type: 'income' },
  { id: 'gift', name: 'Gift', color: '#DB2777', icon: '🎁', type: 'income' }
];

export const generateMockTransactions = (userId: string): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();
  
  // Generate transactions for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // 1-3 transactions per day
    const transactionCount = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < transactionCount; j++) {
      const isExpense = Math.random() > 0.15; // 85% expenses, 15% income
      const availableCategories = categories.filter(c => c.type === (isExpense ? 'expense' : 'income'));
      const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
      
      let amount: number;
      let description: string;
      
      if (isExpense) {
        switch (category.id) {
          case 'food':
            amount = Math.floor(Math.random() * 80) + 20;
            description = ['Restaurant dinner', 'Coffee', 'Grocery shopping', 'Fast food lunch'][Math.floor(Math.random() * 4)];
            break;
          case 'transport':
            amount = Math.floor(Math.random() * 50) + 10;
            description = ['Uber ride', 'Gas station', 'Public transport', 'Parking fee'][Math.floor(Math.random() * 4)];
            break;
          case 'entertainment':
            amount = Math.floor(Math.random() * 100) + 30;
            description = ['Movie tickets', 'Concert', 'Netflix subscription', 'Gaming'][Math.floor(Math.random() * 4)];
            break;
          case 'shopping':
            amount = Math.floor(Math.random() * 200) + 50;
            description = ['Clothes', 'Electronics', 'Home decor', 'Gadgets'][Math.floor(Math.random() * 4)];
            break;
          case 'utilities':
            amount = Math.floor(Math.random() * 150) + 50;
            description = ['Electricity bill', 'Internet', 'Water bill', 'Phone bill'][Math.floor(Math.random() * 4)];
            break;
          default:
            amount = Math.floor(Math.random() * 100) + 20;
            description = 'General expense';
        }
      } else {
        switch (category.id) {
          case 'salary':
            amount = Math.floor(Math.random() * 1000) + 2000;
            description = 'Monthly salary';
            break;
          case 'freelance':
            amount = Math.floor(Math.random() * 500) + 200;
            description = 'Freelance project';
            break;
          case 'investment':
            amount = Math.floor(Math.random() * 200) + 100;
            description = 'Investment return';
            break;
          default:
            amount = Math.floor(Math.random() * 100) + 50;
            description = 'Other income';
        }
      }
      
      transactions.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: isExpense ? 'expense' : 'income',
        amount,
        category: category.id,
        description,
        date,
        userId
      });
    }
  }
  
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};