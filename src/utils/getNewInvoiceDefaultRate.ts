import { maxBy } from 'lodash';
import { Invoice } from '../hooks';

export const DEFAULT_INVOICE_RATE = 5000;

export const getNewInvoiceDefaultRate = (invoices: Array<Invoice>) => {
  const latestInvoice = maxBy(invoices, 'date');

  return latestInvoice?.rate || DEFAULT_INVOICE_RATE;
};
