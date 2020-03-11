import { isFilledObject } from '../lib/isFilledObject';

describe('js-utils / isFilledObject tests', () => {
  test('shoud identify non objects as not filledObject', () => {
    expect(isFilledObject('text')).toEqual(false);
  });

  test('shoud identify null as not filledObject', () => {
    expect(isFilledObject(null)).toEqual(false);
  });

  test('shoud identify empty object literal as not filledObject', () => {
    expect(isFilledObject({})).toEqual(false);
  });

  test('shoud identify object with key values as filledObject', () => {
    expect(isFilledObject({ key: 'value' })).toEqual(true);
  });

  test('shoud identify empty arrays as not filledObject', () => {
    expect(isFilledObject([])).toEqual(false);
  });

  test('shoud identify non empty arrays as filledObject', () => {
    expect(isFilledObject(['value'])).toEqual(true);
  });
});
