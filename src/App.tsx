// App.tsx
import { useState, useEffect } from 'react';
import { User } from './types';
import { storageUtils } from './utils/storage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log("📦 App mounted");
    try {
      const savedUser = storageUtils.getUser();
      if (savedUser) {
        console.log("✅ User found in storage:", savedUser);
        setUser(savedUser);
      } else {
        console.log("ℹ️ No user found, showing login");
      }
    } catch (err) {
      console.error("❌ Error reading user from storageUtils:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (userData: User) => {
    console.log("🔐 Logged in:", userData);
    setUser(userData);
  };

  const handleLogout = () => {
    console.log("👋 Logging out");
    try {
      storageUtils.removeUser();
      storageUtils.setTransactions([]);
    } catch (err) {
      console.error("❌ Error clearing storage on logout:", err);
    }
    setUser(null);
  };

  const handleClearSession = () => {
    console.warn("⚠️ Clearing session manually (debug)");
    try {
      storageUtils.removeUser();
      storageUtils.setTransactions([]);
    } catch (err) {
      console.error("❌ Error during session clear:", err);
    }
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading ExpenseTracker Pro...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-red-900 text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Something went wrong 😢</h1>
          <p className="text-sm">Check console for detailed error logs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <div>
          <button
            onClick={handleClearSession}
            className="fixed top-4 right-4 z-50 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
            title="Clear Session (Debug)"
          >
            Clear Session
          </button>
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
