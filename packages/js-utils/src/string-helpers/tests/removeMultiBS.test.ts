import { removeMultiBS } from '../lib/removeMultiBS';

const testString = '  Hello   World ';

test('remove whitespaces in an string', () => {
  expect(removeMultiBS(testString)).toBe(' Hello World ');
});
