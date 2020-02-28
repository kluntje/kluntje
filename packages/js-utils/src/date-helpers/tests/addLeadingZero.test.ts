import { addLeadingZero } from '..';

describe('addLeadingZero tests:', () => {
  test('should add leading zero to all single-digit numbers and return string', () => {
    for (let i = 1; i < 10; i++) {
      expect(addLeadingZero(i)).toBe(`0${i.toString()}`);
    }
  });

  test('should not add leading zero to all non-single-digit numbers and return string', () => {
    for (let i = 10; i <= 31; i++) {
      expect(addLeadingZero(i)).toBe(i.toString());
    }
  });
});
