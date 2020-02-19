import { naiveClone } from "../lib/naiveClone";

describe("Clone an Array", () => {
  const array = [1];
  const clone = naiveClone(array);
  clone.push(2);

  test("clone should be completely seperated from original", () => {
    expect(array === clone).toBe(false);
    expect(typeof array).toBe(typeof clone);
  });

  test("added an element to the clone", () => {
    expect(array.length).toBe(1);
    expect(clone.length).toBe(2);
  });
});

describe("Clone an Object", () => {
  const obj = { hello: "world" };
  const clone = naiveClone(obj);

  test("clone should be completely separated from original", () => {
    expect(obj === clone).toBe(false);
    expect(typeof obj).toBe(typeof clone);
  });
});
