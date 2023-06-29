import { maxBy } from 'lodash';
import { Invoice } from '../types';

export const DEFAULT_INVOICE_RATE = 5000;

export const getNewInvoiceDefaultRate = (invoices: Invoice[]) => {
  const latestInvoice = maxBy(invoices, 'date');

  return latestInvoice?.rate || DEFAULT_INVOICE_RATE;
};
