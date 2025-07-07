export const notificationUtils = {
  // Request permission for notifications
  requestPermission: async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }
    
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  },

  // Show notification
  showNotification: (title: string, body: string, icon?: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: icon || '/vite.svg',
        badge: '/vite.svg'
      });
    }
  },

  // Set up reminder timers
  setupReminders: () => {
    // Daily reminder at 8 PM
    const setDailyReminder = () => {
      const now = new Date();
      const reminderTime = new Date();
      reminderTime.setHours(20, 0, 0, 0);
      
      if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }
      
      const timeUntilReminder = reminderTime.getTime() - now.getTime();
      
      setTimeout(() => {
        notificationUtils.showNotification(
          'Daily Expense Reminder',
          "Don't forget to log today's expenses! Keep your financial tracking consistent."
        );
        
        // Set up next day's reminder
        setDailyReminder();
      }, timeUntilReminder);
    };
    
    // Weekly reminder on Sunday at 10 AM
    const setWeeklyReminder = () => {
      const now = new Date();
      const reminderTime = new Date();
      reminderTime.setDate(now.getDate() + ((7 - now.getDay()) % 7));
      reminderTime.setHours(10, 0, 0, 0);
      
      if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 7);
      }
      
      const timeUntilReminder = reminderTime.getTime() - now.getTime();
      
      setTimeout(() => {
        notificationUtils.showNotification(
          'Weekly Financial Review',
          'Time to review your weekly expenses and check your financial goals!'
        );
        
        // Set up next week's reminder
        setWeeklyReminder();
      }, timeUntilReminder);
    };
    
    // For demo purposes, also set shorter intervals
    if (localStorage.getItem('expenseTracker_demoMode') === 'true') {
      // Demo: remind every 2 minutes
      setInterval(() => {
        notificationUtils.showNotification(
          'Demo Reminder',
          'This is a demo reminder - in real app, you would get daily reminders!'
        );
      }, 120000); // 2 minutes
    }
    
    setDailyReminder();
    setWeeklyReminder();
  }
};