import { useEffect, useState } from 'react';
import { Invoice } from '../types';
import { getValueFromStorage, setValueInStorage } from '../utils';

export const useInvoice = (invoiceId: number) => {
  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    const data = getValueFromStorage('invoices');
    const storedInvoice = data?.find(({ id }: Invoice) => id === invoiceId);

    setInvoice(storedInvoice);
  }, [invoiceId]);

  const updateInvoice = (newInvoice: Invoice) => {
    const storedInvoices = getValueFromStorage('invoices');
    const updatedInvoices = storedInvoices.map((invoice: Invoice) =>
      invoice.id === invoiceId ? newInvoice : invoice
    );
    setValueInStorage('invoices', updatedInvoices);
    setInvoice(newInvoice);
  };

  return [invoice, updateInvoice] as const;
};
