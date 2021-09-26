import { Invoice } from '../hooks';
import { getNewInvoiceDefaultNumber } from './InvoiceCreator';

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
    jest.setSystemTime(new Date('2021-01-30'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns the first invoice number if there are no other invoices for that month', () => {
    const invoices = [
      { ...mockInvoice, number: 20201201 },
    ];
    expect(getNewInvoiceDefaultNumber(invoices)).toBe(20210101);
  });

  it('returns the first invoice number if there are no other invoices', () => {
    const invoices = [];
    expect(getNewInvoiceDefaultNumber(invoices)).toBe(20210101);
  });

  it('returns the next invoice number if there are other invoices for that month', () => {
    const invoices = [
      { ...mockInvoice, number: 20210101 },
      { ...mockInvoice, number: 20210102 },
    ];
    expect(getNewInvoiceDefaultNumber(invoices)).toBe(20210103);
  });

  it('always returns a higher number than the other invoice numbers for that month', () => {
    const invoices = [
      { ...mockInvoice, number: 20210101 },
      { ...mockInvoice, number: 20210107 },
    ];
    expect(getNewInvoiceDefaultNumber(invoices)).toBe(20210108);
  });
});
