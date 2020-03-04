import { toKebabCase } from '../lib/toKebabCase';

test('(toKebabCase) should replace uppercase letters wiht "-" + letter in lowercase', () => {
  expect(toKebabCase('http2ServerPush')).toBe('http2-server-push');
});
