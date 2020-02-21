import {inViewport} from "..";


describe("Test inViewport helper:", () => {
  let parent: HTMLElement;
  let elementInsideViewport: HTMLElement;
  let elementOutsideViewport: HTMLElement;

  const viewportValues = {
    parent: {
      top: 100,
      right: 0,
      bottom: 0,
      left: 0
    },
    elementInside: {
      top: 200,
      right: 0,
      bottom: 0,
      left: 100
    },
    elementOutside: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 100
    }
  }

  beforeEach(() => {
    parent = document.createElement("div");
    elementInsideViewport = document.createElement("div");
    elementOutsideViewport = document.createElement("div");

    spyOn(parent, "getBoundingClientRect").and.returnValue(viewportValues.parent);
    spyOn(elementInsideViewport, "getBoundingClientRect").and.returnValue(viewportValues.elementInside);
    spyOn(elementOutsideViewport, "getBoundingClientRect").and.returnValue(viewportValues.elementOutside);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call getBoundingClientRect on given element', () => {
    inViewport(elementInsideViewport, parent);
    expect(elementInsideViewport.getBoundingClientRect).toBeCalledTimes(1);
  });

  test('should detect that element is inside viewport', () => {
    const result = inViewport(elementInsideViewport, parent);
    expect(elementInsideViewport.getBoundingClientRect).toBeCalledTimes(1);
    expect(result).toBe(true);
  });

  test('should detect that element is outside viewport', () => {
    const result = inViewport(elementOutsideViewport, parent);
    expect(elementOutsideViewport.getBoundingClientRect).toBeCalledTimes(1);
    expect(result).toBe(false);
  });
});