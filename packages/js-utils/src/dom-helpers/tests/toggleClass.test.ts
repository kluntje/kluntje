import { toggleClass } from '../index';
import * as domHelper from '..';

describe('toggleClass tests:', () => {
  const textClassname = 'test-class';

  describe('single Element given', () => {
    const testEl = document.createElement('div');

    test('should remove class of given Element, if class is present', () => {
      testEl.classList.add(textClassname);
      toggleClass(testEl, textClassname);
      expect(testEl.classList).not.toContain(textClassname);
    });

    test('should add class to given Element, if class is not present', () => {
      testEl.classList.remove(textClassname);
      toggleClass(testEl, textClassname);
      expect(testEl.classList).toContain(textClassname);
    });

    test('should not add class to given Element, if add flag is false', () => {
      testEl.classList.remove(textClassname);
      toggleClass(testEl, textClassname, false);
      expect(testEl.classList).not.toContain(textClassname);
    });

    test('should not remove class of given Element, if add flag is true', () => {
      testEl.classList.add(textClassname);
      toggleClass(testEl, textClassname, true);
      expect(testEl.classList).toContain(textClassname);
    });
  });

  describe('multiple Elements given', () => {
    const testEls = new Array(15).fill(document.createElement('div'));

    test('should remove class of all given Elements, if class is present', () => {
      testEls.map(testel => testel.classList.add(textClassname));
      toggleClass(testEls, textClassname);
      testEls.forEach(el => expect(el.classList).not.toContain(textClassname));
    });

    test('should add class to all given Elements, if class is not present', () => {
      testEls.map(testel => testel.classList.remove(textClassname));
      toggleClass(testEls, textClassname);
      testEls.forEach(el => expect(el.classList).toContain(textClassname));
    });

    test('should not add class to given Elements, if add flag is false', () => {
      testEls.map(testel => testel.classList.remove(textClassname));
      toggleClass(testEls, textClassname, false);
      testEls.forEach(el => expect(el.classList).not.toContain(textClassname));
    });

    test('should not remove class of given Elements, if add flag is true', () => {
      testEls.map(testel => testel.classList.add(textClassname));
      toggleClass(testEls, textClassname, true);
      testEls.forEach(el => expect(el.classList).toContain(textClassname));
    });
  });
});
