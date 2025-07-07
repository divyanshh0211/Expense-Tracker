import { Country } from '../types';

export const countries: Country[] = [
  { code: 'US', name: 'United States', currency: 'USD', currencySymbol: '$', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', currencySymbol: '£', flag: '🇬🇧' },
  { code: 'EU', name: 'European Union', currency: 'EUR', currencySymbol: '€', flag: '🇪🇺' },
  { code: 'CA', name: 'Canada', currency: 'CAD', currencySymbol: 'C$', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', currency: 'AUD', currencySymbol: 'A$', flag: '🇦🇺' },
  { code: 'JP', name: 'Japan', currency: 'JPY', currencySymbol: '¥', flag: '🇯🇵' },
  { code: 'IN', name: 'India', currency: 'INR', currencySymbol: '₹', flag: '🇮🇳' },
  { code: 'CN', name: 'China', currency: 'CNY', currencySymbol: '¥', flag: '🇨🇳' },
  { code: 'KR', name: 'South Korea', currency: 'KRW', currencySymbol: '₩', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', currencySymbol: 'S$', flag: '🇸🇬' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', currencySymbol: 'CHF', flag: '🇨🇭' },
  { code: 'NO', name: 'Norway', currency: 'NOK', currencySymbol: 'kr', flag: '🇳🇴' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', currencySymbol: 'kr', flag: '🇸🇪' },
  { code: 'DK', name: 'Denmark', currency: 'DKK', currencySymbol: 'kr', flag: '🇩🇰' },
  { code: 'BR', name: 'Brazil', currency: 'BRL', currencySymbol: 'R$', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', currency: 'MXN', currencySymbol: '$', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', currency: 'ARS', currencySymbol: '$', flag: '🇦🇷' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', currencySymbol: 'R', flag: '🇿🇦' },
  { code: 'RU', name: 'Russia', currency: 'RUB', currencySymbol: '₽', flag: '🇷🇺' },
  { code: 'TR', name: 'Turkey', currency: 'TRY', currencySymbol: '₺', flag: '🇹🇷' },
  { code: 'AE', name: 'UAE', currency: 'AED', currencySymbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', currencySymbol: '﷼', flag: '🇸🇦' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', currencySymbol: '£', flag: '🇪🇬' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', currencySymbol: '₦', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', currency: 'KES', currencySymbol: 'KSh', flag: '🇰🇪' },
  { code: 'TH', name: 'Thailand', currency: 'THB', currencySymbol: '฿', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', currency: 'VND', currencySymbol: '₫', flag: '🇻🇳' },
  { code: 'ID', name: 'Indonesia', currency: 'IDR', currencySymbol: 'Rp', flag: '🇮🇩' },
  { code: 'MY', name: 'Malaysia', currency: 'MYR', currencySymbol: 'RM', flag: '🇲🇾' },
  { code: 'PH', name: 'Philippines', currency: 'PHP', currencySymbol: '₱', flag: '🇵🇭' },
];

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find(country => country.code === code);
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const country = countries.find(c => c.currency === currencyCode);
  return country?.currencySymbol || '$';
};