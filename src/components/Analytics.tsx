import React from 'react';
import { Transaction } from '../types';
import { analyticsUtils } from '../utils/analytics';
import { formatCurrency } from '../utils/formatCurrency';
import { TrendingUp, TrendingDown, PieChart, BarChart } from 'lucide-react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { categories } from '../utils/mockData';

interface AnalyticsProps {
  transactions: Transaction[];
}

const Analytics: React.FC<AnalyticsProps> = ({ transactions }) => {
  const monthlyTotals = analyticsUtils.calculateTotals(transactions, 'month');
  const weeklyTotals = analyticsUtils.calculateTotals(transactions, 'week');
  const allTimeTotals = analyticsUtils.calculateTotals(transactions, 'all');
  
  const insights = analyticsUtils.getSpendingInsights(transactions);
  const weeklyData = analyticsUtils.getWeeklySpendingData(transactions);
  
  const pieData = insights.slice(0, 6).map(insight => {
    const category = categories.find(c => c.id === insight.category);
    return {
      name: category?.name || insight.category,
      value: insight.amount,
      color: category?.color || '#6B7280'
    };
  });

  const savingsRate = monthlyTotals.income > 0 ? (monthlyTotals.balance / monthlyTotals.income) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-600">Detailed insights into your financial patterns</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(monthlyTotals.balance)}</p>
            </div>
            <div className={`p-2 rounded-full ${monthlyTotals.balance >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              {monthlyTotals.balance >= 0 ? 
                <TrendingUp className="w-5 h-5 text-green-600" /> : 
                <TrendingDown className="w-5 h-5 text-red-600" />
              }
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(weeklyTotals.balance)}</p>
            </div>
            <div className={`p-2 rounded-full ${weeklyTotals.balance >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              {weeklyTotals.balance >= 0 ? 
                <TrendingUp className="w-5 h-5 text-green-600" /> : 
                <TrendingDown className="w-5 h-5 text-red-600" />
              }
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Savings Rate</p>
              <p className={`text-xl font-bold ${savingsRate >= 20 ? 'text-green-600' : 'text-orange-600'}`}>
                {savingsRate.toFixed(1)}%
              </p>
            </div>
            <div className={`p-2 rounded-full ${savingsRate >= 20 ? 'bg-green-50' : 'bg-orange-50'}`}>
              <PieChart className={`w-5 h-5 ${savingsRate >= 20 ? 'text-green-600' : 'text-orange-600'}`} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Daily Spend</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(monthlyTotals.expenses / 30)}
              </p>
            </div>
            <div className="p-2 bg-blue-50 rounded-full">
              <BarChart className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Income"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Expenses"
                />
                <Line 
                  type="monotone" 
                  dataKey="net" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Net"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
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

        {/* Monthly Comparison */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={weeklyData.slice(-4)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                <Legend />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Insights</h3>
          <div className="space-y-4">
            {insights.slice(0, 6).map((insight) => {
              const category = categories.find(c => c.id === insight.category);
              return (
                <div key={insight.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{category?.icon || '💰'}</div>
                    <div>
                      <p className="font-medium text-gray-900">{category?.name || insight.category}</p>
                      <p className="text-sm text-gray-500">{insight.percentage.toFixed(1)}% of total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(insight.amount)}</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min(insight.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;