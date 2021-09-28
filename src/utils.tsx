import { max, maxBy } from 'lodash';
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

export const DEFAULT_INVOICE_RATE = 50;

export const getNewInvoiceDefaultNumber = (invoices: Array<Invoice>) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const getLastTwoDigits = (number: number) => number % 100;

  const yearInvoices = invoices.filter(({ number }) => String(number).startsWith(`${year}`));
  const maxYearInvoice = maxBy(yearInvoices, ({ number }) => getLastTwoDigits(number));

  const invoiceNumberSuffix = maxYearInvoice
    ? String(getLastTwoDigits(maxYearInvoice.number) + 1).padStart(2, '0')
    : '01';

  return Number(`${year}${month}${invoiceNumberSuffix}`);
};

export const getNewInvoiceDefaultRate = (invoices: Array<Invoice>) => {
  const latestInvoice = maxBy(invoices, 'date');

  return latestInvoice?.rate || DEFAULT_INVOICE_RATE;
};
