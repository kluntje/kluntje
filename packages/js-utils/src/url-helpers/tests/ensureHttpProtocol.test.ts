import { ensureHttpProtocol } from '../lib/ensureHttpProtocol';

const testUrl1 = 'http://www.google.com';
const testUrl2 = 'https://www.google.com';
const testUrl3 = 'www.google.com';

test('should return a string with http protocol', () => {
  expect(ensureHttpProtocol(testUrl1)).toBe('http://www.google.com');
});

test('should return a string with https protocol', () => {
  expect(ensureHttpProtocol(testUrl2)).toBe('https://www.google.com');
});

test('should return a string with https protocol', () => {
  expect(ensureHttpProtocol(testUrl3)).toBe('https://www.google.com');
});

test('should return a string with http protocol when useHttp is set to true', () => {
  expect(ensureHttpProtocol(testUrl3, true)).toBe('http://www.google.com');
});
