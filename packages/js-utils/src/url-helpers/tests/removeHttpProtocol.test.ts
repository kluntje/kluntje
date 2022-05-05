import { removeHttpProtocol } from '../lib/removeHttpProtocol';

const testUrl1 = 'http://www.google.com';
const testUrl2 = 'https://www.google.com';
const testUrl3 = 'www.google.com';

test('should return a string withouth http://', () => {
  expect(removeHttpProtocol(testUrl1)).toBe('www.google.com');
});

test('should return a string withouth https://', () => {
  expect(removeHttpProtocol(testUrl2)).toBe('www.google.com');
});

test('should return the same string', () => {
  expect(removeHttpProtocol(testUrl3)).toBe(testUrl3);
});
