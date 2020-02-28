import { isEqualDate } from '..';

const testDates = [
  new Date(2020, 1, 25, 23, 30, 12),
  new Date(2020, 1, 25, 12, 17, 11),
  new Date(2019, 1, 25, 23, 30, 12),
  new Date(2020, 2, 25, 23, 30, 12),
  new Date(2020, 1, 24, 23, 30, 12),
];

describe('isEqualDate tests:', () => {
  test('should just check for date not for time', () => {
    expect(isEqualDate(testDates[0], testDates[1])).toBe(true);
    expect(isEqualDate(testDates[0], testDates[2])).toBe(false);
  });

  test('should check for year difference', () => {
    expect(isEqualDate(testDates[0], testDates[2])).toBe(false);
  });

  test('should check for month difference', () => {
    expect(isEqualDate(testDates[0], testDates[3])).toBe(false);
  });

  test('should check for day difference', () => {
    expect(isEqualDate(testDates[0], testDates[4])).toBe(false);
  });
});
