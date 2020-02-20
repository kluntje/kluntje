import { toString } from '../lib/toString';

describe('Should stringify an argument', () => {
  const numberArgument = 1;
  const objectArgument = { hello: 'world' };
  const arrayArgument = [1, 2, 3];

  test('should stringify an number', () => {
    const result = toString(numberArgument);

    expect(result).toBe('1');
    expect(typeof result).toEqual('string');
  });

  test('should stringify an object argument', () => {
    const result = toString(objectArgument);
    expect(result).toEqual(JSON.stringify(objectArgument));
    expect(typeof result).toBe('string');
  });

  test('should stringify an array argument', () => {
    const result = toString(arrayArgument);
    expect(result).toEqual(JSON.stringify(arrayArgument));
    expect(typeof result).toBe('string');
  });
});
