import { toCamelCase } from '../lib/toCamelCase';

test.only('(toCamelCase) should convert text to camelCase', () => {
  expect(toCamelCase('http2 server-push')).toBe('http2ServerPush');
});
