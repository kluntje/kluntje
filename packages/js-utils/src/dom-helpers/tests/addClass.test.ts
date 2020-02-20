import { addClass } from '../index';

let singleElement: HTMLElement;
let multipleElements: NodeListOf<Element>;

beforeEach(() => {
  singleElement = document.createElement('div');

  const container = document.createElement('div');
  [0, 1, 2].forEach(() => container.appendChild(document.createElement('div')));
  multipleElements = container.childNodes as NodeListOf<Element>;
});

test('should add class to a single element', () => {
  addClass(singleElement, 'css-class');
  expect(singleElement.classList).toContain('css-class');
});

test('should add a class to multiple elements at once', () => {
  addClass(multipleElements, 'css-class-1');
  expect(multipleElements[0].classList).toContain('css-class-1');
  expect(multipleElements[1].classList).toContain('css-class-1');
  expect(multipleElements[2].classList).toContain('css-class-1');
});
