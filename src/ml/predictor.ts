import { Transaction } from '../types';

export function predictMonthlyExpense(transactions: Transaction[]): number {
  const now = new Date();
  const last3MonthsTotals: number[] = [];

  for (let i = 1; i <= 3; i++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = targetDate.getMonth();
    const year = targetDate.getFullYear();

    const monthlyTotal = transactions
      .filter(t => {
        const date = new Date(t.date);
        return (
          date.getMonth() === month &&
          date.getFullYear() === year &&
          t.type === 'expense'
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    last3MonthsTotals.push(monthlyTotal);
  }

  const average = last3MonthsTotals.reduce((sum, val) => sum + val, 0) / last3MonthsTotals.length;

  return isNaN(average) ? 0 : Math.round(average);
}
