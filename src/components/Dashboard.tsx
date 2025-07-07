import { predictMonthlyExpense } from '../ml/predictor';

import React, { useState, useEffect } from 'react';
import { User, Transaction } from '../types';
import { storageUtils } from '../utils/storage';
import { notificationUtils } from '../utils/notifications';
import Header from './Header';
import Overview from './Overview';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Analytics from './Analytics';
import Tips from './Tips';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'analytics' | 'tips'>('overview');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [predicted, setPredicted] = useState<number | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    // Load transactions
    const loadedTransactions = storageUtils.getTransactions();
    setTransactions(loadedTransactions);
    if (loadedTransactions.length > 0) {
  setPredicted(predictMonthlyExpense(loadedTransactions));
}


    // Set up notifications
    notificationUtils.requestPermission().then(granted => {
      if (granted) {
        notificationUtils.setupReminders();
      }
    });
  }, []);

  const handleAddTransaction = (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      userId: user.id
    };
    
    storageUtils.addTransaction(newTransaction);
    setTransactions(prev => [newTransaction, ...prev]);
    setShowTransactionForm(false);
  };

  const handleUpdateTransaction = (id: string, updates: Partial<Transaction>) => {
    storageUtils.updateTransaction(id, updates);
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    storageUtils.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const userTransactions = transactions.filter(t => t.userId === user.id);
// 🍔 Total spent on Food
const foodExpense = userTransactions
  .filter(t => t.category === 'Food' && t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);

// 🛍️ Total spent on Shopping
const shoppingExpense = userTransactions
  .filter(t => t.category === 'Shopping' && t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header 
        user={user} 
        onLogout={onLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <Overview 
            transactions={userTransactions}
            onAddTransaction={() => setShowTransactionForm(true)}
          />
        )}

        {activeTab === 'overview' && predicted !== null && (
  <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-md text-purple-800">
    🔮 <strong>Predicted Next Month’s Expense:</strong> ₹{predicted}
    <span className="ml-2 text-xs bg-purple-200 px-2 py-1 rounded">
      AI Forecast
    </span>
  </div>
)}
{activeTab === 'overview' && shoppingExpense > 5000 && (
  <div className="mt-2 p-3 bg-red-100 text-red-800 rounded-md shadow border border-red-300 flex items-center justify-between">
    <div>
      🛍️ You've spent ₹{shoppingExpense} on Shopping this month.
    </div>
    <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
      🧠 AI Alert
    </span>
  </div>
)}

{activeTab === 'overview' && foodExpense > 5000 && (
  <div className="mt-2 p-3 bg-red-100 text-red-800 rounded-md shadow border border-red-300 flex items-center justify-between">
    <div>
      🍔 You've spent ₹{foodExpense} on Food this month.
    </div>
    <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
      🧠 AI Alert
    </span>
  </div>
)}




        
        {activeTab === 'transactions' && (
          <TransactionList 
            transactions={userTransactions}
            onAddTransaction={() => setShowTransactionForm(true)}
            onEditTransaction={setEditingTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}
        
        {activeTab === 'analytics' && (
          <Analytics transactions={userTransactions} />
        )}
        
        {activeTab === 'tips' && (
          <Tips transactions={userTransactions} />
        )}
      </main>

      {/* Enhanced Transaction Form Modal */}
      {(showTransactionForm || editingTransaction) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <TransactionForm
              transaction={editingTransaction}
              onSubmit={editingTransaction ? 
                (updates) => handleUpdateTransaction(editingTransaction.id, updates) : 
                handleAddTransaction
              }
              onCancel={() => {
                setShowTransactionForm(false);
                setEditingTransaction(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
