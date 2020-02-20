import { removeAllNL } from '../lib/removeAllNL';

const testString = `
Hello
World
`;

test('should remove new lines', () => {
  expect(removeAllNL(testString)).toBe('HelloWorld');
});
