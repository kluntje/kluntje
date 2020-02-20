import { hasClass } from "..";

let div: HTMLElement;

beforeEach(() => {
  div = document.createElement("div");
  div.classList.add("match");
});

test("should return if the element has the given class", () => {
  expect(hasClass(div, "match")).toBeTruthy();
  expect(hasClass(div, "no-match")).toBeFalsy();
});