import React, { useState } from 'react';
import { User, CreditCard, TrendingUp, Shield, Bell, Sparkles, BarChart3, PieChart, Target, Globe, DollarSign } from 'lucide-react';
import { storageUtils } from '../utils/storage';
import { generateMockTransactions } from '../utils/mockData';
import { countries } from '../utils/countries';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [isLoading, setIsLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !selectedCountryData) return;
    
    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      id: Date.now().toString(),
      username: username.trim(),
      email: `${username.trim().toLowerCase()}@example.com`,
      country: selectedCountryData.name,
      currency: selectedCountryData.currency,
      currencySymbol: selectedCountryData.currencySymbol,
      createdAt: new Date()
    };
    
    storageUtils.setUser(user);
    storageUtils.setDemoMode(demoMode);
    
    // If demo mode, generate mock data
    if (demoMode) {
      const mockTransactions = generateMockTransactions(user.id);
      storageUtils.setTransactions(mockTransactions);
    }
    
    onLogin(user);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-lg w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-2xl">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3">
              ExpenseTracker Pro
            </h1>
            <p className="text-gray-300 text-lg">Smart personal finance management</p>
            <div className="flex items-center justify-center mt-4 space-x-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-400">AI-powered insights & analytics</span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-3">
                <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
                <span className="text-sm font-semibold text-white">Analytics</span>
              </div>
              <p className="text-xs text-gray-300">Advanced spending insights with trend analysis</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                <span className="text-sm font-semibold text-white">Secure</span>
              </div>
              <p className="text-xs text-gray-300">Bank-level security with local storage</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Bell className="w-6 h-6 text-purple-400 mr-3" />
                <span className="text-sm font-semibold text-white">Smart Alerts</span>
              </div>
              <p className="text-xs text-gray-300">Intelligent reminders & notifications</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Target className="w-6 h-6 text-orange-400 mr-3" />
                <span className="text-sm font-semibold text-white">Goal Tracking</span>
              </div>
              <p className="text-xs text-gray-300">Set and achieve financial milestones</p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-3">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-200 mb-3">
                  Country & Currency
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white backdrop-blur-sm appearance-none"
                    required
                  >
                    {countries.map((country) => (
                      <option 
                        key={country.code} 
                        value={country.code}
                        className="bg-gray-800 text-white"
                      >
                        {country.flag} {country.name} ({country.currencySymbol} {country.currency})
                      </option>
                    ))}
                  </select>
                </div>
                {selectedCountryData && (
                  <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Selected Currency:</span>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-white font-semibold">
                          {selectedCountryData.currencySymbol} {selectedCountryData.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="demoMode"
                  checked={demoMode}
                  onChange={(e) => setDemoMode(e.target.checked)}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 bg-white/10 border-white/30"
                />
                <label htmlFor="demoMode" className="text-sm text-gray-200 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                  Enable demo mode with sample data
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || !username.trim()}
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Setting up your account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Get Started
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400 mb-2">
              Your data stays on your device. No account creation required.
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span>🔒 Privacy First</span>
              <span>•</span>
              <span>⚡ Lightning Fast</span>
              <span>•</span>
              <span>🌍 Global Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;