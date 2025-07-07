import { User, Transaction } from '../types';

const STORAGE_KEYS = {
  USER: 'expenseTracker_user',
  TRANSACTIONS: 'expenseTracker_transactions',
  DEMO_MODE: 'expenseTracker_demoMode'
};

export const storageUtils = {
  // User management
  setUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  removeUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Transactions management
  setTransactions: (transactions: Transaction[]) => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  getTransactions: (): Transaction[] => {
    const transactionsStr = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!transactionsStr) return [];
    
    const transactions = JSON.parse(transactionsStr);
    return transactions.map((t: any) => ({
      ...t,
      date: new Date(t.date)
    }));
  },

  addTransaction: (transaction: Transaction) => {
    const transactions = storageUtils.getTransactions();
    transactions.push(transaction);
    storageUtils.setTransactions(transactions);
  },

  updateTransaction: (id: string, updatedTransaction: Partial<Transaction>) => {
    const transactions = storageUtils.getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updatedTransaction };
      storageUtils.setTransactions(transactions);
    }
  },

  deleteTransaction: (id: string) => {
    const transactions = storageUtils.getTransactions();
    const filteredTransactions = transactions.filter(t => t.id !== id);
    storageUtils.setTransactions(filteredTransactions);
  },

  // Demo mode
  setDemoMode: (enabled: boolean) => {
    localStorage.setItem(STORAGE_KEYS.DEMO_MODE, JSON.stringify(enabled));
  },

  getDemoMode: (): boolean => {
    const demoStr = localStorage.getItem(STORAGE_KEYS.DEMO_MODE);
    return demoStr ? JSON.parse(demoStr) : false;
  }
};