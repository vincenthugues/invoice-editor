import { formatCurrency, addDaysToDate } from './utils';

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
