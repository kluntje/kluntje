import { isEqual } from '../lib/isEqual';

test('compare Strings', () => {
  const str1 = 'T-800';
  const str2 = 'T-800';
  const str3 = 'T-1000';

  expect(isEqual(str1, str2)).toBe(true);
  expect(isEqual(str1, str3)).toBe(false);
});

test('compare Dates', () => {
  const date1 = new Date('2029-08-10T20:45');
  const date2 = new Date('2029-08-10T20:45');
  const date3 = new Date('1984-05-13T01:52');

  expect(isEqual(date1, date2)).toBe(true);
  expect(isEqual(date1, date3)).toBe(false);
});

test('compare Arrays', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  const arr3 = [1, 2, '3'];
  const arr4 = [1, 2, 3, 4];

  expect(isEqual(arr1, arr2)).toBe(true);
  expect(isEqual(arr1, arr3)).toBe(false);
  expect(isEqual(arr1, arr4)).toBe(false);
});

test('compare Sets', () => {
  const set1 = new Set([1, 2, 3]);
  const set2 = new Set([1, 2, 3]);
  const set3 = new Set([1, 2, '3']);
  const set4 = new Set([1, 2, 3, 4]);

  expect(isEqual(set1, set2)).toBe(true);
  expect(isEqual(set1, set3)).toBe(false);
  expect(isEqual(set1, set4)).toBe(false);
});

test('compare Maps', () => {
  const map1 = new Map([
    [1, 2],
    [3, 4],
  ]);
  const map2 = new Map([
    [1, 2],
    [3, 4],
  ]);
  const map3 = new Map([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
  const map4 = new Map([
    [1, 2],
    [5, 6],
  ]);

  expect(isEqual(map1, map2)).toBe(true);
  expect(isEqual(map1, map3)).toBe(false);
  expect(isEqual(map1, map4)).toBe(false);
});

test('compare Objects', () => {
  const symbol = Symbol('symbol');
  const obj1 = {
    a: [1, 2, 'T-800', new Date('1984-05-13T01:52')],
    b: {
      c: new Map([[symbol, true]]),
    },
    [symbol]: 1234,
  };

  const obj2 = {
    a: [1, 2, 'T-800', new Date('1984-05-13T01:52')],
    b: {
      c: new Map([[symbol, true]]),
    },
    [symbol]: 1234,
  };

  const obj3 = {
    a: [1, 2, 'T-1000', new Date('1984-05-13T01:52')],
    b: {
      c: new Map([[symbol, true]]),
    },
    [symbol]: 1234,
  };

  expect(isEqual(obj1, obj2)).toBe(true);
  expect(isEqual(obj1, obj3)).toBe(false);
});
