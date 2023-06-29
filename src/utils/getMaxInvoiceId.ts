import { max } from 'lodash';
import { Invoice } from '../types';

export const getMaxInvoiceId = (invoices: Invoice[]) =>
  max(invoices.map(({ id }) => id)) || 0;
