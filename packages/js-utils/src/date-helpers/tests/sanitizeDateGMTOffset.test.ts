import { sanitizeDateGMTOffset } from '..';

describe('sanitizeDateGMTOffset tests:', () => {
  test('should find correct GMT Offset and return without changes', () => {
    expect(sanitizeDateGMTOffset('2020-01-01T12:13:14.000+02:00')).toBe('2020-01-01T12:13:14.000+02:00');
  });
  test('should find no GMT Offset and return without changes', () => {
    expect(sanitizeDateGMTOffset('2020-01-01T12:13:14.000')).toBe('2020-01-01T12:13:14.000');
  });
  test('should find incorrect GMT Offset and return with added colon', () => {
    expect(sanitizeDateGMTOffset('2020-01-01T12:13:14+0200')).toBe('2020-01-01T12:13:14+02:00');
  });
  test('should find incorrect GMT Offset and milliseconds and return with added colon', () => {
    expect(sanitizeDateGMTOffset('2020-01-01T12:13:14.000+0200')).toBe('2020-01-01T12:13:14.000+02:00');
  });
  test('should find incorrect negative GMT Offset and return with added colon', () => {
    expect(sanitizeDateGMTOffset('2020-01-01T12:13:14-0300')).toBe('2020-01-01T12:13:14-03:00');
  });
});
