import { Invoice } from '../hooks';
import { getNewInvoiceDefaultNumber } from './getNewInvoiceDefaultNumber';

describe('getNewInvoiceDefaultNumber', () => {
  const mockInvoice: Invoice = {
    id: 123,
    number: 12345,
    date: new Date('2021-01-30'),
    clientName: '',
    patientName: '',
    rate: 50,
    serviceProvisions: [],
  };

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2021-06-30'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns the first invoice number if there are no other invoices for that year', () => {
    const invoices = [{ ...mockInvoice, number: 20201201 }];
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
