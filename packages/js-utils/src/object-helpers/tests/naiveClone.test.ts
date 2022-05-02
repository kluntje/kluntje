import { naiveClone } from '../lib/naiveClone';

describe('Clone an Array', () => {
  const array = [1];
  const clone = naiveClone(array);
  clone.push(2);

  test('clone should be completely seperated from original', () => {
    expect(array === clone).toBe(false);
    expect(typeof array).toBe(typeof clone);
  });

  test('added an element to the clone', () => {
    expect(array.length).toBe(1);
    expect(clone.length).toBe(2);
  });
});

describe('Clone an Object', () => {
  const obj = { hello: 'world' };
  const clone = naiveClone(obj);

  test('clone should be completely separated from original', () => {
    expect(obj === clone).toBe(false);
    expect(typeof obj).toBe(typeof clone);
  });
});

describe('Clone Sets', () => {
  const set = new Set<any>(['a', { c: true }]);
  const origin = set;
  const clone = naiveClone(origin);

  test('clone should deep equal origin', () => {
    expect(clone).toStrictEqual(origin);
  });

  test('clone should not be a reference to the same object as origin', () => {
    expect(clone).not.toBe(origin);
  });

  test('clone nested items should not be a reference to the same object as in the origin', () => {
    // comparing the {c: true} in both
    expect([...clone.values()][1]).not.toBe([...origin.values()][1]);
  });
});

describe('Clone Maps', () => {
  const map = new Map<any, any>([
    ['a', 1],
    ['b', { c: true }],
  ]);
  const origin = { filed: map };
  const clone = naiveClone(origin);

  test('clone should deep equal origin', () => {
    expect(clone).toStrictEqual(origin);
  });

  test('clone should not be a reference to the same object as origin', () => {
    expect(clone).not.toBe(origin);
  });

  test('clone nested items should not be a reference to the same object as in the origin', () => {
    expect(clone.filed.get('b')).not.toBe(origin.filed.get('b'));
  });
});

describe('Clone Date', () => {
  const origin = new Date();
  const clone = naiveClone(origin);

  test('clone should deep equal origin', () => {
    expect(clone).toStrictEqual(origin);
  });

  test('clone should not be a reference to the same Date object as origin', () => {
    expect(clone).not.toBe(origin);
  });
});
