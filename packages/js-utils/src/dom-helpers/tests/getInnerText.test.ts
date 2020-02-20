import { getInnerText } from '..';

const divElement = document.createElement('div');
divElement.textContent = 'Hello world';

test('should get the correct inner text', () => {
  expect(getInnerText(divElement)).toBe('Hello world');
});
