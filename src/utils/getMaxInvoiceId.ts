import { max } from 'lodash';
import { Invoice } from '../hooks';

export const getMaxInvoiceId = (invoices: Array<Invoice>) =>
  max(invoices.map(({ id }) => id)) || 0;
