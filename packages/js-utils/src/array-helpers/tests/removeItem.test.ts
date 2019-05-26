import { removeItem } from '../index';

test('should remove given string in array and return it', () => {
  expect(removeItem(["one", "two", "three"], 'one')).toEqual([
    'two',
    'three'
  ]);
  expect(removeItem(["one", "two", "three"], 'two')).toEqual([
    'one',
    'three'
  ]);
  expect(removeItem(["one", "two", "three"], 'three')).toEqual([
    'one',
    'two'
  ]);
});

test('should return given array if given item is not part of the array', () => {
  expect(removeItem(["one", "two", "three"], 'four')).toEqual([
    'one',
    'two',
    'three'
  ]);
});

test('should remove any occourance of given item in array', () => {
  expect(removeItem(["one", "two", "three", "two"], 'two')).toEqual([
    'one',
    'three'
  ]);
});

test('should not change given array', () => {
  const array = ["one", "two", "three", "two"];
  removeItem(["one", "two", "three", "two"], 'two')
  expect(array).toEqual(["one", "two", "three", "two"]);
});