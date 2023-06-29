import { Invoice } from '../hooks';
import { getNewInvoiceDefaultRate } from './getNewInvoiceDefaultRate';

describe('getNewInvoiceDefaultRate', () => {
  const mockInvoice: Invoice = {
    id: 123,
    number: 12345,
    date: new Date('2021-01-30'),
    clientName: '',
    patientName: '',
    rate: 4000,
    serviceProvisions: [],
  };

  it("returns the latest invoice's rate if there is one", () => {
    const invoices = [
      { ...mockInvoice, date: new Date('2020-12-30'), rate: 3800 },
      { ...mockInvoice, date: new Date('2021-01-30'), rate: 4500 },
      { ...mockInvoice, date: new Date('2021-01-15'), rate: 4200 },
    ];
    expect(getNewInvoiceDefaultRate(invoices)).toBe(4500);
  });

  it('returns the default invoice rate if there is no previous invoice', () => {
    const invoices: Array<Invoice> = [];
    expect(getNewInvoiceDefaultRate(invoices)).toBe(5000);
  });
});
