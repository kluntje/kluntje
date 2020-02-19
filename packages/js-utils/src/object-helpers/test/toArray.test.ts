import { toArray } from "../lib/toArray";

describe("Should handle an string argument correct", () => {
  const stringArgument = "Hello world";

  test("should wrap an string into an array", () => {
    const result = toArray(stringArgument);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBe("Hello world");
  });
});

describe("Should handle an array argument correct", () => {
  const arrayArgument = [1, 2, 3];

  test("should not wrap the array argument since it is already an array", () => {
    const result = toArray(arrayArgument);
    result.push(4);
    expect(arrayArgument).toEqual(result);
    expect(arrayArgument[3]).toEqual(4);
  });
});

describe("Should handle an object argument correct", () => {
  const objectArgument = { hello: "world" };
  test("should wrap the object", () => {
    const result = toArray(objectArgument);
    expect(result[0]).toEqual(objectArgument);
    expect(result[0].hello).toBe("world");
  });
});
