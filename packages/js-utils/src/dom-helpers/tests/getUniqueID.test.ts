import { getUniqueID } from '..';

test('should return an unique id', () => {
  const id1 = getUniqueID();
  const id2 = getUniqueID();

  expect(id1).toBeDefined();
  expect(id1.length).toStrictEqual(9);
  expect(id2).toBeDefined();
  expect(id2.length).toStrictEqual(9);

  expect(id1).not.toEqual(id2);
});
