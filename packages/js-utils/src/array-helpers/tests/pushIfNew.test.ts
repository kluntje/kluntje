import { pushIfNew } from '../index';

const testArray: Array<string> = [];

test('should add Element to Array, if its not already in it and return resulting array', () => {
  let newArray = pushIfNew(testArray, "newElement");
  
  expect(newArray).toEqual([
    'newElement'
  ]);
  expect(testArray).toEqual([
    'newElement'
  ]);

  newArray = pushIfNew(testArray, "anotherElement");
  
  expect(newArray).toEqual([
    'newElement',
    'anotherElement'
  ]);
  expect(testArray).toEqual([
    'newElement',
    'anotherElement'
  ]);
});

test('should not add Element to Array, if its already in it and return resulting array', () => {
  let newArray = pushIfNew(testArray, "newElement");
  newArray = pushIfNew(testArray, "newElement");

  expect(newArray).toEqual([
    'newElement',
    'anotherElement'
  ]);
  expect(testArray).toEqual([
    'newElement',
    'anotherElement'
  ]);
});