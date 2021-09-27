import { Invoice } from '../hooks';
import { getNewInvoiceDefaultNumber, getNewInvoiceDefaultRate } from './InvoiceCreator';

describe('getNewInvoiceDefaultNumber', () => {
  const mockInvoice: Invoice = {
    id: 123,
    number: 12345,
    date: new Date('2021-01-30'),
    clientName: '',
    patientName: '',
    rate: 50,
    serviceProvisions: [],
  }

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2021-06-30'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns the first invoice number if there are no other invoices for that year', () => {
    const invoices = [
      { ...mockInvoice, number: 20201201 },
    ];
    expect(getNewInvoiceDefaultNumber(invoices)).toBe(20210601);
  });

  it('returns the first invoice number if there are no other invoices', () => {
    const invoices: Array<Invoice> = [];
    expect(getNewInvoiceDefaultNumber(invoices)).toBe(20210601);
  });

  it('returns the next invoice number if there are other invoices for that year', () => {
    const invoices = [
      { ...mockInvoice, number: 20210101 },
      { ...mockInvoice, number: 20210104 },
    ];
    expect(getNewInvoiceDefaultNumber(invoices)).toBe(20210605);
  });
});

describe('getNewInvoiceDefaultRate', () => {
  const mockInvoice: Invoice = {
    id: 123,
    number: 12345,
    date: new Date('2021-01-30'),
    clientName: '',
    patientName: '',
    rate: 40,
    serviceProvisions: [],
  }

  it("returns the latest invoice's rate if there is one", () => {
    const invoices = [
      { ...mockInvoice, date: new Date('2020-12-30'), rate: 38 },
      { ...mockInvoice, date: new Date('2021-01-30'), rate: 45 },
      { ...mockInvoice, date: new Date('2021-01-15'), rate: 42 },
    ];
    expect(getNewInvoiceDefaultRate(invoices)).toBe(45);
  });

  it('returns the default invoice rate if there is no previous invoice', () => {
    const invoices: Array<Invoice> = [];
    expect(getNewInvoiceDefaultRate(invoices)).toBe(50);
  });
});
