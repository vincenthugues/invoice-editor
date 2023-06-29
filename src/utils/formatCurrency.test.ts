import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('returns a euro amount in French format', () => {
    expect(formatCurrency(12345)).toMatch(/^123,45\s€$/);
  });

  it('inserts 2 digits after the comma', () => {
    expect(formatCurrency(12300)).toMatch(/^123,00\s€$/);
  });

  it('inserts at least one digit before the comma', () => {
    expect(formatCurrency(12)).toMatch(/^0,12\s€$/);
  });
});
