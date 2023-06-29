import { maxBy } from 'lodash';
import { Invoice } from '../types';

export const getNewInvoiceDefaultNumber = (invoices: Invoice[]) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const getLastTwoDigits = (number: number) => number % 100;

  const yearInvoices = invoices.filter(({ number }) =>
    String(number).startsWith(`${year}`)
  );
  const maxYearInvoice = maxBy(yearInvoices, ({ number }) =>
    getLastTwoDigits(number)
  );

  const invoiceNumberSuffix = maxYearInvoice
    ? String(getLastTwoDigits(maxYearInvoice.number) + 1).padStart(2, '0')
    : '01';

  return Number(`${year}${month}${invoiceNumberSuffix}`);
};
