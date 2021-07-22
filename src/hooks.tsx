import { useEffect, useState } from "react";
import { getMaxInvoiceId } from "./utils";

export interface ServiceProvision {
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

const getValueFromStorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
}

const setValueInStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();

  useEffect(() => {
    const data = getValueFromStorage("personalInfo");

    if (data) {
      setPersonalInfo(data);
    } else {
      const {
        REACT_APP_NAME: name,
        REACT_APP_PERSONAL_DETAILS: personalDetails,
        REACT_APP_CONTACT_INFO: contactInfo,
        REACT_APP_SIRET: siret,
      } = process.env;

      setValueInStorage(
        "personalInfo",
        {
          name,
          personalDetails,
          contactInfo,
          siret,
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
    const invoiceIndex = invoices.findIndex(({ id }) => id === invoiceId);
    const updatedInvoices = [
      ...invoices.slice(0, invoiceIndex),
      ...invoices.slice(invoiceIndex + 1),
    ];
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
