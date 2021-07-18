import { useEffect, useState } from "react";

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
  contactInfo?:string,
  siret?:string,
};

export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();

  useEffect(() => {
    const storedData = localStorage.getItem("personalInfo");

    if (storedData) {
      setPersonalInfo(JSON.parse(storedData));
    } else {
      const {
        REACT_APP_NAME: name,
        REACT_APP_PERSONAL_DETAILS: personalDetails,
        REACT_APP_CONTACT_INFO: contactInfo,
        REACT_APP_SIRET: siret,
      } = process.env;

      localStorage.setItem(
        "personalInfo",
        JSON.stringify({
          name,
          personalDetails,
          contactInfo,
          siret,
        })
      );
    }
  }, []);

  return [personalInfo, setPersonalInfo] as const;
};

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("invoices");

    if (storedData) {
      setInvoices(JSON.parse(storedData));
    } else {
      localStorage.setItem("invoices", JSON.stringify([]));
    }
  }, []);

  const createInvoice = (invoiceDraft: InvoiceDraft): number => {
    const newId = Math.max(...invoices.map(({ id }) => id as number)) + 1;
    const newInvoice = {
      ...invoiceDraft,
      id: newId,
      date: new Date(),
      serviceProvisions: [],
    } as Invoice;

    const updatedInvoices = [...invoices, newInvoice];
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    setInvoices(updatedInvoices);
    return newId;
  };

  const deleteInvoice = (invoiceId: number) => {
    const invoiceIndex = invoices.findIndex(({ id }) => id === invoiceId);
    const updatedInvoices = [
      ...invoices.slice(0, invoiceIndex),
      ...invoices.slice(invoiceIndex + 1),
    ];
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    setInvoices(updatedInvoices);
  };

  return [invoices, createInvoice, deleteInvoice] as const;
};

export const useInvoice = (invoiceId: number) => {
  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    const storedData = localStorage.getItem("invoices");
    const storedInvoice =
      storedData && JSON.parse(storedData).find(({ id }: Invoice) => id === invoiceId);

    setInvoice(storedInvoice);
  }, [invoiceId]);

  const updateInvoice = (newInvoice: Invoice) => {
    const storedData = localStorage.getItem("invoices");
    const storedInvoices = storedData && JSON.parse(storedData);
    const updatedInvoices = storedInvoices.map((invoice: Invoice) =>
      invoice.id === invoiceId ? newInvoice : invoice
    );
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

    setInvoice(newInvoice);
  };

  return [invoice, updateInvoice] as const;
};
