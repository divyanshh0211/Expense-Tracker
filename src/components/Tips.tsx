import React from 'react';
import { Transaction } from '../types';
import { analyticsUtils } from '../utils/analytics';
import { formatCurrency } from '../utils/formatCurrency';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle, Target, PiggyBank } from 'lucide-react';

interface TipsProps {
  transactions: Transaction[];
}

const Tips: React.FC<TipsProps> = ({ transactions }) => {
  const tips = analyticsUtils.generateSavingTips(transactions);
  const totals = analyticsUtils.calculateTotals(transactions, 'month');
  const insights = analyticsUtils.getSpendingInsights(transactions);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <Target className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Smart Saving Tips</h2>
        <p className="text-gray-600">Personalized recommendations based on your spending patterns</p>
      </div>

      {/* Financial Health Score */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Financial Health Score</h3>
          <PiggyBank className="w-6 h-6 text-purple-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {totals.income > 0 ? Math.round((totals.balance / totals.income) * 100) : 0}
            </div>
            <p className="text-sm text-gray-600">Savings Rate</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${insights.length <= 3 ? 'text-green-600' : 'text-orange-600'}`}>
              {insights.length <= 3 ? 'Good' : 'Needs Work'}
            </div>
            <p className="text-sm text-gray-600">Spending Diversity</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totals.balance >= 0 ? 'Positive' : 'Negative'}
            </div>
            <p className="text-sm text-gray-600">Monthly Balance</p>
          </div>
        </div>
      </div>

      {/* Personalized Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div 
            key={tip.id} 
            className={`rounded-xl border-2 p-6 ${getPriorityColor(tip.priority)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getPriorityIcon(tip.priority)}
                <h4 className="font-semibold text-gray-900">{tip.title}</h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                tip.priority === 'high' ? 'bg-red-100 text-red-800' :
                tip.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {tip.priority}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{tip.description}</p>
            {tip.actionable && (
              <div className="flex items-center text-sm text-blue-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>Action recommended</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Financial Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium">Set Monthly Budget</span>
            </div>
            <p className="text-sm text-gray-600">Create spending limits for each category</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center mb-2">
              <PiggyBank className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium">Emergency Fund</span>
            </div>
            <p className="text-sm text-gray-600">Build 3-6 months of expenses in savings</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-medium">Investment Plan</span>
            </div>
            <p className="text-sm text-gray-600">Start investing for long-term growth</p>
          </div>
        </div>
      </div>

      {/* General Tips */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Financial Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-blue-50 rounded-full">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Track Every Expense</p>
              <p className="text-sm text-gray-600">Consistent tracking helps identify spending patterns and areas for improvement.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-green-50 rounded-full">
              <Lightbulb className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Automate Your Savings</p>
              <p className="text-sm text-gray-600">Set up automatic transfers to your savings account to build wealth consistently.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-purple-50 rounded-full">
              <Lightbulb className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Review Monthly</p>
              <p className="text-sm text-gray-600">Regular reviews help you stay on track and adjust your financial strategy as needed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;