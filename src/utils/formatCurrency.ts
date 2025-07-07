import { storageUtils } from './storage';

export const formatCurrency = (amount: number): string => {
  const user = storageUtils.getUser();
  const currencySymbol = user?.currencySymbol || '$';
  
  // Format number with commas
  const formattedAmount = amount.toLocaleString();
  
  // Return formatted currency
  return `${currencySymbol}${formattedAmount}`;
};

export const getCurrencySymbol = (): string => {
  const user = storageUtils.getUser();
  return user?.currencySymbol || '$';
};