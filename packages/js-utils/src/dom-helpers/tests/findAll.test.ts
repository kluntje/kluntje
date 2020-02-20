import { findAll } from '..';

let container: HTMLElement;

beforeEach(() => {
  container = document.createElement('div');

  [0, 1, 2].forEach((_, index) => {
    const singleElement = document.createElement('div');

    if (index === 1) {
      singleElement.id = `item-${index}`;
      singleElement.classList.add('item');
      singleElement.classList.add(`item-${index}`);
      singleElement.innerHTML = `item-${index}`;
    } else {
      singleElement.classList.add('item');
      singleElement.classList.add(`item-${index}`);
      singleElement.innerHTML = `item-${index}`;
    }
    container.appendChild(singleElement);
  });
});

test('Should find a single element via id selector', () => {
  const foundItem = findAll(container, '#item-1');
  expect(foundItem).toHaveLength(1);
});

test('Should find multiple elements via class selector', () => {
  const foundItems = findAll(container, '.item');
  expect(foundItems).toHaveLength(3);
  expect(foundItems[1].innerHTML).toBe('item-1');
});
