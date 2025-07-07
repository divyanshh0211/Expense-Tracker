import { Transaction, SavingTip, SpendingInsight } from '../types';
// import { categories } from './mockData';
import {
  isWithinInterval,
  subDays,
  subWeeks,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

// 🔐 Helper to normalize dates
const normalizeDates = (transactions: Transaction[]): Transaction[] =>
  transactions.map((t) => ({
    ...t,
    date: new Date(t.date),
  }));

export const analyticsUtils = {
  // ✅ Calculate total income, expenses, and balance
  calculateTotals: (
    rawTransactions: Transaction[],
    period: 'week' | 'month' | 'all' = 'month'
  ) => {
    console.log('📊 Calculating totals for', period);
    const now = new Date();
    const transactions = normalizeDates(rawTransactions);

    let filteredTransactions = transactions;

    if (period === 'week') {
      const weekStart = startOfWeek(now);
      const weekEnd = endOfWeek(now);
      filteredTransactions = transactions.filter((t) =>
        isWithinInterval(t.date, { start: weekStart, end: weekEnd })
      );
    } else if (period === 'month') {
      const monthStart = subDays(now, 30);
      filteredTransactions = transactions.filter((t) =>
        isWithinInterval(t.date, { start: monthStart, end: now })
      );
    }

    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  },

  // ✅ Get spending insights by category
  getSpendingInsights: (rawTransactions: Transaction[]): SpendingInsight[] => {
    console.log('📈 Getting spending insights');
    const transactions = normalizeDates(rawTransactions);
    const expenseTransactions = transactions.filter((t) => t.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    const categorySpending = expenseTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categorySpending)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / totalExpenses) * 100,
        trend: 'stable' as const, // Simplified for demo
      }))
      .sort((a, b) => b.amount - a.amount);
  },

  // ✅ Generate saving tips based on spending
  generateSavingTips: (rawTransactions: Transaction[]): SavingTip[] => {
    console.log('💡 Generating saving tips...');
    const transactions = normalizeDates(rawTransactions);
    const tips: SavingTip[] = [];
    const insights = analyticsUtils.getSpendingInsights(transactions);
    const totals = analyticsUtils.calculateTotals(transactions, 'month');

    const foodSpending = insights.find((i) => i.category === 'food');
    if (foodSpending && foodSpending.percentage > 35) {
      tips.push({
        id: 'food-spending',
        title: 'Optimize Food Expenses',
        description: `You're spending ${foodSpending.percentage.toFixed(
          1
        )}% on food. Consider cooking at home to save up to $${Math.round(
          foodSpending.amount * 0.3
        )} monthly.`,
        category: 'food',
        priority: 'high',
        actionable: true,
      });
    }

    const entertainmentSpending = insights.find((i) => i.category === 'entertainment');
    if (entertainmentSpending && entertainmentSpending.percentage > 20) {
      tips.push({
        id: 'entertainment-spending',
        title: 'Review Entertainment Subscriptions',
        description: `Entertainment accounts for ${entertainmentSpending.percentage.toFixed(
          1
        )}% of your spending. Cancel unused subscriptions to save money.`,
        category: 'entertainment',
        priority: 'medium',
        actionable: true,
      });
    }

    const savingsRate = (totals.balance / totals.income) * 100;
    if (savingsRate < 20) {
      tips.push({
        id: 'savings-rate',
        title: 'Improve Savings Rate',
        description: `Your current savings rate is ${savingsRate.toFixed(
          1
        )}%. Try to save at least 20% of your income.`,
        category: 'general',
        priority: 'high',
        actionable: true,
      });
    }

    tips.push({
      id: 'emergency-fund',
      title: 'Build Emergency Fund',
      description: 'Aim to have 3–6 months of expenses saved for emergencies.',
      category: 'general',
      priority: 'medium',
      actionable: true,
    });

    return tips;
  },

  // ✅ Export transactions to CSV string
  exportToCSV: (rawTransactions: Transaction[]): string => {
    console.log('📤 Exporting transactions to CSV...');
    const transactions = normalizeDates(rawTransactions);
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
    const rows = transactions.map((t) => [
      t.date ? new Date(t.date).toLocaleDateString() : '',
      t.type,
      t.category,
      t.description,
      t.amount.toString(),
    ]);
    return [headers, ...rows].map((row) => row.join(',')).join('\n');
  },

  // ✅ Weekly data for charting
  getWeeklySpendingData: (rawTransactions: Transaction[]) => {
    console.log('📊 Generating weekly data for charts');
    const transactions = normalizeDates(rawTransactions);
    const weeks = [];
    const now = new Date();

    for (let i = 0; i < 8; i++) {
      const weekStart = startOfWeek(subWeeks(now, i));
      const weekEnd = endOfWeek(subWeeks(now, i));

      const weekTransactions = transactions.filter((t) =>
        isWithinInterval(t.date, { start: weekStart, end: weekEnd })
      );

      const income = weekTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = weekTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      weeks.unshift({
        week: `Week ${i === 0 ? 'Current' : i}`,
        income,
        expenses,
        net: income - expenses,
      });
    }

    return weeks;
  },
};
