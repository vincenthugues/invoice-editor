import { Invoice } from "./hooks";

export const formatCurrency = (number: number): string =>
  number.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

export const addDaysToDate = (date: Date, daysToAdd: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysToAdd);

  return newDate;
};

export const getMaxInvoiceId = (invoices: Array<Invoice>) => Math.max(0, ...invoices.map(({ id }) => id));
