import { find } from '..';

const container = document.createElement('div');

beforeEach(() => {
  [0, 1, 2].forEach((_, index) => {
    const div = document.createElement('div');
    if (index === 0) {
      div.id = `item-${index}`;
      div.innerHTML = `item-${index}`;
    } else {
      div.classList.add('item');
      div.classList.add(`item-${index}`);
      div.innerHTML = `item-${index}`;
    }
    container.appendChild(div);
  });
});

test('Should find a single element via id selector', () => {
  const foundItem = find(container, '#item-0');
  expect(foundItem).not.toBeFalsy();
  expect(foundItem?.innerHTML).toBe('item-0');
});

test('Should find first matching element via class selector', () => {
  const foundItem = find(container, '.item');
  const foundItem2 = find(container, '.item-2');

  expect(foundItem).not.toBeFalsy();
  expect(foundItem?.innerHTML).toBe('item-1');

  expect(foundItem2).not.toBeFalsy();
  expect(foundItem2?.innerHTML).toBe('item-2');
});

test('Should find first child element via pseudo selector', () => {
  const foundItem = find(container, ':first-child');
  expect(foundItem).not.toBeFalsy();
  expect(foundItem?.innerHTML).toBe('item-0');
});

test('Should find last child element via pseudo selector', () => {
  const foundItem = find(container, ':last-child');
  expect(foundItem).not.toBeFalsy();
  expect(foundItem?.innerHTML).toBe('item-2');
});
