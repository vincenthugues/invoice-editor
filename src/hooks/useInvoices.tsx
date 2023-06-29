import { reject } from 'lodash';
import { useEffect, useState } from 'react';
import { Invoice, InvoiceDraft } from '../types';
import {
  getMaxInvoiceId,
  getValueFromStorage,
  setValueInStorage,
} from '../utils';

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const data = getValueFromStorage('invoices');

    if (data) {
      setInvoices(data);
    } else {
      setValueInStorage('invoices', []);
    }
  }, []);

  const createInvoice = (invoiceDraft: InvoiceDraft): number => {
    const newId = getMaxInvoiceId(invoices) + 1;
    const newInvoice = {
      serviceProvisions: [],
      ...invoiceDraft,
      id: newId,
      date: new Date(),
    } as Invoice;

    const updatedInvoices = [...invoices, newInvoice];
    setValueInStorage('invoices', updatedInvoices);
    setInvoices(updatedInvoices);
    return newId;
  };

  const deleteInvoice = (invoiceId: number) => {
    const updatedInvoices = reject(invoices, ({ id }) => id === invoiceId);
    setValueInStorage('invoices', updatedInvoices);
    setInvoices(updatedInvoices);
  };

  return [invoices, createInvoice, deleteInvoice] as const;
};
