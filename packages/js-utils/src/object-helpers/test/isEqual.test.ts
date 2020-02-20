import { isEqual } from '../lib/isEqual';

const obj1 = {
  isEqual: true,
};
const obj2 = {
  isEqual: true,
};
const obj3 = {
  isEqual: false,
};
const mystring = 'yolo';
const mystring2 = 'yolo';
const mystring3 = 'yohlo';
const mystring4 = 'Yolo';

test('should compare object arguments', () => {
  expect(isEqual(obj1, obj2)).toBe(true);
  expect(isEqual(obj1, obj3)).toBe(false);
  expect(isEqual(mystring, mystring2)).toBe(true);
  expect(isEqual(mystring2, mystring3)).toBe(false);
  expect(isEqual(mystring, mystring4)).toBe(false);
});
