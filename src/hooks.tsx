import { reject } from "lodash";
import { useEffect, useState } from "react";
import { getMaxInvoiceId, getValueFromStorage, setValueInStorage } from "./utils";

export interface ServiceProvision {
  id: number,
  heading: string,
  details: string,
  hours: number,
};

interface InvoiceDraft {
  number?: number,
  clientName?: string,
  patientName?: string,
  rate?: number,
};

export interface Invoice extends InvoiceDraft {
  id: number,
  number: number,
  date: Date,
  clientName: string,
  patientName: string,
  rate: number,
  serviceProvisions: Array<ServiceProvision>,
};

type PersonalInfo = {
  name?: string,
  personalDetails?: string,
  contactInfo?: string,
  siret?: string,
};

export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();

  useEffect(() => {
    const data = getValueFromStorage("personalInfo");

    if (data) {
      setPersonalInfo(data);
    } else {
      setValueInStorage(
        "personalInfo",
        {
          name: 'Prénom NOM',
          personalDetails: 'Titre\nCertification',
          contactInfo: 'Tél. 06 12 34 56 78\nEmail : email@example.com',
          siret: 'SIRET',
        }
      );
    }
  }, []);

  return [personalInfo, setPersonalInfo] as const;
};

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);

  useEffect(() => {
    const data = getValueFromStorage("invoices");

    if (data) {
      setInvoices(data);
    } else {
      setValueInStorage("invoices", []);
    }
  }, []);

  const createInvoice = (invoiceDraft: InvoiceDraft): number => {
    const newId = getMaxInvoiceId(invoices) + 1;
    const newInvoice = {
      ...invoiceDraft,
      id: newId,
      date: new Date(),
      serviceProvisions: [],
    } as Invoice;

    const updatedInvoices = [...invoices, newInvoice];
    setValueInStorage("invoices", updatedInvoices);
    setInvoices(updatedInvoices);
    return newId;
  };

  const deleteInvoice = (invoiceId: number) => {
    const updatedInvoices = reject(invoices, ({ id }) => id === invoiceId);
    setValueInStorage("invoices", updatedInvoices);
    setInvoices(updatedInvoices);
  };

  return [invoices, createInvoice, deleteInvoice] as const;
};

export const useInvoice = (invoiceId: number) => {
  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    const data = getValueFromStorage("invoices");
    const storedInvoice = data?.find(({ id }: Invoice) => id === invoiceId);

    setInvoice(storedInvoice);
  }, [invoiceId]);

  const updateInvoice = (newInvoice: Invoice) => {
    const storedInvoices = getValueFromStorage("invoices");
    const updatedInvoices = storedInvoices.map((invoice: Invoice) =>
      invoice.id === invoiceId ? newInvoice : invoice
    );
    setValueInStorage("invoices", updatedInvoices);
    setInvoice(newInvoice);
  };

  return [invoice, updateInvoice] as const;
};
