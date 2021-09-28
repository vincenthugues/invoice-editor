import { Invoice } from './hooks';
import { formatCurrency, addDaysToDate, getMaxInvoiceId, getNewInvoiceDefaultNumber, getNewInvoiceDefaultRate } from './utils';

describe('formatCurrency', () => {
  it('returns a euro amount in French format', () => {
    expect(formatCurrency(123.45)).toMatch(/^123,45\s€$/);
  });

  it('inserts 2 digits after the comma', () => {
    expect(formatCurrency(123)).toMatch(/^123,00\s€$/);
  });

  it('inserts at least one digit before the comma', () => {
    expect(formatCurrency(.12)).toMatch(/^0,12\s€$/);
  });
});

describe('addDaysToDate', () => {
  it('returns a date with a number of days added', () => {
    expect(addDaysToDate(new Date('2021-01-01'), 30)).toStrictEqual(new Date('2021-01-31'));
  });
});

describe('getMaxInvoiceId', () => {
  it('returns the greatest id in a list of Invoices', () => {
    const MOCK_INVOICE = {
      number: 20210101,
      date: new Date('2021-01-01'),
      clientName: 'M. A',
      patientName: 'Abc',
      rate: 50,
      serviceProvisions: [],
    };
    const invoices = [
      { ...MOCK_INVOICE, id: 1 },
      { ...MOCK_INVOICE, id: 2 },
      { ...MOCK_INVOICE, id: 3 },
    ];

    expect(getMaxInvoiceId(invoices)).toBe(3);
  });

  it('returns 0 for an empty list', () => {
    expect(getMaxInvoiceId([])).toBe(0);
  });
});

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
