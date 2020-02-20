import { removeAllBS } from '../lib/removeAllBS';

const strings = ['  yolo', 'yo  lo', 'yolo  ', '  yo  lo  '];

test('remove whitespaces in an string', () => {
  for (let i = 0; i < strings.length; i++) {
    expect(removeAllBS(strings[i])).toBe('yolo');
  }
});
