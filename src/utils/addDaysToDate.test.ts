import { addDaysToDate } from './addDaysToDate';

describe('addDaysToDate', () => {
  it('returns a date with a number of days added', () => {
    expect(addDaysToDate(new Date('2021-01-01'), 30)).toStrictEqual(
      new Date('2021-01-31')
    );
  });
});
