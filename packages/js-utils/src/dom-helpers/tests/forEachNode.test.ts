import { forEachNode } from '..';

let multipleElements: NodeListOf<Element>;

const mockCallback = jest.fn((item, index) => {
  item.classList.add(`iteration-test-${index}`);
});

const mockClass = {
  eventBindingMap: {},
  mockCallback,
};

beforeEach(() => {
  const container = document.createElement('div');
  [0, 1, 2].forEach(() => container.appendChild(document.createElement('div')));
  multipleElements = container.childNodes as NodeListOf<Element>;
});

afterEach(() => {
  jest.clearAllMocks();
});

test('should iterate over every node and change the innerText (incl. context)', () => {
  forEachNode(multipleElements, mockCallback, mockClass);
  expect(mockCallback.mock.calls.length).toBe(3);
  expect(multipleElements[0].classList).toContain('iteration-test-0');
  expect(multipleElements[2].classList).toContain('iteration-test-2');
});

test('should iterate over every node and change the innerText', () => {
  forEachNode(multipleElements, mockCallback);
  expect(mockCallback.mock.calls.length).toBe(3);
  expect(multipleElements[0].classList).toContain('iteration-test-0');
  expect(multipleElements[2].classList).toContain('iteration-test-2');
});
