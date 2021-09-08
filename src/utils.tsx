import { max } from 'lodash';
import { Invoice } from './hooks';

export const getValueFromStorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const setValueInStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const formatCurrency = (number: number): string =>
  number.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

export const addDaysToDate = (date: Date, daysToAdd: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysToAdd);

  return newDate;
};

export const getMaxInvoiceId = (invoices: Array<Invoice>) => max(invoices.map(({ id }) => id)) || 0;
