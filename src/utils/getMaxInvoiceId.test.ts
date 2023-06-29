import { getMaxInvoiceId } from './getMaxInvoiceId';

describe('getMaxInvoiceId', () => {
  it('returns the greatest id in a list of Invoices', () => {
    const MOCK_INVOICE = {
      number: 20210101,
      date: new Date('2021-01-01'),
      clientName: 'M. A',
      patientName: 'Abc',
      rate: 5000,
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
