import React from 'react';
import { Transaction } from '../types';
import { analyticsUtils } from '../utils/analytics';
import { formatCurrency } from '../utils/formatCurrency';
import { Plus, TrendingUp, TrendingDown, DollarSign, PieChart, Sparkles, Target, Award, Zap } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie } from 'recharts';
import { categories } from '../utils/mockData';

interface OverviewProps {
  transactions: Transaction[];
  onAddTransaction: () => void;
}

const Overview: React.FC<OverviewProps> = ({ transactions, onAddTransaction }) => {
  const totals = analyticsUtils.calculateTotals(transactions, 'month');
  const weeklyData = analyticsUtils.getWeeklySpendingData(transactions);
  const insights = analyticsUtils.getSpendingInsights(transactions);
  
  const pieData = insights.slice(0, 6).map(insight => {
    const category = categories.find(c => c.id === insight.category);
    return {
      name: category?.name || insight.category,
      value: insight.amount,
      color: category?.color || '#6B7280'
    };
  });

  const savingsRate = totals.income > 0 ? (totals.balance / totals.income) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Financial Dashboard</h1>
              <p className="text-purple-100 text-lg">Track, analyze, and optimize your spending</p>
              <div className="flex items-center mt-4 space-x-6">
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
                  <span className="text-sm">AI Insights</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-300" />
                  <span className="text-sm">Goal Tracking</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-orange-300" />
                  <span className="text-sm">Smart Tips</span>
                </div>
              </div>
            </div>
            <button
              onClick={onAddTransaction}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">Total Income</p>
              <p className="text-3xl font-bold text-green-800">{formatCurrency(totals.income)}</p>
              <p className="text-xs text-green-600 mt-1">This month</p>
            </div>
            <div className="p-4 bg-green-100 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700 mb-1">Total Expenses</p>
              <p className="text-3xl font-bold text-red-800">{formatCurrency(totals.expenses)}</p>
              <p className="text-xs text-red-600 mt-1">This month</p>
            </div>
            <div className="p-4 bg-red-100 rounded-2xl">
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className={`bg-gradient-to-br ${totals.balance >= 0 ? 'from-blue-50 to-indigo-50' : 'from-orange-50 to-red-50'} rounded-2xl shadow-lg p-6 border ${totals.balance >= 0 ? 'border-blue-100' : 'border-orange-100'} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${totals.balance >= 0 ? 'text-blue-700' : 'text-orange-700'} mb-1`}>Net Balance</p>
              <p className={`text-3xl font-bold ${totals.balance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
                {formatCurrency(Math.abs(totals.balance))}
              </p>
              <p className={`text-xs ${totals.balance >= 0 ? 'text-blue-600' : 'text-orange-600'} mt-1`}>
                {totals.balance >= 0 ? 'Surplus' : 'Deficit'}
              </p>
            </div>
            <div className={`p-4 ${totals.balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'} rounded-2xl`}>
              <DollarSign className={`w-8 h-8 ${totals.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            </div>
          </div>
        </div>

        <div className={`bg-gradient-to-br ${savingsRate >= 20 ? 'from-purple-50 to-violet-50' : 'from-yellow-50 to-orange-50'} rounded-2xl shadow-lg p-6 border ${savingsRate >= 20 ? 'border-purple-100' : 'border-yellow-100'} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${savingsRate >= 20 ? 'text-purple-700' : 'text-yellow-700'} mb-1`}>Savings Rate</p>
              <p className={`text-3xl font-bold ${savingsRate >= 20 ? 'text-purple-800' : 'text-yellow-800'}`}>
                {savingsRate.toFixed(1)}%
              </p>
              <p className={`text-xs ${savingsRate >= 20 ? 'text-purple-600' : 'text-yellow-600'} mt-1`}>
                {savingsRate >= 20 ? 'Excellent!' : 'Needs work'}
              </p>
            </div>
            <div className={`p-4 ${savingsRate >= 20 ? 'bg-purple-100' : 'bg-yellow-100'} rounded-2xl`}>
              <Zap className={`w-8 h-8 ${savingsRate >= 20 ? 'text-purple-600' : 'text-yellow-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spending by Category */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Spending by Category</h3>
              <p className="text-gray-600 text-sm">Monthly breakdown</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Trends */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Weekly Trends</h3>
              <p className="text-gray-600 text-sm">Income vs expenses</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData.slice(-4)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [formatCurrency(Number(value)), '']}
                />
                <Legend />
                <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
              <p className="text-gray-600 text-sm">Latest financial activity</p>
            </div>
            <button
              onClick={onAddTransaction}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Transaction
            </button>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction, index) => {
              const category = categories.find(c => c.id === transaction.category);
              return (
                <div key={transaction.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl p-3 bg-white rounded-xl shadow-sm">{category?.icon || '💰'}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{category?.name || transaction.category}</p>
                      <p className="text-xs text-gray-500">{transaction.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-xl ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <p className={`text-sm px-3 py-1 rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {transaction.type}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {transactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No transactions yet</p>
              <p className="text-gray-400 text-sm">Add your first transaction to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;